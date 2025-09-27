const { where } = require('sequelize');
const db = require('./index');

const postTest = async(date, score, resultString, userID) => {
    try {
        // 주어진 날짜에 해당하는 데이터가 이미 존재하는지 확인
        const existingData = await db.test.findOne({
            where: {
                test_date: date,
                user_id: userID // 특정 사용자의 데이터를 확인하려면 user_id를 추가
            }
        });

        if (existingData) {
            // 이미 존재하는 경우
            return { error: '이미 같은 날짜의 데이터가 존재합니다.', data: existingData };
        }

        // 존재하지 않는 경우 새 데이터 생성
        const data = await db.test.create({
            result: resultString,
            test_date: date,
            total_score: score,
            user_id: userID,
        });

        return data;
    } catch (error) {
        console.error('Error in postTest:', error);
        throw error;
    }
}

const getTestList = async(userID) => {
    const data = await db.test.findAll({
        where: {
            user_id: userID
        },
	});
    return data;
}

const getTest = async(testID) => {
    const data = await db.test.findAll({
        where: {
            test_id: testID,
        }
    });
    return data;
}

module.exports = {
    postTest,
    getTestList,
    getTest,
}