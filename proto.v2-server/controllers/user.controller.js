const UserInfo = require('../models/user.model');

module.exports = {
  registerUserName: async (req, res) => {
    try {
      const { userInfoId, nickname } = req.body;

      const updateUser = await UserInfo.findByIdAndUpdate(
        userInfoId,
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
          userInfoId: updateUser._id,
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
      const { userInfoId, address } = req.body;

      const updateUser = await UserInfo.findByIdAndUpdate(
        userInfoId,
        { $set: { address: address } },
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
          userInfoId: updateUser._id,
          address: updateUser.address,
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
      const users = await UserInfo.find();

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
      const userInfoId = req.params.userInfoId;

      const userInfo = await UserInfo.findById(userInfoId);

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
      const { email, nickname, address, timezone } = req.body;

      const userInfo = await UserInfo.findOne({ email: email });

      if (userInfo) {
        return res.status(409).json({
          error: 'User already exists',
        });
      }

      const userRegisterData = {
        email,
        nickname,
        address,
        timezone,
      };

      const userData = await UserInfo.create(userRegisterData);

      res.status(200).json({
        message: 'User registered',
        userInfoId: userData._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
