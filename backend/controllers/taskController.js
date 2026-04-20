// Importing the Task model to interact with the tasks collection in MongoDB. This model defines the schema for tasks and provides methods for database operations.
const Task = require('../models/Task');

//creating CRUD operations for tasks using async/await and try/catch for error handling. Each function corresponds to a specific HTTP method and interacts with the Task model to perform database operations. The functions are then exported for use in the routes.

// GET 
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdDate: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// POST
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// PUT using findById and save
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const { title, description, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE using findByIdAndDelete (nodemon required)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//exporting the functions to be used in the routes

module.exports = { getTasks, createTask, updateTask, deleteTask };
