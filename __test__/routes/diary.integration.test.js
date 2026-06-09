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
  user: {},
  doctor: {},
  diary: {},
  diaryQuery: {
    getDiaryEntry: jest.fn().mockResolvedValue([]),
    saveDiaryEntry: jest.fn().mockResolvedValue({ id: 1, userId: 123 }),
  },
}));

// Mock diaryQuery 직접
jest.mock('../../models/diaryQuery', () => ({
  getDiaryEntry: jest.fn().mockResolvedValue([]),
  saveDiaryEntry: jest.fn().mockResolvedValue({ id: 1, userId: 123 }),
}));

// Mock multer
jest.mock('multer', () => {
  return jest.fn().mockReturnValue({
    single: jest.fn().mockReturnValue((req, res, next) => next()),
  });
});

// Mock multer-google-storage
jest.mock('multer-google-storage', () => ({
  storageEngine: jest.fn(),
}));

const diaryRouter = require('../../routes/diary');

describe('Routes - Diary 라우트 통합 테스트', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/diary', diaryRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /diary/:date - 일기 조회', () => {
    it('Given: 유효한 사용자 토큰과 날짜가 주어졌을 때, When: GET 요청을 하면, Then: 일기 데이터를 반환해야 한다', async () => {
      // Given: 유효한 토큰 생성
      const userId = 123;
      const token = jwt.sign({ userId }, process.env.MY_SECRET || 'test-secret');

      // When: 인증된 요청 전송
      const response = await request(app)
        .get('/diary/2026-06-09')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // Then: 응답이 정상임
      expect(response.body).toBeDefined();
    });

    it('Given: 토큰이 없을 때, When: GET 요청을 하면, Then: 401 상태코드를 반환해야 한다', async () => {
      // Given: 토큰 없음

      // When: 인증되지 않은 요청 전송
      const response = await request(app)
        .get('/diary/2026-06-09')
        .expect(401);

      // Then: 401 에러 반환
      expect(response.body.message).toBe('Token not provided');
    });

    it('Given: 잘못된 토큰이 주어졌을 때, When: GET 요청을 하면, Then: 403 상태코드를 반환해야 한다', async () => {
      // Given: 잘못된 토큰
      const invalidToken = jwt.sign({ userId: 123 }, 'wrong-secret');

      // When: 잘못된 토큰으로 요청 전송
      const response = await request(app)
        .get('/diary/2026-06-09')
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(403);

      // Then: 403 에러 반환
      expect(response.body.message).toBe('Invalid token');
    });

    it('Given: Bearer 형식이 아닌 토큰이 주어졌을 때, When: GET 요청을 하면, Then: 401 상태코드를 반환해야 한다', async () => {
      // Given: 잘못된 형식의 헤더
      const response = await request(app)
        .get('/diary/2026-06-09')
        .set('Authorization', 'InvalidFormat token123')
        .expect(401);

      // Then: 401 에러 반환
      expect(response.body.message).toBe('Token not provided');
    });
  });

  describe('POST /diary - 일기 저장', () => {
    it('Given: 유효한 사용자 토큰과 일기 데이터가 주어졌을 때, When: POST 요청을 하면, Then: 일기가 저장되고 200을 반환해야 한다', async () => {
      // Given: 유효한 토큰 생성
      const userId = 123;
      const token = jwt.sign({ userId }, process.env.MY_SECRET || 'test-secret');

      const diaryData = {
        date: '2026-06-09',
        weather: 'sunny',
        contents: '오늘은 좋은 날씨였다',
        existingPhotoUrl: '',
      };

      // When: 인증된 요청 전송
      const response = await request(app)
        .post('/diary')
        .set('Authorization', `Bearer ${token}`)
        .send(diaryData)
        .expect(200);

      // Then: 응답이 정상임
      expect(response.body).toBeDefined();
    });

    it('Given: 토큰이 없을 때, When: POST 요청을 하면, Then: 401 상태코드를 반환해야 한다', async () => {
      // Given: 토큰 없음
      const diaryData = {
        date: '2026-06-09',
        weather: 'sunny',
        contents: '오늘은 좋은 날씨였다',
      };

      // When: 인증되지 않은 요청 전송
      const response = await request(app)
        .post('/diary')
        .send(diaryData)
        .expect(401);

      // Then: 401 에러 반환
      expect(response.body.message).toBe('Token not provided');
    });

    it('Given: 잘못된 토큰이 주어졌을 때, When: POST 요청을 하면, Then: 403 상태코드를 반환해야 한다', async () => {
      // Given: 잘못된 토큰
      const invalidToken = jwt.sign({ userId: 123 }, 'wrong-secret');

      const diaryData = {
        date: '2026-06-09',
        weather: 'sunny',
        contents: '오늘은 좋은 날씨였다',
      };

      // When: 잘못된 토큰으로 요청 전송
      const response = await request(app)
        .post('/diary')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(diaryData)
        .expect(403);

      // Then: 403 에러 반환
      expect(response.body.message).toBe('Invalid token');
    });
  });
});
