const { cancelRequest } = require('../../models/doctorMainQuery');

module.exports = async (req, res) => {
    try {
        const doctorId = req.doctorId;
        const { userId } = req.body;

        const result = await cancelRequest(doctorId, userId);

        if (result > 0) {
            res.json({ success: true, message: '요청이 취소되었습니다.' });
        } else {
            res.status(404).json({ success: false, message: '해당 요청을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('Error cancelling request:', error);
        res.status(500).json({ success: false, message: '요청 취소에 실패했습니다.' });
    }
};
