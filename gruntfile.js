module.exports = function (grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: '.',
          keepalive: true,
          port: 9000,
          open: true
        }
      }
    },
    browserSync: {
      bsFiles: {
        src: ['*.html', '*.css', 'src/*.js', 'spec/*.js']
      },
      options: {
        server: '.',
        open: true
      }
    }
  });
  grunt.registerTask('default', ['browserSync']);
};
