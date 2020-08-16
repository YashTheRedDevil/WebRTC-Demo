
const express=require('express');
const app=express();
const cors = require('cors');
const server=require('http').createServer(app);
const {v4:uuidV4}=require('uuid');

const io=require('socket.io')(server);
const PORT=3000;
app.use(cors());
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
const homeRoute=require('./routes/home');
const chatRoomRoute=require('./routes/user');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});
app.use('/',homeRoute);
app.use('/chatroom',chatRoomRoute);



io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('join-room', (roomId,userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected',userId);
        console.log('roomId: ' + roomId);
        console.log('userId: ' + userId);
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected',userId);
          
        });
      });

    

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
  });

  server.listen(PORT,()=>{
    console.log('Server is running on PORT '+PORT);
  });
