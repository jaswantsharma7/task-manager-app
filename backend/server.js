// Importing necessary modules and configurations to set up the Express server. The dotenv module is used to load environment variables from the .env file, express is the web framework for handling HTTP requests, cors is used to enable Cross-Origin Resource Sharing, and connectDB is a custom function to establish a connection to the MongoDB database. The taskRoutes module contains the route definitions for handling task-related API endpoints.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Establishing a connection to the MongoDB database using the connectDB function. This ensures that the server can interact with the database to perform CRUD operations on tasks when handling API requests.
connectDB();

// Creating an instance of the Express application to set up middleware and routes. This instance will be used to define how the server responds to different HTTP requests and to integrate the task-related routes into the application.
const app = express();

// Setting up middleware for the Express application. The cors middleware allows the server to accept requests from different origins, which is essential for frontend applications hosted on different domains. The express.json() middleware parses incoming JSON payloads, making it easier to handle data sent in the body of HTTP requests. The app.use() method is used to apply these middleware functions to the Express application, ensuring that they are executed for every incoming request before reaching the route handlers.

// We can use defualt app.use(cors()) to accept requests from anywhere
app.use(cors({
  origin: "https://task-manager-app-phi-tawny.vercel.app/"
}));

app.use(express.json());
app.use('/api/tasks', taskRoutes);

// Starting the server and listening on the specified port. The PORT variable is obtained from environment variables, allowing for flexibility in different deployment environments. If the PORT variable is not set, it defaults to 5000. The app.listen() method starts the server and logs a message to the console indicating that the server is running and on which port it is listening for incoming requests.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
