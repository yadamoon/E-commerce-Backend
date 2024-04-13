const mongoose = require("mongoose");

const validateMongoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    
    try {
        if (!isValid) {
            throw new Error("Not found or this id is not valid");
        }
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = validateMongoDbId;
