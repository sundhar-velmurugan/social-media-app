const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth/
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth/
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/',
  // Check validator middleware that checks whether the req.body params conform to the rules specified below
  [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // catching all the errors thrown by the check validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // returning the response as bad request along with array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          // mongoose uses an abstraction over _id property and uses id key for ObjectId
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.err(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
