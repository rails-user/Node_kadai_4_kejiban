express = require('express')
const router = express.Router()
const likesController = require('../controllers/likesController.js');
const httpStatus = require('http-status-codes');
const cookie = require('cookie');
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

router.get('/insert/:id', auth, likesController.insert)

router.get('/delete/:id', auth, likesController.delete)

module.exports = router