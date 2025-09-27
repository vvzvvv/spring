//시퀄라이즈 코드 작성
// models/exerciseModel.js
const db = require('./index');

const saveExercise = async (evaluation, exercise_date, start_time_hour, start_time_minute, end_time_hour, end_time_minute, exercise_type, comments, user_id) => {
    try {
        // 주어진 날짜와 사용자에 해당하는 데이터가 이미 존재하는지 확인
        const existingData = await db.exerciseReport.findOne({
            where: {
                exercise_date: exercise_date,

            }
        });

        if (existingData) {
            // 이미 존재하는 경우
            return { error: '이미 같은 날짜의 데이터가 존재합니다.', data: existingData };
        }

        // 존재하지 않는 경우 새 데이터 생성
        const data = await db.exerciseReport.create({
            exercise_rate: evaluation,
            exercise_date: exercise_date,
            start_exercise_time: `${start_time_hour}:${start_time_minute}`,
            end_exercise_time: `${end_time_hour}:${end_time_minute}`,
            exercise_type: exercise_type,
            comments: comments,
            user_id: user_id,
        });

        return data;
    } catch (error) {
        console.error('Error in saveExercise:', error);
        throw error;
    }
};

const getExerciseByDate = async (userID, date) => {
    try {
        const data = await db.exerciseReport.findAll({
            where: {
                user_id: userID,
                exercise_date: date
            }
        });
        return data;
    } catch (error) {
        console.error('Error in getExerciseList:', error);
        throw error;
    }
};

const getExercise = async (exerciseID) => {
    try {
        const data = await db.exerciseReport.findOne({
            where: {
                exercise_report_id: exerciseID,
            }
        });
        return data;
    } catch (error) {
        console.error('Error in getExercise:', error);
        throw error;
    }
};

module.exports = {
    saveExercise,
    getExerciseByDate,
    getExercise,
};
