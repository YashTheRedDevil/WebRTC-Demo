const express=require('express');

const router=express.Router();
const usercontroller=require('../controller/usercontroller');
//router.post('/',usercontroller.addUser);
router.get('/chatroom',usercontroller.enterChatRoom);
module.exports=router;