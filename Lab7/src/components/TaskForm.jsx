import React, { useState } from 'react';

const TaskForm = ({ onAddTask, columns, labels }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(columns[0]?.status || 'todo');
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const selectedLabelObjects = labels.filter(label => selectedLabels.includes(label.id));
    
    onAddTask({
      title: title.trim(),
      description: description.trim(),
      status: selectedStatus,
      labels: selectedLabelObjects,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSelectedLabels([]);
    setSelectedStatus(columns[0]?.status || 'todo');
  };

  const toggleLabel = (labelId) => {
    setSelectedLabels(prev =>
      prev.includes(labelId)
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
  };

  return (
    <div className="task-form">
      <h3>➕ Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter task title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Add description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="form-select"
          >
            {columns.map(column => (
              <option key={column.status} value={column.status}>
                {column.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Labels</label>
          <div className="labels-selector">
            {labels.map(label => (
              <button
                key={label.id}
                type="button"
                className={`label-option ${selectedLabels.includes(label.id) ? 'selected' : ''}`}
                style={{ 
                  backgroundColor: selectedLabels.includes(label.id) ? label.color : 'transparent',
                  borderColor: label.color,
                  color: selectedLabels.includes(label.id) ? 'white' : label.color
                }}
                onClick={() => toggleLabel(label.id)}
              >
                {label.name}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;