const httpStatus = require("http-status-codes");
const Like = require("../models/likes.js");
const jwt = require('jsonwebtoken')
const cookie = require('cookie');
const { validationResult } = require('express-validator');

const likesController = {
    insert: async (req, res) => {
        if(req.decoded){
            await Like.insert(req, res);
            res.redirect('/posts/viewPosts');
        }else{
        res.redirect('/users/viewLogin');
        }
    },
    delete: async (req, res) => {
        if(req.decoded){
            await Like.delete(req, res);
            res.redirect('/posts/viewPosts');
        }else{
            res.redirect('/users/viewLogin');
        }    
    }
}

module.exports = likesController;