import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import analyzeRoutes from './routes/analyze.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analyze', analyzeRoutes);

const PORT = process.env.PORT || 5000;

// Database Connection
if(process.env.MONGODB_URI && process.env.MONGODB_URI !== "mongodb+srv://<username>:<password>@cluster.mongodb.net/ai_editor?retryWrites=true&w=majority") {
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.log('MongoDB URI not configured. Running without DB connection.');
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
