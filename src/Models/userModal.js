const mongoose = require('mongoose')
const bcrpty = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
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
    role:{
      type:String,
      enum: ["admin","user"],
      default:"user"
    }
  
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next){
  const salt =await bcrpty.genSaltSync(10);
  this.password = await bcrpty.hash(this.password , salt);

});

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
