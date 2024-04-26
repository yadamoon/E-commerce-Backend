const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please provide a product name'],
    },
    brand: {
        type: String,
        required: [true, 'Please provide a brand name'],
    },
    modelNumber: {
        type: String,
        required: [true, 'Please provide a model number'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    releaseDate: {
        type: Date,
        required: [true, 'Please provide a release date'],
    },
    warrantyInformation: String,
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
    },
    weight: Number,
    display: {
        size: Number,
        resolution: String,
        type: String,
    },
    processor: {
        type: String,
        speed: Number,
        cores: Number,
    },
    memory: {
        ram: Number,
        storageCapacity: Number,
    },
    operatingSystem: String,
    battery: {
        capacity: Number,
        type: String,
    },
    connectivity: {
        wifi: Boolean,
        bluetooth: Boolean,
        nfc: Boolean,
    },
    ports: [String],
    camera: {
        front: {
            resolution: String,
            features: [String],
        },
        rear: {
            resolution: String,
            features: [String],
        },
    },
    images: {
        type: [{
            type: String,
            validate: {
                validator: function(images) {
                    return images.length >= 2 && images.length <= 4;
                },
                message: 'Please provide between 2 and 4 images',
            }
        }],
        default: [],
    },
    sensors: [String],
    biometricFeatures: [String],
    waterResistance: {
        type: Boolean,
        default: false,
    },
    wirelessCharging: {
        type: Boolean,
        default: false,
    },
    specialFeatures: [String],
    packageContents: [String],
    price: Number,
    availability: String,
    userRatings: {
        type: Number,
        default: 0,
    },
    userReviews: [String],
    compatibleAccessories: [String],
    regulatoryCertifications: [String],
}, {
    timestamps: true,
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
