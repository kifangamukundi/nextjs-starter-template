'use client'
import { useState } from 'react';

const useCheckbox = (options) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (id) => {
    const isChecked = checkedItems.includes(id);

    isChecked
      ? setCheckedItems(checkedItems.filter((item) => item !== id))
      : setCheckedItems([...checkedItems, id]);
  };

  const checkboxes = options.map((option) => (
    <label key={option._id} className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-gray-600"
        name={option.title}
        value={option.title}
        checked={checkedItems.includes(option._id)}
        onChange={() => handleCheckboxChange(option._id)}
      />
      <span className="ml-2 text-gray-700">{option.title}</span>
    </label>
  ));

  const selectedIds = checkedItems;

  return [selectedIds, checkboxes];
};

export default useCheckbox;


