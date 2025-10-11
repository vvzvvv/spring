const bcrypt = require('bcrypt');
const db = require('../../models/index');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');

// 토큰을 위한 모듈
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.MY_SECRET;


const changePassword = async function (req, res) {
    const { newPassword, doubleCheckNewPassword } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    
    // 비밀번호 더블체크 로직
    if (newPassword !== doubleCheckNewPassword) {
        return res.status(statusCode.BAD_REQUEST).send(responseMessage.DIFFRERENT_PASSWORD);
    }

    try {
        
        // 토큰으로부터 이메일 추출
        const decode = jwt.verify(token, secretKey);
        const email = decode.email;

        const user = decode.user;       // 환자인지 의사인지 구분

		const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // 환자 이메일인 경우
        if (user == "patient") {
            const patient = await db.user.update(
                { password: hashedNewPassword }, 
                {
                    where: { email },
                },
            );
        }
        // 의사 이메일인 경우
        else {
            const doctor = await db.doctor.update(
                { password: hashedNewPassword },
                {
                    where: { email },
                },
            );
        }

        // 비밀번호 변경 후 토큰 데이터베이스에 저장되어 있는 토큰 삭제
        const passwordToken = await db.passwordToken.findOne({ where: { email: email } });

        await passwordToken.destroy();

        res.status(statusCode.OK).send({
            message: responseMessage.SUCCESS_UPDATE_PASSWORD,
            token: token
        });
    } catch (error) {
        res.status(500).send({ message: responseMessage.FAIL_UPDATE_PASSWORD });
    }
};

module.exports = changePassword;