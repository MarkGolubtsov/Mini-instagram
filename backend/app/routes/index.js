const newsRoutes = require('./tasks_routes');

module.exports = function (app, db) {
   newsRoutes(app, db);
};
