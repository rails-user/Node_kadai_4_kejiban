const User = require("../models/users.js");
const httpStatus = require("http-status-codes");
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

const usersController = {
    viewRegister: (req, res) => {
        if(!req.decoded){
            res.render('../views/register.ejs', {
                name: '',
                email: '',
                password: '',
                password_confirm: '',
                errMessage: ''
                })
        }else{
            res.redirect('/posts/viewPosts');
        }
    },
    viewLogin: (req, res) => {
        if(!req.decoded){
            res.render('../views/login.ejs', {
                email: '',
                password: '',
                errMessage: ''
                });
        }else{
            res.redirect('/posts/viewPosts');
        }
    },
    register: async (req, res) => {
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
    },
    login: async (req, res) => {
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
    },
    logout: async (req, res) => {
        res.clearCookie('token');
        res.render('../views/login.ejs', {
            email: '',
            password: '',
            errMessage: ''
            });
    },
    validator: async (req, res, next) => {
        if(!req.decoded){
            const errors = validationResult(req);
            const errArray = errors.array();
            //???????????????????????????????????????????????????
            if(!errors.isEmpty()) {
                if (req.path.split('/')[1] === "register") {
                    res.render("../views/register.ejs", {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        password_confirm: req.body.password_confirm,
                        errMessage: errArray
                })}
                else if (req.path.split('/')[1] === "login") {
                    res.render("../views/login.ejs", {
                        email: req.body.email,
                        password: req.body.password,
                        errMessage: errArray
                })}
            //???????????????????????????????????????????????????
            } else {
                next()
            }
        }else{
            res.redirect('/posts/viewPosts');
        }
    }
}

module.exports = usersController;