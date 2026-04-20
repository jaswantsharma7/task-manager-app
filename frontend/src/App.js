import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
    }
  };

  const handleCreate = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      const updated = await updateTask(id, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError('')}>×</button>
          </div>
        )}
        <TaskForm onTaskCreated={handleCreate} />
        <TaskList
          tasks={tasks}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          filter={filter}
          onFilterChange={setFilter}
        />
      </main>
    </div>
  );
}

export default App;
