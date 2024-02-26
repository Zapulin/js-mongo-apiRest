const express = require('express');
require('dotenv').config();
const connect = require('./database/connect');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connect.createConnection();

app.use('/api/v1/auth/', require('./routes/authRoutes'))
app.use('/api/v1/question/', require('./routes/questionsRoutes'))

app.listen(process.env.PORT, function() {
    console.log('Server start!', 
        `Example app listening on port ${process.env.PORT}!`);
});