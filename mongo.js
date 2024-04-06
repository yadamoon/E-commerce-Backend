const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/${process.env.userDB}`)
    .then(() => {
        console.log("mongodb connected")
    })
    .catch(() => {
        console.log("failed")
    })

const newSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
        

    },
    [password]: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection", newSchema)


module.exports = collection;