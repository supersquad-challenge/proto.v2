const User = require('../models/user.model');

module.exports = {
  registerUserName: async (req, res) => {
    try {
      const { userId, nickname } = req.body;

      const updateUser = await User.findByIdAndUpdate(
        userId,
        { $set: { nickname: nickname } },
        { new: true }
      );

      if (!updateUser) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      res.status(200).json({
        message: 'User nickname update',
        userInfo: {
          userId: updateUser._id,
          nickname: updateUser.nickname,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  registerAddress: async (req, res) => {
    try {
      const { userId, wallet } = req.body;

      const updateUser = await User.findByIdAndUpdate(
        userId,
        { $set: { wallet: wallet } },
        { new: true }
      );

      if (!updateUser) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      res.status(200).json({
        message: 'User wallet address update',
        userInfo: {
          userId: updateUser._id,
          wallet: updateUser.wallet,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.status(200).json({
        message: 'All users',
        users: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const { userId } = req.params;

      const userInfo = await User.findById(userId);

      if (!userInfo) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      res.status(200).json({
        message: 'User info',
        userInfo: userInfo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const { email, timezone } = req.body;

      const userInfo = await User.findOne({ email: email });

      if (userInfo) {
        return res.status(409).json({
          error: 'User already exists',
        });
      }

      const userRegisterData = {
        email,
        timezone,
      };

      const userData = await User.create(userRegisterData);

      res.status(200).json({
        message: 'User registered',
        userId: userData._id,
        createdAt: userData.createdAt,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const deleteUser = await User.findByIdAndDelete(userId);

      if (!deleteUser) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      res.status(200).json({
        message: 'User deleted',
        userInfo: deleteUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
