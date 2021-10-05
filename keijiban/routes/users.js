express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController.js');
const httpStatus = require('http-status-codes');
const validator = require('../validator/validator.js');
const validator2 = require('../validator/validator2.js');
const SECRET_KEY = "secret";
const jwt = require('jsonwebtoken');

//認証処理
const auth = (req, res, next) => {
        //変数にcookieのtokenを格納
        let token = '';
        if (req.headers.cookie && 
            req.headers.cookie.split('=')[0] === 'token'){
            token = req.headers.cookie.split('=')[1];
        }
        else
        {
            return next();
        }
        //トークンの検証
        jwt.verify(token, SECRET_KEY, function(err, decoded) {
            if (err) {
                next(err.message);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }

router.get('/viewRegister', auth, usersController.viewRegister)

router.post('/register', auth, validator, usersController.validator, usersController.register)

router.get('/viewLogin', auth, usersController.viewLogin)

router.post('/login', auth, validator2, usersController.validator, usersController.login)

router.get('/logout', usersController.logout)

module.exports = router