'use strict';

export default function inCube(size) {
    return new THREE.Vector3(
        Math.random() * size - size / 2,
        Math.random() * size - size / 2,
        Math.random() * size - size / 2);
}