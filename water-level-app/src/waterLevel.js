const mongoose = require('mongoose');

const WaterLevelSchema = new mongoose.Schema({
  water_level: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('WaterLevel', WaterLevelSchema);
