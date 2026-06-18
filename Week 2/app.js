
const express = require('express');

const employeeRoutes = require('./src/routes/employeeRoutes');
const logger = require('./src/middlewares/logger');
const errorHandler = require('./src/middlewares/errorHandler');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(express.json());

app.use(logger);

app.use('/auth', authRoutes);

app.use('/employees',employeeRoutes);

app.get('/health' , (req , res ) =>{
    res.status(200).json({
        status : 'OK' ,
        timestamp : new Date().toISOString() ,
    });
});

app.use((req , res ) => {
    res.status(404).json({
        success : false ,
        message : 'Route not found' ,
    });
});

app.use(errorHandler);

module.exports = app ;