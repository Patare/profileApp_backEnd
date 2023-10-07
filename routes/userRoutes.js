const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { getUser } = require('../Controllers/userController');

const router = express.Router();

router.get('/', authenticate, getUser);

module.exports = router;
