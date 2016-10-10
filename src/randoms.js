'use strict';

import _inCone from './randoms/inCone';
import _inCube from './randoms/inCube';
import _inCylinder from './randoms/inCylinder';
import _inEllipsoid from './randoms/inEllipsoid';
import _inSphere from './randoms/inSphere';
import _inArray from './randoms/inArray';

export default class randoms { 
    static inCone() { return _inCone.apply(null, arguments) } 
    static inCube() { return _inCube.apply(null, arguments) }     
    static inCylinder() { return _inCylinder.apply(null, arguments) } 
    static inEllipsoid() { return _inEllipsoid.apply(null, arguments) } 
    static inSphere() { return _inSphere.apply(null, arguments) }

    static inArray() { return _inArray.apply(null, arguments) } 
};