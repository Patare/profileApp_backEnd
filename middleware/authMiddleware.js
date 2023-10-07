const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, 'secret');
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error('Failed to authenticate', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticate;
