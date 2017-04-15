var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var booksArray = [{
        title: 'The Great Gatsby',
        genre: 'Roman',
        author: 'F. Scott Fitzgerald',
        read: false
    },
    {
        title: 'The Grapes of Wrath',
        genre: '',
        author: 'John Steinbeck',
        read: false
    },
    {
        title: 'Nineteen Eighty-Four',
        genre: 'Roman',
        author: 'George Orwell',
        read: false
    },
    {
        title: 'Ulysses',
        genre: 'Roman',
        author: 'James Joyce',
        read: false
    },
    {
        title: 'Lolita',
        genre: 'Roman',
        author: 'Vladimir Nabokov',
        read: false
    },
    {
        title: 'Catch-22',
        genre: 'Roman',
        author: 'Joseph Heller',
        read: false
    },
    {
        title: 'The Catcher in the Rye',
        genre: 'Roman',
        author: 'J. D. Salinger',
        read: false
    },
    {
        title: 'Beloved',
        genre: 'Roman',
        author: 'Toni Morrison',
        read: false
    },
    {
        title: 'The Sound and the Fury',
        genre: 'Roman',
        author: 'William Faulkner',
        read: false
    }
];

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://127.0.0.1:27017/bookLibrary';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(booksArray,
                    function(err, results) {
                        res.send(results);
                        db.close();
                    });
            });
            //res.send('inserting books');
        });
    return adminRouter;
};

module.exports = router;
