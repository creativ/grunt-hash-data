# hash-data

> Add rev to filename based on file content hashsum.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install hash-data --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('hash-data');
```

## The "hash_data" task

### Overview
This task will revision your files based on its contents. You should then set the file and hash options.

### Example
```js
grunt.initConfig({
  hash_data: {
    files_list: {
      src: ['Project/index.html', 'Project/js/script.js']
        dest: 'Project/build'
    },
    options: {
      affix: 'prefix',
      separator: '-',
      length: 6,
      algorithm: 'sha1',
      summary: 'summary.json',
      after: function(summary, options) {
        // Callback
      }
    }
  }
})
```

### Options

#### options.algorithm
Type: `String`
Default value: `'md5'`

`algorithm` is dependent on the available algorithms supported by the version of OpenSSL on the platform. Examples are `'sha1'`, `'md5'`, `'sha256'`, `'sha512'`, etc. On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.

#### options.length
Type: `Number`
Default value: `'8'`

The number of characters of the file content hash to affix the file name with.

#### options.encoding
Type: `String`
Default value: `'utf8'`

The encoding of the file contents.

#### options.separator
Type: `String`
Default value: `'.'`

A string value that is used to do something with whatever.

#### options.affix
Type: `String`
Default value: `'prefix'`

A string value that is used to do something else with whatever else.

#### options.summary
Type: `String`
Default value: `'prefix'`

Summary file path. The content look like that:
```js
{
    "index.html": {
        "hash": "b275f5",
        "absPath": "/home/user/Project/b275f5.index.html",
        "relPath": "b275f5.index.html"
    },
    "js/script.js": {
        "hash": "cad805",
        "absPath": "/home/user/Project/js/cad805.script.js",
        "relPath": "js/cad805.script.js"
    }
}
```

## Release History
- **v0.0.1**, *July 2013*
  - Big Bang
