var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function() {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function(username, password, done) {
            var url = 'mongodb://127.0.0.1:27017/bookLibrary';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                collection.findOne({
                        username: username
                    },
                    function(err, results) {
                        if (results.password === password) {
                            var user = results;
                            done(null, user);
                        } else {
                            done(null, false, {message: 'Bad password'});
                        }
                    }
                );

            });
        }));
};
