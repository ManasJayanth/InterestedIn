require.config({
    paths: {
        jQuery: '/js/components/jquery/dist/jquery',
        Underscore: '/js/components/underscore/underscore',
        Backbone: '/js/components/backbone/backbone',
        text: '/js/components/text/text',
        templates: '../templates'
    },

    shim: {
        'Backbone': ['Underscore', 'jQuery'],
        'SocialNet': ['Backbone']
    }
});

require(['SocialNet'], function(SocialNet) {
    SocialNet.initialize();
});
