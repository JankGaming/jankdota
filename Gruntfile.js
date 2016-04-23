module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    autoprefixer: {

      options: {

      },

      jankdota: {
        expand: true,
        flatten: false,
        src: 'public/style/dynamic/**/*.css'
      }
    },

    less: {

      development: {
        options: {
          paths: ['public-src/style/dynamic']
        },
        files: [{
          expand: true,
          cwd: 'public-src/style/dynamic',
          src: ['**/*.less'],
          dest: 'public/style/dynamic',
          ext: '.css'
        }]
      },

      production: {
        options: {
          paths: ['public-src/style/dynamic'],
          cleancss: true
        },
        files: [{
          expand: true,
          cwd: 'public-src/style/dynamic',
          src: ['**/*.less'],
          dest: 'public/style/dynamic',
          ext: '.css'
        }]
      }

    },

    clean: {
      all: [
        'public/style/dynamic', 
        'public/js', 
        'public/img/*.png', 
        'public/img/*.webm', 
        'public/favicon.ico'
      ]
    },

    uglify: {
      prod: {
        files: [{
          expand: true,
          cwd: 'public-src/js',
          src: '**/*.js',
          dest: 'public/js'
        }]
      }
    },

    copy: {
      development: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'public-src',
          src: [
            'js/**/*.js',
            'img/**/*'
          ],
          dest: 'public'
        }
        ]
      },
      production: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'public-src',
          src: [
            'img/**/*'
          ],
          dest: 'public'
        }
        ]
      }
    },

    watch: {
      styles: {
        files: ['public-src/style/dynamic/**/*.less'],
        tasks: ['buildstyles']
      },
      js: {
        files: ['public-src/js/**/*.js'],
        tasks: ['copy:development']
      },
      img: {
        files: ['public-src/img/**/*'],
        tasks: ['copy:development']
      }
    }

  });

  grunt.registerTask('buildstyles', 'Compile and autoprefix LESS to CSS', [
    'less:development',
    'autoprefixer'
  ]);

  grunt.registerTask('buildprod', 'Builds all files for prod deploys', [
    'clean',
    'less:production',
    'autoprefixer',
    'uglify',
    'copy:production'
  ]);

  grunt.registerTask('builddev', 'Builds all files for dev testing', [
    'clean',
    'buildstyles',
    'copy'
  ]);

  grunt.registerTask('work', 'Build and run app for development', [
    'clean',
    'builddev',
    'watch'
  ]);

};
