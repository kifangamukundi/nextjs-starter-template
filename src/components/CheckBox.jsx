import React from 'react';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      name={label}
      checked={isSelected}
      onChange={onCheckboxChange}
      className="mr-2"
    />
    <label htmlFor={label}>{label}</label>
  </div>
);

export default Checkbox;
