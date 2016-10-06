        var container;
        var camera, scene, renderer;
        var points;
        var radius = 200;
        init();
        animate();
        function init() {
            container = document.getElementById('container');
            camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500);
            camera.position.z = 2750;
            scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0x050505, 2000, 3500);
            var geometry = new THREE.BufferGeometry();
   
            var sample = new Sample(10000);
            sample.setPositionRule(function () {
                return random.inEllipsoid(radius - 100 + Math.random() * radius, 500, 200);
            }).setColorRule(function (v3) {
                
                return  new THREE.Color().setRGB(1, 1, 1);
            }).refresh();
            
            geometry.addAttribute('position', new THREE.BufferAttribute(sample.positions, 3));
            geometry.addAttribute('color', new THREE.BufferAttribute(sample.colors, 3));
            geometry.computeBoundingSphere();
            var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors });
            points = new THREE.Points(geometry, material);
            scene.add(points);
            renderer = new THREE.WebGLRenderer({ antialias: false });
            renderer.setClearColor(scene.fog.color);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            window.addEventListener('resize', onWindowResize, false);
        }
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        function animate() {
            requestAnimationFrame(animate);
            render();
        }
        function render() {
            var time = Date.now() * 0.001;
            points.rotation.x = time * 0.25;
            points.rotation.y = time * 0.5;
            renderer.render(scene, camera);
        }
