const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const db = require('../../models/index');
const smtpTransport = require("../../emailVerificationConfig");
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');

const secretKey = process.env.MY_SECRET;

const findPassword = async function (req, res) {

    const { email } = req.body;

    try {
        /* 등록된 이메일인지 확인 */

        // user 데이터베이스에서 존재하는 환자 이메일인지 확인
        const findPatient = await db.user.findOne({ where: { email: email } });
        // doctor 데이터베이스에서 존재하는 의사 이메일인지 확인
        const findDoctor = await db.doctor.findOne({ where: { email: email } });

        // 환자, 의사 둘다 찾지 못한 경우
        if (findPatient === null && findDoctor === null) {
            return res.status(statusCode.NOT_FOUND).send({ message: responseMessage.NOT_FOUND_EMAIL });
        }

        let token = '';

        // 환자 이메일인 경우
        if (findPatient) {
            token = jwt.sign({ email: email, user: "patient" }, secretKey);
        }

        // 의사 이메일인 경우
        if (findDoctor) {
            token = jwt.sign({ email: email, user: "doctor" }, secretKey);
        }
        
        await db.passwordToken.create({ email, token });     // db에 resetToken 모델 생성해야 함

        const resetLink = `http://localhost:3000/user/password/change?token=${token}`;      // 서버 url 수정(.env파일 사용)

        const emailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: "[spring] 비밀번호 초기화 링크",
            text: `비밀번호 초기화 링크: ${resetLink}`
        };
        
        await smtpTransport.sendMail(emailOptions);

        res.status(statusCode.OK).send({
            message: responseMessage.SEND_PASSWORD_RESET_LINK_SUCCESS,
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({message: responseMessage.SEND_PASSWORD_RESET_LINK_FAIL});
    } finally {
        smtpTransport.close();
    }
};

module.exports = findPassword;