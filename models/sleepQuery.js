const db = require('./index');
const { Op } = require('sequelize');

// createSleepReport 함수 정의
const createSleepReport = async (date, wakeDate, rate, duration, startTime, endTime, userId) => {
    const data = await db.sleepReport.create({
        sleep_date: date,
        wake_date: wakeDate,
        sleep_rate: rate,
        sleep_duration: duration,
        start_sleep_time: startTime,
        end_sleep_time: endTime,
        user_id: userId,
    });
    return data;
};

// getSleepReportByDate 함수 정의
const getSleepReportByDate = async (date, userId) => {
    const data = await db.sleepReport.findOne({
        where: {
            sleep_date: date,
            user_id: userId,
        }
    });
    return data;
};

// getLast7DaysSleepData 함수 정의
const getLast7DaysSleepData = async (userId) => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const data = await db.sleepReport.findAll({
        where: {
            user_id: userId,
            sleep_date: {
                [Op.between]: [lastWeek.toISOString().split('T')[0], today.toISOString().split('T')[0]]
            }
        },
        order: [['sleep_date', 'ASC']]
    });

    return data.map(entry => ({
        date: entry.sleep_date,
        duration: parseFloat(entry.sleep_duration.split(':')[0]) + parseFloat(entry.sleep_duration.split(':')[1]) / 60 // 시간과 분을 소수로 변환
    }));
};

// getTotalSleepTime 함수 정의
const getTotalSleepTime = async (userId) => {
    const data = await db.sleepReport.findAll({
        where: {
            user_id: userId
        }
    });

    let totalMinutes = 0;

    data.forEach(entry => {
        const [hours, minutes] = entry.sleep_duration.split(':').map(Number);
        totalMinutes += hours * 60 + minutes;
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
};

// 함수들을 모듈로 내보내기
module.exports = {
    createSleepReport,
    getSleepReportByDate,
    getLast7DaysSleepData,
    getTotalSleepTime,
};