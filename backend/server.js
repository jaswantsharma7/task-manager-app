require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();

app.use(cors({
  origin: [
    "https://student-app-delta-eosin.vercel.app",
    "http://localhost:3000",
  ]
}));

app.use(express.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
