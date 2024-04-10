const User = require("../Models/userModal");
const {generatToken} = require("../config/jwtToken")
const asyncHandler = require("express-async-handler")

const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: "Please provide all required fields: first name, last name, email, and password" });
        }

        const newUser = await User.create({ firstname, lastname, email, password });
        res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
};

const loginCtrl = asyncHandler( async (req, res) => {
    const {email , password } = req.body;
   const findUser= await User.findOne({email});
   if(findUser && (await findUser.isPasswordMatched(password))){
    res.json({
        _id:findUser?._id,
        firstname:findUser?.firstname,
        lastname:findUser?.lastname,
        email:findUser?.email,
       token:generatToken(findUser?._id),
    });
}else{
    throw new Error("Invalid Credentials")
}
});

const getAllUsers = asyncHandler(async (req, res)=>{
    try{
        const getUsers = await User.find();
        res,json(getUsers);
    }catch(error){
throw new Error(error)
    }
})

module.exports = { createUser, loginCtrl , getAllUsers };
