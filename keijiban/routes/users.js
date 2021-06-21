express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController.js');
const httpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');
const validator = require('../validator/validator.js');
const validator2 = require('../validator/validator2.js');

router.get('/viewRegister', (req, res) => {
    // if(!req.headers.cookie){
        usersController.viewRegister(req, res);
    // }else{
        // res.redirect('/posts/viewPosts');
    // }
})

router.get('/viewLogin', (req, res) => {
    if(!req.headers.cookie){
        usersController.viewLogin(req, res);
    }else{
         res.redirect('/posts/viewPosts');
    }
})

router.post('/register', validator, (req, res) => {
    // if(!req.headers.cookie){
        const errors = validationResult(req);
        usersController.register(req, res, errors);
    // }else{
    //     res.redirect('/posts/viewPosts');
    // }
})

router.post('/login', validator2, (req, res) => {
    // if(!req.headers.cookie){
        const errors = validationResult(req);
        usersController.login(req, res, errors);
    // }else{
    //     res.redirect('/posts/viewPosts');
    // }
})

module.exports = router