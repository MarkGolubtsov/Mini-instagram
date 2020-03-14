const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const db = require('./app/config/db');


const port = 8090;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
let database = mongoose.connection;
database ? console.log("Db connected successfully") : console.log("Error connecting db");

let apiRoutes = require('./app/api-routes');
app.use('/', apiRoutes);
app.listen(port, () => {
    console.log("Running RestHub on port " + port);
});
