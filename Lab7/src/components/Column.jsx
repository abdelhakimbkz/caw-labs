import React, { useState } from 'react';
import TaskCard from './TaskCard';

const Column = ({ 
  column, 
  tasks, 
  onMoveTask, 
  onUpdateTask, 
  onDeleteTask, 
  onDeleteAllTasks, 
  onDeleteColumn,
  onQuickAddTask,
  columns, 
  labels 
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    const taskData = JSON.parse(e.dataTransfer.getData('application/json'));
    if (taskData.status !== column.status) {
      onMoveTask(taskData.id, taskData.status, column.status);
    }
  };

  const handleDeleteColumn = () => {
    onDeleteColumn(column.id);
  };

  return (
    <div 
      className={`column ${isDraggingOver ? 'dragging-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ borderTopColor: column.color }}
    >
      <div className="column-header">
        <div className="column-title-wrapper">
          <div className="column-color-indicator" style={{ backgroundColor: column.color }} />
          <h3 className="column-title">{column.title}</h3>
          <span className="task-count-badge">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="column-actions">
          <button 
            className="delete-all-btn"
            onClick={() => onDeleteAllTasks(column.status)}
            title="Delete all tasks"
            disabled={tasks.length === 0}
          >
            🗑️
          </button>
          <button 
            className="delete-column-btn"
            onClick={handleDeleteColumn}
            title="Delete column"
          >
            🗑️
          </button>
          <button 
            className="add-task-btn"
            onClick={() => {
              const title = prompt('Enter task title:');
              if (title) {
                const description = prompt('Enter task description:', '');
                onQuickAddTask(column.status, title, description);
              }
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="tasks-list">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            columns={columns}
            labels={labels}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="empty-column">
          <p>No tasks yet</p>
          <p className="drag-hint">Drop tasks here</p>
          <button 
            className="quick-add-btn"
            onClick={() => {
              const title = prompt('Quick add task:');
              if (title) {
                onQuickAddTask(column.status, title);
              }
            }}
          >
            + Quick Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;