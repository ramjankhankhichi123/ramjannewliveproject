const express = require('express');
const Router = express.Router();
const {protect} = require("../middleware/authMiddleware");

Router.use(express.json())


    const {getuser,setUsers,updateuser,deleteuser,loginserver}=require('../controllers/usercontrollers')
Router.get('/',protect,getuser)
Router.post('/',protect,setUsers)
Router.put('/:_id',protect,updateuser)
Router.delete('/:_id',protect,deleteuser)
Router.post("/login",protect,loginserver)
// Router.get("/search/:_id",search)
// routes.use(express.json())

// Router.route('/').get(getuser).post(setUsers)
// Router.route('/:id').delete(deleteuser).put(updateuser)


module.exports = Router;