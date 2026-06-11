const {putAgreementList} = require("../../models/myPageQuery");

module.exports = async (req, res) => {
    try {
        const {medicine_agreement, sleep_agreement, exercise_agreement, test_agreement} = req.body;
        const userId = req.userId;
    
        const result = await putAgreementList(userId, medicine_agreement, sleep_agreement, exercise_agreement, test_agreement);
        
        res.status(200).json(result);
    }
    catch(err) {
        console.error(err);
		return res.status(500).json({ message: "동의 정보 저장 중 오류 발생" });
    }
};