const {deletePrescriptionContent} = require("../../models/prescriptionQuery");

module.exports = async (req, res) => {
    try {
        const { prescriptionID } = req.params;

        const data = await deletePrescriptionContent(prescriptionID);
        
        if(data.error){
            return res.status(201).json({
                status: false,
                result: data.error,
            })
        }
        return res.status(200).json({
            status: true,
            result: data
        });
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}