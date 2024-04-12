const User =require("../Models/userModal");
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")


const authMiddleware = asyncHandler(async (req,res,next)=>{
let token;
if(req?.headers?.authorization?.startWith("Bearer")){
    token =req.headers.authorization.split(" ")[1];
    try {
        if(token){
            const decoded = jwt.verify(token.processs.env.JWT_SECRET);
            const user = await User.findById(decoded?.id)
            req.user =user;
            next();
        }
        
    } catch (error) {
        throw new Error("Not Authorized token expired , please login again")
    }
}
else{
    throw new Error("there is no token attached to header")
}
})

const isAdmin = asyncHandler(async (req,res,next)=>{

    const {email}= req.user;
    try{
        const adminUser = await User.findOne(email)

        if(adminUser.role !== "Admin"){
            console.log("You are not Admin");
 }
        else{
            next();
        }

    }catch(error){
        throw new Error(error)
    }
}
)