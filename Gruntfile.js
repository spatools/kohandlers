'use strict';

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require("jit-grunt")(grunt, {
        nugetpack: "grunt-nuget",
        nugetpush: "grunt-nuget"
    });
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    var options = {
        dev: grunt.option('dev')
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),
        paths: {
            src: 'src',
            build: 'dist',
            temp: '.temp',
            test: 'test'
        },

        ts: {
            options: {
                fast: "never"
                // target: "es3",
                // module: "umd",
                // moduleResolution: "node",
                // sourceMap: false,
                // declaration: false,
                // removeComments: true
            },
            dev: {
                // src: "<%= paths.src %>/**/*.ts",
                tsconfig: {
                    tsconfig: "tsconfig.json",
                    updateFiles: false,
                    passThrough: true
                },
                options: {
                    additionalFlags: "--sourceMap"
                }
            },
            test: {
                tsconfig: {
                    tsconfig: "<%= paths.test %>/tsconfig.json",
                    updateFiles: false,
                    passThrough: true
                },
                options: {
                    additionalFlags: "--sourceMap"
                }
            },
            dist: {
                tsconfig: {
                    tsconfig: "tsconfig.json",
                    updateFiles: false,
                    passThrough: true
                },
                options: {
                    additionalFlags: "--outDir <%= paths.build %> --declaration"
                }
            }
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
                    open: "http://localhost:8080/test/index.html",
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
                "<%= paths.src %>/**/*.js",
                "<%= paths.src %>/**/*.js.map"
            ],
            test: [
                "<%= paths.test %>/**/*.d.ts",
                "<%= paths.test %>/**/*.js",
                "<%= paths.test %>/**/*.js.map"
            ],
            temp: [
                "<%= paths.temp %>/**/*.*"
            ]
        },

        nugetpack: {
            all: {
                src: "nuget/*.nuspec",
                dest: "nuget/",

                options: {
                    version: "<%= pkg.version %>"
                }
            }
        },
        nugetpush: {
            all: {
                src: "nuget/*.<%= pkg.version %>.nupkg"
            }
        },

        watch: {
            tslint: {
                files: ['<%= tslint.dev.src %>'],
                tasks: ['tslint:dev']
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

    grunt.registerTask("build", ["tslint:dev", "ts:dist"]);
    grunt.registerTask("dev", ["tslint:dev", "ts:dev"]);
    grunt.registerTask("test", ["dev", "tslint:test", "ts:test", "mocha:test", "clean"]);
    grunt.registerTask("nuget", ["nugetpack", "nugetpush"]);

    grunt.registerTask("default", ["clean", "test", "build"]);
};