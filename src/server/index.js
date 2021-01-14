const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../../build')));

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
})

io.on('connection', socket =>{
    io.emit('userUpdate', io.engine.clientsCount);

    socket.on('disconnect',()=>{
        io.emit('userUpdate', io.engine.clientsCount);
    })
    socket.on('addQueue', (queueItem)=>{
        socket.broadcast.emit('broadcastQueue', queueItem);
    })
})



server.listen(port);