var requirejs = require('requirejs');
var assert = require('assert');

requirejs.config({
    nodeRequire: require,
    baseUrl: '.',
    paths: {
        'text': './bower_components/requirejs-text/text',
        'java.properties': './bower_components/java.properties.js/dist/amd/java.properties',
        'properties': './properties'
	}
});

describe('properties loader', function () {

    it('should render java properties into JavaScript objects', function (done) {
        requirejs(['properties!test/fixtures/test.properties'], function (data) {
			assert.deepEqual(data, {
                short: 'text',
                pi: 3.14,
                lang: 'en',
                longtext: 'This text is over multiple lines.',
                paramText: 'Text with dynamic parameters: {0}',
                unicodeText: 'a smiley: ☺',
                'deeply.nested.object': 'value'
			});
			done();
		});
	});

	it('should call the errback on malformed input', function(done){
        requirejs(['properties!test/fixtures/invalid.properties'], function () {
			assert(false);
			done();
		}, function(err){
			assert(true);
			done();
		});
	});

});

describe('properties writer', function (done) {
    it('compiles java properties into dependency-less modules', function (done) {

		this.timeout(7500);

        requirejs.optimize({
            baseUrl: '.',
            name: './bower_components/almond/almond',
            paths: {
                'text': './bower_components/requirejs-text/text',
                'java.properties': './bower_components/java.properties.js/dist/amd/java.properties',
                'properties': './properties'
            },
            optimize: 'none',
            include: ['./test/main'],
            stubModules: ['text', 'java.properties', 'properties'],
            out: 'test/main-built.js'
        }, function () {
            var exec = require('child_process').exec;
            var process = exec('phantomjs test/loadindex.js', function (err, stdout) {
                if (err) {
                    assert(false);
                } else {
                    assert(stdout.indexOf('<h1 id="fixture">value</h1>') > -1);
                }
                done();
            });
        });

	});
});
