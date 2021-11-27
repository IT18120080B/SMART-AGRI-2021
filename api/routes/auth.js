const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Return user
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { email, password, username, name, dob, location, gender, photo } =
    req.body;

  // Simple validation
  if (!email || !password || !username) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    return res.status(400).json({ msg: 'Please enter a valid email' });
  } else {
    try {
      // Check for existing user
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create new user
      user = new User({
        email,
        password,
        username,
        name: name ? name : '',
        photo,
        dob,
        location,
        gender,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user
      const data = await user.save();
      console.log(data);
      res.json(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

// @route   GET api/auth/user/:id
// @desc    Get user data
// @access  Private
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    return res.json(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});



module.exports = router;
