
const errorHandler = (err , req , res , next) =>{

    console.error(err.stack);

    //Duplicate Email Errors
    if(err.code === 11000)
    {
        return res.status(400).json({
            success : false ,
            message : 'A record with that email already exists',
        });
    }

    //Mongoose Validation Errors
    if(err.name === 'ValidationError')
    {
        const errMsg = Object.values(err.errors).map((e)=>e.message);
        return res.status(400).json({
            success : false ,
            message : 'Validation error' ,
            errors : errMsg ,
        });
    }

    //Invalid MongoDB ObjectId
    if(err.name === 'CastError')
    {
        return res.status(400).json({
            success : false ,
            message : `Invalid ID format : $(err.value)`,
        });
    }

    //Fallback for all other errors
    res.status(err.statusCode || 500).json({
        success : false ,
        message : err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler ; 