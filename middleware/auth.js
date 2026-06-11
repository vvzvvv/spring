const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.MY_SECRET;

function extractToken(req) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return null;
	}

	const parts = authHeader.split(/\s+/);

	if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
		return null;
	}

	return parts[1];
}

function authUser(req, res, next) {
	try {
		if (!secretKey) {
			return res.status(500).json({ message: 'JWT secret is not configured' });
		}

		const token = extractToken(req);

		if (!token) {
			return res.status(401).json({ message: 'Token not provided' });
		}

		const decoded = jwt.verify(token, secretKey);

		if (!decoded.userId) {
			return res.status(403).json({ message: 'Invalid user token' });
		}

		req.userId = decoded.userId;

		return next();
	} catch (error) {
		return res.status(403).json({ message: 'Invalid token' });
	}
}

function authDoctor(req, res, next) {
	try {
		if (!secretKey) {
			return res.status(500).json({ message: 'JWT secret is not configured' });
		}

		const token = extractToken(req);

		if (!token) {
			return res.status(401).json({ message: 'Token not provided' });
		}
		
		const decoded = jwt.verify(token, secretKey);

		if (!decoded.doctorId) {
			return res.status(403).json({ message: 'Invalid doctor token' });
		}

		req.doctorId = decoded.doctorId;
		
		return next();
	} catch (error) {
		return res.status(403).json({ message: 'Invalid token' });
	}
}

module.exports = {
	authUser,
	authDoctor,
};