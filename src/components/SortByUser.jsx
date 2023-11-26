import React, { useEffect, useRef } from 'react';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faChevronDown, faAdd, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';

const SortByUser = ({ tickets, users, showFilterPopup, setShowFilterPopup, setGroupBy, setSortBy, sortBy }) => {
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

  const renderUserColumns = () => {
    return users.map((user) => {
      const filteredTickets = filterTicketsByUser(user.id);
      const columnCount = filteredTickets.length;

      return (
        <div key={user.id} className="column">
          <div className="column-header">
            <p>
              <span className='column-avatar'>{user.avatar}</span>
              {user.name}
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
              priority={ticket.priority}
              status={ticket.status}
            />
          ))}
        </div>
      );
    });
  };

  const filterTicketsByUser = (userId) => {
    return tickets.filter((ticket) => ticket.userId === userId);
  };

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
        {renderUserColumns()}
      </div>
    </div>
  );
};

export default SortByUser;
