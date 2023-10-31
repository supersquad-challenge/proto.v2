module.exports = {
  getAllUsers: async (req, res) => {
    try {
      res.status(200).json({
        message: 'All users',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
