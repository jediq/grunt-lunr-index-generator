/*
 * grunt-lunr-index-generator
 * https://github.com/jediq/documento/grunt-lunr-index-generator
 *
 * Copyright (c) 2015 Ricky Walker
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.log.ok('Processing plugin.');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('lunr_index_generator', 'The best Grunt plugin ever.', function() {
    grunt.log.ok('Processing plugin.');
    var files = this.filesSrc,
        options = this.options({}),
        dest = this.data.dest;

    files.forEach(function(filepath){
      grunt.log.ok('Processing file: ' + filepath);


    });

    grunt.log.ok('Processing files: ' + files);
  });

};
