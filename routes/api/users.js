const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users/
// @desc    Register user
// @access  Public
router.post(
  '/',
  // Check validator middleware that checks whether the req.body params conform to the rules specified below
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Please enter a password with a minimum of 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    // catching all the errors thrown by the check validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // returning the response as bad request along with array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get user's gravatar based on the user's email
      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating - don't want NSFW/L pics
        d: 'mm' // 'mm' - a default
      });

      // Creating a new instance of the user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // saving the user in the DB
      await user.save();

      // Return jsonwebtoken - necessary for logging in the user after registration
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
