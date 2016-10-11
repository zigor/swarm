'use strict';

import randoms from './randoms';
import Swarm from './swarm';

var radius = 600;


var transformations = [
    (_) => _.to(() => { return randoms.inSphere(radius - 100 + Math.random() * radius) }, null, 3000, randomEffect()),
    (_) => _.to(() => { return randoms.inCube(radius - 100 + Math.random() * radius) }, null, 3000, randomEffect()),
    (_) => _.to(() => { return randoms.inCone(radius - 100 + Math.random() * radius, 600) }, null, 3000, randomEffect()),
    (_) => _.to(() => { return randoms.inCylinder(radius - 100 + Math.random() * radius, 500) }, null, 3000, randomEffect()),
    (_) => _.to(() => { return randoms.inEllipsoid(radius - 100 + Math.random() * radius, 500, 300) }, null, 3000, randomEffect()),
];

var effect = [
    TWEEN.Easing.Bounce,
    TWEEN.Easing.Linear, 
    TWEEN.Easing.Quadratic, 
    TWEEN.Easing.Cubic, 
    TWEEN.Easing.Quartic, 
    TWEEN.Easing.Quintic, 
    TWEEN.Easing.Sinusoidal, 
    TWEEN.Easing.Exponential, 
    TWEEN.Easing.Circular, 
    TWEEN.Easing.Elastic, 
    TWEEN.Easing.Back
];

var effectDirection = [ "In", "Out", "InOut" ]

var randomEffect = function() {
    return randoms.inArray(effect)[randoms.inArray(effectDirection)]
}

var _ = new Swarm(document.getElementById('container'), "sample", 50000);

var go = function () {
    (randoms.inArray(transformations)(_))
        .then(function () {
            go();
        });
};

go();


