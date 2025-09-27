const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { getChart } = require("../../models/prescriptionQuery");

module.exports = async (userID) => {
    try {

        const result = await getChart(userID);
        // .then(data => {
        //     console.log(JSON.stringify(data, null, 2));
        // }).catch(error => {
        //     console.error(error);
        // });

        return result;
    }
    catch(err) {
        console.error(err);
    }
}

