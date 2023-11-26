// SortByStatus.jsx
import React from 'react';
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

const SortByStatus = ({ tickets, showFilterPopup, setShowFilterPopup, setGroupBy, sortBy, setSortBy, users }) => {
  const sortedTickets = (filteredTickets) => {
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
        <button className="display-button" onClick={() => setShowFilterPopup(!showFilterPopup)}>
          <FontAwesomeIcon icon={faSlidersH} /> Display
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {showFilterPopup && (
          <div className="filter-popup">
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
        {renderStatusColumns()}
      </div>
    </div>
  );
};

export default SortByStatus;
