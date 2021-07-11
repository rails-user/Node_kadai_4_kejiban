express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController.js');
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
router.get('/viewPosts', auth, (req, res) => {
    if(req.decoded){
        postsController.viewPosts(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }
})
router.get('/viewCreate', auth, (req, res) => {
    if(req.decoded){
        postsController.viewCreate(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }    
})
router.post('/create', auth, (req, res) => {
    console.log('routerのcreateにはいった');
    if(req.decoded){
    console.log('postsController.createにはいった');
        postsController.create(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }
})
router.get('/viewUpdate', auth, (req, res) => {
    if(req.decoded){
        postsController.viewUpdate(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }    
})
router.post('/update', auth, (req, res) => {
    if(req.decoded){
        postsController.update(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }    
})
router.get('/delete',  auth, (req, res) => {
    if(req.decoded){
        postsController.delete(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }      
})

module.exports = router