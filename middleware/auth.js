const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    // 401 - Not Authorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify the token
  try {
    // decoding the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // assigning the decoded user object to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
