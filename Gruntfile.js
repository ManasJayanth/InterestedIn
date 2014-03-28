module.exports = function(grunt) {

    'use strict';
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            options: {
                jshintrc:true
            },
            all: ['Gruntfile.js', '*.js', '*/*.js']
        },
        
        clean: {
            // Clean any pre-commit hooks in .git/hooks directory
            hooks: ['.git/hooks/pre-commit']
        },

        jsdoc : {
            dist : {
                src: ['Gruntfile.js', '<%= jsSrcPath %>/*.js'],
                options: {
                    destination: 'doc/html'
                }
            }
        },

        // Run shell commands
        shell: {
            hooks: {
                // Copy the project's pre-commit hook into .git/hooks
                command: 'cp git-hooks/pre-commit .git/hooks/pre-commit'
            }
        },

        watch: {
            scripts: {
                files: ['*', '*/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Install pre-commit hooks
    grunt.registerTask('hookmeup', ['clean:hooks', 'shell:hooks']);
};
