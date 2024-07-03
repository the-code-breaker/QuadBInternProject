const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

// Middleware function to authenticate JWT token
const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }


  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Add user from payload
    req.user = decoded.user;

    // Check if user is admin (if needed)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ msg: 'Invalid token, authorization denied' });
    }

    if (user.isAdmin) {
      req.isAdmin = true;
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware function to check if user is admin
const adminOnly = (req, res, next) => {
    if (!req.isAdmin) {
    return res.status(403).json({ msg: 'Admin access required' });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminOnly
};
