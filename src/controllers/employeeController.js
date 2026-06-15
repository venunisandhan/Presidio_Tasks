
const Employee = require('../models/Employee');

const createEmployee = async ( req , res , next ) =>{

    try
    {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            success : true ,
            data : employee ,
        });
    }
    catch(error)
    {
        next(error); //passes to errorHandler
    }
}

const getAllEmployees = async ( req , res , next ) => {

    try
    {
        const employees = await Employee.find();

        res.status(201).json({
            success : true ,
            count : employees.length ,
            data : employees ,
        })
    }
    catch(error)
    {
        next(error);
    }
};

const getEmployeeById = async ( req , res , next ) => {

    try
    {
        const employee = await Employee.findById(req.params.id);

        if(!employee)
        {
            return res.status(400).json({
                success : false ,
                message : `Employee with id ${req.params.id} not found` ,
            });
        }

        res.status(200).json({
            success : true ,
            data : employee ,
        });
    }
    catch(error)
    {
        next(error);
    }
};

const updateEmployee = async ( req , res , next ) => {

    try{
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true ,
                runValidators : true ,
            }
        );

        if(!employee)
        {
            return res.status(400).json({
                success: false ,
                message : `Employee wiht Id ${req.params.id} not found`;
            });
        }

        return res.status(200).json({
            success : true ,
            data : employee ,
        });
    }
    catch(error)
    {
        next(error);
    }
}

const deleteEmployee = async ( req , res , next ) => {
    
    try
    {
        const employee = Employee.findByIdAndDelete(req.params.id);

        if(!employee)
        {
            return res.status(400).json({
                success : false ,
                message : ` Employee with ID ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            success : true ,
            message : 'Employee with Id ${req.params.id} deleted' ,
            data : {} ,
        });
    }
    catch(error)
    {
        next(error);
    }
};

module.exports = {
    createEmployee ,
    getAllEmployees ,
    getEmployeeById ,
    updateEmployee ,
    deleteEmployee ,
};