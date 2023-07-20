const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:[true, 'Full name is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        validate:[isEmail, 'Invalid Email']
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        minLength:[8, 'Password must be 8 characters']
    }
}, {timestamps:true})

// * Middleware
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value)

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords dont match')
    }
    next();
})

// this should go after 
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema)