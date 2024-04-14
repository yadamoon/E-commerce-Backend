const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true , 'Please provide a  name']
  },
  description: {
    type: String,
    required: [true , 'Please provide a  description']
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
