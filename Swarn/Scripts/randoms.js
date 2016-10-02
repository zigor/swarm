var random = {
    onSphere: function (radius) {
        var angle = Math.random() * Math.PI * 2;
        var unitVector = Math.random() * 2 - 1;

        return new THREE.Vector3(
            Math.cos(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius,
            Math.sin(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius,
            unitVector * radius);
    },
    
    onCube: function (size) {
        return new THREE.Vector3(
            Math.random() * size - size / 2,
	    Math.random() * size - size / 2,
	    Math.random() * size - size / 2);
    }
}
