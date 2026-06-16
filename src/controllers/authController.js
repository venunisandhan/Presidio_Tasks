
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const generateToken = (userId , role) => {

    return jwt.sign(
        { userId , role },
        process.env.JWT_SECRET ,
        { expiresIn : process.env.JWT_EXPIRES_IN }
    );
};

//POST /auth/register

const register = async ( req , res , next) => {

    try {
        const { name , email , password , role } = req.body || {};

        if(!name || !email || !password ){
            return res.status(400).json({
               success : false ,
               message : ' Name , email and password are required' ,
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success : false ,
                message : 'An account with thsi email already exists' ,
            });
        }

        const user = await User.create({ name , email , password , role });

        const token = generateToken(user._id , user.role);

        res.status(201).json({
            success : true ,
            token,
            data : {
                id : user._id ,
                name : user.name ,
                email : user.email ,
                role : user.role ,
            }
        });
    }
    catch(error)
    {
        next(error);
    }
};

// POST /auth/login

const login  = async ( req , res , next) => { 

    try{
        const {email , password} = req.body ;

        if(!email || !password){
            return res.status(400).json({
                success : false ,
                message : 'Email and password are required' ,
            });
        }
        /// ('+password') overrides the 'select : false' and retrieves it
        const user = await User.findOne({ email }).select('+password');

        if(!user)
        {
            return res.status(401).json({
               success : false ,
               message : 'Invalid email or password ' ,
            });
        }
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = generateToken(user._id , user.role);

        res.status(200).json({
            success : true ,
            token ,
            data : {
                id : user._id ,
                name : user.name ,
                email : user.email ,
                role : user.role ,
            },
        });
    }
    catch(error)
    {
        next(error);
    }
};

// GET /auth/profile

const getProfile = async (req , res , next ) => {

    try{

        res.status(200).json({
            success : true ,
            data:{
            id : req.user._id,
            name : req.user.name ,
            email : req.user.name ,
            role : req.user.role ,
            createdAt : req.user.createdAt,
            },
        });
    }
    catch(error)
    {
        next(error);
    }
};

module.exports = { register , login , getProfile } ;