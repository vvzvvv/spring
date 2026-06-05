const express = require('express');
const router = express.Router();

const { authUser } = require('../../middleware/auth');
const managementGET = require('../../controllers/mypage/managementGET');
const managementPUT = require('../../controllers/mypage/managementPUT');
const agreementGET = require('../../controllers/mypage/agreementGET');
const agreementPUT = require('../../controllers/mypage/agreementPUT');

/* GET home page. */
router.get('/', async (req, res)=>{
  res.render('mypage/mypage');
});

// 담당 의사 연결 메뉴
router.get('/managements', authUser, managementGET)
router.put('/managements', authUser, managementPUT)

// 정보 공개 범위 메뉴
router.get('/agreements', authUser, agreementGET);
router.put('/agreements', authUser, agreementPUT);

module.exports = router;