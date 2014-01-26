'use strict';

module.exports = function (grunt) {


var pushState = require('grunt-connect-pushstate/lib/utils').pushState;

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      target: {
        tasks:   ['less'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      style: {
        files: ['styles/less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
      scripts: {
        files: ['js/src/*/*.js', 'js/src/app.js', '*.html', 'views/*.html'],
        tasks: ['concat:services', 'concat:controllers', 'concat:directives'],
        options: {
          livereload: true,
        }
      }
    },

    // The actual grunt server settings
    connect: {
        server: {
          options: {
            port: 1337,
            livereload: 35729,
            base: '.',
            logger: 'dev',
            hostname: '*',
            open: true
          },
          middleware: function(connect, options) {
            return [
              pushState(),
              connect.static(options.base)
            ];
          }
        }
    },

    less: {
      development: {
        options: {
          compress: true,
          paths: ["styles/less/modules/"]
        },
        files: {
          "styles/css/style.css": "styles/less/style.less"
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      libs: {
        src: [
          'libs/lodash/dist/lodash.compat.min.js',
          'libs/modernizr/modernizr-custom.js',
          'libs/angular/angular.min.js',
          'libs/angular-*/*.min.js',
          'libs/restangular/dist/restangular.min.js'
        ],
        dest: 'js/build/libs.js'
      },
      directives: {
        src: [
        'js/src/directives/*.js', 'js/src/directives/*/*.js'
        ],
        dest: 'js/build/directives.js'
      },
      controllers: {
        src: [
        'js/src/controllers/*.js', 'js/src/controllers/*/*.js'
        ],
        dest: 'js/build/controllers.js'
      },
      services: {
        src: [
        'js/src/services/*.js', 'js/src/services/*/*.js'
        ],
        dest: 'js/build/services.js'
      },
      filters: {
        src: [
        'js/src/filters/*.js', 'js/src/filters/*/*.js'
        ],
        dest: 'js/build/filters.js'
      }
    },

      modernizr: {
        "devFile" : "libs/modernizr/modernizr.js",
        "outputFile" : "libs/modernizr/modernizr-custom.js",
        "uglify" : true
      },
      mkdir: {
        all: {
          options: {
            create: ['js/build']
          },
        },
      },
    });

grunt.registerTask('serve', function () {
  grunt.task.run([
    'mkdir',
    'concat:libs',
    'concat:controllers',
    'concat:directives',
    'concat:services',
    'less',
    'connect:server',
    'watch',
    ]);
});

grunt.registerTask('server', function () {
  grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
  grunt.task.run(['serve']);
});

};
