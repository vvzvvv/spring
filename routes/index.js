var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', require('./user'));
router.use('/exercise', require('./exercise'));
router.use('/diary',require('./diary'));
router.use('/test',require('./test'));
router.use('/prescription',require('./prescription'));
router.use('/sleep',require('./sleep'));
router.use('/mypage', require('./mypage'));
router.use('/board', require('./board'));
router.use('/doctor',require('./doctor'));

module.exports = router;


