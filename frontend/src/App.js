// The App.js file is the main component of the React application. It manages the state of the tasks, handles API interactions, and renders the TaskForm and TaskList components. The App component uses the useState hook to manage the tasks, filter, and error state, and the useEffect hook to fetch tasks from the backend when the component mounts. It defines functions to handle creating a new task, toggling a task's status, and deleting a task, which are passed down as props to the child components. The component also includes error handling to display messages if API calls fail.

// Importing necessary hooks and components from React and other files. The useState hook is used for managing state, and the useEffect hook is used for performing side effects (like fetching data). The TaskForm component is used for creating new tasks, and the TaskList component is used for displaying the list of tasks. The API functions are imported to interact with the backend server for CRUD operations on tasks. Finally, the main CSS file is imported for styling the application.
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import './index.css';

// The App component is the main component of the React application. It manages the state of the tasks, handles API interactions, and renders the TaskForm and TaskList components. The App component uses the useState hook to manage the tasks, filter, and error state, and the useEffect hook to fetch tasks from the backend when the component mounts. It defines functions to handle creating a new task, toggling a task's status, and deleting a task, which are passed down as props to the child components. The component also includes error handling to display messages if API calls fail.
function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  // The fetchTasks function is an asynchronous function that fetches the list of tasks from the backend API using the getTasks function. If the request is successful, it updates the tasks state with the fetched data. If the request fails, it sets an error message to inform the user that loading tasks failed, possibly due to the server not running.
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
    }
  };

  // The handleCreate function is called when a new task is created through the TaskForm component. It takes the task data as an argument, calls the createTask function to send a POST request to the backend API, and if successful, it adds the new task to the tasks state. If the request fails, it sets an error message to inform the user that creating the task failed.
  const handleCreate = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  // The handleToggleStatus function is called when the user toggles the status of a task (e.g., from "Pending" to "Completed" or vice versa). It takes the task ID and its current status as arguments, determines the new status, and calls the updateTask function to send a PUT request to the backend API. If the request is successful, it updates the tasks state with the updated task. If the request fails, it sets an error message to inform the user that updating the task failed.
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      const updated = await updateTask(id, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  // The handleDelete function is called when the user deletes a task. It takes the task ID as an argument, calls the deleteTask function to send a DELETE request to the backend API, and if successful, it removes the deleted task from the tasks state. If the request fails, it sets an error message to inform the user that deleting the task failed.
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  // The return statement renders the main structure of the application. It includes a header with the title "Task Manager", and the main content area where it conditionally displays an error banner if there is an error message. It then renders the TaskForm component for creating new tasks and the TaskList component for displaying the list of tasks, passing down the necessary props for managing tasks and filters.
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

// Exporting the App component as the default export of this module. This allows us to import and use the App component in other parts of the application, such as in the index.js file, to render the main application component into the DOM.
export default App;
