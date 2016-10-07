function Sample(sampleCount) {

    var count = sampleCount;
    var positions = new Float32Array(count * 3);
    var colors = new Float32Array(count * 3);

    var positionRule = null;
    var colorRule = null;

    var zero = new THREE.Vector3(0, 0, 0);
    var white = new THREE.Color().setRGB(1, 1, 1);   

    var funcs = {
        getPoints: function () {
            return positions.slice(0);
        },

        getColors: function () {
            return colors.slice(0);
        },

        setPositionRule: function (producePositionRule) {

            positionRule = producePositionRule;

            for (var i = 0; i < count; i += 3) {

                var v3 = positionRule();

                positions[i] = v3.x;
                positions[i + 1] = v3.y;
                positions[i + 2] = v3.z;
            }

            return this;
        },

        setColorRule: function (produceColorRule) {
            colorRule = produceColorRule;

            for (var i = 0; i < count; i += 3) {

                var rgb = colorRule(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));

                colors[i] = rgb.r;
                colors[i + 1] = rgb.g;
                colors[i + 2] = rgb.b;
            }

            return this;
        }
    }

    funcs.setPositionRule(function () { return zero });

    funcs.setColorRule(function () { return white });

    return funcs;
};
