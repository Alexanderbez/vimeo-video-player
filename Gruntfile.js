module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      default: {
        port: 1337,
        base: ''
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      files: {
        expand: true,
        cwd: 'app/src',
        src: ['**/*.js'],
        dest: 'app/js',
        ext: '-compiled.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-connect');
  grunt.registerTask('default', ['babel', 'connect:default']);
};
