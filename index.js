// Dependencies
const express = require('express');
require('dotenv').config({path: './config/.env'});

// Database Connection
require('./db/mongo-db')();

// Initializing Express server
const app = express();

// Dependencies Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send(`

        Welcome to Koda Url
        /api/users
    
    `);
});
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/auth'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`App running on port ${PORT}`));
