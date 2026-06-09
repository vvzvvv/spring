const { getMyPatients } = require('../../models/doctorMainQuery');

module.exports = async (req, res) => {
    try {
        const doctorId = req.doctorId;

        const { searchInput } = req.body;

        const patients = await getMyPatients(doctorId, searchInput);

        res.json(patients);
    } catch (error) {
        console.error('Error searching patients:', error);
        res.status(500).json({ error: '환자 검색에 실패했습니다.' });
    }
};