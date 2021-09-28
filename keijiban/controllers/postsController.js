const httpStatus = require("http-status-codes");
const Post = require("../models/posts.js");
const jwt = require('jsonwebtoken')
const cookie = require('cookie');

const postsController = {
    viewPosts: async (req, res)=> {
        if(req.decoded){
            const decodedToken = jwt.decode(req.cookies.token, {complete: true})
            const result = await Post.selectAll();
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
    create: async (req, res, errors) => {
        if(req.decoded){
            const errArray = errors.array();
            //バリデーションでエラーになった場合
            if(!errors.isEmpty()) {
                res.render("../views/postCreate.ejs", {
                title: req.body.title,
                content: req.body.content,
                errMessage: errArray
            })
            //バリデーションでエラーではない場合
            } else {
                await Post.insert(req, res);
                res.redirect('/posts/viewPosts');
            }
        }else{
            res.redirect('/users/viewLogin');
        }
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
    update: async (req, res, errors) => {
        if(req.decoded){
            const errArray = errors.array();
            //バリデーションでエラーになった場合
            if(!errors.isEmpty()) {
                res.render("../views/postUpdate.ejs", {
                id: req.params.id,  
                title: req.body.title,
                content: req.body.content,
                errMessage: errArray
            })
            //バリデーションでエラーではない場合
            } else {
                await Post.update(req, res);
                res.redirect('/posts/viewPosts');
            }
        }else{
            res.redirect('/users/viewLogin');
        }
    },
    delete: async (req, res) => {
        if(req.decoded){
            await Post.delete(req, res);
            res.redirect('/posts/viewPosts');
        }else{
            res.redirect('/users/viewLogin');
        }    
    }
}

module.exports = postsController;