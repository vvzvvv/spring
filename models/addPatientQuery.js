const { Op } = require('sequelize');
const db = require('./index');

const getPatientSearch = async(searchInput) => {
    try {
        const data = await db.user.findAll({
            where: {
                email: {
                    [Op.like]: `%${searchInput}%`
                }
            }
        })
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

const getRequestStatus = async (doctorId, userId) => {
    try {
        const data = await db.requestStatus.findOne({
            where: {
                doctor_id: doctorId,
                user_id: userId,
            }
        });
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

const getPatientManagement = async (doctorId, userId) => {
    try {
        const data = await db.patientManagement.findOne({
            where: {
                doctor_id: doctorId,
                user_id: userId,
            }
        });
        //console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

const postAddPatient = async (doctorId, userId) => {
    try {
        const data = await db.requestStatus.create({
            doctor_id: doctorId,
            user_id: userId
        });
        //console.log(data);
        return data;

    } catch (error) {
        console.error(error);
        throw error; 
    }
};


module.exports = {
    getPatientSearch,
    getRequestStatus,
    getPatientManagement,
    postAddPatient
}