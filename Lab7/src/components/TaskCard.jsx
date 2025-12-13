import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskCard = ({ task, onUpdateTask, onDeleteTask, columns, labels }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [showChecklist, setShowChecklist] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(task));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSave = () => {
    onUpdateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const toggleChecklistItem = (itemId) => {
    const updatedChecklist = task.checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    onUpdateTask(task.id, { checklist: updatedChecklist });
  };

  const addChecklistItem = () => {
    const text = prompt('Enter checklist item:');
    if (text) {
      const newItem = {
        id: uuidv4(),
        text,
        completed: false,
      };
      const updatedChecklist = [...task.checklist, newItem];
      onUpdateTask(task.id, { checklist: updatedChecklist });
    }
  };

  const deleteChecklistItem = (itemId) => {
    const updatedChecklist = task.checklist.filter(item => item.id !== itemId);
    onUpdateTask(task.id, { checklist: updatedChecklist });
  };

  const toggleLabel = (labelId) => {
    const hasLabel = task.labels.some(l => l.id === labelId);
    const label = labels.find(l => l.id === labelId);
    
    let updatedLabels;
    if (hasLabel) {
      updatedLabels = task.labels.filter(l => l.id !== labelId);
    } else if (label) {
      updatedLabels = [...task.labels, label];
    } else {
      updatedLabels = task.labels;
    }
    
    if (updatedLabels) {
      onUpdateTask(task.id, { labels: updatedLabels });
    }
  };

  const completedChecklistItems = task.checklist.filter(item => item.completed).length;
  const totalChecklistItems = task.checklist.length;

  return (
    <div 
      className="task-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-title"
            autoFocus
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-description"
            placeholder="Add description..."
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h4 className="task-title">{task.title}</h4>
            <div className="task-actions">
              <button onClick={() => setShowChecklist(!showChecklist)} className="icon-btn">
                📋
              </button>
              <button onClick={() => onDeleteTask(task.id)} className="icon-btn delete-btn">
                🗑️
              </button>
            </div>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-labels">
            {task.labels.map(label => (
              <span
                key={label.id}
                className="task-label"
                style={{ backgroundColor: label.color }}
                onClick={() => toggleLabel(label.id)}
                title={`Click to remove ${label.name}`}
              >
                {label.name}
              </span>
            ))}
            <button
              className="add-label-btn"
              onClick={() => {
                const labelName = prompt('Add label (select from existing or enter new):');
                if (labelName) {
                  let label = labels.find(l => l.name.toLowerCase() === labelName.toLowerCase());
                  if (!label) {
                    const color = prompt('Enter color for new label (hex):', '#3b82f6');
                    if (color) {
                      // In a real app, you'd add this to the global labels
                      label = { id: uuidv4(), name: labelName, color };
                      toggleLabel(label.id);
                    }
                  } else {
                    toggleLabel(label.id);
                  }
                }
              }}
            >
              + Label
            </button>
          </div>

          {task.checklist.length > 0 && (
            <div className="checklist-preview">
              <span className="checklist-count">
                {completedChecklistItems}/{totalChecklistItems} completed
              </span>
            </div>
          )}

          {showChecklist && (
            <div className="checklist-modal">
              <div className="checklist-header">
                <h5>Checklist</h5>
                <button onClick={() => setShowChecklist(false)}>×</button>
              </div>
              <div className="checklist-items">
                {task.checklist.map(item => (
                  <div key={item.id} className="checklist-item">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)}
                    />
                    <span className={item.completed ? 'completed' : ''}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => deleteChecklistItem(item.id)}
                      className="delete-checklist-item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addChecklistItem} className="add-checklist-item-btn">
                + Add Item
              </button>
            </div>
          )}

          <div className="task-footer">
            <select
              className="status-select"
              value={task.status}
              onChange={(e) => onUpdateTask(task.id, { status: e.target.value })}
            >
              {columns.map(col => (
                <option key={col.status} value={col.status}>
                  {col.title}
                </option>
              ))}
            </select>
            <span className="task-date">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;