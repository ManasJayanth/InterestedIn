var contactsDependencies = ['SocialNetView', 'views/contact',
                            'text!templates/contacts.html'];

function contactsDefinition (SocialNetView, ContactView, contactsTemplate) {
    var contactsView = SocialNetView.extend({
        el: $('#content'),
        initialize: function() {
            _.bindAll(this, 'renderCollection');
            this.collection.on('reset', this.renderCollection, this);
        },
        render: function() {
            this.$el.html(contactsTemplate);
        },
        renderCollection: function(collection) {
            collection.each(function(contact) {
                console.log('here we are:');
                console.log(contact);
                var statusHtml = (new ContactView(
                    { options: {removeButton: true}, model: contact }
                )).render().el;
                $(statusHtml).appendTo('#contacts-list');
            });
        }
    });
    return contactsView;
}

define(contactsDependencies, contactsDefinition);
