require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blog')
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Database connection
const dbUrl = process.env.MONGO_URI;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });


// Home Route 
app.get('/', (req, res) => {
    return res.send("Welcome to the Blog App")
})

// My Routes
app.use('/api',blogRoutes)

// Middlewares
app.use(bodyParser.json())

// port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})