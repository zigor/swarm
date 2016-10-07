function Swarm(container, count) {

    var camera, scene, renderer;

    var points;

    var sample = new Sample(count);

    var getGeometry = function () {
        var geometry = new THREE.BufferGeometry();

        geometry.addAttribute('position', new THREE.BufferAttribute(sample.getPoints(), 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(sample.getColors(), 3));
        geometry.computeBoundingSphere();
        var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors });
        points = new THREE.Points(geometry, material);
        scene.add(points);
    };

    var prepareCamera = function () {
        camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500);
        camera.position.z = 2750;
    }

    var prepareScene = function () {
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x050505, 2000, 3500);

        getGeometry();
    }

    var prepareRenderer = function () {

        renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var init = function () {

        prepareCamera();
        prepareScene();
        prepareRenderer();

        container.appendChild(renderer.domElement);

        window.addEventListener('resize', function () {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

        }, false);
    };

    var render = function () {
        var time = Date.now() * 0.001;
        points.rotation.x = time * 0.25;
        points.rotation.y = time * 0.5;

        TWEEN.update();

        renderer.render(scene, camera);
    };

    var animate = function () {
        requestAnimationFrame(animate);
        render();
    };

    init();

    animate();

    return {
        to: function (positionRule, colorRule, duration, onComplete) {

            if (positionRule != null) {
                sample.setPositionRule(positionRule);
            }

            if (colorRule) {
                sample.setPositionRule(colorRule);
            }

            var toPoints = sample.getPoints();
            var fromPoints = points.geometry.attributes.position.array.slice(0);

            new TWEEN.Tween(points.geometry.attributes)
                .to({}, duration)
                .onUpdate(function (step) {

                    for (var i = 0; i < this.position.array.length; ++i) {
                        this.position.array[i] = fromPoints[i] + (toPoints[i] - fromPoints[i]) * step;
                    }

                    this.position.updateRange.count = this.position.array.length;

                    if (this.position.updateRange.count > 0) {
                        this.position.needsUpdate = true;
                    }
                })
                .easing(TWEEN.Easing.Bounce.Out)
                .onComplete(function () { onComplete(); })
                .start();

            return this;
        }
    };
}
