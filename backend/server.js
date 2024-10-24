const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
