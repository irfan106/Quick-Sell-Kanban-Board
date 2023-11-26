import React from 'react';

const Dropdown = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="filter-option">
      <p className="filter-text">{label}</p>
      <select
        className="dropdown-select"
        onChange={(e) => onChange(e.target.value)}
        value={selectedValue}
      >
        <option value="status">Default</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
