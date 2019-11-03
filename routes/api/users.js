const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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
  (req, res) => {
    // catching all the errors thrown by the check validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // returning the response as bad request along with array of errors
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
  }
);

module.exports = router;
