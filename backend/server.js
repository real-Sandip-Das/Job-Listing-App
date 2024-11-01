const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const rateLimitMiddleware = require('./middlewares/rateLimitMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(rateLimitMiddleware);

const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});