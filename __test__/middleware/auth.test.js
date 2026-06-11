const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { authUser, authDoctor } = require('../../middleware/auth');

dotenv.config();
process.env.MY_SECRET = process.env.MY_SECRET || 'test-secret';

describe('Middleware - 인증 미들웨어 (auth.js)', () => {
  let req, res, next;

  beforeEach(() => {
    // Mock 객체 초기화
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authUser - 사용자 인증 미들웨어', () => {
    it('Given: 유효한 Bearer 토큰이 주어졌을 때, When: authUser를 호출하면, Then: req.userId가 설정되고 next()가 호출되어야 한다', () => {
      // Given: 유효한 사용자 토큰 생성
      const userId = 123;
      const token = jwt.sign({ userId }, process.env.MY_SECRET || 'test-secret');
      req.headers.authorization = `Bearer ${token}`;

      // When: authUser 호출
      authUser(req, res, next);

      // Then: req.userId가 설정됨
      expect(req.userId).toBe(userId);

      // Then: next() 호출됨
      expect(next).toHaveBeenCalled();

      // Then: 응답 함수는 호출되지 않음
      expect(res.status).not.toHaveBeenCalled();
    });

    it('Given: Authorization 헤더가 없을 때, When: authUser를 호출하면, Then: 401 상태코드와 에러 메시지를 반환해야 한다', () => {
      // Given: 헤더 없음 (req.headers.authorization 미설정)

      // When: authUser 호출
      authUser(req, res, next);

      // Then: 401 상태코드 반환
      expect(res.status).toHaveBeenCalledWith(401);

      // Then: 에러 메시지 반환
      expect(res.json).toHaveBeenCalledWith({ message: 'Token not provided' });

      // Then: next() 호출 안 됨
      expect(next).not.toHaveBeenCalled();
    });

    it('Given: Bearer 형식이 아닌 토큰이 주어졌을 때, When: authUser를 호출하면, Then: 401 상태코드를 반환해야 한다', () => {
      // Given: 잘못된 형식 (Bearer가 없음)
      req.headers.authorization = 'InvalidToken abc123';

      // When: authUser 호출
      authUser(req, res, next);

      // Then: 401 상태코드 반환
      expect(res.status).toHaveBeenCalledWith(401);

      // Then: 에러 메시지 반환
      expect(res.json).toHaveBeenCalledWith({ message: 'Token not provided' });

      // Then: next() 호출 안 됨
      expect(next).not.toHaveBeenCalled();
    });

    it('Given: 만료되었거나 서명이 틀린 토큰이 주어졌을 때, When: authUser를 호출하면, Then: 403 상태코드를 반환해야 한다', () => {
      // Given: 잘못된 서명으로 만든 토큰
      const invalidToken = jwt.sign({ userId: 123 }, 'wrong-secret');
      req.headers.authorization = `Bearer ${invalidToken}`;

      // When: authUser 호출
      authUser(req, res, next);

      // Then: 403 상태코드 반환
      expect(res.status).toHaveBeenCalledWith(403);

      // Then: 에러 메시지 반환
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });

      // Then: next() 호출 안 됨
      expect(next).not.toHaveBeenCalled();
    });

    it('Given: 토큰에 userId가 없을 때, When: authUser를 호출하면, Then: 403 상태코드와 "Invalid user token" 메시지를 반환해야 한다', () => {
      // Given: userId 없는 토큰 (doctorId만 있는 경우)
      const token = jwt.sign({ doctorId: 456 }, process.env.MY_SECRET || 'test-secret');
      req.headers.authorization = `Bearer ${token}`;

      // When: authUser 호출
      authUser(req, res, next);

      // Then: 403 상태코드 반환
      expect(res.status).toHaveBeenCalledWith(403);

      // Then: 에러 메시지 반환
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user token' });

      // Then: next() 호출 안 됨
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('authDoctor - 의사 인증 미들웨어', () => {
    it('Given: 유효한 Bearer 토큰이 주어졌을 때, When: authDoctor를 호출하면, Then: req.doctorId가 설정되고 next()가 호출되어야 한다', () => {
      // Given: 유효한 의사 토큰 생성
      const doctorId = 456;
      const token = jwt.sign({ doctorId }, process.env.MY_SECRET || 'test-secret');
      req.headers.authorization = `Bearer ${token}`;

      // When: authDoctor 호출
      authDoctor(req, res, next);

      // Then: req.doctorId가 설정됨
      expect(req.doctorId).toBe(doctorId);

      // Then: next() 호출됨
      expect(next).toHaveBeenCalled();

      // Then: 응답 함수는 호출되지 않음
      expect(res.status).not.toHaveBeenCalled();
    });

    it('Given: Authorization 헤더가 없을 때, When: authDoctor를 호출하면, Then: 401 상태코드와 에러 메시지를 반환해야 한다', () => {
      // Given: 헤더 없음

      // When: authDoctor 호출
      authDoctor(req, res, next);

      // Then: 401 상태코드 반환
      expect(res.status).toHaveBeenCalledWith(401);

      // Then: 에러 메시지 반환
      expect(res.json).toHaveBeenCalledWith({ message: 'Token not provided' });

      // Then: next() 호출 안 됨
      expect(next).not.toHaveBeenCalled();
    });

    it('Given: 토큰에 doctorId가 없을 때, When: authDoctor를 호출하면, Then: 403 상태코드와 "Invalid doctor token" 메시지를 반환해야 한다', () => {
      // Given: doctorId 없는 토큰 (userId만 있는 경우)
      const token = jwt.sign({ userId: 123 }, process.env.MY_SECRET || 'test-secret');
      req.headers.authorization = `Bearer ${token}`;

      // When: authDoctor 호출
      authDoctor(req, res, next);

      // Then: 403 상태코드 반환
      expect(res.status).toHaveBeenCalledWith(403);

      // Then: 에러 메시지 반환
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid doctor token' });

      // Then: next() 호출 안 됨
      expect(next).not.toHaveBeenCalled();
    });
  });
});
