var addContactDependencies = ['SocialNetView', 'models/Contact',
                              'views/contact',
                              'text!templates/addcontact.html'];

function addContactDefinition (SocialNetView, Contact, ContactView,
                               addcontactTemplate) {
    var addcontactView = SocialNetView.extend({
        el: $('#content'),

        events: {
           "click #search-user": "search"
        },

        search: function() {
            var view = this;
            $.get('/contacts/find',
                  "searchStr=" + $('input[name="searchStr"]'),
                  function(data) { view.render(data); })
                .error(function(){
                    $("#results").text('No contacts found.');
                    $("#results").slideDown();
                });
            return false;
        },

        render: function(resultList) {
            var view = this;
            this.$el.html(_.template(addcontactTemplate));
            if ( null !== resultList ) {
                _.each(resultList, function (contactJson) {
                    var contactModel = new Contact(contactJson);
                    var contactHtml = (new ContactView({
                        options: { addButton: true },
                        model: contactModel
                    })).render().el;
                    $('#results').append(contactHtml);
                });
            }
        }
    });

    return addcontactView;
}

define(addContactDependencies, addContactDefinition);
