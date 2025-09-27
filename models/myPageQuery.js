//시퀄라이즈 코드 작성
const { includes, forEach } = require('../controllers/diary/diaryPOST');
const db = require('./index');

const getManagementList = async (user_id) => {
    try {
        // 주어진 날짜와 사용자에 해당하는 데이터가 이미 존재하는지 확인
        const data = await db.requestStatus.findAll({
            where: {
                user_id: user_id,
            },
            include : [
                {
                    model: db.doctor,
                    attributes: ['name', 'license_number'],
                    required: false,
                }
            ],
        });

        var result = [];
        data.forEach((info) => {
            result.push({
                "request_id" : info.request_id,
                "doctor_id" : info.doctor_id,
                "user_id" : info.user_id,
                "is_accepted" : info.is_accepted,
                "doctor_name" : info.doctor.name,
                "doctor_license_number" : info.doctor.license_number,
            })
        });
        return result;
    } catch (error) {
        console.error('Error in getManagementList:', error);
        throw error;
    }
};


const putManagementList = async(userID, requestID, num) => {
    try {
        const data = await db.requestStatus.update(
            {
                is_accepted : num
            },
            { where : {
                    user_id: userID,
                    request_id : requestID,
                }
            }
        );
        return data;
    } catch (error) {
        console.error('Error in putManagementList:', error);
        throw error;
    }
};

const postManagementList = async(userID, doctorID) =>{
    try{
        const data = await db.patientManagement.create({
            user_id: userID,
            doctor_id: doctorID,
        });
        return data;
    } catch (error) {
        console.error('Error in PostManagementList : ', error);
        throw error;
    }
}

const deleteManagementList = async(userID, doctorID) => {
    try{
        const data = await db.patientManagement.destroy({
            where: {
                user_id: userID,
                doctor_id: doctorID,
            }
        });
        return data;
    } catch (error) {
        console.error('Error in PostManagementList : ', error);
        throw error;
    }
}

const getAgreementList = async(userID) => {
    const data = await db.user.findOne({
        where: {
            user_id: userID,
        },
    });

    const result = {
        user_id : data.user_id,
        medicine_agreement : data.medicine_agreement,
        sleep_agreement : data.sleep_agreement,
        exercise_agreement : data.exercise_agreement,
        test_agreement : data.test_agreement,
    }

    return result;
}

const putAgreementList = async(userID, medicine_agreement, sleep_agreement, exercise_agreement, test_agreement) => {
    const data = await db.user.update(
        {
            medicine_agreement : medicine_agreement,
            sleep_agreement : sleep_agreement,
            exercise_agreement: exercise_agreement,
            test_agreement: test_agreement,
        },
        { where : {
                user_id: userID,
            }
        }
    );
    return data;
}

module.exports = {
    getManagementList,
    putManagementList,
    postManagementList,
    deleteManagementList,
    getAgreementList,
    putAgreementList
};
