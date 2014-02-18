'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // Load grunt tasks automatically
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    var options = {
        dev: grunt.option('dev')
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Configurable paths
        paths: {
            src: 'src',
            build: 'dist',
            temp: '.temp',
            test: 'test'
        },

        typescript: {
            options: {
                target: "es3",
                module: "amd",
                sourcemap: false,
                declaration: false,
                comments: false,
                disallowbool: true,
                disallowimportmodule: true
            },
            dev: {
                src: "<%= paths.src %>/**/*.ts",
                options: {
                    sourcemap: true
                }
            },
            test: {
                src: "<%= paths.test %>/**/*.ts"
            },
            dist: {
                src: "<%= paths.src %>/**/*.ts",
                dest: "<%= paths.build %>/",
                options: {
                    base_path: '<%= paths.src %>'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: "jshint.json",
            },

            base: ["*.js"],
            dev: ["<%= paths.src %>/**/*.js"],
            dist: ["<%= paths.build %>/**/*.js"],
            test: ["<%= paths.test %>/**/*.js"]
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            dev: {
                src: "<%= paths.src %>/**/*.ts"
            },
            test: {
                src: "<%= paths.test %>/**/*.ts"
            }
        },

        connect: {
            test: {
                options: {
                    port: "8080",
                    open: "http://localhost:8080/tests/index.html",
                    keepalive: true
                }
            }
        },

        mocha: {
            test: ["<%= paths.test %>/index.html"]
        },

        clean: {
            dev: [
                "<%= paths.src %>/**/*.d.ts",
                "!<%= paths.src %>/math.d.ts",
                "<%= paths.src %>/**/*.js",
                "<%= paths.src %>/**/*.js.map"
            ],
            test: [
                "<%= paths.test %>/**/*.d.ts",
                "<%= paths.test %>/**/*.js",
                "<%= paths.test %>/**/*.js.map"
            ],
        },

        watch: {
            tslint: {
                files: ['<%= tslint.dev.src %>'],
                tasks: ['tslint:dev']
            },
            jshint: {
                files: ['<%= jshint.dev.src %>'],
                tasks: ['jshint:dev']
            },
            test: {
                files: ['<%= paths.test %>/*.*'],
                tasks: ['test']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        }
    });

    grunt.registerTask("build", ["tslint:dev", "typescript:dist", "jshint:dist"]);
    grunt.registerTask("dev", ["tslint:dev", "typescript:dev", "jshint:dev"]);
    grunt.registerTask("test", ["dev", "tslint:test", "typescript:test", "jshint:test", "mocha:test"]);

    grunt.registerTask("default", ["clean", "test", "build"]);
};