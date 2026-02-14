const dotenv = require('dotenv');
const db = require('../../models/index');
const responseMessage = require('../../constants/responseMessage');
const statusCode = require('../../constants/statusCode');

dotenv.config();


const join = async (req, res) => {
    try {
        const { name, email, password, passwordCheck } = req.body;

        // 비밀번호 일치여부 검증 로직
        if (password !== passwordCheck) {
            return res.status(statusCode.CONFLICT).send({message: responseMessage.DIFFRERENT_PASSWORD});
        }

        // 새로운 사용자 회원가입
        else {
            const newUser = await db.user.create({
                name: name,
                email: email,
                password: password
            });

            return res.status(statusCode.OK).send({ message: responseMessage.CREATED_USER });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

module.exports = join;