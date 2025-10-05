// 메인 페이지 컨트롤러
const searchMyPatientsPOST = require('../../controllers/doctor_main/searchMyPatientsPOST');
const cancelRequestPOST = require('../../controllers/doctor_main/cancelRequestPOST');
const openPatientPageGET = require('../../controllers/doctor_main/openPatientPageGET');
const getRequestListGET = require('../../controllers/doctor_main/requestListGET')
const getAllPatientsGET = require('../../controllers/doctor_main/getAllPatientsGET');

// 팝업 페이지 컨트롤러
const searchPatientPOST = require('../../controllers/doctor/searchPatientPOST');
const addPatientPOST = require('../../controllers/doctor/addPatientPOST');

var express = require('express');
var router = express.Router();

router.get('/', async (req, res)=>{
  res.render('doctor/doctor_main');
});

// 새로운 라우트들 추가하기
router.post('/searchMyPatients', searchMyPatientsPOST);
router.get('/getRequestList', getRequestListGET);
router.post('/cancelRequest', cancelRequestPOST);
router.get('/board/:userId', openPatientPageGET);
router.get('/getAllPatients', getAllPatientsGET);

// 환자 검색 post 
router.post('/searchPatient/:searchInput', searchPatientPOST);
// 환자 추가 신청 post
router.post('/addPatient', addPatientPOST);

module.exports = router;