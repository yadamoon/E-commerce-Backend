const User = require("../Models/userModal");
const { generatToken } = require("../config/jwtToken")
const asyncHandler = require("express-async-handler");
const  validateMongoDbId  = require("../utils/validateMongoDbId");


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
})
// ? for Get User By Id
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {
        const getById = await User.findById(id);
        res.json(
            getById
        );
    } catch (error) {
        throw new Error(error);
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
})


// ? for Deleted User By Id
const deleteUserById = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongoDbId(id)
    try {
        const deleteById = await User.findByIdAndDelete(id);
        res.json(
            deleteById
        );
    } catch (error) {
        throw new Error(error);
    }
});

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
})


module.exports = { createUser, loginCtrl, getAllUsers, getUserById, deleteUserById, updateUserById  , blockUser, unBlockUser};
