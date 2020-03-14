let newsURL = '/news';
let collectionName = 'news';
let ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get(newsURL, (req, res) => {
        let sort = req.query.sort;
        let order = req.query.order;
        db.collection(collectionName).find().sort({[sort]: Number(order)}).toArray((err, result) => {
            res.send(result);
        });
    });

    app.get(newsURL + '/:id', (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            res.status(400).send({'error': 'bad id '});
            return;
        }
        const details = {'_id': new ObjectID(id)};
        db.collection(collectionName).findOne(details, (err, item) => {
            if (item == null) {
                res.status(404).send({'error': 'Not Found'});
                return;
            }
            if (err) {
                res.status(400).send({'error': 'An error has occurred'});
            } else {
                res.status(200).send(item);
            }
        });
    });

    app.put(newsURL + '/:id', (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            res.status(404).send({'error': 'Not Found'});
            return;
        }
        const details = {'_id': new ObjectID(id)};
        const news = {content: req.body.content, title: req.body.title, likes: req.body.likes};
        console.log(news);
        console.log(req.body);
        db.collection(collectionName).updateOne(details, {$set: news}, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send({'error': 'An error has occurred'});
            } else {
                res.status(200).send(news);
            }
        });
    });

    app.post(newsURL, (req, res) => {
        const news = {content: req.body.content, title: req.body.title, likes: 0};
        db.collection(collectionName).insertOne(news, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.status(200).send(result.ops[0]);
            }
        });
    });
    app.delete(newsURL + '/:id', (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            res.status(404).send({'error': 'Not Found'});
            return;
        }
        const details = {'_id': new ObjectID(id)};
        db.collection(collectionName).deleteOne(details, (err, result) => {
            if (err) {
                console.log(err)
                res.send({'error': 'An error has occurred'});
            } else {
                res.sendStatus(204)
            }
        });
    });
};
