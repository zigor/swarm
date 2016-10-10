'use strict';

import randoms from './randoms';
import Swarm from './swarm';

var radius = 200;


var transformations = [
    (_) => _.to(() => { return randoms.inSphere(radius - 100 + Math.random() * radius) }, null, 3000),
    (_) => _.to(() => { return randoms.inCube(radius - 100 + Math.random() * radius) }, null, 3000),
    (_) => _.to(() => { return randoms.inCone(radius - 100 + Math.random() * radius, 500) }, null, 3000),
    (_) => _.to(() => { return randoms.inCylinder(radius - 100 + Math.random() * radius, 500) }, null, 3000),
    (_) => _.to(() => { return randoms.inEllipsoid(radius - 100 + Math.random() * radius, 500, 200) }, null, 3000),
];



var _ = new Swarm(document.getElementById('container'), "sample", 10000);

var go = function () {
    (randoms.inArray(transformations)(_))
        .then(function () {
            go();
        });
};

go();


