const express=require('express');

const router=express.Router();
const homeController=require('../controller/homecontroller');

router.get('/',homeController.showHome);
router.post('/adduser',homeController.addUser);
router.get('/:room',homeController.getRoom);
module.exports=router;