const dotenv = require('dotenv');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const express = require('express');

dotenv.config();

// Mock Sequelize 모델
jest.mock('../../models', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(undefined),
  },
  doctor: {},
  user: {},
  doctorMainQuery: {
    getMyPatients: jest.fn().mockResolvedValue([]),
    getRequestList: jest.fn().mockResolvedValue([]),
    cancelRequest: jest.fn().mockResolvedValue(1),
  },
  addPatientQuery: {
    getPatientSearch: jest.fn().mockResolvedValue([]),
    getRequestStatus: jest.fn().mockResolvedValue(null),
    getPatientManagement: jest.fn().mockResolvedValue(null),
    postAddPatient: jest.fn().mockResolvedValue({ success: true }),
  },
}));

jest.mock('../../models/doctorMainQuery', () => ({
  getMyPatients: jest.fn().mockResolvedValue([]),
  getRequestList: jest.fn().mockResolvedValue([]),
  cancelRequest: jest.fn().mockResolvedValue(1),
}));

jest.mock('../../models/addPatientQuery', () => ({
  getPatientSearch: jest.fn().mockResolvedValue([]),
  getRequestStatus: jest.fn().mockResolvedValue(null),
  getPatientManagement: jest.fn().mockResolvedValue(null),
  postAddPatient: jest.fn().mockResolvedValue({ success: true }),
}));

const doctorRouter = require('../../routes/doctor');

describe('Routes - Doctor 라우트 통합 테스트', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/doctor', doctorRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /doctor/getRequestList - 요청 목록 조회', () => {
    it('Given: 유효한 의사 토큰이 주어졌을 때, When: GET 요청을 하면, Then: 요청 목록을 반환해야 한다', async () => {
      // Given: 유효한 의사 토큰 생성
      const doctorId = 456;
      const token = jwt.sign({ doctorId }, process.env.MY_SECRET || 'test-secret');

      // When: 인증된 요청 전송
      const response = await request(app)
        .get('/doctor/getRequestList')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // Then: 응답이 배열임
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('Given: 토큰이 없을 때, When: GET 요청을 하면, Then: 401 상태코드를 반환해야 한다', async () => {
      // Given: 토큰 없음

      // When: 인증되지 않은 요청 전송
      const response = await request(app)
        .get('/doctor/getRequestList')
        .expect(401);

      // Then: 401 에러 반환
      expect(response.body.message).toBe('Token not provided');
    });

    it('Given: userId 토큰(의사 토큰 아님)이 주어졌을 때, When: GET 요청을 하면, Then: 403 상태코드를 반환해야 한다', async () => {
      // Given: 의사 토큰이 아닌 사용자 토큰
      const token = jwt.sign({ userId: 123 }, process.env.MY_SECRET || 'test-secret');

      // When: 잘못된 토큰으로 요청 전송
      const response = await request(app)
        .get('/doctor/getRequestList')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);

      // Then: 403 에러 반환
      expect(response.body.message).toBe('Invalid doctor token');
    });

    it('Given: 잘못된 토큰이 주어졌을 때, When: GET 요청을 하면, Then: 403 상태코드를 반환해야 한다', async () => {
      // Given: 잘못된 서명의 토큰
      const invalidToken = jwt.sign({ doctorId: 456 }, 'wrong-secret');

      // When: 잘못된 토큰으로 요청 전송
      const response = await request(app)
        .get('/doctor/getRequestList')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(403);

      // Then: 403 에러 반환
      expect(response.body.message).toBe('Invalid token');
    });
  });

  describe('GET /doctor/getAllPatients - 환자 목록 조회', () => {
    it('Given: 유효한 의사 토큰이 주어졌을 때, When: GET 요청을 하면, Then: 환자 목록을 반환해야 한다', async () => {
      // Given: 유효한 의사 토큰 생성
      const doctorId = 456;
      const token = jwt.sign({ doctorId }, process.env.MY_SECRET || 'test-secret');

      // When: 인증된 요청 전송
      const response = await request(app)
        .get('/doctor/getAllPatients')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // Then: 응답이 배열임
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('Given: 토큰이 없을 때, When: GET 요청을 하면, Then: 401 상태코드를 반환해야 한다', async () => {
      // Given: 토큰 없음

      // When: 인증되지 않은 요청 전송
      const response = await request(app)
        .get('/doctor/getAllPatients')
        .expect(401);

      // Then: 401 에러 반환
      expect(response.body.message).toBe('Token not provided');
    });
  });

  describe('POST /doctor/searchMyPatients - 환자 검색', () => {
    it('Given: 유효한 의사 토큰과 검색어가 주어졌을 때, When: POST 요청을 하면, Then: 검색 결과를 반환해야 한다', async () => {
      // Given: 유효한 의사 토큰 생성
      const doctorId = 456;
      const token = jwt.sign({ doctorId }, process.env.MY_SECRET || 'test-secret');

      const searchData = {
        searchInput: '김',
      };

      // When: 인증된 요청 전송
      const response = await request(app)
        .post('/doctor/searchMyPatients')
        .set('Authorization', `Bearer ${token}`)
        .send(searchData)
        .expect(200);

      // Then: 응답이 배열임
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('Given: 토큰이 없을 때, When: POST 요청을 하면, Then: 401 상태코드를 반환해야 한다', async () => {
      // Given: 토큰 없음
      const searchData = {
        searchInput: '김',
      };

      // When: 인증되지 않은 요청 전송
      const response = await request(app)
        .post('/doctor/searchMyPatients')
        .send(searchData)
        .expect(401);

      // Then: 401 에러 반환
      expect(response.body.message).toBe('Token not provided');
    });

    it('Given: 잘못된 토큰이 주어졌을 때, When: POST 요청을 하면, Then: 403 상태코드를 반환해야 한다', async () => {
      // Given: 의사 토큰이 아닌 사용자 토큰
      const token = jwt.sign({ userId: 123 }, process.env.MY_SECRET || 'test-secret');

      const searchData = {
        searchInput: '김',
      };

      // When: 잘못된 토큰으로 요청 전송
      const response = await request(app)
        .post('/doctor/searchMyPatients')
        .set('Authorization', `Bearer ${token}`)
        .send(searchData)
        .expect(403);

      // Then: 403 에러 반환
      expect(response.body.message).toBe('Invalid doctor token');
    });
  });

  describe('POST /doctor/addPatient - 환자 추가', () => {
    it('Given: 유효한 의사 토큰과 환자 ID가 주어졌을 때, When: POST 요청을 하면, Then: 환자가 추가되어야 한다', async () => {
      // Given: 유효한 의사 토큰 생성
      const doctorId = 456;
      const token = jwt.sign({ doctorId }, process.env.MY_SECRET || 'test-secret');

      const addPatientData = {
        userId: 789,
      };

      // When: 인증된 요청 전송
      const response = await request(app)
        .post('/doctor/addPatient')
        .set('Authorization', `Bearer ${token}`)
        .send(addPatientData)
        .expect(200);

      // Then: 응답이 정상임
      expect(response.body).toBeDefined();
    });

    it('Given: 토큰이 없을 때, When: POST 요청을 하면, Then: 401 상태코드를 반환해야 한다', async () => {
      // Given: 토큰 없음
      const addPatientData = {
        userId: 789,
      };

      // When: 인증되지 않은 요청 전송
      const response = await request(app)
        .post('/doctor/addPatient')
        .send(addPatientData)
        .expect(401);

      // Then: 401 에러 반환
      expect(response.body.message).toBe('Token not provided');
    });
  });

  describe('POST /doctor/cancelRequest - 요청 취소', () => {
    it('Given: 유효한 의사 토큰이 주어졌을 때, When: POST 요청을 하면, Then: 요청이 취소되어야 한다', async () => {
      // Given: 유효한 의사 토큰 생성
      const doctorId = 456;
      const token = jwt.sign({ doctorId }, process.env.MY_SECRET || 'test-secret');

      const cancelData = {
        userId: 789,
      };

      // When: 인증된 요청 전송
      const response = await request(app)
        .post('/doctor/cancelRequest')
        .set('Authorization', `Bearer ${token}`)
        .send(cancelData)
        .expect(200);

      // Then: 응답이 정상임
      expect(response.body).toBeDefined();
    });

    it('Given: 토큰이 없을 때, When: POST 요청을 하면, Then: 401 상태코드를 반환해야 한다', async () => {
      // Given: 토큰 없음
      const cancelData = {
        userId: 789,
      };

      // When: 인증되지 않은 요청 전송
      const response = await request(app)
        .post('/doctor/cancelRequest')
        .send(cancelData)
        .expect(401);

      // Then: 401 에러 반환
      expect(response.body.message).toBe('Token not provided');
    });
  });
});
