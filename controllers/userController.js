const UserTable = require('../models/User');

const getUser = async (req, res) => {
  try {
    const user = await UserTable.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Failed to get user', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUser,
};
