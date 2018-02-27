"use strict";

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require("jit-grunt")(grunt, {
        buildcontrol: "grunt-build-control",
        nugetpack: "grunt-nuget",
        nugetpush: "grunt-nuget"
    });
    require("time-grunt")(grunt); // Time how long tasks take. Can help when optimizing build times

    const config = {
        pkg: grunt.file.readJSON("package.json"),
        paths: {
            src: "src",
            build: "dist",
            temp: ".temp",
            test: "test"
        },

        options: {
            dev: grunt.option("dev")
        }
    }

    //#region TypeScript

    config.ts = {
        options: {
            fast: "never"
        },
        dev: {
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
    };

    config.tslint = {
        options: {
            configuration: "tslint.json"
        },
        dev: {
            src: "<%= paths.src %>/**/*.ts"
        },
        test: {
            src: "<%= paths.test %>/**/*.ts"
        }
    };

    //#endregion

    //#region Tests

    config.connect = {
        test: {
            options: {
                port: "8080",
                open: "http://localhost:8080/test/index.html",
                keepalive: true
            }
        }
    };

    config.mocha = {
        test: ["<%= paths.test %>/index.html"]
    };

    //#endregion

    //#region Clean

    config.clean = {
        dev: [
            "<%= paths.src %>/**/*.d.ts",
            "<%= paths.src %>/**/*.js",
            "<%= paths.src %>/**/*.js.map"
        ],
        dist: [
            "<%= paths.build %>"
        ],
        test: [
            "<%= paths.test %>/**/*.d.ts",
            "<%= paths.test %>/**/*.js",
            "<%= paths.test %>/**/*.js.map"
        ],
        temp: [
            "<%= paths.temp %>/**/*.*"
        ]
    };

    //#endregion

    //#region Watch

    config.watch = {
        tslint: {
            files: ["<%= tslint.dev.src %>"],
            tasks: ["tslint:dev"]
        },
        test: {
            files: ["<%= paths.test %>/*.*"],
            tasks: ["test"]
        },
        gruntfile: {
            files: ["Gruntfile.js"]
        }
    };

    //#endregion

    //#region Publish

    config.nugetpack = {
        all: {
            src: "nuget/*.nuspec",
            dest: "nuget/",

            options: {
                version: "<%= pkg.version %>"
            }
        }
    };

    config.nugetpush = {
        all: {
            src: "nuget/*.<%= pkg.version %>.nupkg"
        }
    };

    config.buildcontrol = {
        options: {
            commit: true,
            push: true,
            tag: "<%= pkg.version %>",
            remote: "<%= pkg.repository.url %>",
            branch: "release"
        },

        dist: {
            options: {
                dir: "<%= paths.build %>",
                message: "Release v<%= pkg.version %>"
            }
        }
    };

    //#endregion

    //#region Custom Tasks

    grunt.registerTask("npm-publish", function () {
        var done = this.async();

        grunt.util.spawn(
            {
                cmd: "npm",
                args: ["publish"],
                opts: {
                    cwd: config.paths.build
                }
            },
            function (err, result, code) {
                if (err) {
                    grunt.log.error();
                    grunt.fail.warn(err, code);
                }

                if (code !== 0) {
                    grunt.fail.warn(result.stderr || result.stdout, code);
                }

                grunt.verbose.writeln(result.stdout);
                grunt.log.ok("NPM package " + config.pkg.version + " successfully published");

                done();
            }
        );
    });

    grunt.registerTask("assets", function () {
        copyPackage("package.json");
        copyPackage("bower.json");

        copyFile("README.md");
        copyFile("LICENSE");

        writeDest(".gitignore", "node_modules/\nbower_components/");
    });

    function copyPackage(src) {
        const
            pkg = grunt.file.readJSON(src),
            dest = config.paths.build + "/" + src;

        delete pkg.scripts;
        delete pkg.devDependencies;

        writeDest(src, JSON.stringify(pkg, null, 2));
    }

    function writeDest(name, content) {
        const dest = config.paths.build + "/" + name;
        grunt.file.write(dest, content);
        grunt.log.ok(dest + " created !");
    }

    function copyFile(src) {
        const dest = config.paths.build + "/" + src;
        grunt.file.copy(src, dest);
        grunt.log.ok(dest + " created !");
    }

    //#endregion

    grunt.initConfig(config);

    grunt.registerTask("dev", ["clean:dev", "tslint:dev", "ts:dev"]);
    grunt.registerTask("build", ["clean:dist", "tslint:dev", "ts:dist", "assets"]);
    grunt.registerTask("test", ["dev", "tslint:test", "ts:test", "mocha:test", "clean"]);

    grunt.registerTask("nuget", ["nugetpack", "nugetpush"]);
    grunt.registerTask("publish", ["build", "nuget", "buildcontrol:dist", "npm-publish"]);

    grunt.registerTask("default", ["test", "build"]);
};