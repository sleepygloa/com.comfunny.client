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


		warehouse.INTERSECTED;	// 선택된 객체
	    warehouse.mouse = new THREE.Vector2();
        warehouse.raycaster = new THREE.Raycaster();

        //카메라 컨트롤러 생성
        warehouse.cameraControls = function () {
			warehouse.controls = new THREE.OrbitControls( warehouse.camera, warehouse.renderer.domElement );
			warehouse.controls.rotateSpeed = 0.5; 				// 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
			warehouse.controls.zoomSpeed = 1; 					// 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.panSpeed = 1; 					// 패닝 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.minDistance = 5; 				// 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
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
        warehouse.onMouseDown = function(e) {

            // 객체를 클릭했을경우 반응
            event.preventDefault();
            warehouse.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            warehouse.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            warehouse.raycaster.setFromCamera( warehouse.mouse, warehouse.camera );

            var intersects = warehouse.raycaster.intersectObjects( warehouse.scene.children );
            if( intersects.length > 0 ) {
                // 마우스 왼쪽버튼
                if( e.button == 0 ){
                    if( warehouse.INTERSECTED != intersects[ 0 ].object ) {
                        console.log(intersects[ 0 ].object.type, intersects[ 0 ].object.name)
                        if( intersects[ 0 ].object.type == 'box'){

                            // 이미 연동되어 있는 객체를 해제
                            if( warehouse.INTERSECTED && warehouse.INTERSECTED_COVER ) {
                                warehouse.scene.remove( warehouse.INTERSECTED_COVER );
                            }

                            // 새로운 객체를 연동
                            if( intersects[ 0 ].object.type == 'box' ){
                                warehouse.INTERSECTED = intersects[ 0 ].object;
                            }

                            // callback 으로 정의된 함수 호출
                            warehouse.INTERSECTED.callback( intersects[0].object );
                            
                            //=============================================================
                            // 재고객체의 경우 material array 를 사용하면서 성능향상을 위해 전역변수로 설정하여 material 를 부분적으로 컨트롤 할 수 없다
                            // 그러기에 선택 객체와 동일한 cover 객체를 생성하여 선택효과를 준다.
                            var cover_geometry = new THREE.BoxGeometry(1, 1, 1);
                            var cover_object = new THREE.Mesh( cover_geometry, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
                            cover_object.position.x = warehouse.INTERSECTED.position.x;
                            cover_object.position.y = warehouse.INTERSECTED.position.y;
                            cover_object.position.z = warehouse.INTERSECTED.position.z;
                            cover_object.material.opacity = 0.5;			// 투명도
                            cover_object.material.transparent = true;		// transparent: 투명

                            warehouse.scene.add( cover_object );
                            
                            warehouse.INTERSECTED_COVER = cover_object;
                            //=============================================================
                        }
                    }
                }
            }
        }

        document.addEventListener( 'mousedown', warehouse.onMouseDown, false );
    })(this);
}

    