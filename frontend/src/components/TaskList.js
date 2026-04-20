function TaskList({ tasks, onToggleStatus, onDelete, filter, onFilterChange }) {
  const filtered = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

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

export default TaskList;
