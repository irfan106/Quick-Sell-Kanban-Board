import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faEllipsis, faExclamation } from '@fortawesome/free-solid-svg-icons';
import {
  faAddressBook,
  faCircleCheck,
  faCircleHalfStroke,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import './Card.css';
import pHigh from '../assets/sig-high.png';
import pMed from '../assets/sig-med.png';
import pLow from '../assets/sig-low.png';

function Card({ id, title, tag, priority, avatar, status }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return <FontAwesomeIcon className='card-backlog-icon' icon={faAddressBook} />;
      case 'Todo':
        return <FontAwesomeIcon className='card-todo-icon' icon={faCircle} />;
      case 'In progress':
        return <FontAwesomeIcon className='card-in-progress-icon' icon={faCircleHalfStroke} />;
      case 'Done':
        return <FontAwesomeIcon className='card-done-icon' icon={faCircleCheck} />;
      case 'Cancelled':
        return <FontAwesomeIcon className='card-cancelled-icon' icon={faCircleXmark} />;
      default:
        return null;
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="task-id">{id}</div>
        <div className="task-avatar">{avatar}</div>
      </div>
      <div className='status-icon'>
        {getStatusIcon(status)}
        <div className="task-title">{title}</div>
      </div>
      <div className='tags'>
        {priority === 0 && (
          <div className="priority-icon-1">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        )}
        {priority === 1 && (
          <div className="priority-icon-img">
            <img src={pLow} alt="Low Priority" />
          </div>
        )}
        {priority === 2 && (
          <div className="priority-icon-img">
            <img src={pMed} alt="Medium Priority" />
          </div>
        )}
        {priority === 3 && (
          <div className="priority-icon-img">
            <img src={pHigh} alt="High Priority" />
          </div>
        )}
        {priority === 4 && (
          <div className="priority-icon-2">
            <FontAwesomeIcon icon={faExclamation} />
          </div>
        )}
        <div className="task-tag">
          <div className="circle-icon">
            <FontAwesomeIcon icon={faCircle} />
          </div>
          <span className="task-tag-text">{tag}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
