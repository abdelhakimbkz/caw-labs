import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Column from './components/Column';
import TaskForm from './components/TaskForm';
import AddColumnForm from './components/AddColumnForm';
import './App.css';

function App() {
  // Initial columns
  const [columns, setColumns] = useState([
    { id: uuidv4(), title: 'To Do', status: 'todo', color: '#4f46e5', tasks: [] },
    { id: uuidv4(), title: 'In Progress', status: 'in-progress', color: '#f59e0b', tasks: [] },
    { id: uuidv4(), title: 'Done', status: 'done', color: '#10b981', tasks: [] },
  ]);

  // Available labels
  const [labels, setLabels] = useState([
    { id: uuidv4(), name: 'Frontend', color: '#3b82f6' },
    { id: uuidv4(), name: 'Backend', color: '#ef4444' },
    { id: uuidv4(), name: 'Bug', color: '#f59e0b' },
    { id: uuidv4(), name: 'Feature', color: '#10b981' },
    { id: uuidv4(), name: 'Urgent', color: '#dc2626' },
    { id: uuidv4(), name: 'Low Priority', color: '#6b7280' },
  ]);

  // Add a new task
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status,
      labels: taskData.labels || [],
      checklist: [],
      createdAt: new Date(),
    };

    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.status === taskData.status
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  // Quick add task to column
  const quickAddTask = (columnStatus, title, description = '') => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: columnStatus,
      labels: [],
      checklist: [],
      createdAt: new Date(),
    };

    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.status === columnStatus
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  // Move task between columns
  const moveTask = (taskId, fromStatus, toStatus) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      const fromColumnIndex = newColumns.findIndex(col => col.status === fromStatus);
      const toColumnIndex = newColumns.findIndex(col => col.status === toStatus);
      
      if (fromColumnIndex === -1 || toColumnIndex === -1) return prevColumns;
      
      const taskIndex = newColumns[fromColumnIndex].tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prevColumns;
      
      const [task] = newColumns[fromColumnIndex].tasks.splice(taskIndex, 1);
      newColumns[toColumnIndex].tasks.push(task);
      
      return newColumns;
    });
  };

  // Update task
  const updateTask = (taskId, updates) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
      }))
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== taskId),
      }))
    );
  };

  // Add new column
  const addColumn = (title) => {
    const newColumn = {
      id: uuidv4(),
      title,
      status: title.toLowerCase().replace(/\s+/g, '-'),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  // Delete column
  const deleteColumn = (columnId) => {
    const columnToDelete = columns.find(col => col.id === columnId);
    if (!columnToDelete) return;

    if (window.confirm(`Delete column "${columnToDelete.title}"? This will also delete ${columnToDelete.tasks.length} tasks.`)) {
      setColumns(prevColumns => prevColumns.filter(col => col.id !== columnId));
    }
  };

  // Add new label
  const addLabel = (name, color) => {
    const newLabel = {
      id: uuidv4(),
      name,
      color,
    };
    setLabels([...labels, newLabel]);
  };

  // Delete all tasks in a column
  const deleteAllTasks = (columnStatus) => {
    if (window.confirm('Are you sure you want to delete all tasks in this column?')) {
      setColumns(prevColumns =>
        prevColumns.map(column =>
          column.status === columnStatus
            ? { ...column, tasks: [] }
            : column
        )
      );
    }
  };

  // Calculate total tasks
  const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);

  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">📋 Kanban Board</h1>
        <p className="header-subtitle">Manage your tasks efficiently</p>
      </header>

      <div className="main-content">
        <div className="sidebar">
          <TaskForm onAddTask={addTask} columns={columns} labels={labels} />
          <AddColumnForm onAddColumn={addColumn} />
          
          <div className="label-section">
            <h3>Labels</h3>
            <div className="label-list">
              {labels.map(label => (
                <div key={label.id} className="label-preview" style={{ backgroundColor: label.color }}>
                  {label.name}
                </div>
              ))}
            </div>
            <button 
              className="add-label-btn"
              onClick={() => {
                const name = prompt('Enter label name:');
                if (name) {
                  const color = prompt('Enter color (hex code):', '#3b82f6');
                  if (color) addLabel(name, color);
                }
              }}
            >
              + Add Label
            </button>
          </div>
        </div>

        <div className="board">
          {columns.map(column => (
            <Column
              key={column.id}
              column={column}
              tasks={column.tasks}
              onMoveTask={moveTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onDeleteAllTasks={deleteAllTasks}
              onDeleteColumn={deleteColumn}
              onQuickAddTask={quickAddTask}
              columns={columns}
              labels={labels}
            />
          ))}
          
          {columns.length === 0 && (
            <div className="empty-board">
              <div className="empty-board-icon">📋</div>
              <h3>No Columns Yet</h3>
              <p>Add your first column to get started!</p>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Drag and drop tasks between columns | Double-click to edit</p>
        <div className="footer-stats">
          <span className="stat-item">
            📊 Columns: <strong>{columns.length}</strong>
          </span>
          <span className="stat-item">
            ✅ Tasks: <strong>{totalTasks}</strong>
          </span>
          <span className="stat-item">
            ⚠️ Warning: Deleting a column is permanent!
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;