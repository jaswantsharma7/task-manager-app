// Importing the express library to create a router for handling task-related routes. The router will define endpoints for CRUD operations on tasks and will use controller functions to handle the logic for each endpoint. Finally, the router is exported for use in the main server file to integrate these routes into the application.
const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// Importing the Task model to interact with the tasks collection in MongoDB. This model defines the schema for tasks and provides methods for database operations.
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Exporting the router so it can be imported and used in the main server file (server.js) to handle requests to the /api/tasks endpoint, allowing the application to perform CRUD operations on tasks through these defined routes.
module.exports = router;
