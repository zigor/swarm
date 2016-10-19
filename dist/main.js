(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

function inCone(radius, height) {
    var angle = Math.random() * Math.PI * 2;

    var z = (Math.random() * 2 - 1) * height;

    return new THREE.Vector3(
        Math.sqrt(Math.random()) * (height - z) * Math.cos(angle),
        Math.sqrt(Math.random()) * (height - z) * Math.sin(angle),
        z);
}

function inCube(size) {
    return new THREE.Vector3(
        Math.random() * size - size / 2,
        Math.random() * size - size / 2,
        Math.random() * size - size / 2);
}

function inCylinder(radius, height) {
    var angle = Math.random() * Math.PI * 2;

    return new THREE.Vector3(
        Math.sqrt(Math.random()) * radius * Math.cos(angle),
        Math.sqrt(Math.random()) * radius * Math.sin(angle),
        (Math.random() * 2 - 1) * height);
}

function inEllipsoid(radius1, radius2, radius3) {
    var angle = Math.random() * Math.PI * 2;
    var unitVector = Math.random() * 2 - 1;

    return new THREE.Vector3(
        Math.cos(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius1,
        Math.sin(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius2,
        unitVector * radius3);
}

function inSphere(radius) {
    var angle = Math.random() * Math.PI * 2;
    var unitVector = Math.random() * 2 - 1;

    return new THREE.Vector3(
        Math.cos(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius,
        Math.sin(angle) * Math.sqrt(1 - Math.pow(unitVector, 2)) * radius,
        unitVector * radius);
}

function inArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

class randoms { 
    static inCone() { return inCone.apply(null, arguments) } 
    static inCube() { return inCube.apply(null, arguments) }     
    static inCylinder() { return inCylinder.apply(null, arguments) } 
    static inEllipsoid() { return inEllipsoid.apply(null, arguments) } 
    static inSphere() { return inSphere.apply(null, arguments) }

    static inArray() { return inArray.apply(null, arguments) } 
}

if (!Float32Array.prototype.slice) {
    Float32Array.prototype.slice = function (start, end) {
        var that = this;
        if (end == undefined) end = that.length;
        var result = new ArrayBuffer(end - start);
        var resultArray = new Float32Array(result);
        for (var i = 0; i < resultArray.length; i++)
            resultArray[i] = that[i + start];
        return resultArray;
    };
}

let _zero = new THREE.Vector3(0, 0, 0);
let _white = new THREE.Color().setRGB(1, 1, 1);

class Sample {
    constructor(count) {
        this._count = count;

        this._points = new Float32Array(count * 3);
        this._colors = new Float32Array(count * 3);

        this._pointRule = null;
        this._colorRule = null;

        this.setPointRule(function () { return _zero });
        this.setColorRule(function () { return _white });
    }

    setPointRule(producePointRule) {
        this._pointRule = producePointRule;

        for (var i = 0; i < this._count; i += 3) {

            var v3 = producePointRule();

            this._points[i] = v3.x;
            this._points[i + 1] = v3.y;
            this._points[i + 2] = v3.z;
        }

        return this;
    }

    setColorRule(produceColorRule) {
        this._colorRule = produceColorRule;

        for (var i = 0; i < this._count; i += 3) {

            var rgb = produceColorRule(new THREE.Vector3(this._points[i], this._points[i + 1], this._points[i + 2]));

            this._colors[i] = rgb.r;
            this._colors[i + 1] = rgb.g;
            this._colors[i + 2] = rgb.b;
        }

        return this;
    }

    get count() {
        return this._count;
    }

    get points() {
        return this._points.slice(0);
    }

    get colors() {
        return this._colors.slice(0);
    }
}

class Swarm {

    constructor(container, name, count) {

        this.sample = new Sample(count);

        this.name = name;

        this.camera = prepareCamera();
        this.scene = prepareScene(this.name, this.sample);
        this.renderer = prepareRenderer(this.scene);

        init(this.renderer, this.scene, this.camera);

        this._animate();
    }

    _animate() {
        var self = this;
        requestAnimationFrame(function () { self._animate(); });
        render(this.renderer, this.scene, this.camera, this.name);
    }

    to(pointRule, colorRule, duration, effect) {

        if (pointRule != null) {
            this.sample.setPointRule(pointRule);
        }

        if (colorRule) {
            this.sample.setColorRule(colorRule);
        }

        var points = this.scene.getObjectByName(this.name);
        var toPosition = this.sample.points;

        var fromPosition = points.geometry.attributes.position.array.slice(0);

        var self = this;
        return new Promise((resolve, reject) => {
            new TWEEN.Tween(points.geometry.attributes)
                .to({}, duration)
                .onUpdate(function (step) {

                    for (let i = 0; i < this.position.array.length; ++i) {
                        this.position.array[i] = fromPosition[i] + (toPosition[i] - fromPosition[i]) * step;
                    }

                    this.position.updateRange.count = this.position.array.length;

                    if (this.position.updateRange.count > 0) {
                        this.position.needsUpdate = true;
                    }
                })
                .easing(effect || TWEEN.Easing.Bounce.Out)
                .onComplete(function () { resolve(self); })
                .start();
        })
    }
}
let getGeometry = function (scene, swarmName, sample) {

    var geometry = new THREE.BufferGeometry();

    geometry.addAttribute('position', new THREE.BufferAttribute(sample.points, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(sample.colors, 3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors });
    var points = new THREE.Points(geometry, material);

    points.name = swarmName;

    scene.add(points);
};

let prepareCamera = function () {

    var camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500);
    camera.position.z = 2750;

    return camera;
};

let prepareScene = function (swarmName, sample) {

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    getGeometry(scene, swarmName, sample);

    return scene;
};

let prepareRenderer = function (scene) {

    var renderer = new THREE.WebGLRenderer({ antialias: false });

    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
};

let init = function (renderer, scene, camera) {

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }, false);
};

let render = function (renderer, scene, camera, swarmName) { 
    var time = Date.now() * 0.001;

    var points = scene.getObjectByName(swarmName);
    points.rotation.x = time * 0.25;
    points.rotation.y = time * 0.5;

    TWEEN.update();

    renderer.render(scene, camera);
};

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

var effectDirection = [ "In", "Out", "InOut" ];

var randomEffect = function() {
    return randoms.inArray(effect)[randoms.inArray(effectDirection)]
};

var _ = new Swarm(document.getElementById('container'), "sample", 50000);

var go = function () {
    (randoms.inArray(transformations)(_))
        .then(function () {
            go();
        });
};

go();

})));
