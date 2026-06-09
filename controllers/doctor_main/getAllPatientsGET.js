const { getMyPatients } = require('../../models/doctorMainQuery');

module.exports = async (req, res) => {
    try {
        const doctorId = req.doctorId;

        const patients = await getMyPatients(doctorId, '');

        res.json(patients);
    } catch (error) {
        console.error('Error fetching all patients:', error);
        res.status(500).json({ error: '나의 환자 목록을 가져오는 데 실패했습니다.' });
    }
};