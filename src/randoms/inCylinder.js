'use strict';
 
export default function inCylinder(radius, height) {
    var angle = Math.random() * Math.PI * 2;

    return new THREE.Vector3(
        Math.sqrt(Math.random()) * radius * Math.cos(angle),
        Math.sqrt(Math.random()) * radius * Math.sin(angle),
        (Math.random() * 2 - 1) * height);
}