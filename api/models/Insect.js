const mongoose = require('mongoose');

const InsectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 22,
      unique: true,
    },
    howtoManage: {
      type: String,
      required: true,
      max: 50,
      
    },
    cropType: {
      type: String,
      required: true,
      min: 50,
    },
    
    
  },
  { timestamps: true },
);

module.exports = mongoose.model('insect', InsectSchema);
