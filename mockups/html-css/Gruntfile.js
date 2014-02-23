module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['css/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            },
        },
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/profile.css": "css/profile.less"
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.registerTask('default', ['']);

};
