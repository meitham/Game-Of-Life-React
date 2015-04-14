module.exports = function (grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.initConfig({
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
