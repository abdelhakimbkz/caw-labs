import React, { useState } from 'react';

const AddColumnForm = ({ onAddColumn }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [columnName, setColumnName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (columnName.trim()) {
      onAddColumn(columnName.trim());
      setColumnName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="add-column-form">
      {isAdding ? (
        <form onSubmit={handleSubmit} className="add-column-input">
          <input
            type="text"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            placeholder="Enter column name"
            autoFocus
            className="column-input"
          />
          <div className="column-form-actions">
            <button type="submit" className="confirm-btn">
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setColumnName('');
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="add-column-btn"
        >
          ＋ Add New Column
        </button>
      )}
    </div>
  );
};

export default AddColumnForm;