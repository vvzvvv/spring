const express = require('express');
const router = express.Router();

const { authUser } = require('../../middleware/auth');
const exerciseGET = require('../../controllers/exercise/exerciseGET');
const exercisePOST = require('../../controllers/exercise/exercisePOST');

router.get('/', function(_req, res, _next) {
    res.render('exercise/exercise');
  });

// 특정 날짜의 운동 기록 조회
router.get('/:date', authUser, exerciseGET);

// 운동 기록 저장
router.post('/save', authUser, exercisePOST);

module.exports = router;


