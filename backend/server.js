const mongoose = require("mongoose");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io');
const socket = io(http);
const db = require('./app/config/db');
const auth = require('./app/auth');
const port = 8090;
//
// mongoose.connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// });
// database ? console.log("Db connected successfully") : console.log("Error connecting db");
// const database = mongoose.connection;
socket.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('Disconnected!');
    })
});
http.listen(port, (socketConnectOpts) => {
    console.log('Connected to port: ' + port)
});
