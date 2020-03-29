const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('express')();
const users = require('./app/route/user-routes');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(users);
const http = require('http').createServer(app);
const io = require('socket.io');

const endpoints = require('./app/constant/newsEndpoints');
const newsController = require('./app/controller/newsController');

const auth = require('./app/config/auth');
const db = require('./app/config/db');
const jwt = require("jsonwebtoken");

const socket = io(http);
const port = 8090;

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const database = mongoose.connection;
database ? console.log("Db connected successfully") : console.log("Error connecting db");

socket.on('connection', (socket) => {
    console.log('User connected');
    socket.on(endpoints.getAll, (params) => {
        newsController.getAllNews(params, (data) => socket.emit(endpoints.sendAll, data));
    });
    socket.on(endpoints.createNews, (news) => {
        newsController.new(news,(data)=>socket.emit(endpoints.sendAll,data));
    });
    socket.on(endpoints.updateNews,(news)=>{
        newsController.update(news,(data)=>socket.emit(endpoints.sendUpdatedNews,data));
    });
    socket.on('disconnect', () => {
        console.log('Disconnected!');
    })
});

http.listen(port, (socketConnectOpts) => {
    console.log('Connected to port: ' + port)
});

