// The TaskList component is responsible for displaying the list of tasks. It takes in several props: tasks (the array of task objects), onToggleStatus (a function to toggle the status of a task), onDelete (a function to delete a task), filter (the current filter applied to the task list), and onFilterChange (a function to change the current filter). The component filters the tasks based on the selected filter and renders them in a list format, along with buttons to toggle their status and delete them. It also includes a header with the count of tasks and buttons to change the filter.
function TaskList({ tasks, onToggleStatus, onDelete, filter, onFilterChange }) {
  const filtered = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

  // The return statement renders the task list. It includes a header that displays the number of tasks based on the current filter and buttons to change the filter. If there are no tasks to display, it shows a message indicating that no tasks were found. Otherwise, it maps over the filtered tasks and renders each task with its title, description, creation date, status badge, and action buttons to toggle the status and delete the task. The task items are styled based on their status (e.g., completed tasks have a different style).
  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks ({filtered.length})</h2>
        <div className="filter-buttons">
          {['All', 'Pending', 'Completed'].map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={filter === f ? 'active' : ''}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No tasks found.</p>
      ) : (
        <ul>
          {filtered.map((task) => (
            <li key={task._id} className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
              <div className="task-info">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <small>
                  {new Date(task.createdDate).toLocaleDateString()} &middot;{' '}
                  <span className={`badge ${task.status === 'Completed' ? 'badge-done' : 'badge-pending'}`}>
                    {task.status}
                  </span>
                </small>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => onToggleStatus(task._id, task.status)}
                  className="btn-toggle"
                >
                  {task.status === 'Pending' ? 'Mark Done' : 'Mark Pending'}
                </button>
                <button onClick={() => onDelete(task._id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Exporting the TaskList component as the default export of this module. This allows us to import and use the TaskList component in other parts of the application, such as in the main App component, to display and manage the list of tasks.
export default TaskList;
