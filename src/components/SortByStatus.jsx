import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSlidersH,
  faChevronDown,
  faAdd,
  faEllipsis,
  faAddressBook,
  faCircle,
  faCircleCheck,
  faCircleHalfStroke,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';

const SortByStatus = ({ tickets, setGroupBy, sortBy, setSortBy, users }) => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setShowFilterPopup(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [buttonRef, popupRef]);

  const toggleFilterPopup = () => {
    setShowFilterPopup((prevShowFilterPopup) => !prevShowFilterPopup);
  };

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return <FontAwesomeIcon className='backlog-icon' icon={faAddressBook} />;
      case 'Todo':
        return <FontAwesomeIcon className='todo-icon' icon={faCircle} />;
      case 'In progress':
        return <FontAwesomeIcon className='in-progress-icon' icon={faCircleHalfStroke} />;
      case 'Done':
        return <FontAwesomeIcon className='done-icon' icon={faCircleCheck} />;
      case 'Cancelled':
        return <FontAwesomeIcon className='cancelled-icon' icon={faCircleXmark} />;
      default:
        return null;
    }
  };

  const renderStatusColumns = () => {
    const allStatuses = getAllStatuses();
    return allStatuses.map((status) => {
      const filteredTickets = filterTicketsByStatus(status);
      const columnCount = filteredTickets.length;

      return (
        <div key={status} className="column">
          <div className="column-header">
            <div className='status-icon'>
              {getStatusIcon(status)}
            </div>
            <p>{status}
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
              avatar={getAvatarForTicket(ticket)}
            />
          ))}
        </div>
      );
    });
  };

  const filterTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  const getAllStatuses = () => {
    return ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  };

  const getAvatarForTicket = (ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    return user ? user.avatar : null;
  };

  return (
    <div>
      <div className="navbar">
        <button
          ref={buttonRef}
          className="display-button"
          onClick={toggleFilterPopup}
        >
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
      <div className="content-container">
        <div className="horizontal-columns">
          {renderStatusColumns()}
        </div>
      </div>
    </div>
  );
};

export default SortByStatus;
