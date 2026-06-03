const jwt = require('jsonwebtoken');

const secretKey = process.env.MY_SECRET;

function extractToken(req) {
	const authHeader = req.headers.authorization;
	const parts = authHeader.split(' ');

	return parts[1];
}

function authUser(req, res, next) {
	try {
		const token = extractToken(req);
		const decoded = jwt.verify(token, secretKey);
		req.userId = decoded.userId;

		return next();
	} catch (error) {
		return res.status(403).json({ message: '인증 실패' });
	}
}

function authDoctor(req, res, next) {
	try {
		const token = extractToken(req);
		const decoded = jwt.verify(token, secretKey);
		req.doctorId = decoded.doxtorId;
		
		return next();
	} catch (error) {
		return res.status(403).json({ message: '인증 실패' });
	}
}

module.exports = {
	authUser,
	authDoctor,
};