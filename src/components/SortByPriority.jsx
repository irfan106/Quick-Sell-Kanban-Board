import React, { useEffect, useRef } from 'react';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faChevronDown, faEllipsis, faExclamation, faAdd } from '@fortawesome/free-solid-svg-icons';
import pHigh from '../assets/sig-high.png';
import pMed from '../assets/sig-med.png';
import pLow from '../assets/sig-low.png';
import Dropdown from './Dropdown';

const SortByPriority = ({ tickets, users, showFilterPopup, setShowFilterPopup, setGroupBy, setSortBy, sortBy }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowFilterPopup(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [popupRef, setShowFilterPopup]);

  const sortedTickets = (filteredTickets) => {
    if (sortBy === 'priority') {
      return filteredTickets.slice().sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return filteredTickets.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'user') {
      return filteredTickets;
    }
    return filteredTickets;
  };

  const renderPriorityColumns = () => {
    const priorityLevels = [0, 4, 3, 2, 1];

    return priorityLevels.map((priority) => {
      const filteredTickets = filterTicketsByPriority(priority);
      const columnCount = filteredTickets.length;

      return (
        <div key={priority} className="column">
          <div className="column-header">
            <div className="priority-icon">
              {priority === 0 && <FontAwesomeIcon icon={faEllipsis} />}
              {priority === 1 && <img src={pLow} alt="Low Priority" />}
              {priority === 2 && <img src={pMed} alt="Medium Priority" />}
              {priority === 3 && <img src={pHigh} alt="High Priority" />}
              {priority === 4 && <FontAwesomeIcon className='priotity-urgent-icon' icon={faExclamation} />}
            </div>
            <p>
              {getPriorityColumnName(priority)}
              <span className="column-count">{columnCount}</span>
            </p>
            <div className="column-header-icons column-header-icons-right">
              <FontAwesomeIcon icon={faAdd} />
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          </div>
          {sortedTickets(filteredTickets).map((ticket) => (
            <Card
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              tag={ticket.tag}
              avatar={ticket.avatar}
              status={ticket.status}
            />
          ))}
        </div>
      );
    });
  };

  const filterTicketsByPriority = (priority) => {
    return tickets.filter((ticket) => ticket.priority === priority)
      .map((ticket) => {
        const user = users.find((user) => user.id === ticket.userId);
        return { ...ticket, avatar: user ? user.avatar : null };
      });
  };

  const getPriorityColumnName = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      case 0:
        return 'No priority';
      default:
        return 'Unknown Priority';
    }
  };

  useEffect(() => {
    localStorage.setItem('kanbanSortBy', sortBy);
  }, [sortBy]);

  return (
    <div>
      <div className="navbar">
        <button className="display-button" onClick={() => setShowFilterPopup(!showFilterPopup)}>
          <FontAwesomeIcon icon={faSlidersH} /> Display
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {showFilterPopup && (
          <div className="filter-popup" ref={popupRef}>
            <Dropdown
              label="Grouping"
              options={[
                { label: 'Status', value: 'status' },
                { label: 'User', value: 'user' },
                { label: 'Priority', value: 'priority' },
              ]}
              selectedValue={setGroupBy}
              onChange={(value) => setGroupBy(value)}
            />
            <Dropdown
              label="Ordering"
              options={[
                { label: 'Priority', value: 'priority' },
                { label: 'Title', value: 'title' },
              ]}
              selectedValue={sortBy}
              onChange={(value) => setSortBy(value)}
            />
          </div>
        )}
      </div>
      <div className="horizontal-columns">
        {renderPriorityColumns()}
      </div>
    </div>
  );
};

export default SortByPriority;
