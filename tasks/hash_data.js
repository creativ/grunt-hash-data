/*
 * hash-data
 * https://github.com/creativ/grunt-hash-data
 *
 * Copyright (c) 2013 Dmitriy Tkalich
 * Licensed under the MIT license.
 */

'use strict';

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  var _ = grunt.util._;
  var createHash = function(filepath, algorithm, fileEncoding) {
    var hash = crypto.createHash(algorithm);
    grunt.log.verbose.write('Calculating hashsum of ' + filepath + '...');
    hash.update(grunt.file.read(filepath), fileEncoding);
    return hash.digest('hex');
  }

  grunt.registerMultiTask('hash_data', 'Your task description goes here.', function() {

    var options = this.options({
      affix: 'prefix',
      algorithm: 'md5',
      encoding: 'utf8',
      length: 8,
      separator: '.'
    });
    var summary = {};

    this.files.forEach(function(f) {
      var move = true;
      if(f.dest) {
        try {
          var stat = fs.lstatSync(f.dest);
          if (stat && !stat.isDirectory()) {
            grunt.fail.fatal('Destination %s is not a directory', f.dest);
          }
        } catch (err) {
          grunt.log.writeln('Destination dir ' + f.dest + ' does not exists: creating...');
          grunt.file.mkdir(f.dest);
        }
        move = false;
      }

      f.src.forEach(function(filename) {
        var dest = f.dest || path.dirname(filename);
        var hash = createHash(filename, options.algorithm, options.encoding).slice(0, options.length);
        var ext = path.extname(filename);
        var new_name = options.affix == 'prefix'
                      ? [hash, path.basename(filename)].join(options.separator)
                      : [path.basename(filename, ext), hash].join(options.separator) + ext;
        var outPath;
        var relPath;

        if(move) {
          relPath = [path.dirname(filename), new_name].join('/');
          outPath = path.resolve(path.dirname(filename), new_name);
          fs.renameSync(filename, outPath);
          grunt.log.writeln('✔ '.green + filename + (' renamed to ').grey + relPath);
        } else {
          relPath = [f.dest, new_name].join('/');;
          outPath = path.resolve(f.dest, new_name);
          grunt.file.copy(filename, outPath);
          grunt.log.writeln('✔ '.green + filename + (' copied to ').grey + relPath);
        }

        summary[filename] = {
          "hash": hash,
          "absPath": outPath,
          "relPath": relPath
        };
      });
    });

    if(options.summary) {
      grunt.file.write(options.summary, JSON.stringify(summary));
    }
    if(_.isFunction(options.after)) {
      options.after(summary, options);
    }
  });
};
