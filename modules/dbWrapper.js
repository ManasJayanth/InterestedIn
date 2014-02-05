var mongoose = require('mongoose');
var database,
    dbSchema,
    User;
var db = mongoose.connection;
var log = console.log;

/* Database name */
database = 'users';

/* Database Schema */
dbSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String }
});

/* Create Model */
User = mongoose.model('User', dbSchema);

db.on('error', console.error);
db.once('open', function () {
    // /* Database Schema */
    // dbSchema = new mongoose.Schema({
    //     name: { type: String }
    // });

    // /* Create Model */
    // User = mongoose.model('User', dbSchema);
    log('Opened');

});

exports.init = function () { 
    mongoose.connect('mongodb://localhost/' + database);
    // User.remove({}, function(err) { 
    //     console.log('collection removed') 
    // });
};

/**
 * @param userDetails {object}
 */
exports.addUser = function (userDetails, callback) {
    var user = new User(userDetails);
    user.save(function(err, user) {
        if (err) return console.error(err);
        callback();
    });
};

exports.findUsers = function (callback) {
    User.find(function(err, user) {
        if (err) return console.error(err);
        log(callback);
        callback(user);
    });
};
