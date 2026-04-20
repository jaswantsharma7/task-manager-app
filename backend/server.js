require('dotenv').config();
const express = require('express');
app.use(cors({
  origin: [
    "https://task-manager-app-zeta-green.vercel.app/",
    "http://localhost:3000",
    "http://localhost:5000"
  ]
}));
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
