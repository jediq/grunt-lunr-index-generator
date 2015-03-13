/*
 * grunt-lunr-index-generator
 * https://github.com/jediq/documento/grunt-lunr-index-generator
 *
 * Copyright (c) 2015 Ricky Walker
 * Licensed under the MIT license.
 */

'use strict';

var lunr = require('lunr');


module.exports = function(grunt) {

  grunt.registerMultiTask('lunr_index_generator', 'The best Grunt plugin ever.', function() {


    var idx = lunr(function () {
      this.field('name', { boost: 10 });
      this.field('h1', { boost: 8 });
      this.field('h2', { boost: 5 });
      this.field('h3', { boost: 3 });
      this.field('body');
    });

    this.files.forEach(function (fileGroup) {

      fileGroup.src.forEach(function(file) {

        grunt.log.write('Parsing : ' + file);

        var body = grunt.file.read(file);
        var h1s = [];
        var h2s = [];
        var h3s = [];

        body.split('\n').forEach(function(line) {
          if (line.lastIndexOf('###', 0) === 0) {
            h3s.push(line);
          } else if (line.lastIndexOf('##', 0) === 0) {
            h2s.push(line);
          } else if (line.lastIndexOf('#', 0) === 0) {
            h1s.push(line);
          }

        });

        var doc = {
          name:file,
          h1:h1s.join(','),
          h2:h2s.join(','),
          h3:h3s.join(','),
          body:body
        };
        idx.add(doc);

      });

      var asJson = JSON.stringify(idx.toJSON());
      grunt.file.write(fileGroup.dest, asJson);


    });


  });

};
