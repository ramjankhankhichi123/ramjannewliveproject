const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
router.use(express.json());
const  { registeruser, loginuser,getMe} = require('../controllers/userAuthControllers')
router.post('/',registeruser);
router.post('/login',loginuser)
router.get('/me',protect,getMe)





module.exports = router;