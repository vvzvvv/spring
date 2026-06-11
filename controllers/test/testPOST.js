const { postTest } = require("../../models/testQuery");

module.exports = async (req, res) => {
    try {
        const { date, score, resultString } = req.body;
        const userId = req.userId;
        const result = await postTest(date, score, resultString, userId);
        
        if(result.error){
            return res.status(201).json({
                status: "fail",
                data: result.data,
            })
        }
        return res.status(200).json({
            status: "success",
            data: result
        });
    }
    catch(err) {
        console.error(err);

        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
}