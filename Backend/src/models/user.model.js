const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },  
    email: {
        type: String,
        required: true,
        unique: true   // only unique email addresses allowed ek email se ek acoount
    },
    password: {
        type: String,
    
    }
}, {
    timestamps: true  // createdAt and updatedAt fields automatically managed by Mongoose
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;