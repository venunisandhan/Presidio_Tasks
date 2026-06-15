
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, 'Name is required'],
            trim : true,
        },
        email : {
            type : String,
            required : [true, 'Email is required'],
            unique : true,
            lowercase : true,
            trim : true,
        },
        department : {
            type : String,
            required : [true, 'Department is required'],
        },
        role : {
            type : String,
            default : 'Employee',
        },
        salary : {
            type : Number,
            required : [true, 'Salary is required'],
            min : [0, 'Salary cannot be negative'],
        },
    },
    {
        timestamps : true,
    }

);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
