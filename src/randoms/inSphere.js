'use strict';

export default function inSphere(radius) {
    var angle = Math.random() * Math.PI * 2;
    var unitVector = Math.random() * 2 - 1;

    return new THREE.Vector3(
        Math.cos(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius,
        Math.sin(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius,
        unitVector * radius);
};