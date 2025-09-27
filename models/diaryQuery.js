const { where } = require('sequelize');
const db = require('./index');

async function saveDiaryEntry(userID, date, weather, contents, photoUrl) {
    try {
        const [entry, created] = await db.diary.findOrCreate({
            where: { user_id: userID, diary_date: date },
            defaults: {
                weather: weather,
                contents: contents,
                photo: photoUrl
            }
        });

        if (!created) {
            entry.weather = weather;
            entry.contents = contents;
            entry.photo = photoUrl;
            await entry.save();
        }

        return entry;
    } catch (error) {
        console.error('일기 저장 중 오류 발생:', error);
        throw error;
    }
}

async function getDiaryEntry(date, userID) {
    try {
        const entry = await db.diary.findOne({ where: { diary_date: date, user_id: userID} });
        return entry || {}; // 데이터가 없으면 빈 객체를 반환
    } catch (error) {
        console.error('일기 불러오기 중 오류 발생:', error);
        throw error;
    }
}

async function addPhoto(date, photo) {
    try {
        await Diary.update({ photo }, { where: { date } });
    } catch (error) {
        console.error('사진 추가 중 오류 발생:', error);
        throw error;
    }
}

async function deletePhoto(date) {
    try {
        await Diary.update({ photo: null }, { where: { date } });
    } catch (error) {
        console.error('사진 삭제 중 오류 발생:', error);
        throw error;
    }
}

module.exports = {
    saveDiaryEntry,
    getDiaryEntry,
    addPhoto,
    deletePhoto
};
