module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-env');
  grunt.initConfig({
    env: {
      test: {
        NODE_ENV: 'test',
      },
      prod: {
        NODE_ENV: 'production',
      },
    },
    run: {
      build: {
        cmd: 'npm',
        args: ['run', 'build'],
      },
      test: {
        cmd: 'npm',
        args: ['run', 'test'],
      },
      start: {
        cmd: 'npm',
        args: ['run', 'start'],
      },
    },
  });
  grunt.registerTask('build', ['run:build']);
  grunt.registerTask('test', ['env:test', 'run:test']);
  grunt.registerTask('start', ['run:start']);
  grunt.registerTask('automate', ['run:build', 'env:test', 'run:test', 'env:prod', 'run:start']);
};
