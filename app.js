const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const guidanceRoutes = require('./routes/guidanceRoutes');
const mockInterviewRoutes = require('./routes/mockInterviewRoutes');
const connectDB = require('./config/dbConfig');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes with authentication middleware
app.use('/worko/auth',authRoutes)
app.use('/worko/user', userRoutes);
app.use('/worko/resume', resumeRoutes);
app.use('/worko/interview', interviewRoutes);
app.use('/worko/guidance', guidanceRoutes);
app.use('/worko/mockInterview', mockInterviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
