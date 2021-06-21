
const { check } = require('express-validator');

module.exports = [
    check('email').isEmail().withMessage('emailを入力してください'),
    check('password').not().isEmpty().withMessage('passwordを入力してください'),
    check('password').isLength({ min: 7 }).withMessage('passwordは7文字以上で入力してください。')
];