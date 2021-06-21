const httpStatus = require("http-status-codes");
const users = require("../models/posts.js");
const jwt = require('jsonwebtoken')
const cookie = require('cookie');

const postsController = {
    viewPosts: (req, res) => {
        res.render('../views/posts.ejs', {
            });
    },
    viewCreate: (req, res) => {
        res.render('../views/postCreate.ejs', {
            });
    },
    viewUpdate: (req, res) => {
        res.render('../views/postUpdate.ejs', {
            });
    },
    create: (req, res) => {

    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}

module.exports = postsController;