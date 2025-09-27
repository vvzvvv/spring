const { postAddPatient } = require("../../models/addPatientQuery");
const { authenticateTokenDoctor } = require('../../authenticateToken');

module.exports = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const doctorId = await authenticateTokenDoctor(token);

    const { userId } = req.body;

    try {
        const patients = await postAddPatient(doctorId, userId);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '환자 추가 실패' });
    }
};
