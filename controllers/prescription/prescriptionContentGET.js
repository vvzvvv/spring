const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { getPrescriptionContent } = require("../../models/prescriptionQuery");

module.exports = async (userID) => {
    try {
        const result = await getPrescriptionContent(userID);

        return result;
    }
    catch(err) {
        console.error(err);
    }
}