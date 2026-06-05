const { getTotalSleepTime } = require('../../models/sleepQuery');

module.exports = async (req, res) => {
    try {
        const userId = req.userId;
        const totalSleepTime = await getTotalSleepTime(userId);
        res.status(200).json(totalSleepTime);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
