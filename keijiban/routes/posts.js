express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController.js');
const httpStatus = require('http-status-codes');
const cookie = require('cookie');
const SECRET_KEY = "secret";
const jwt = require('jsonwebtoken');
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

router.get('/viewPosts', auth, postsController.viewPosts)

router.get('/viewCreate', auth, postsController.viewCreate)

router.post('/create', auth, validator3, postsController.validator, postsController.create)

router.get('/viewUpdate/:id', auth, postsController.viewUpdate)

router.post('/update/:id', auth, validator3, postsController.validator, postsController.update)

router.get('/delete/:id',  auth, postsController.delete)

module.exports = router