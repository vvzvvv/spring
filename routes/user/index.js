const express = require("express");
const router = express.Router();

const loginPOST = require("../../controllers/user/loginPOST");

const joinPatientPOST = require("../../controllers/user/joinPatientPOST");
const joinDoctorPOST = require("../../controllers/user/joinDoctorPOST");

const emailCheckingPOST = require("../../controllers/user/emailCheckingPOST");
const passwordResetLinkPOST = require("../../controllers/user/passwordResetLinkPOST");
const passwordPUT = require("../../controllers/user/passwordPUT");

const multer = require('multer');
const path = require('path');


/*
multer관련 로직
*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


/*
로그인 관련 라우트
*/
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.post('/login', loginPOST);


/*
회원가입 관련 라우트
/join/patient : 환자 회원가입 url
/join/doctor : 의사 회원가입 url
*/
router.get('/join/patient', function(req, res) {
  res.render("user/patientJoin");
});

router.get('/join/doctor', function(req, res) {
  res.render("user/doctorJoin");
});


router.post('/join/patient', joinPatientPOST);
router.post('/join/doctor', upload.single('certification'), joinDoctorPOST);

router.post('/join/emailChecking', emailCheckingPOST);




/*
이메일 인증 관련 라우트
*/
router.get('/emailVerification', function(req, res) {
  res.render("user/emailVerification");
});

router.post('/password/emailVarificaiton', passwordResetLinkPOST);


/*
비밀번호 변경 관련 라우트
*/
router.get('/password/change', function(req, res) {
  const {token} = req.query;
  
  res.render("user/changePassword", {token});
});

router.put('/password/change', passwordPUT);





module.exports = router;