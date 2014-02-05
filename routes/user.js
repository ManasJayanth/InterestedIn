var log = console.log;
var db = require('../modules/dbWrapper');
exports.signup = function (req, res) {
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
    res.send('Hi ' + req.params.id);
};
