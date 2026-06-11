const {putManagementList, postManagementList, deleteManagementList} = require("../../models/myPageQuery");

module.exports = async (req, res) => {
    try {
        const {flag, requestID, doctorID} = req.body;
        const userID = req.userId;

		if (!['toAccept', 'toRefuse', 'toDelete'].includes(flag)) {
            return res.status(400).json({ message: 'Invalid flag value' });
        }
        
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
};