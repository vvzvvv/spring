const { getSleepReportByDate } = require('../../models/sleepQuery');

module.exports = async (req, res) => {
    try {
        const { date } = req.params;
        const userId = req.userId;
        const sleepDataByDate = await getSleepReportByDate(date, userId) || [];
        
        res.status(200).json(sleepDataByDate);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
