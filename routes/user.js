var log = console.log;
var db = require('../modules/dbWrapper');
exports.signup = function (req, res) {
    req.session.userId = req.body.username; // Not secure
    db.init();
    db.addUser({
        username: req.body.username,
        email: req.body.emailId,
        password: req.body.userPassword
    }, function() {
        res.redirect('/' + req.body.username);
    });
};

exports.showProfile = function (req, res) {
    if (!req.session.userId) {
        res.send('You are not authorized to view this page');
    } else {
        res.send('Hi ' + req.params.id);
    }
};
