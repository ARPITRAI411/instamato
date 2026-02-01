const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },  
    contactName: {
        type: String,
        required: true,
    },
   phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true  // createdAt and updatedAt fields automatically managed by Mongoose
})
const foodPartnerModel = mongoose.model('foodPartner', foodPartnerSchema);  

module.exports = foodPartnerModel;