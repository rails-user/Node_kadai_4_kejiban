//コンテンツのバリデータ
const { check } = require('express-validator');

module.exports = [
    check('content').isLength({ max: 140 }).withMessage('コンテンツは140文字以内で入力してください。')
];