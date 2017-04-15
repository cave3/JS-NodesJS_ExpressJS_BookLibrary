var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(nav) {

    /* SignUp - create a new user */
    authRouter.route('/signUp')
        .post(function(req, res) {
            //console.log(req.body);
            var url = 'mongodb://127.0.0.1:27017/bookLibrary';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                // TODO: check if user exists

                // insert to db if user does not exists
                collection.insert(user, function(err, results) {
                    req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });
                });
            });

        });

    /* SignIn - to existing user account */
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(function(req, res, next) {
            // if not logged in
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }

        })
        .get(function(req, res) {
            //res.json(req.user);
            res.render('userProfileView', {
                title: 'Profile',
                nav: nav,
                user: req.user
            });
        });

    return authRouter;
};

module.exports = router;
