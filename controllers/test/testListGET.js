const { getTestList } = require("../../models/testQuery");

module.exports = async (req, res) => {
    try {
        const userID = req.userId;
        const result = await getTestList(userID);
        let testList = [];
        for(var test of result){   
            testList.push(test.get(0));
        }

        res.status(200).json(testList);
    }
    catch(err) {
        console.log(err);
    }
}