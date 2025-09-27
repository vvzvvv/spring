const { getPatientSearch, getRequestStatus, getPatientManagement } = require("../../models/addPatientQuery");
const { authenticateTokenDoctor } = require('../../authenticateToken');

module.exports = async (req, res) => {
    try {
        const searchInput = req.params.searchInput;

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const doctorId = await authenticateTokenDoctor(token);

        const patients = await getPatientSearch(searchInput);
        
        const result = await Promise.all(patients.map(async (patient) => {
            const userId = patient.user_id;

            const requestStatus = await getRequestStatus(doctorId, userId);
            const patientManagement = await getPatientManagement(doctorId, userId);
            
            let buttonType = "추가하기";
            if (patientManagement) {
                buttonType = "추가완료";
            } else if (requestStatus && requestStatus.is_accepted == 0) {
                buttonType = "승인 대기중";
            }

            return {
                email: patient.email,
                name: patient.name,
                userId: patient.user_id,
                buttonType
            };
        }));

        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
