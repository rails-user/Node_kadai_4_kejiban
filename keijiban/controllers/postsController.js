const httpStatus = require("http-status-codes");
const Post = require("../models/posts.js");
const jwt = require('jsonwebtoken')
const cookie = require('cookie');
const { validationResult } = require('express-validator');
//const { noExtendLeft } = require("sequelize/types/lib/operators");

const postsController = {
    viewPosts: async (req, res)=> {
        if(req.decoded){
            const decodedToken = jwt.decode(req.cookies.token, {complete: true})
            const result = await Post.selectAll(req, res);
            res.render('../views/posts.ejs', {
                posts: result[0],
                login_user_id: JSON.stringify(decodedToken.payload.id)
            });
        }else{
            res.redirect('/users/viewLogin');
        }
    }, 
    viewCreate: (req, res) => {
        if(req.decoded){
            res.render("../views/postCreate.ejs", {
                title: "",
                content: "",
                errMessage: ''
                })
        }else{
            res.redirect('/users/viewLogin');
        }  
    },
    create: async (req, res) => {
            await Post.insert(req, res);
            res.redirect('/posts/viewPosts');
    },
    viewUpdate: async (req, res) => {
        if(req.decoded){
            const result = await Post.select(req, res);
            res.render('../views/postUpdate.ejs', {
                id: result[0].id,
                title: result[0].title,
                content: result[0].content,
                errMessage: ''
            })
        }else{
            res.redirect('/users/viewLogin');
        }    
    },
    update: async (req, res) => {
                await Post.update(req, res);
                res.redirect('/posts/viewPosts');
    },
    delete: async (req, res) => {
        if(req.decoded){
            await Post.delete(req, res);
            res.redirect('/posts/viewPosts');
        }else{
            res.redirect('/users/viewLogin');
        }    
    },
    validator: async (req, res, next) => {
        if(req.decoded){
            const errors = validationResult(req);
            const errArray = errors.array();
            //バリデーションでエラーになった場合
            if(!errors.isEmpty()) {
                if (req.path.split('/')[1] === "create") {
                    res.render("../views/postCreate.ejs", {
                    title: req.body.title,
                    content: req.body.content,
                    errMessage: errArray
                })}
                else if (req.path.split('/')[1] === "update") {
                    res.render("../views/postUpdate.ejs", {
                    id: req.params.id,  
                    title: req.body.title,
                    content: req.body.content,
                    errMessage: errArray
                })}
            //バリデーションでエラーではない場合
            } else {
                next()
            }
        }else{
            res.redirect('/users/viewLogin');
        }
    }
}

module.exports = postsController;