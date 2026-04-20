// Importing the useState hook from React to manage the state of the form inputs and error messages. This allows us to create a controlled form where the input values are stored in the component's state and can be updated as the user interacts with the form.
import { useState } from 'react';

// The TaskForm component is a form for creating new tasks. It takes an onTaskCreated prop, which is a function that will be called when a new task is created. The component manages the state of the title, description, and error messages using the useState hook. When the form is submitted, it validates the input and calls the onTaskCreated function with the new task data if the input is valid.
function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // The handleSubmit function is called when the form is submitted. It prevents the default form submission behavior, checks if the title input is not empty, and if valid, it calls the onTaskCreated function with the new task data. If the title is empty, it sets an error message to inform the user that the title is required. After successfully creating a task, it resets the form inputs and clears any error messages.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    await onTaskCreated({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
  };

  // The return statement renders the form for creating a new task. It includes input fields for the title and description, as well as a submit button. If there is an error message (e.g., if the title is empty), it displays the error message below the title input field. The form is styled with CSS classes for better presentation.
  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && <span className="error">{error}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

// Exporting the TaskForm component as the default export of this module. This allows us to import and use the TaskForm component in other parts of the application, such as in the main App component, to provide a user interface for creating new tasks.
export default TaskForm;
