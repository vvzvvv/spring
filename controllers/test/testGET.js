// const responseMessage = require("../../constants/responseMessage");
// const statusCode = require("../../constants/statusCode");
const {getTest} = require("../../models/testQuery");

module.exports = async (req, res) => {
    try {
        const {testID} = req.params;
        let testList = [];
        const result = await getTest(testID);
        
        for(var test of result){   
            testList.push(test.get(0));
        }

        return testList[0];
    }
    catch(err) {
        console.log(err);
    }
}