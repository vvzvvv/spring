const { getRequestList } = require('../../models/doctorMainQuery');

module.exports = async (req, res) => {
    try {
        const doctorId = req.doctorId;

        const requests = await getRequestList(doctorId);
        res.json(requests);
    } catch (error) {
        console.error('Error fetching request list:', error);
        res.status(500).json({ error: '요청 목록을 가져오는데 실패했습니다.' });
    }
};