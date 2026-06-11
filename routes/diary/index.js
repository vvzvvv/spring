var express = require('express');
var router = express.Router();

const { authUser } = require('../../middleware/auth');
const diaryGET = require('../../controllers/diary/diaryGET');
const diaryPOST = require('../../controllers/diary/diaryPOST');

router.get('/', function(req, res, next) {
    res.render('diary/diary');
});

router.get('/:date', authUser, diaryGET);
router.post('/', authUser, diaryPOST);

module.exports = router;

