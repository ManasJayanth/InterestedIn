exports.send = function (id, msg) {
    var nodemailer = require('nodemailer');

    var credentials = require('./credentials');
    /* Using a separate json file separates the credentials from code that
     gets version. (provided the json is set to ignore the credentials file) */

    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: credentials.id,
            pass: credentials.password
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
        to: id, // list of receivers
        subject: "Hello ✔", // Subject line
        html: msg // html body
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
        // shut down the connection pool, no more messages
    });
};
