const { postAddPatient } = require("../../models/addPatientQuery");

module.exports = async (req, res) => {
    const doctorId = req.doctorId;
    const { userId } = req.body;

    try {
        const patients = await postAddPatient(doctorId, userId);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '환자 추가 실패' });
    }
};
