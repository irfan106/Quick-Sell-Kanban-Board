import React, { useState, useEffect, useLayoutEffect } from 'react';
import './KanbanBoard.css';
import SortByUser from './SortByUser';
import SortByPriority from './SortByPriority';
import SortByStatus from './SortByStatus';
import { fetchData } from './api';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('kanbanGroupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('kanbanSortBy') || 'priority');
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useLayoutEffect(() => {
    setShowFilterPopup(false);
    setSortBy('priority');
    localStorage.setItem('kanbanGroupBy', groupBy);
  }, [groupBy]);

  useLayoutEffect(() => {
    localStorage.setItem('kanbanSortBy', sortBy);
  }, [sortBy]);

  useEffect(() => {
    const storedGroupBy = localStorage.getItem('kanbanGroupBy');
    const storedSortBy = localStorage.getItem('kanbanSortBy');

    if (storedGroupBy && groupBy !== storedGroupBy) {
      setGroupBy(storedGroupBy);
    }

    if (storedSortBy && sortBy !== storedSortBy) {
      setSortBy(storedSortBy);
    }
  }, [groupBy, sortBy]);

  return (
    <div className="kanban-board">
      {groupBy === 'user' ? (
        <SortByUser
          tickets={tickets}
          users={users}
          showFilterPopup={showFilterPopup}
          setShowFilterPopup={setShowFilterPopup}
          setGroupBy={setGroupBy}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      ) : groupBy === 'priority' ? (
        <SortByPriority
          tickets={tickets}
          users={users}
          showFilterPopup={showFilterPopup}
          setShowFilterPopup={setShowFilterPopup}
          setGroupBy={setGroupBy}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      ) : (
        <SortByStatus
          tickets={tickets}
          users={users}
          showFilterPopup={showFilterPopup}
          setShowFilterPopup={setShowFilterPopup}
          setGroupBy={setGroupBy}
          setSortBy={setSortBy}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
