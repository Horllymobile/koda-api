const { Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 250
    },
    password: {
        type: String,
        required: true,
        maxlength: 512
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateToken = function() {
    return jwt.sign({id: this.id, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY);
}

module.exports = model('User', userSchema);