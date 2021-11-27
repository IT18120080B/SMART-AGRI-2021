const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Plant = require('../models/Plant');
//const plant = require('../models/Plant');
// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
// router.post('/', async (req, res) => {
//   const { email, password } = req.body;

//   // Simple validation
//   if (!email || !password) {
//     return res.status(400).json({ msg: 'Please enter all fields' });
//   }

//   try {
//     // Check for existing user
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'User does not exist' });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Return user
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/addPlant', async (req, res) => {
  const { name, fertilizer, fertilizerAmount, waterAmount } = req.body;

  // Simple validation
  if (!name || !fertilizer || !fertilizerAmount || !waterAmount) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    
    // Create new user
    const plantOBj = new Plant({
      fertilizer,
      fertilizerAmount,
      waterAmount,
      name,
    });

   
    // Save user
    const data = await plantOBj.save();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/getInfo/:name', async (req, res) => {
  try {
    const plant = await Plant.find({name:req.params.name})
    const result={
      Name:plant[0].name,
      Fertilizer:plant[0].fertilizer,
      FertilizerAmount:plant[0].fertilizerAmount,
      WaterAmount:plant[0].waterAmount
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
