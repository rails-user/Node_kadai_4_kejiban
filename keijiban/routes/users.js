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
        if(!req.decoded){
                usersController.viewRegister(req, res);
        }else{
                res.redirect('/posts/viewPosts');
        }
})
router.post('/register', validator, auth, (req, res) => {
        if(!req.decoded){
                const errors = validationResult(req);
                usersController.register(req, res, errors);
        }else{
                res.redirect('/posts/viewPosts');
        }
})
router.get('/viewLogin', auth, (req, res) => {
        if(!req.decoded){
                usersController.viewLogin(req, res);
        }else{
                res.redirect('/posts/viewPosts');
        }
})
router.post('/login', validator2, auth,(req, res) => {
        if(!req.decoded){
                const errors = validationResult(req);
                usersController.login(req, res, errors);
        }else{
                res.redirect('/posts/viewPosts');
        }
})
router.get('/logout', (req, res) => {
        usersController.logout(req, res);
})

module.exports = router