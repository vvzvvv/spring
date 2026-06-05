const express = require('express');
const router = express.Router();

const { authUser } = require('../../middleware/auth');
const sleepPOST = require('../../controllers/sleep/sleepPOST');
const getLast7DaysSleep = require('../../controllers/sleep/getLast7DaysSleep');
const getTotalSleepTime = require('../../controllers/sleep/getTotalSleep');
const sleepByDateGET = require('../../controllers/sleep/sleepByDateGET');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sleep/sleep', { currentDate: new Date() });
});

router.get('/date/:date', authUser, sleepByDateGET);
router.get('/last7days', authUser, getLast7DaysSleep);
router.get('/total', authUser, getTotalSleepTime);
router.post('/save', authUser, sleepPOST);

module.exports = router;





