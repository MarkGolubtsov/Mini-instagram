const newsRoutes = require('./news_routes');

module.exports = function (app, db) {
   newsRoutes(app, db);
};
