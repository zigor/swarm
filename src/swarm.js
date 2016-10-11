import {} from './utils'
import Sample from './sample'

export default class Swarm {

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
        requestAnimationFrame(function () { self._animate() });
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

                    for (var i = 0; i < this.position.array.length; ++i) {
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


var getGeometry = function (scene, swarmName, sample) {

    var geometry = new THREE.BufferGeometry();

    geometry.addAttribute('position', new THREE.BufferAttribute(sample.points, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(sample.colors, 3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors });
    var points = new THREE.Points(geometry, material);

    points.name = swarmName;

    scene.add(points);
};

var prepareCamera = function () {

    var camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500);
    camera.position.z = 2750;

    return camera;
};

var prepareScene = function (swarmName, sample) {

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    getGeometry(scene, swarmName, sample);

    return scene;
};

var prepareRenderer = function (scene) {

    var renderer = new THREE.WebGLRenderer({ antialias: false });

    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
};

var init = function (renderer, scene, camera) {

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }, false);
};

var render = function (renderer, scene, camera, swarmName) {
    var time = Date.now() * 0.001;

    var points = scene.getObjectByName(swarmName);
    points.rotation.x = time * 0.25;
    points.rotation.y = time * 0.5;

    TWEEN.update();

    renderer.render(scene, camera);
};
