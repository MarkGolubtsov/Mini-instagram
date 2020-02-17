let taskURL = '/tasks';
let collectionName = 'tasks';
let ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get(taskURL, (req, res) => {
       db.collection(collectionName).find().toArray((err, result) => {
            res.send(result);
        });
    });

    app.get(taskURL + '/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection(collectionName).findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.post(taskURL, (req, res) => {
        const task = {title: req.body.name, status: 'active'};
        db.collection(collectionName).insert(task, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};
