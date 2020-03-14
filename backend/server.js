const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./app/config/db');
const app = express();
const port = 8090;
const dbName = 'SPP2';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
const mongoClient = new MongoClient(db.url, {useNewUrlParser: true});
mongoClient.connect((err, database) => {
    if (err) return console.log(err);
    const db = database.db(dbName);
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
