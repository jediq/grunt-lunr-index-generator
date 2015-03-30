/*
 * grunt-lunr-index-generator
 * https://github.com/jediq/documento/grunt-lunr-index-generator
 *
 * Copyright (c) 2015 Ricky Walker
 * Licensed under the MIT license.
 */

'use strict';

var lunr = require('lunr');
var cheerio = require('cheerio');

module.exports = function(grunt) {

  function getMethods(obj) {
    var result = [];
    for (var id in obj) {
      try {
        if (typeof(obj[id]) === "function") {
          result.push(id + ": " + obj[id].toString());
        }
      } catch (err) {
        result.push(id + ": inaccessible");
      }
    }
    return result;
  }

  function generateMarkdownDoc(body, doc) {
    var h1s = [];
    var h2s = [];
    var h3s = [];

    body.split('\n').forEach(function (line) {
      if (line.lastIndexOf('###', 0) === 0) {
        h3s.push(line);
      } else if (line.lastIndexOf('##', 0) === 0) {
        h2s.push(line);
      } else if (line.lastIndexOf('#', 0) === 0) {
        h1s.push(line);
      }
      doc.h1 = h1s.join(',');
      doc.h2 = h2s.join(',');
      doc.h3 = h3s.join(',');
    });
  }

  function generateHtmlDoc(body, doc) {
    var $ = cheerio.load(body);

    doc.title = $('title').text();
    doc.h1s = $('h1').map(function(i, element){return $(element).text();}).get().join(",");
    doc.h2s = $('h2').map(function(i, element){return $(element).text();}).get().join(",");
    doc.h3s = $('h3').map(function(i, element){return $(element).text();}).get().join(",");
  }

  grunt.registerMultiTask('lunr_index_generator',
      'A Grunt plugin to generate a lunr.js index files from markdown and html files.',
      function() {

    var idx = lunr(function () {
      this.field('name', { boost: 10 });
      this.field('title', { boost: 10 });
      this.field('h1', { boost: 8 });
      this.field('h2', { boost: 5 });
      this.field('h3', { boost: 3 });
      this.field('body');
    });

    this.files.forEach(function (fileGroup) {

      fileGroup.src.forEach(function(file) {

        var fileExt = file.split('.').pop();
        var body = grunt.file.read(file);

        var doc = {
          id:file,
          name:file,
          h1:'',
          h2:'',
          h3:'',
          body:body
        };

        if (fileExt === 'md' || fileExt === 'markdown') {
          generateMarkdownDoc(body, doc);
          idx.add(doc);
        }

        if (fileExt === 'html') {
          generateHtmlDoc(body, doc);
          idx.add(doc);
        }

      });

      var asJson = JSON.stringify(idx.toJSON());
      grunt.file.write(fileGroup.dest, asJson);


    });




  });

};
