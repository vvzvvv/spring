const {putManagementList, postManagementList, deleteManagementList} = require("../../models/myPageQuery");

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.MY_SECRET;

module.exports = async (req, res) => {
    try {
        const {flag, requestID, doctorID} = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        const decode = jwt.verify(token, secretKey);

        const userID = decode.userId;
        
        var num;
        switch(flag){
            case 'toAccept' : 
                num = 2;
                await postManagementList(userID, doctorID);
                break;
            case 'toRefuse' :
                num = 1;
                break;
            case 'toDelete' :
                num = 1;
                await deleteManagementList(userID, doctorID);
                break;
        }
        const result = await putManagementList(userID, requestID, num);
        
        res.status(200).json(result);
    }
    catch(err) {
        console.error(err);
    }
}