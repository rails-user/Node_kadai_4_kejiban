const httpStatus = require("http-status-codes");
const Post = require("../models/posts.js");
const jwt = require('jsonwebtoken')
const cookie = require('cookie');

const postsController = {
    viewPosts: async (req, res) => {
        const decodedToken = jwt.decode(req.cookies.token, {complete: true})
        const result = await Post.selectAll();
        res.render('../views/posts.ejs', {
            posts: result[0],
            login_user_id: JSON.stringify(decodedToken.payload.id)
        });
    },
    viewCreate: (req, res) => {
        res.render("../views/postCreate.ejs", {
            title: "",
            content: "",
            errMessage: ''
            })
    },
    create: async (req, res, errors) => {
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
    },
    viewUpdate: async (req, res) => {
        const result = await Post.select(req, res);
        res.render('../views/postUpdate.ejs', {
            id: result[0].id,
            title: result[0].title,
            content: result[0].content,
            errMessage: ''
        })
    },
    update: async (req, res, errors) => {
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
    },
    delete: async (req, res) => {
        await Post.delete(req, res);
        res.redirect('/posts/viewPosts');
    }
}

module.exports = postsController;