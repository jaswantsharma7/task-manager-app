// The api.js file contains functions for making API calls to the backend server to perform CRUD operations on tasks. Each function corresponds to a specific API endpoint and HTTP method, allowing the frontend to interact with the backend to fetch, create, update, and delete tasks. The functions use the Fetch API to make asynchronous requests and handle responses, throwing errors if the requests fail. This abstraction allows the rest of the frontend code to call these functions without worrying about the underlying API details.
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

// Each function in this file is an asynchronous function that makes a fetch request to the corresponding API endpoint. The functions handle the response by checking if the response is okay (res.ok) and throwing an error if it is not. If the response is successful, they return the parsed JSON data from the response. This structure allows for clean and reusable API calls throughout the frontend application.

// The getTasks function fetches the list of tasks from the backend API. It sends a GET request to the BASE_URL and returns the JSON response if the request is successful. If the request fails, it throws an error with a message indicating that fetching tasks failed.
export const getTasks = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

// The createTask function sends a POST request to the backend API to create a new task. It takes a task object as an argument, converts it to JSON, and includes it in the request body. If the request is successful, it returns the created task from the response. If the request fails, it throws an error with a message indicating that creating the task failed.
export const createTask = async (task) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

// The updateTask function sends a PUT request to the backend API to update an existing task. It takes the task ID and an updates object as arguments, converts the updates to JSON, and includes it in the request body. If the request is successful, it returns the updated task from the response. If the request fails, it throws an error with a message indicating that updating the task failed.
export const updateTask = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

// The deleteTask function sends a DELETE request to the backend API to delete a task. It takes the task ID as an argument and includes it in the URL of the request. If the request is successful, it returns the JSON response from the server. If the request fails, it throws an error with a message indicating that deleting the task failed.
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
  return res.json();
};
