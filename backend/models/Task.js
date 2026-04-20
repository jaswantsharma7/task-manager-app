// Importing the mongoose library to define the schema and model for tasks in MongoDB. This allows us to create a structured representation of our data and perform database operations using the defined model.
const mongoose = require('mongoose');

// Defining the schema for a Task, which includes fields for title, description, status, and createdDate. Each field has specific data types and validation rules. For example, the title is required and must be a string, while the status can only be 'Pending' or 'Completed'. The createdDate defaults to the current date and time when a new task is created.
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the Task model based on the defined schema. This allows us to import and use the Task model in other parts of the application, such as in controllers and routes, to perform CRUD operations on tasks in the MongoDB database.

module.exports = mongoose.model('Task', taskSchema);
