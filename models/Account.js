module.exports = function(config, mongoose, nodemailer) {
    var crypto = require('crypto');
    var Status = new mongoose.Schema({
        name: {
            first:   { type: String },
            last:    { type: String }
        },
        status:    { type: String }
    });

    var Contact = new mongoose.Schema({
        name: {
            first: { type:String },
            last: { type: String }
        },
        accountId: { type: mongoose.Schema.ObjectId },
        added:     { type: Date },     // When the contact was added
        updated:   { type: Date }      // When the contact last updated
    });

    var AccountSchema = new mongoose.Schema({
        email:     { type: String, unique: true },
        password:  { type: String },
        name: {
            first:   { type: String },
            last:    { type: String }
        },
        birthday: {
            day:     { type: Number, min: 1, max: 31, required: false },
            month:   { type: Number, min: 1, max: 12, required: false },
            year:    { type: Number }
        },
        contacts: [Contact],
        photoUrl:  { type: String },
        biography: { type: String },
        status:    [Status], // My own status updates only
        activity:  [Status]  //  All status updates including friends
    });

    var Account = mongoose.model('Account', AccountSchema);

    var registerCallback = function(err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Account was created');
    };

    var changePassword = function(accountId, newpassword) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(newpassword);
        var hashedPassword = shaSum.digest('hex');
        Account.update({_id:accountId}, {$set: {password:hashedPassword}},{upsert:false},
                       function changePasswordCallback(err) {
                           console.log('Change password done for account ' + accountId);
                       });
    };

    var forgotPassword = function(email, resetPasswordUrl, callback) {
        var user = Account.findOne({email: email}, function findAccount(err, doc){
            if (err) {
                // Email address is not a valid user
                callback(false);
            } else {
                var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
                resetPasswordUrl += '?account=' + doc._id;
                smtpTransport.sendMail({
                    from: 'thisapp@example.com',
                    to: doc.email,
                    subject: 'SocialNet Password Request',
                    text: 'Click here to reset your password: ' + resetPasswordUrl
                }, function forgotPasswordResult(err) {
                    if (err) {
                        callback(false);
                    } else {
                        callback(true);
                    }
                });
            }
        });
    };

    var login = function(email, password, callback) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        Account.findOne({email:email,password:shaSum.digest('hex')},function(err,doc){
            callback(doc);
        });
    };

    var findById = function(accountId, callback) {
        console.log('findById: Finding ' + accountId);
        Account.findOne({_id: accountId}, function(err,doc) {
            if(err) {
                throw new Error('Error occured: ' + err);
            }
            if (doc) {
                callback(doc);
            } else {
                console.log('Account.findOne: no document found');
            }
        });
    }

    var register = function(email, password, firstName, lastName) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        console.log('Registering ' + email);
        var user = new Account({
            email: email,
            name: {
                first: firstName,
                last: lastName
            },
            password: shaSum.digest('hex')
        });
        
        user.save(registerCallback);
        console.log('Save command was sent');
    }

    var findByString = function(searchStr, callback) {
        var searchRegex = new RegExp(searchStr, 'i');
        Account.find({
            $or: [
                { 'name.full': { $regex: searchRegex } },
                { email:       { $regex: searchRegex } }
            ]
        }, callback);
    };

    var addContact = function(account, addcontact) {
        var contact = {
            name: {
                // Instead of { name: account.name } because of some bug
                first: addcontact.name.first,
                last: addcontact.name.last
            },
            accountId: addcontact._id,
            added: new Date(),
            updated: new Date()
        };
        var arr = account.contacts;
        arr.push(contact);
        account.update({}, {$set: {contacts: arr}}, function () {
//            console.log(account.contacts);
            account.save(function (err) {
                if (err) {
                    console.log('Error saving account: ' + err);
                }
            });
        });
    };

    var removeContact = function(account, contactId) {
        if ( null == account.contacts ) {
            console.log('No contacts in the account');
            return;
        }
        account.contacts.forEach(function(contact) {
            if ( contact.accountId == contactId ) {
                console.log('Match found and deleted');
                account.contacts.remove(contact);

                // // Find and remove item from an array
                // var i = account.contacts.indexOf(contact);
                // if(i != -1) {
                //     array.splice(i, 1);
                // }
            }
        });
        account.save();
    };

    var hasContact = function(account, contactId) {
        if ( null == account.contacts ) return false;
        account.contacts.forEach(function(contact) {
            if ( contact.accountId == contactId ) {
                return true;
            }
        });
        return false;
    };

    return {
        findById: findById,
        register: register,
        forgotPassword: forgotPassword,
        changePassword: changePassword,
        login: login,
        Account: Account,
        findByString: findByString,
        addContact: addContact,
        removeContact: removeContact,
        hasContact: hasContact
    }
}
