'use strict';

export default function inCone(radius, height) {
    var angle = Math.random() * Math.PI * 2;

    var z = (Math.random() * 2 - 1) * height;

    return new THREE.Vector3(
        Math.sqrt(Math.random()) * (height - z) * Math.cos(angle),
        Math.sqrt(Math.random()) * (height - z) * Math.sin(angle),
        z);
}