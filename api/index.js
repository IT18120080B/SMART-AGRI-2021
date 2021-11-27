const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const plant = require('./routes/plant');
const insect = require('./routes/insect');
const PORT = process.env.PORT || 8800;

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log('Connected to MongoDB');
  }
);

app.use(express.json());

// routes
app.use('/api/auth', auth);
app.use('/api/plant', plant);
app.use('/api/insect', insect);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
