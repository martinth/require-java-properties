require(['properties!test/fixtures/test.properties'], function (data) {
	var headline = document.createElement('h1');
    headline.innerHTML = data['deeply.nested.object'];
	headline.id = 'fixture';
	document.body.appendChild(headline);
});