const Users=[];
const {v4:uuidV4}=require('uuid');
exports.addUser=(req,res,next)=>{
Users.push(req.body.username);
console.log(req.body.username);
res.redirect('/chatroom');
}

exports.enterChatRoom=(req,res,next)=>{
    var uuid=uuidV4();
    console.log('Entered successfully');
    res.render('/chatroom/'+`${uuid}`);
}
//module.exports=Users;