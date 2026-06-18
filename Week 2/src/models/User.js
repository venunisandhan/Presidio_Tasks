
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name : {
        type :String ,
        required : [true, 'Name is required'] ,
        trim : true ,
        },

        email : {
            type : String ,
            required : [true, 'Email is required'] ,
            unique : true ,
            trim : true ,
            lowercase : true ,
        },

        password : {
            type : String ,
            required : [true, 'Password is required'] ,
            min : [8, 'Password should be of mininum 8 characters'] ,
            select : false ,
        },

        role : {
            type : String ,
            enum : ['USER', 'ADMIN'] ,
            default : 'USER' ,
        },
    },
    {
        timestamps : true ,
    }
);

//pre-save hook : runs before actual save happens

userSchema.pre('save', async function (next) {
    
    if(!this.isModified('password'))
    {
        return ;
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.comparePassword = async function(candidatePassword) {
    
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User ;