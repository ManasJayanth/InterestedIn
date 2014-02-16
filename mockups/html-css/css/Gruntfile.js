module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["."]
                },
                files: {
                    "profile.css": "profile.less"
                }
            }
        },
        watch: {
            scripts: {
                files: ['*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['less']);

};
