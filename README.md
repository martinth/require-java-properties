#require-java-properties

[![Build Status](https://travis-ci.org/martinth/require-java-properties.svg?branch=master)](https://travis-ci.org/martinth/require-java-properties)

> a transform for loading Java .properties files in RequireJS, using [java.properties.js][1]

## Install the plugin and its dependencies using bower
```sh
$ bower install java.properties.js --save
```
If you prefer a manual install, make sure to satisfy the `java.properties.js` and `text` dependencies.

## Simple usage
First, make sure the module names `java.properties.js` and `text` resolve to the proper locations:
```js
requirejs.config({
    paths : {
        'text': './bower_components/requirejs-text/text',
        'java.properties': './bower_components/java.properties.js/dist/amd/java.properties',
        'properties': './bower_components/require-java-properties/properties'
    }
});
```

Now you're ready to `require` Java .properties files as plain JavaScript objects:
```js
require('properties!some/folder/afile.properties', function(data){
    console.log(data); // => logs the transformed object
});
```
**NOTE**: In contrast to the default [java.properties.js][1] behaviour keys with dots in them will *not* result in nested
objects. So a properties key like:
```
key=12
key.with.dots=foobar 
```
Will result in this JavaScript object:
```js
{
    "key": 12,
    "key.with.dots": "foobar"
} 
```
This is due to the specific requirements for which this plugin was build.

## Build time
On build time you can simply use `stubModules` in your build config to get rid of the parser in the file you ship to production:
```js
({
    stubModules: ['text', 'java.properties', 'properties']
})
```

##License
MIT

##Attribution
This plugin is a based upon [require-yaml](https://github.com/m90/require-yaml).

[1]: https://github.com/mattdsteele/java-properties