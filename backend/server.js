const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./app/config/db');
const app = express();
const port = 8090;
app.use(bodyParser.urlencoded({extended: true}));
const mongoClient = new MongoClient(db.url, {useNewUrlParser: true});
mongoClient.connect((err, database) => {
    if (err) return console.log(err);
    const db = database.db('SPP2');
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
