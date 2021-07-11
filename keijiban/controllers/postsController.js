const httpStatus = require("http-status-codes");
const posts = require("../models/posts.js");
const jwt = require('jsonwebtoken')
const cookie = require('cookie');

const postsController = {
    viewPosts: async (req, res) => {
        const result = await posts.selectAll();

        res.render('../views/posts.ejs', {
            //EJS側でresult.Posts[0].dataValues.titleで値が取れる
            posts: result
        });
    },
    viewCreate: (req, res) => {
        res.render("../views/postCreate.ejs", {
            title: "",
            content: ""
            })
    },
    viewUpdate: (req, res) => {
        res.render('../views/postUpdate.ejs');
    },
    create: (req, res) => {
        console.log('posts.insertsにはいった');
        posts.insert(req, res);
        console.log('posts.insertsを出た');
        console.log('/views/posts');
        res.render('../views/posts.ejs');
    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}

module.exports = postsController;