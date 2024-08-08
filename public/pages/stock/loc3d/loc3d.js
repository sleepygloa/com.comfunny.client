//폰트 로드
var loaded_font = null;
const loader = new THREE.FontLoader();
loader.load('./images/vr/font/dohyeon_regular.json', function(font) {
    loaded_font = font;
});

function addLabel( name, location, rotation, font_size, font_color ) {

	var label_geometry = new THREE.TextGeometry( name, {font: loaded_font, size: font_size, height: 1} );
	var label_object = new THREE.Mesh( label_geometry, new THREE.MeshBasicMaterial( { color: font_color } ) );
	label_object.position.copy( location );
	label_object.rotation.copy( rotation );
	label_object.name = name;
	label_object.type = 'font';
	warehouse.scene.add( label_object );
}


//구역 Layout
//Plane 영역 생성하기 
function createPlaneGeometry(scene, minX, maxX, minY, maxY, color, name, offsetY){
    var areaMatrix = createMatrixData(minX, maxX, minY, maxY);
    var matrix = createMatrixArrData(minX, maxX, minY, maxY);

    const rows = matrix.length;
    const cols = matrix[0].length;

    const geometry = new THREE.PlaneGeometry(cols, rows, cols - 1, rows - 1);
    geometry.translate(WarehouseInfo.warehouse_std_x, WarehouseInfo.warehouse_std_y, 0);
    // createGeometryOfMatrixData(geometry, rows, cols);

    const material = new THREE.MeshStandardMaterial({color: color, side: THREE.DoubleSide, wireframe: false});
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    // plane.position.x = -WarehouseInfo.warehouse_width/2 + Number(minX)/2 + Number(maxX)/2;
    plane.position.x = Number(minX)/2 + Number(maxX)/2;
    // plane.position.x = Number(minX)/2 + Number(maxX)/2;
    plane.position.y = offsetY;
    plane.position.z = -(Number(minY)/2 + Number(maxY)/2);
    plane.material.transparent = true;
    plane.material.opacity = 0.5;

    plane.layers.set(1);  // Add the cube to layer 1
    plane.name = name;
    scene.add(plane);
}

var warehouse = function (container){
    (function(warehouse){

        //창고 시작 위치 설정
        WarehouseInfo.warehouse_std_x = -1 * (WarehouseInfo.warehouse_width / 2);
        WarehouseInfo.warehouse_std_y = -1 * (WarehouseInfo.warehouse_length / 2);

        //씬 생성
        warehouse.scene = new THREE.Scene();
        warehouse.scene.background = new THREE.Color( 0xffffff );

        //카메라 생성
        warehouse.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        warehouse.camera.position.set(CameraInfo.camera_x, CameraInfo.camera_y, CameraInfo.camera_z);
        warehouse.camera.lookAt(0, 0, 0);
        //카메라가 보는 레이어 설정
        warehouse.camera.layers.enable(0);  // Enable the cube for layer 1
        warehouse.camera.layers.enable(1);  // Enable the cube for layer 1

        //조명 생성
        warehouse.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        warehouse.directionalLight.position.set(CameraInfo.camera_x, CameraInfo.camera_y, CameraInfo.camera_z);
        warehouse.scene.add(warehouse.directionalLight);

        //그리드 생성
        warehouse.scene.add( new THREE.AxesHelper(500) );

        //렌더러 생성
        warehouse.renderer = new THREE.WebGLRenderer({antialias: true});
        warehouse.renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( warehouse.renderer.domElement );


        //카메라 컨트롤러 생성
        warehouse.cameraControls = function () {
			warehouse.controls = new THREE.OrbitControls( warehouse.camera, warehouse.renderer.domElement );
			warehouse.controls.rotateSpeed = 0.5; 				// 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
			warehouse.controls.zoomSpeed = 1; 					// 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.panSpeed = 1; 					// 패닝 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.minDistance = 10; 				// 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
			warehouse.controls.maxDistance = 2500; 				// 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
			warehouse.controls.minPolarAngle = 0;				// 상하 각도조절 제약
			warehouse.controls.maxPolarAngle = Math.PI/2;		// 상하 각도조절 제약
		    //warehouse.controls.minAzimuthAngle = 0;			// 좌우 각도조절 제약
		    //warehouse.controls.maxAzimuthAngle = Math.PI/2;	// 좌우 각도조절 제약
		}

        //애니메이션
        warehouse.animation = function() {
            requestAnimationFrame( warehouse.animation );
            warehouse.renderer.render( warehouse.scene, warehouse.camera );
        }

        //리사이즈
        warehouse.onResize = function() {
            //리사이즈
            window.addEventListener('resize', function() {
                warehouse.camera.aspect = window.innerWidth / window.innerHeight;
                warehouse.camera.updateProjectionMatrix();
                warehouse.renderer.setSize( window.innerWidth, window.innerHeight );
            });
        }
        
        //마우스 이벤트 
        warehouse.onClick = function() {
            window.addEventListener('click', function(event) {
                const raycaster = new THREE.Raycaster();
                const mouse = new THREE.Vector2();
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, warehouse.camera);
                const intersects = raycaster.intersectObjects(warehouse.scene.children, true);
                if (intersects.length > 0) {
                    console.log(intersects[0].object.name);
                }
            });
        }


        //키보드 이벤트
        warehouse.onKeyDown = function() {
            window.addEventListener('keydown', function(event) {
                switch (event.key) {
                    case 'ArrowUp':
                        warehouse.camera.position.z -= 1;
                        break;
                    case 'ArrowDown':
                        warehouse.camera.position.z += 1;
                        break;
                    case 'ArrowLeft':
                        warehouse.camera.position.x -= 1;
                        break;
                    case 'ArrowRight':
                        warehouse.camera.position.x += 1;
                        break;
                }
            });
        }





        //창고 바닥 생성
        {
            const minX = dcData[0].std_loc_x;
            const maxX = dcData[0].std_width;
            const minY = dcData[0].std_loc_y;
            const maxY = dcData[0].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0x156289, 'ShowBottom', 0.01)

            // 격자 추가
            const gridHelper = new THREE.GridHelper(maxX*1.5, 20);
            gridHelper.position.y = 0.01;
            warehouse.scene.add(gridHelper);
        }
        {
            //입고구역
            const minX = areaData[0].std_loc_x;
            const maxX = areaData[0].std_width;
            const minY = areaData[0].std_loc_y;
            const maxY = areaData[0].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0xE5E1DA, 'Area', 0.02)
        }
        {
            //보관구역
            const minX = areaData[1].std_loc_x;
            const maxX = areaData[1].std_width;
            const minY = areaData[1].std_loc_y;
            const maxY = areaData[1].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0xFBF9F1, 'Area', 0.02)
        }
        {
            //출고구역
            const minX = areaData[2].std_loc_x;
            const maxX = areaData[2].std_width;
            const minY = areaData[2].std_loc_y;
            const maxY = areaData[2].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0xE5E1DA, 'Area', 0.02)
        }
        {
            //입고대기존
            const minX = zoneData[0].std_loc_x;
            const maxX = zoneData[0].std_width;
            const minY = zoneData[0].std_loc_y;
            const maxY = zoneData[0].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0x3A4D39, 'Zone', 0.04)
        }
        {
            //입고검수존
            const minX = zoneData[1].std_loc_x;
            const maxX = zoneData[1].std_width;
            const minY = zoneData[1].std_loc_y;
            const maxY = zoneData[1].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0x739072, 'Zone', 0.04)
        }
        {
            //보관1
            const minX = zoneData[2].std_loc_x;
            const maxX = zoneData[2].std_width;
            const minY = zoneData[2].std_loc_y;
            const maxY = zoneData[2].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0x8D493A, 'Zone', 0.04)
        }
        {
            //보관2
            const minX = zoneData[3].std_loc_x;
            const maxX = zoneData[3].std_width;
            const minY = zoneData[3].std_loc_y;
            const maxY = zoneData[3].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0x8D493A, 'Zone', 0.04)
        }
        {
            //출고피킹존
            const minX = zoneData[4].std_loc_x;
            const maxX = zoneData[4].std_width;
            const minY = zoneData[4].std_loc_y;
            const maxY = zoneData[4].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0xC8DBBE, 'Zone', 0.04)
        }
        {
            //출고상차존
            const minX = zoneData[5].std_loc_x;
            const maxX = zoneData[5].std_width;
            const minY = zoneData[5].std_loc_y;
            const maxY = zoneData[5].std_length;

            createPlaneGeometry(warehouse.scene, minX, maxX, minY, maxY, 0xC8DBBE, 'Zone', 0.04)
        }


        {
            //지게차 로드
            const loader2 = new THREE.OBJLoader();
            loader2.load('./images/vr/model/low/forklift/forklift.obj', function (object) {
                object.scale.set(ModelInfo.forklift_scale_x, ModelInfo.forklift_scale_y, ModelInfo.forklift_scale_z);
                object.position.set(ModelInfo.gltfX, ModelInfo.gltfY, ModelInfo.gltfZ)
                warehouse.scene.add(object);
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수                    
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        {
            const maxX = dcData[0].std_width;
            const maxY = dcData[0].std_length;
            const matrix = createMatrixArrData(dcData[0].std_loc_x, maxX, dcData[0].std_loc_y, maxY);

            var locMatrixArr = createMatrixDataFromList(matrix, locData);
            var locMatrix = createMatrixArrToData(locMatrixArr);

            var validLocArr = getValidDataOfMatrixData(locMatrixArr, 1);
            //랙 생성
            var rackGroup = new THREE.Group();
            rackGroup.name = 'RackGroup';
            for(let i = 0; i < validLocArr.length; i++){
                var rack = addShelf({
                    seq : i+1,
                    rackX : WarehouseInfo.warehouse_std_x + validLocArr[i].x,
                    rackZ : WarehouseInfo.warehouse_std_y + validLocArr[i].y,
                    rackWidth : ModelInfo.rack_size_width,
                    rackLength : ModelInfo.rack_size_length,
                    rackFloor : 1,
                });
                rackGroup.add(rack);
            }
            var validLocArrTwo = getValidDataOfMatrixData(locMatrixArr, 2);
            //랙 생성
            for(let i = 0; i < validLocArrTwo.length; i++){
                var rack = addShelf({
                    seq : i+1,
                    rackX : WarehouseInfo.warehouse_std_x + validLocArrTwo[i].x,
                    rackZ : WarehouseInfo.warehouse_std_y + validLocArrTwo[i].y,
                    rackWidth : ModelInfo.rack_size_width,
                    rackLength : ModelInfo.rack_size_length,
                    rackFloor : 2,
                });
                rackGroup.add(rack);
            }
            var validLocArrThree = getValidDataOfMatrixData(locMatrixArr, 3);
            //랙 생성
            for(let i = 0; i < validLocArrThree.length; i++){
                // console.log(validLocArrTwo[i]);
                var rack = addShelf({
                    seq : i+1,
                    rackX : WarehouseInfo.warehouse_std_x + validLocArrThree[i].x,
                    rackZ : WarehouseInfo.warehouse_std_y + validLocArrThree[i].y,
                    rackWidth : ModelInfo.rack_size_width,
                    rackLength : ModelInfo.rack_size_length,
                    rackFloor : 3,
                });
                rackGroup.add(rack);
            }
            warehouse.scene.add(rackGroup);
            //
        }



        //바닥 레이어 보기 안보기 설정
        ShowAll.addEventListener('click', function() {
            scene.traverse(function(child) {
                if(child.visible){
                    child.visible = false;
                }else{
                    child.visible = true;
                }
            });
        });

        //바닥 레이어 보기 안보기 설정
        ShowBottom.addEventListener('click', function() {
            scene.traverse(function(child) {
                if(child.name === 'ShowBottom'){
                    if(child.visible){
                        child.visible = false;
                    }else{
                        child.visible = true;
                    }
                }
            });
        });

        //구역 레이어 보기 안보기 설정
        ShowArea.addEventListener('click', function() {
            scene.traverse(function(child) {
                if(child.name === 'Area'){
                    if(child.visible){
                        child.visible = false;
                    }else{
                        child.visible = true;
                    }
                }
            });
        });
        //존 레이어 보기 안보기 설정
        ShowZone.addEventListener('click', function() {
            scene.traverse(function(child) {
                if(child.name === 'Zone'){
                    if(child.visible){
                        child.visible = false;
                    }else{
                        child.visible = true;
                    }
                }
            });
        });
        //로케이션랙 레이어 보기 안보기 설정
        ShowLocationModel.addEventListener('click', function() {
            scene.traverse(function(child) {
                if(child.name === 'locationRack'){
                    if(child.visible){
                        child.visible = false;
                    }else{
                        child.visible = true;
                    }
                }
            });
        });
    })(this);
}

    
var container = document.querySelector("#loc3dContainer");
var warehouse = new warehouse(container);
warehouse.animation();
warehouse.cameraControls();
