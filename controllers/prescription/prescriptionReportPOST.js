const {postPrescriptionReport} = require("../../models/prescriptionQuery");
const {authenticateToken} = require("../../authenticateToken");

module.exports = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        let userID;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            userID = await authenticateToken(token);
        } 
        
        const {date, time, prescriptionID} = req.body;

        const data = await postPrescriptionReport(date, time, userID, prescriptionID);
        
        if(data.error){
            console.error(data.error);
            return res.status(201).json({
                status: false,
                result: data.error,
            })
        }
        return res.status(200).json({
            status: true,
            result: data
        });
    }
    catch(err) {
        console.error(err);

        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}