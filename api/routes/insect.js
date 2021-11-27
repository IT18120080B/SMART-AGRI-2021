const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Insect = require('../models/Insect');
//const insect = require('../models/Insect');
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
router.post('/addInsect', async (req, res) => {
  const { name, howtoManage, cropType} = req.body;

  // Simple validation
  if (!name || !howtoManage || !cropType ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    
    

    // Create new user
    const insectOBj = new Insect({
      name,
      howtoManage,
      cropType,
    });

   
    // Save user
    const data = await insectOBj.save();
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
    const insect = await Insect.find({name:req.params.name});
    const result={
      name:insect[0].name,
      howtoManage:insect[0].howtoManage,
      cropType:insect[0].cropType,
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
