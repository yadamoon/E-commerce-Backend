const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide a first name'],
    },
    lastname: {
        type: String,
        required: [true, 'Please provide a last name'],
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
    cart:{
        type:String,
        default:[]
    },
    address:[{type:mongoose.Schema.Types.ObjectId, ref:"Address"}],
    product:[{type:mongoose.Schema.Types.ObjectId,ref:"product"}]
}, {
    timestamps: true,
});
userSchema.pre("save" , async function (next){
  const salt = await bcrypt.genSaltSync(10);
  this.password =await bcrypt.hash(this.password , salt);
});

// Define a method to compare passwords
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
