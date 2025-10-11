const responseMessage = require('../../constants/responseMessage');
const statusCode = require('../../constants/statusCode');
const db = require('../../models/index');

const emailCheck = async (req, res) => {
    try {
        const { email } = req.body;
        // 이미 등록된 환자인지 확인
        const findUser = await db.user.findOne({ where: { email: email }});

        // 이미 등록된 의사인지 확인
        const findDoctor = await db.doctor.findOne({ where: { email: email }});

        // 기존 등록된 이메일인 경우
        if (findUser || findDoctor) {
            return res.status(statusCode.CONFLICT).send({
                message: responseMessage.NON_AVAILABLE_EMAIL
            });
        }
        
        // 기존 등록된 이메일이 아닌 경우
        res.status(statusCode.OK).send({
            message: responseMessage.AVAILABLE_EMAIL
        });
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            message: err.message
        });
    }
}

module.exports = emailCheck;