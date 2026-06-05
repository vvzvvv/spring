const {getAgreementList} = require("../../models/myPageQuery");

module.exports = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await getAgreementList(userId);
        
        res.status(200).json(result);
    }
    catch(err) {
        console.error(err);
    }
};