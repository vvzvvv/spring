const { createSleepReport } = require("../../models/sleepQuery");

module.exports = async (req, res) => {
    try {
        const { sleep_date, wake_date, sleep_rate, sleep_duration, start_sleep_time, end_sleep_time } = req.body;
        
		const userID = req.userId;
        const report = await createSleepReport(sleep_date, wake_date, sleep_rate, sleep_duration, start_sleep_time, end_sleep_time, userID);
        
        if (report) {
            res.status(200).send({
                message: '수면을 기록하였습니다.'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};