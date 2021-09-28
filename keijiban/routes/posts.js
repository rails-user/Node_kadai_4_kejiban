express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController.js');
const httpStatus = require('http-status-codes');
const cookie = require('cookie');
const SECRET_KEY = "secret";
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const validator3 = require('../validator/validator3.js');

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

router.get('/viewPosts', auth, (req, res) => {
    postsController.viewPosts(req, res);
})

router.get('/viewCreate', auth, (req, res) => {
        postsController.viewCreate(req, res);
})

router.post('/create', validator3, auth, (req, res) => {
        const errors = validationResult(req);
        postsController.create(req, res, errors);
})

router.get('/viewUpdate/:id', auth, (req, res) => {
        postsController.viewUpdate(req, res); 
})

router.post('/update/:id', validator3, auth, (req, res) => {
        const errors = validationResult(req);
        postsController.update(req, res, errors);
})

router.get('/delete/:id',  auth, (req, res) => {
        postsController.delete(req, res);     
})

module.exports = router