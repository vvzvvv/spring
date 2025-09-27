const {putAgreementList} = require("../../models/myPageQuery");
const { authenticateToken } = require("../../authenticateToken");

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.MY_SECRET;

module.exports = async (req, res) => {
    try {
        const {medicine_agreement, sleep_agreement, exercise_agreement, test_agreement} = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        const decode = jwt.verify(token, secretKey);
        const userID = decode.userId;
    
        const result = await putAgreementList(userID, medicine_agreement, sleep_agreement, exercise_agreement, test_agreement);
        
        res.status(200).json(result);
    }
    catch(err) {
        console.error(err);
    }
}