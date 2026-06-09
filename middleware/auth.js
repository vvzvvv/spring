const jwt = require('jsonwebtoken');

const secretKey = process.env.MY_SECRET;

function extractToken(req) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return null;
	}

	const parts = authHeader.split(' ');

	if (parts.length !== 2 || parts[0] !== 'Bearer') {
		return null;
	}

	return parts[1];
}

function authUser(req, res, next) {
	try {
		const token = extractToken(req);

		if (!token) {
			return res.status(401).json({ message: '토큰이 없습니다.' });
		}

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

		if (!token) {
			return res.status(401).json({ message: '토큰이 없습니다.' });
		}
		
		const decoded = jwt.verify(token, secretKey);
		req.doctorId = decoded.doctorId;
		
		return next();
	} catch (error) {
		return res.status(403).json({ message: '인증 실패' });
	}
}

module.exports = {
	authUser,
	authDoctor,
};