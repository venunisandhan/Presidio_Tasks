
const validateEmployee = (req, res, next) =>{

    const {name,email,department,salary} = req.body;

    const error = [];

    if(!name || name.trim()==='')
    {
        errors.push('Name is required');
    }

    if(!deparment || department.trim()==='')
    {
        errors.push('Department is required');
    }

    if(salary === undefined || salary === null)
    {
        errors.push('Salary is required');
    }
    else if(typeof salary !== 'number')
    {
        errors.push('Salary must be a number');
    }

    if(errors.length > 0)
    {
        return res.status(400).json({
            
            success : false ,
            message : 'Validation check failed' ,
            errors ,
        });
    }

    next();
};

module.exports = { validateEmployee };