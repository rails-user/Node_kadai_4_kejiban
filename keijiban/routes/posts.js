express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController.js');
const httpStatus = require('http-status-codes');
const cookie = require('cookie');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

router.get('/viewPosts', (req, res) => {
    // console.log('xhr.HEADERS_RECEIVEDはこちら'+xhr.HEADERS_RECEIVED)
    // console.log('xhr.getRequestHeaderはこちら'+xhr.getRequestHeader("Authorization"))
    // console.log('res.headersはこちら'+JSON.stringify(res.headers))
    // console.log('req.headersはこちら'+JSON.stringify(req.headers))
    if(req.headers.cookie || req.headers['authorization']){
        postsController.viewPosts(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }
})

router.get('/viewCreate', (req, res) => {
    const token =cookie.parse(req.headers.cookie).token;
    if(token){
        postsController.viewCreate(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }    
})
router.post('/create', (req, res) => {
    if(req.headers.cookie){
        postsController.create(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }        
})
router.get('/viewUpdate', (req, res) => {
    if(req.headers.cookie){
        postsController.viewUpdate(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }        
})
router.post('/update', (req, res) => {
    if(req.headers.cookie){
        postsController.update(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }      
})
router.get('/delete', (req, res) => {
    if(req.headers.cookie){
        postsController.delete(req, res);
    }else{
        res.redirect('/users/viewLogin');
    }      
})

module.exports = router