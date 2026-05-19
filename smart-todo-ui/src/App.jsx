import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  
  // Filter & Sort State
  const [filter, setFilter] = useState('All'); // All, Pending, Completed
  
  useEffect(() => {
    loadTasks();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) {
      showToast("Please enter a title and deadline.");
      return;
    }
    
    try {
      const newTask = await createTask({ title, priority, deadline: new Date(deadline).toISOString() });
      setTasks([...tasks, newTask]);
      setTitle('');
      setDeadline('');
      setPriority('Medium');
      showToast("Task created successfully!");
    } catch (err) {
      showToast("Error creating task.");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updated = await updateTask(task.id, {
        ...task,
        isCompleted: !task.isCompleted
      });
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      showToast("Error updating task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      showToast("Task deleted.");
    } catch (err) {
      showToast("Error deleting task.");
    }
  };

  // Filter and Sort
  const filteredTasks = tasks.filter(t => {
    if (filter === 'Pending') return !t.isCompleted;
    if (filter === 'Completed') return t.isCompleted;
    return true;
  }).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="app-container">
      <header className="header">
        <h1>Smart Tasks</h1>
        <p>Organize your work, beautifully.</p>
      </header>

      {/* Task Form */}
      <div className="glass-panel">
        <form className="task-form" onSubmit={handleAddTask}>
          <div className="form-group">
            <label>Task Title</label>
            <input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="What needs to be done?" 
            />
          </div>
          <div className="form-group" style={{ flex: '0 1 150px' }}>
            <label>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: '0 1 180px' }}>
            <label>Deadline</label>
            <input 
              type="date" 
              value={deadline} 
              onChange={e => setDeadline(e.target.value)} 
            />
          </div>
          <div className="form-group" style={{ justifyContent: 'flex-end', flex: '0 1 auto' }}>
            <button type="submit" className="btn">Add Task</button>
          </div>
        </form>
      </div>

      {/* Filters */}
      <div className="filters">
        {['All', 'Pending', 'Completed'].map(f => (
          <button 
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="task-list">
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : error ? (
          <div className="loading" style={{ color: 'var(--danger-color)' }}>{error}</div>
        ) : filteredTasks.length === 0 ? (
          <div className="loading">No tasks found.</div>
        ) : (
          filteredTasks.map(t => (
            <div key={t.id} className={`task-item ${t.isCompleted ? 'completed' : ''}`}>
              <div className="task-content">
                <select 
                  className={`status-dropdown ${t.isCompleted ? 'status-completed' : 'status-pending'}`}
                  value={t.isCompleted ? "Completed" : "Pending"}
                  onChange={() => handleToggleComplete(t)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="task-details">
                  <span className="task-title">{t.title}</span>
                  <div className="task-meta">
                    <span className={`badge badge-${t.priority.toLowerCase()}`}>{t.priority}</span>
                    <span>{new Date(t.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button 
                className="btn btn-danger" 
                onClick={() => handleDeleteTask(t.id)}
                title="Delete"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
