const diaryQuery = require('../../models/diaryQuery');
const { authenticateToken } = require("../../authenticateToken");

module.exports = async (req, res) => {
    const { date } = req.params;

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const userID = await authenticateToken(token);

    try {
        const entry = await diaryQuery.getDiaryEntry(date, userID);

        var diary = {};
        if (Object.keys(entry).length != 0) {
            diary = entry.get(0);
            if (diary.photo) {
                diary.photo = `${diary.photo}`;
            }
            return res.status(200).json({ diary });
        } else {
            return res.status(200).json({ diary });
        }
    } catch (error) {
        console.error('일기 불러오기 중 오류 발생:', error);
        res.status(500).json({ message: '일기 항목을 가져오는 중 오류 발생', error: error.message });
    }
};