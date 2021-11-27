const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    fertilizer: {
      type: String,
      required: true,
      max: 50,
      
    },
    fertilizerAmount: {
      type: String,
      required: true,
      min: 50,
    },
    waterAmount: {
      type: String,
      required: true,
      max: 50
    },
    
  },
  { timestamps: true },
);

module.exports = mongoose.model('plant', PlantSchema);
