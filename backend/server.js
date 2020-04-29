const express = require('express');
const db = require('./app/config/db')
const graphqlHTTP = require('express-graphql');
const resolver = require('./app/resolver/resolver')
const schema = require('./app/model/schema')
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('./app/auth/authenticate');
const User = require('./app/model/userModel');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize());
app.use(cors());

app.listen(8090, () => {
    console.log(`Server started on http://localhost:8090`);
})
app.use('/graphql', authenticate.verifyUser, graphqlHTTP({
    schema,
    rootValue: resolver
}));
const routes = require('./app/route/routes')
app.use('/', routes);
mongoose.connect(db.url, {'useCreateIndex': true, useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false }, (err) => {
    err ? console.log(err.message) : console.log('MongoDB Successfully Connected ...');
});
