const boardQuery = require('../../models/boardQuery');
const { authenticateToken } = require("../../authenticateToken");

module.exports = async (req, res) => {
    const { userID } = req.params;

    try {
        const userInfo = await boardQuery.getUserInfo(userID);
        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Error in userInfo:', error);
        res.status(500).json({ message: 'Error in userInfo:', error: error.message });
    }
};