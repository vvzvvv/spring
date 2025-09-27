module.exports = async (req, res) => {
    try {
        const { userId } = req.params;
        res.redirect(`/patient/${userId}`);
    } catch (error) {
        console.error('Error opening patient page:', error);
        res.status(500).json({ error: '환자 페이지를 열 수 없습니다.' });
    }
};