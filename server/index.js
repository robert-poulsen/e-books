const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');



// Ініціалізація додатка
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

bookRoutes(app);

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Запуск сервера
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




