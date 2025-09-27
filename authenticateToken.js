const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const secretKey = process.env.MY_SECRET;

const authenticateToken = (token) => {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    return userId;
}

const authenticateTokenDoctor = (token) => {
    const decoded = jwt.verify(token, secretKey);
    const doctorId = decoded.doctorId;
    return doctorId;
}

module.exports = {
    authenticateToken, authenticateTokenDoctor
};