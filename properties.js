define(['text', 'java.properties'], function (text, javaProperties) {
    var buildMap = {};

    var flattenObject = function (ob) {
        return Object.keys(ob).reduce(function (toReturn, k) {
            if ((typeof ob[k]) === 'object' && ob[k]) {
                var flatObject = flattenObject(ob[k]);
                Object.keys(flatObject).forEach(function (k2) {
                    toReturn[k + '.' + k2] = flatObject[k2];
                });
            }
            else {
                toReturn[k] = ob[k];
            }

            return toReturn;
        }, {});
    };

	return {
        write: function (pluginName, name, write) {
            if (name in buildMap) {
                write('define("' + pluginName + '!' + name + '", function(){ return ' + JSON.stringify(buildMap[name]) + '; });\n');
			}
        },
        load: function (name, parentRequire, onload, config) {
            text.get(parentRequire.toUrl(name), function (propertiesString) {
                try {
                    var result = javaProperties.propertiesToObject(propertiesString);
                    var flattened = flattenObject(result);
                    buildMap[name] = flattened;
                    onload(flattened);
				} catch (e){
					onload.error(e);
				}
			});

		}
        , version: '0.1.0'
	};
});
