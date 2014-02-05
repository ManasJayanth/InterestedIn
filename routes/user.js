var log = console.log;
var db = require('../dbWrapper');
exports.signup = function (req, res) {
    db.init();
    db.addUser({ name: req.body.name }, function() {
        db.findUsers(function (userdetails) {
            log(userdetails);
            res.render('register', {vals: userdetails});
        });
    });
};
