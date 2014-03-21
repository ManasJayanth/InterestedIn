define(['SocialNetView', 'text!templates/contact.html'],
       function(SocialNetView, contactTemplate) {
           var contactView = SocialNetView.extend({
               addButton: false,
               removeButton: false,
               tagName: 'li',
               events: {
                   "click .addbutton": "addContact",
                   "click .removebutton": "removeContact"
               },
               addContact: function() {
                   var $responseArea = this.$('.actionarea'); 
                   $.post('/accounts/me/contacts',
                          {
                              contactId: this.model.get('_id')
                          })
                       .done (function () {
                              $responseArea.text('Contact Added');
                          })
                       .fail(function() {
                           $responseArea.text('Couldnot add contact');
                       });
               },
               removeContact: function() {
                   var $responseArea = this.$('.actionarea');
                   $responseArea.text('Removing contact...');
                   $.ajax({
                       url: '/accounts/me/contacts',
                       type: 'DELETE',
                       data: {
                           contactId: this.model.get('_id')
                       }
                   })
                       .done(function onSuccess() {
                           $responseArea.text('Contact Removed'); 
                       })
                       .fail(function onError() {
                           $responseArea.text('Could not remove contact');
                       });
               },
               initialize: function() {
                   /* Set the addButton variable in case it has been added 
                    in the constructor*/
                   var options = arguments[0].options;
                   if ( options.addButton ) {
                       this.addButton = options.addButton;
                   }
                   if ( options.removeButton ) { 
                       this.removeButton = options.removeButton;
                   }
               },
               render: function() { 
                   $(this.el).html(_.template(contactTemplate, {
                       model: this.model.toJSON(),
                       addButton: this.addButton,
                       removeButton: this.removeButton
                   }));
                   return this;
               }
           });
           return contactView;
       });
