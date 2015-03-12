/*
 * grunt-lunr-index-generator
 * https://github.com/jediq/documento/grunt-lunr-index-generator
 *
 * Copyright (c) 2015 Ricky Walker
 * Licensed under the MIT license.
 */

'use strict';

var lunr = require('./lib/lunr.js');


module.exports = function(grunt) {

  grunt.registerMultiTask('lunr_index_generator', 'The best Grunt plugin ever.', function() {


    var idx = lunr(function () {
      this.field('title', { boost: 10 })
      this.field('body')
    })

    this.files.forEach(function (fileGroup) {

      fileGroup.src.forEach(function(file) {


        grunt.log.ok('loading : ' + file);

        var doc = {
          title:file,
          body:grunt.file.read(file)
        };
        idx.add(doc);

      });

      var asJson = JSON.stringify(idx.toJSON());
      grunt.file.write(fileGroup.dest, asJson);


    });


  });

};
