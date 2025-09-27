const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { getChart } = require("../../models/prescriptionQuery");

module.exports = async (req, res) => {
    try {
        const {userID} = req.params;
        const result = await getChart(userID);
        res.status(200).json(result);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Error in Chart:', error: err.message });
    }
}

