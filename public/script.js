const socket=io('/');
const videoGrid=document.getElementById('video-grid');
const peer=new Peer(undefined,{
    host:'/',
    port:'3001'
})
peer.on('open',(id)=>{
    socket.emit('join-room',ROOM_ID,id);
})
const peers={};
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    addVideoStream(myVideo,stream);

    peer.on('call',call=>{
        call.answer(stream);
        const video=document.createElement('video');
        call.on('stream',userVideoStream=>{
            addVideoStream(video,userVideoStream);
        })
    })

    socket.on('user-disconnected',(userId)=>{
        //console.log(userId);
        if(peers[userId])
        peers[userId].close();
    });

    socket.on('user-connected',(userId)=>{
    connectToNewUser(userId,stream);
    })
});

const myVideo=document.createElement('video');
myVideo.muted=true;




function addVideoStream(video,stream){
    video.srcObject=stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}

function connectToNewUser(userId,stream){
    const call=peer.call(userId,stream);
    const video=document.createElement('video');
    call.on('stream',userVideoStream=>{
        addVideoStream(video,userVideoStream);
    });
    call.on('close',()=>{
        video.remove();
    })

    peers[userId]=call;
}