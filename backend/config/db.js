// Importing mongoose to connect to MongoDB and setServers from dns/promises to specify DNS servers for better reliability in resolving MongoDB Atlas cluster addresses.
const mongoose = require('mongoose');
const { setServers } = require('node:dns/promises');
setServers(['8.8.8.8', '1.1.1.1']);

// Function to connect to MongoDB using the connection string from environment variables. It uses async/await for asynchronous operations and try/catch for error handling. If the connection is successful, it logs the host of the connected database. If there's an error, it logs the error message and exits the process with a failure code.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Exporting the connectDB function so it can be imported and used in other parts of the application, such as in the server.js file to establish a database connection when the server starts.
module.exports = connectDB;
