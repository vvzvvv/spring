const { where } = require('sequelize');
const db = require('./index');
const prescription = require('./prescription');
const prescription_report = require('./prescription_report');


// 처방약 get
const getPrescriptionContent = async(userID) => {
    const data = await db.prescription.findAll({
        where: {
            user_id: userID,
        }
    })
    return data;
}

// 처방약 post
const postPrescriptionContent = async(name, date, amount, userID) => {
    try {
        const data = await db.prescription.create({
            prescription_name: name,
            prescription_date: date,
            prescription_amount: amount,
            user_id: userID
        });
        return data;
    } catch (err) {
		console.error('Error:', err);
		throw err;
    }
}

// 처방약 수정
const editPrescriptionContent = async(name, date, amount, prescriptionID) => {
    try {
        const prescription = await db.prescription.update(
            {
                prescription_name: name,
                prescription_date: date,
                prescription_amount: amount
            },
            { where : {
                    prescription_id: prescriptionID
                }
            }
        );

        return prescription;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const deletePrescriptionContent = async(prescriptionID) => {
    try {
        const prescription = await db.prescription.destroy({
                where : {
                    prescription_id: prescriptionID
                }
        });

        return prescription;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/////////////////////// 복용약 쿼리 /////////////////////////
// 복용 기록 get
const getPrescriptionReport = async(userID) => {
    const data = await db.prescriptionReport.findAll({
        include : [
            {
                model: db.prescription,
                attributes: ['prescription_name', 'prescription_amount'],
                required: true
            }
        ],
        where : {
            user_id: userID,
        }
    })
    return data;
}

// 복용 기록 post
const postPrescriptionReport = async(date, time, userID, prescriptionID) => {
    try {
        const prescriptionReport = await db.prescriptionReport.create({
            prescription_report_date: date,
            prescription_report_time: time,
            user_id: userID,
            prescription_id: prescriptionID,
        });

        return prescriptionReport;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// 복용 기록 수정
const editPrescriptionReport = async(date, time, reportID) => {
    try {
        const prescriptionReport = await db.prescriptionReport.update(
            {
                prescription_report_date: date,
                prescription_report_time: time
            },
            { where : {
                    prescription_report_id: reportID
                }
            }
        );

        return prescriptionReport;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// 복용약 기록 삭제
const deletePrescriptionReport = async(reportID) => {
    try {
        const prescriptionReport = await db.prescriptionReport.destroy({
                where : {
                    prescription_report_id: reportID
                }
        });

        return prescriptionReport;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 차트
const getChart = async(userID) => {
    try {
        const data = await db.prescription.findAll({
            attributes: [
                'prescription_name',
                'prescription_date',
                'prescription_amount',
                'user_id'
            ],
            order: [
                ['prescription_name', 'ASC'],
                ['prescription_date', 'ASC']
            ],
            where : {
                user_id: userID,
            }
        });

        const groupedData = data.reduce((acc, prescription) => {
            const { prescription_name } = prescription;
            if (!acc[prescription_name]) {
                acc[prescription_name] = [];
            }
            acc[prescription_name].push(prescription);
            return acc;
        }, {});

        return groupedData;

    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        throw error;
    }

}
module.exports = {
    getPrescriptionContent,
    postPrescriptionContent,
    getPrescriptionReport,
    postPrescriptionReport,
    getChart,
    editPrescriptionReport,
    deletePrescriptionReport,
    editPrescriptionContent,
    deletePrescriptionContent
}