const User = require("../models/users.js");
const httpStatus = require("http-status-codes");
const jwt = require('jsonwebtoken')

const usersController = {
    viewRegister: (req, res) => {
        res.render('../views/register.ejs', {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errMessage: ''
            })
    },
    viewLogin: (req, res) => {
        res.render('../views/login.ejs', {
            email: '',
            password: '',
            errMessage: ''
            });
    },
    register: async (req, res, errors) => {
        const errArray = errors.array();
        //バリデーションでエラーになった場合
        if(!errors.isEmpty()) {
            res.render("../views/register.ejs", {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password_confirm: req.body.password_confirm,
            errMessage: errArray
            })
        //バリデーションでエラーではない場合
        } else {
            const result = await User.create(req, res);
            if(result.token){
                res.cookie('token', result.token, {httpOnly: false, maxAge: 600000});
                res.redirect('/posts/viewPosts');
            }else{
                const errArray = [];
                errArray.push(result);
                res.render('../views/register.ejs', {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    password_confirm: req.body.password_confirm,
                    errMessage: errArray
                    });
            }
        }
    },
    login: async (req, res, errors) => {
        const errArray = errors.array();
        //バリデーションでエラーになった場合
        if(!errors.isEmpty()) {
            res.render("../views/login.ejs", {
                email: req.body.email,
                password: req.body.password,
                errMessage: errArray
            })
        } else {
            const result = await User.select(req, res);
            if(result.token){
                res.cookie('token', result.token, {httpOnly: false, maxAge: 600000});
                res.redirect('/posts/viewPosts');
            }else{
                const errArray = [];
                errArray.push(result);
                res.render('../views/login.ejs', {
                    email: req.body.email,
                    password: req.body.password,
                    errMessage: errArray
                    });
            }
        }
    },
    logout: async (req, res) => {
        res.clearCookie('token');
        res.render('../views/login.ejs', {
            email: '',
            password: '',
            errMessage: ''
            });
    }
    }

module.exports = usersController;