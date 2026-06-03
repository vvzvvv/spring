const express = require('express');
const router = express.Router();

const { authUser } = require('../../middleware/auth');
const testPOST = require('../../controllers/test/testPOST');
const testListGET = require('../../controllers/test/testListGET');
const testGET = require('../../controllers/test/testGET');

/* GET home page. */
router.get('/', async (req, res)=>{
  res.render('test/test');
});
router.post('/', authUser, testPOST)
router.get('/list', authUser, testListGET);
router.get('/content', testGET);

router.get('/:testID', async (req, res)=>{
  const testResult = await testGET(req, res);
  res.render('test/testResult',{testResult: testResult});
})
module.exports = router;