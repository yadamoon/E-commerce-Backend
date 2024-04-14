const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true , 'Please provide a  title']
  },
  description: {
    type: String,
    required: [true , 'Please provide a  description']
  },
  price: {
    type: Number,
    required: [true , 'Please provide a  price'],
    min: 0
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  brand: {
    type: String,
    required: [true , 'Please provide a  brand']
  },
  imageUrls: [{
    type: String,
    required: [true , 'Please provide a  imgeUrl']
  }],
  stockQuantity: {
    type: Number,
    required: [true , 'Please provide a  StockQuantity'],
    min: 0
  }
  
},{
    timestamps:true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
