const express = require('express');

const router = express.Router();

//controllers
const controllers = require('../controllers')
const authController = require('../controllers/auth')

//middlewares
const isAuth = require('../middlewares/isAuth');


//routes
router.get('/', (req, res) => {res.send('<h1>Hi</h1>')})
router.get('/memes', controllers.getMemes);
router.get('/memes/:id', controllers.getMemeById);
router.post('/memes', controllers.postMeme);
router.patch('/memes/:id', controllers.patchUpdate);
router.patch('/memes/:id/comment',controllers.patchComments);
router.patch('/memes/:id/like', controllers.patchLikes);
router.patch('/memes/:id/dislike', controllers.patchDislikes)
router.post('/register', authController.postSignUp);
router.post('/login', authController.postLogin);
router.get('/userdata', isAuth.userAuth, authController.getLoginData);
router.post('/contact', isAuth.userAuth, controllers.postContactUs);


module.exports= router;