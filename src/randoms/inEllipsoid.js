'use strict';

export default function inEllipsoid(radius1, radius2, radius3) {
    var angle = Math.random() * Math.PI * 2;
    var unitVector = Math.random() * 2 - 1;

    return new THREE.Vector3(
        Math.cos(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius1,
        Math.sin(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius2,
        unitVector * radius3);
}