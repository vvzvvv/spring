const {getAgreementList} = require("../../models/myPageQuery");

module.exports = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await getAgreementList(userId);
        
        res.status(200).json(result);
    }
    catch(err) {
        console.error(err);
		return res.status(500).json({ message: "동의 정보 조회 중 오류 발생" });
    }
};