var random = {
    inSphere: function (radius) {
        var angle = Math.random() * Math.PI * 2;
        var unitVector = Math.random() * 2 - 1;

        return new THREE.Vector3(
            Math.cos(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius,
            Math.sin(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius,
            unitVector * radius);
    },

    inCube: function (size) {
        return new THREE.Vector3(
            Math.random() * size - size / 2,
	        Math.random() * size - size / 2,
	        Math.random() * size - size / 2);
    },

    inCylinder: function (radius, height) {
        var angle = Math.random() * Math.PI * 2;

        return new THREE.Vector3(
            Math.sqrt(Math.random()) * radius * Math.cos(angle),
            Math.sqrt(Math.random()) * radius * Math.sin(angle),
            (Math.random() * 2 - 1) * height);
    },

    inCone: function (radius, height) {
        var angle = Math.random() * Math.PI * 2;

        var z = (Math.random() * 2 - 1) * height;

        return new THREE.Vector3(
            Math.sqrt(Math.random()) * (height - z) * Math.cos(angle),
            Math.sqrt(Math.random()) * (height - z) * Math.sin(angle),
            z);
    },

    inEllipsoid: function(radius1, radius2, radius3) {
        var angle = Math.random() * Math.PI * 2;
        var unitVector = Math.random() * 2 - 1;

        return new THREE.Vector3(
            Math.cos(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius1,
            Math.sin(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius2,
            unitVector * radius3);
    }
}
