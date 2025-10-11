const path = require('path');
const dotenv = require('dotenv');
const db = require('../../models/index');
const responseMessage = require('../../constants/responseMessage');
const statusCode = require('../../constants/statusCode');

dotenv.config();

const join = async (req, res) => {
    try {
        const { name, email, password, passwordCheck, license_number } = req.body;

        // 비밀번호 일치여부 검증 로직
        if (password !== passwordCheck) {
            return res.status(statusCode.CONFLICT).send({message: responseMessage.DIFFRERENT_PASSWORD});
        }

        if (!req.file) {
            return res.status(statusCode.BAD_REQUEST).send({ message: responseMessage.NO_LICENSE });
        }
        const licenseFilePath = req.file.path;

        // 새로운 사용자 회원가입
        const newDoctor = await db.doctor.create({
            name: name,
            email: email,
            password: password,
            license_number: license_number,
            license: licenseFilePath
        });
            
        return res.status(statusCode.CREATED).send({ message: responseMessage.CREATED_USER });
        
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            message: err.message
        });
    }
}

module.exports = join;