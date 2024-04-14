const User = require("../Models/userModal");
const { generatToken } = require("../../../core/config/jwtToken")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../../utils/validateMongoDbId");
const { generatRefreshToken } = require("../../../core/config/generateRefreshToken")
const jwt = require("jsonwebtoken")

// ? for created new User
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

// ? for Login Controller
const loginCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {

        const refreshToken = await generatRefreshToken(findUser?.id);
        const updatedUser = await User.findByIdAndUpdate(
            findUser.id, {
            refreshToken: refreshToken,
        },
            {
                new: true
            }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            token: generatToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials")
    }
});

// ? for Get All Users
const getAllUsers = asyncHandler(async (req, res) => {

    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error)
    }
});
// ? for Get User By Id
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDbId(id);
        const getById = await User.findById(id);
        if (!getById) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(getById);
    } catch (error) {
        res.status(400).json({ message: "Error fetching user by ID", error: error.message });
    }
});

// ? for Updated User By Id
const updateUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)

    const updateById = await User.findByIdAndUpdate(id, {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
    }, { new: true })
    res.json(updateById)
});

// ? for Deleted User By Id
const deleteUserById = asyncHandler(async (req, res) => {



    try {
        const { id } = req.params;
        validateMongoDbId(id)
        const deleteById = await User.findByIdAndDelete(id);
        res.json(
            deleteById
        );
    } catch (error) {
        throw new Error(error);
    }
});
//? for block a user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {

        const block = await User.findByIdAndUpdate(id, {

            isBlocked: true
        }
            , {
                new: true,
            });
        res.json({ messege: "blocked" })
    } catch (error) {
        throw new Error(error)
    }

})


//? for unBlock a user
const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {

        const unblock = await User.findByIdAndUpdate(id, {

            isBlocked: false
        },
            {
                new: true,
            }
        );
        res.json({ messege: "unblocked" })
    } catch (error) {
        throw new Error(error)
    }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ error: "No Refresh Token In Cookies" });
    }

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(404).json({ error: 'No user found with the provided refresh token' });
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err || user.id !== decoded.id) {
                return res.status(401).json({ error: "Invalid or expired refresh token" });
            }
            const accessToken = generateToken(user._id); // Assuming generateToken is defined elsewhere
            return res.json({ user, accessToken });
        });
    } catch (error) {
        console.error("Error handling refresh token:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

//? for logOut 
const logOut = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No Refresh Token in cookie");
    }
    const refreshToken = cookie.refreshToken;
    
    // Find the user by refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
        // If no user found, clear the cookie and send 204 No Content response
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }
    
    // Update the user's refresh token to empty string
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

    // Clear the refreshToken cookie and send 204 No Content response
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    return res.sendStatus(204);
});


module.exports = { createUser, loginCtrl, getAllUsers, getUserById, deleteUserById, updateUserById, blockUser, unBlockUser, handleRefreshToken, logOut };
