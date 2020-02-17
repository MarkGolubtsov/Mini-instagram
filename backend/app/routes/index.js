const noteRoutes = require('./tasks_routes');
module.exports = function (app, db) {
    noteRoutes(app, db);
    //TODO another routes
};
