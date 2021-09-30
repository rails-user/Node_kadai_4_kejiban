express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController.js');
const httpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');
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

router.get('/viewRegister', auth, (req, res) => {
                usersController.viewRegister(req, res);
})
router.post('/register', validator, auth, (req, res) => {
                usersController.register(req, res, validationResult);
})
router.get('/viewLogin', auth, (req, res) => {
                usersController.viewLogin(req, res);
})
router.post('/login', validator2, auth,(req, res) => {
                usersController.login(req, res, validationResult);
})
router.get('/logout', (req, res) => {
        usersController.logout(req, res);
})

module.exports = router