const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { boolean } = require('joi');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide a firstName'],
    },
    lastname: {
        type: String,
        required: [true, 'Please provide a lastName'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    cart: {
        type: [String], // or specify the type of items in the array, e.g., [mongoose.Schema.Types.ObjectId]
        default: [],
    },

    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }],
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    refreshToken: {
        type: String
    },
}, {
    timestamps: true,
});



const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
