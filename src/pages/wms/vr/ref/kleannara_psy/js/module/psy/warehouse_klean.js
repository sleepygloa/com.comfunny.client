var scale = 10;
/******************************************************************************************************
 * scene, light, camera, renderer 등 객체생성
 ******************************************************************************************************/
var warehouse = function (container) {
    (function (warehouse) {
        /******************************	
			1. Scene 
		 *******************************/
        // 장면 :  Document - https://threejs.org/docs/#api/en/scenes/Scene
        warehouse.scene = new THREE.Scene();
        warehouse.scene.background = new THREE.Color(0xffffff);

        /******************************)
			2. light 
		*******************************/
        // 조명 : Document - https://threejs.org/docs/#api/en/lights/DirectionalLight
        warehouse.light1 = new THREE.PointLight(0xffffff, 1.0);
        warehouse.light1.position.set(-11000, 10000, 20000);
        warehouse.light2 = new THREE.PointLight(0xffffff, 1.0);
        warehouse.light2.position.set(19000, 10000, -10000);
        warehouse.light3 = new THREE.AmbientLight(0xffffff, 0.1);
        warehouse.scene.add(warehouse.light1, warehouse.light2, warehouse.light3);

        /******************************
			3. Camera
		 *******************************/
        /* 카메라 : Document - https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
         * THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT, NEAR, FAR)
         * FIELD_OF_VIEW: 카메라의 시야각을 의미한다. 커질 수록 카메라가 바라보는 시야각이 넓어짐을 의미한다. 단위는 degree.
         * ASPECT: 시야의 가로세로비를 의미한다. 컨테이너의 가로세로비와 동일한 값을 넣어주는게 좋다. 단위 없음.
         * NEAR: 렌더링 할 물체 거리의 하한값으로, 너무 가까이 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 작은 물체는 화면에 그리지 않는다. 0보다 크고 FAR 보다 작은 값을 가질 수 있다.
         * FAR: 렌더링 할 물체 거리의 상한값으로, 너무 멀리 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 큰 물체는 화면에 그리지 않는다. */
        warehouse.camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 1, 500000000);
        warehouse.camera.position.set(5000, 10000, 5000);

        // Camera Moving Controls - 특정 좌표를 중심으로 카메라를 자전 또는 공전하도록 함.
        warehouse.cameraControls = function () {
            warehouse.controls = new THREE.OrbitControls(warehouse.camera, warehouse.renderer.domElement);
            warehouse.controls.target.set(5000, 0, 4999);
            warehouse.controls.update();
            warehouse.controls.rotateSpeed = 0.5; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
            warehouse.controls.zoomSpeed = 1; // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
            warehouse.controls.panSpeed = 1; // 패닝 속도 입니다. 기본값(Float)은 1입니다.
            warehouse.controls.minDistance = 200; // 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
            warehouse.controls.maxDistance = 1000000; // 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
            warehouse.controls.minPolarAngle = 0; // 상하 각도조절 제약
            warehouse.controls.maxPolarAngle = Math.PI / 2; // 상하 각도조절 제약
            //warehouse.controls.minAzimuthAngle = 0;				// 좌우 각도조절 제약
            //warehouse.controls.maxAzimuthAngle = Math.PI/2;	// 좌우 각도조절 제약
        };
        /******************************
			4. Renderer 
		*******************************/
        // Document - https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
        warehouse.renderer = new THREE.WebGLRenderer();
        warehouse.renderer.setPixelRatio(window.devicePixelRatio);
        warehouse.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(warehouse.renderer.domElement);

        // Renderer rendering
        warehouse.animation = function () {
            requestAnimationFrame(warehouse.animation);
            warehouse.renderer.render(warehouse.scene, warehouse.camera);
        };

        /******************************
			5. Guide, Helper
		*******************************/
        // 중심좌표가이드 : Document - https://threejs.org/docs/#api/en/helpers/AxesHelper
        // warehouse.scene.add(new THREE.AxesHelper(1200));

        // 화살표가이드 : Document - https://threejs.org/docs/#api/en/helpers/ArrowHelper
        // warehouse.arrow = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 1300, 0), 100, 0xff0000, 100, 100);
        // warehouse.scene.add(warehouse.arrow);

        // 바닥그리드가이드 : Document - https://threejs.org/docs/#api/en/helpers/GridHelper
        // 10000칸 x 10000칸 (가로x세로)
        var grid = new THREE.GridHelper(10000, 100);
        grid.position.set(5000, 0, 5000);
        warehouse.scene.add(grid);

        //조명 가이드
        // var helper1 = new THREE.PointLightHelper(warehouse.light1, 500);
        // var helper2 = new THREE.PointLightHelper(warehouse.light2, 500);
        // warehouse.scene.add(helper1, helper2);

        /******************************
			6. Mesh (Geometry + Material)
		*******************************/
        //wall
        var wall_Geo_north_1 = new THREE.PlaneGeometry(9500, 2000);
        var wall_Geo_west_1 = new THREE.PlaneGeometry(2850, 2000);
        var wall_Geo_east_1 = new THREE.PlaneGeometry(2850, 2000);
        var wall_Mesh = new THREE.MeshLambertMaterial({ color: 0xcecece, emissive: 0x0c0c0c });

        var wall_Obj_1 = new THREE.Mesh(wall_Geo_north_1, wall_Mesh);
        wall_Obj_1.position.set(wall_Geo_north_1.parameters.width / 2, wall_Geo_north_1.parameters.height / 2, 0);

        var wall_Obj_2 = new THREE.Mesh(wall_Geo_west_1, wall_Mesh);
        wall_Obj_2.position.set(0, wall_Geo_west_1.parameters.height / 2, wall_Geo_west_1.parameters.width / 2);
        wall_Obj_2.rotation.y = 0.5 * Math.PI;

        var wall_Obj_3 = new THREE.Mesh(wall_Geo_east_1, wall_Mesh);
        wall_Obj_3.position.set(wall_Geo_north_1.parameters.width, wall_Geo_east_1.parameters.height / 2, wall_Geo_east_1.parameters.width / 2);
        wall_Obj_3.rotation.y = -0.5 * Math.PI;
        warehouse.scene.add(wall_Obj_1, wall_Obj_2, wall_Obj_3);

        //crane Mast
        var craneMast_Mesh = new THREE.MeshLambertMaterial({ color: 0x000000 });
        var craneMast_horizontal_Geo = new THREE.BoxBufferGeometry(9500, 100, 100);
        var craneMast_vertical_Geo = new THREE.BoxBufferGeometry(100, 1600, 100);

        var craneMast_horizontal_Obj_1 = new THREE.Mesh(craneMast_horizontal_Geo, craneMast_Mesh);
        craneMast_horizontal_Obj_1.position.set(craneMast_horizontal_Geo.parameters.width / 2, 1550, craneMast_horizontal_Geo.parameters.depth / 2);
        var craneMast_horizontal_Obj_2 = new THREE.Mesh(craneMast_horizontal_Geo, craneMast_Mesh);
        craneMast_horizontal_Obj_2.position.set(craneMast_horizontal_Geo.parameters.width / 2, 1550, craneMast_horizontal_Geo.parameters.depth / 2 + 2750);

        var craneMast_vertical_Obj_1 = new THREE.Mesh(craneMast_vertical_Geo, craneMast_Mesh);
        craneMast_vertical_Obj_1.position.set(craneMast_vertical_Geo.parameters.width / 2, craneMast_vertical_Geo.parameters.height / 2, craneMast_vertical_Geo.parameters.depth / 2);
        var craneMast_vertical_Obj_2 = new THREE.Mesh(craneMast_vertical_Geo, craneMast_Mesh);
        craneMast_vertical_Obj_2.position.set(craneMast_vertical_Geo.parameters.width / 2, craneMast_vertical_Geo.parameters.height / 2, craneMast_vertical_Geo.parameters.depth / 2 + 2750);
        var craneMast_vertical_Obj_3 = new THREE.Mesh(craneMast_vertical_Geo, craneMast_Mesh);
        craneMast_vertical_Obj_3.position.set(craneMast_horizontal_Geo.parameters.width - craneMast_vertical_Geo.parameters.width / 2, craneMast_vertical_Geo.parameters.height / 2, craneMast_vertical_Geo.parameters.depth / 2);
        var craneMast_vertical_Obj_4 = new THREE.Mesh(craneMast_vertical_Geo, craneMast_Mesh);
        craneMast_vertical_Obj_4.position.set(craneMast_horizontal_Geo.parameters.width - craneMast_vertical_Geo.parameters.width / 2, craneMast_vertical_Geo.parameters.height / 2, craneMast_vertical_Geo.parameters.depth / 2 + 2750);
        warehouse.scene.add(craneMast_horizontal_Obj_1, craneMast_horizontal_Obj_2, craneMast_vertical_Obj_1, craneMast_vertical_Obj_2, craneMast_vertical_Obj_3, craneMast_vertical_Obj_4);

        //floor
        var pgeo = new THREE.PlaneGeometry(10000, 10000);
        var pmat = new THREE.MeshPhongMaterial({ color: 0x139115 });
        var pmesh = new THREE.Mesh(pgeo, pmat);
        pmesh.rotation.x = -0.5 * Math.PI;
        pmesh.position.set(5000, -5, 5000);
        warehouse.scene.add(pmesh);

        //cutter
        var cutterGeo = new THREE.BoxBufferGeometry(600, 300, 500);
        var cutterMat = new THREE.MeshPhongMaterial({ color: 0xa2a2a2 });
        var cutterObj_1 = new THREE.Mesh(cutterGeo, cutterMat);
        cutterObj_1.position.set(1050 + cutterGeo.parameters.width / 2, cutterGeo.parameters.height / 2, 6600);
        var cutterObj_2 = new THREE.Mesh(cutterGeo, cutterMat);
        cutterObj_2.position.set(1900 + cutterGeo.parameters.width / 2, cutterGeo.parameters.height / 2, 6600);
        var cutterObj_3 = new THREE.Mesh(cutterGeo, cutterMat);
        cutterObj_3.position.set(2900 + cutterGeo.parameters.width / 2, cutterGeo.parameters.height / 2, 6600);
        var cutterObj_4 = new THREE.Mesh(cutterGeo, cutterMat);
        cutterObj_4.position.set(3800 + cutterGeo.parameters.width / 2, cutterGeo.parameters.height / 2, 6600);
        var cutterObj_5 = new THREE.Mesh(cutterGeo, cutterMat);
        cutterObj_5.position.set(4800 + cutterGeo.parameters.width / 2, cutterGeo.parameters.height / 2, 6600);
        var cutterObj_6 = new THREE.Mesh(cutterGeo, cutterMat);
        cutterObj_6.position.set(5600 + cutterGeo.parameters.width / 2, cutterGeo.parameters.height / 2, 6600);
        var cutterObj_7 = new THREE.Mesh(cutterGeo, cutterMat);
        cutterObj_7.position.set(6650 + cutterGeo.parameters.width / 2, cutterGeo.parameters.height / 2, 6600);
        var cutterObj_8 = new THREE.Mesh(cutterGeo, cutterMat);
        cutterObj_8.position.set(7450 + cutterGeo.parameters.width / 2, cutterGeo.parameters.height / 2, 6600);
        warehouse.scene.add(cutterObj_1, cutterObj_2, cutterObj_3, cutterObj_4, cutterObj_5, cutterObj_6, cutterObj_7, cutterObj_8);
        /******************************
			7. ETC
		*******************************/
        // Mouse
        warehouse.INTERSECTED;
        warehouse.mouse = new THREE.Vector2();
        warehouse.raycaster = new THREE.Raycaster();

        warehouse.onMouseDown = function () {
            // 객체를 클릭했을경우 반응
            event.preventDefault();
            warehouse.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            warehouse.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            warehouse.raycaster.setFromCamera(warehouse.mouse, warehouse.camera);

            var intersects = warehouse.raycaster.intersectObjects(warehouse.scene.children);

            if (intersects.length > 0) {
                if (warehouse.INTERSECTED != intersects[0].object) {
                    // LOC 일경우
                    if (intersects[0].object.type == "rack" || intersects[0].object.type == "yard") {
                        if (warehouse.INTERSECTED) {
                            warehouse.INTERSECTED.material.opacity = 1;
                        }
                        warehouse.INTERSECTED = intersects[0].object;
                        warehouse.INTERSECTED.material.opacity = 0.5; // 투명도

                        // callback 으로 정의된 함수 호출
                        intersects[0].object.callback(intersects[0].object.name);
                    }
                }
            } else {
                if (warehouse.INTERSECTED) {
                    warehouse.INTERSECTED.material.opacity = 1;
                }
                warehouse.INTERSECTED = null;
            }
        };
        document.addEventListener("mousedown", warehouse.onMouseDown, false);

        // WindowResize 이벤트
        warehouse.onWindowResize = function () {
            warehouse.camera.aspect = window.innerWidth / window.innerHeight;
            warehouse.camera.updateProjectionMatrix();

            warehouse.renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", warehouse.onWindowResize, false);

        //speed
        warehouse.speed = 1;
    })(this);
};
