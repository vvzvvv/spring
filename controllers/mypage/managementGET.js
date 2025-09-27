const {getManagementList} = require("../../models/myPageQuery");

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.MY_SECRET;

module.exports = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        const decode = jwt.verify(token, secretKey);

        const patientId = decode.userId;

        const result = await getManagementList(patientId);
        
        res.status(200).json(result);
    }
    catch(err) {
        console.error(err);
    }
}