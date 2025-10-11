const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const db = require('../../models/index');
const responseMessage = require('../../constants/responseMessage');
const statusCode = require('../../constants/statusCode');

dotenv.config();

const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        // user 데이터베이스에서 존재하는 환자 이메일인지 확인
        const findPatient = await db.user.findOne({ where: {email: email} });
        
        // doctor 데이터베이스에서 존재하는 의사 이메일인지 확인
        const findDoctor = await db.doctor.findOne({ where: {email: email} });
        
        // 환자, 의사 둘다 찾지 못한 경우
        if (findPatient === null && findDoctor === null) {
            return res.status(statusCode.NOT_FOUND).send({message: responseMessage.WRONG_INPUT});
        }

        // 환자가 로그인한 경우
        if (findPatient) {
            // 패스워드 일치 여부 확인
            const isPasswordValid = await bcrypt.compare(password, findPatient.password);
            if (!isPasswordValid) {
                return res.status(statusCode.UNAUTHORIZED).send({message: responseMessage.WRONG_INPUT});
            }

            // 토큰 생성하고 응답에 토큰 담아서 보내줌
            const secretKey = process.env.MY_SECRET;
            const token = jwt.sign({userId: findPatient.user_id, user: "patient" }, secretKey);
            
            return res.status(statusCode.OK).send({
                message: responseMessage.LOGIN_SUCCESS,
                token: token,
                user: "patient"
            });
        }

        

        // 의사가 로그인한 경우
        if (findDoctor) {
            // 패스워드 일치 여부 확인
            const isPasswordValid = await bcrypt.compare(password, findDoctor.password);
            if (!isPasswordValid) {
                return res.status(statusCode.UNAUTHORIZED).send({message: responseMessage.WRONG_INPUT});
            }

            // 토큰 생성하고 응답에 토큰 담아서 보내줌
            const secretKey = process.env.MY_SECRET;
            const token = jwt.sign({doctorId: findDoctor.doctor_id, user: "doctor" }, secretKey);
            
            return res.status(statusCode.OK).send({
                message: responseMessage.LOGIN_SUCCESS,
                token: token,
                user: "doctor"
            });
        }
        
    } catch(err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            message: responseMessage.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = login;