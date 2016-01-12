# grunt-lunr-index-generator

[![Build Status](https://travis-ci.org/jediq/grunt-lunr-index-generator.svg?branch=master)](https://travis-ci.org/jediq/grunt-lunr-index-generator)

> A Grunt plugin to generate a [lunr.js](http://lunrjs.com/) index file from markdown and html files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-lunr-index-generator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lunr-index-generator');
```

## The "lunr_index_generator" task

### Overview
In your project's Gruntfile, add a section named `lunr_index_generator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  lunr_index_generator: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
      lunr_index_generator: {
          your_target: {
              src: ['docs/*.md', 'docs/*.html'],
              dest: 'dist/lunr.json'
          }
      },
});
```

### Options

#### src
The source location(s) of the markdown and/or html files.

#### dest
The destination to write the lunr index.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.0 Initial Release
* 0.1.1 Documentation Changes
* 0.1.2 Git root change
* 0.1.3 Added HTML file parsing
