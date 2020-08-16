const Users=[];
const {v4:uuidV4}=require('uuid');

exports.showHome=(req,res,next)=>{
 res.render('home',{});   
}
exports.addUser=(req,res,next)=>{
    if(req.body.username)
    Users.push(req.body.username);
    else
    Users.push('anonymous');
    console.log(req.body.username);  
    var uuid=uuidV4();
    console.log('Entered successfully '+uuid);
    res.redirect(`/${uuid}`);  
   };

exports.getRoom=(req,res,next)=>{
    console.log(req.params.room);
    console.log('Welcome in a room');
    res.render('room',{roomId:req.params.room});
}
