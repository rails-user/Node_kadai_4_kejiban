//新規登録用のバリデータ
const { check } = require('express-validator');

module.exports = [
    check('name').not().isEmpty().withMessage('usernameを入力してください'),
    check('email').isEmail().withMessage('emailを入力してください'),
    check('password').not().isEmpty().withMessage('passwordを入力してください'),
    check('password').isLength({ min: 7 }).withMessage('passwordは7文字以上で入力してください。'),
    check('password_confirm').not().isEmpty().withMessage('password_confirmを入力してください'),
    check('password_confirm').isLength({ min: 7 }).withMessage('password_confirmは7文字以上で入力してください。'),
    check('password').custom((value, { req }) => {
        if (req.body.password === req.body.password_confirm) {
            return true;
        }
    }).withMessage('passwordとpassword_confirmが一致していません。')
];