
/******************************************************************************************************
 * scene, light, camera, renderer 등 객체생성
 ******************************************************************************************************/
var font_label;
var warehouse = function( container ) {

	(function( warehouse ) {
		/******************************	
			1. Scene 
		 *******************************/
		// 장면 :  Document - https://threejs.org/docs/#api/en/scenes/Scene
		warehouse.scene = new THREE.Scene();
		warehouse.scene.background = new THREE.Color( 0xeaeaea );
		
		/******************************)
			2. light 
		 *******************************/	
		// 조명 : Document - https://threejs.org/docs/#api/en/lights/DirectionalLight
		warehouse.light = new THREE.DirectionalLight( 0xffffff, 1.0 );
		warehouse.light.position.set( 1, 1, 1 ).normalize();
		warehouse.scene.add( warehouse.light );
		
		/******************************
			3. Camera
		 *******************************/
		/* 카메라 : Document - https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
		 * THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT, NEAR, FAR)
		 * FIELD_OF_VIEW: 카메라의 시야각을 의미한다. 커질 수록 카메라가 바라보는 시야각이 넓어짐을 의미한다. 단위는 degree.
		 * ASPECT: 시야의 가로세로비를 의미한다. 컨테이너의 가로세로비와 동일한 값을 넣어주는게 좋다. 단위 없음.
		 * NEAR: 렌더링 할 물체 거리의 하한값으로, 너무 가까이 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 작은 물체는 화면에 그리지 않는다. 0보다 크고 FAR 보다 작은 값을 가질 수 있다.
		 * FAR: 렌더링 할 물체 거리의 상한값으로, 너무 멀리 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 큰 물체는 화면에 그리지 않는다. */
	    warehouse.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 50000 );
	    warehouse.camera.position.set( 0, 2000, 3000 );
		
	    // Camera Moving Controls - 특정 좌표를 중심으로 카메라를 자전 또는 공전하도록 함.
		warehouse.cameraControls = function () {
			warehouse.controls = new THREE.OrbitControls( warehouse.camera, warehouse.renderer.domElement );
			warehouse.controls.rotateSpeed = 0.5; 					// 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
			warehouse.controls.zoomSpeed = 1; 						// 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.panSpeed = 1; 							// 패닝 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.minDistance = 200; 					// 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
			warehouse.controls.maxDistance = 10000; 				// 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
			warehouse.controls.minPolarAngle = 0;					// 상하 각도조절 제약
			warehouse.controls.maxPolarAngle = Math.PI/2;		// 상하 각도조절 제약
		    //warehouse.controls.minAzimuthAngle = 0;				// 좌우 각도조절 제약
		    //warehouse.controls.maxAzimuthAngle = Math.PI/2;	// 좌우 각도조절 제약
		}		
	    
		/******************************
			4. Renderer 
		*******************************/
		// Document - https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
		warehouse.renderer = new THREE.WebGLRenderer();
		warehouse.renderer.setPixelRatio( window.devicePixelRatio );
		warehouse.renderer.setSize( window.innerWidth, window.innerHeight );		
		container.appendChild( warehouse.renderer.domElement );
		
		// Renderer rendering 
		warehouse.animation = function () {
			requestAnimationFrame( warehouse.animation );
			warehouse.renderer.render( warehouse.scene, warehouse.camera );
		}

		/******************************
			5. Guide
		*******************************/
		// 중심좌표가이드 : Document - https://threejs.org/docs/#api/en/helpers/AxesHelper
	    warehouse.scene.add( new THREE.AxesHelper(1200) );

	    // 화살표가이드 : Document - https://threejs.org/docs/#api/en/helpers/ArrowHelper
	    warehouse.arrow = new THREE.ArrowHelper( new THREE.Vector3( 0, -1, 0 ), new THREE.Vector3( 0, 1300, 0 ), 100, 0xff0000, 100, 100 );
	    warehouse.scene.add( warehouse.arrow );
	  
	    // 바닥그리드가이드 : Document - https://threejs.org/docs/#api/en/helpers/GridHelper
	    // 120칸 x 40칸 (가로x세로)
	    var grid_1 = new THREE.GridHelper( 4000, 40 );
	    grid_1.position.x = -4000;
		warehouse.scene.add( grid_1 );

	    var grid_2 = new THREE.GridHelper( 4000, 40 );
	    grid_2.position.x = 0;
		warehouse.scene.add( grid_2 );

	    var grid_3 = new THREE.GridHelper( 4000, 40 );
	    grid_3.position.x = 4000;
		warehouse.scene.add( grid_3 );

		/******************************
			6. Mesh (Geometry + Material)
		*******************************/
		//벽
		var wall_north_geometry = new THREE.PlaneGeometry(12000, 400);
		var wall_north_material = new THREE.MeshBasicMaterial({color: 0x34486f})
		var wall_north = new THREE.Mesh( wall_north_geometry, wall_north_material ); 
		wall_north.position.set( 0, 200, -2000 );
	    warehouse.scene.add( wall_north );

		var wall_west_geometry = new THREE.PlaneGeometry(4000, 400);
		var wall_west_material = new THREE.MeshBasicMaterial({color: 0x34486f})
	    var wall_west = new THREE.Mesh( wall_west_geometry, wall_west_material ); 
	    wall_west.rotation.y = 0.5 * Math.PI;
	    wall_west.position.set( -6000, 200, 0 );
	    warehouse.scene.add( wall_west );
	    
		var wall_1_geometry = new THREE.BoxBufferGeometry(50, 400, 2300);
		var wall_1_material = new THREE.MeshBasicMaterial({color: 0x34486f})
	    var wall_1 = new THREE.Mesh( wall_1_geometry, wall_1_material ); 
		wall_1.material.side = THREE.DoubleSide;
	    wall_1.rotation.y = 1 * Math.PI;
	    wall_1.position.set( -3625, 200, -150 );
	    warehouse.scene.add( wall_1 );
	    
		var wall_2_geometry = new THREE.BoxBufferGeometry(50, 400, 2300);
		var wall_2_material = new THREE.MeshBasicMaterial({color: 0x34486f})
	    var wall_2 = new THREE.Mesh( wall_2_geometry, wall_2_material ); 
		wall_2.material.side = THREE.DoubleSide;
	    wall_2.rotation.y = 1 * Math.PI;
	    wall_2.position.set( -1400, 200, -150 );
	    warehouse.scene.add( wall_2 );
	    
		var wall_3_geometry = new THREE.BoxBufferGeometry(50, 400, 2300);
		var wall_3_material = new THREE.MeshBasicMaterial({color: 0x34486f})
	    var wall_3 = new THREE.Mesh( wall_3_geometry, wall_3_material ); 
		wall_3.material.side = THREE.DoubleSide;
		wall_3.rotation.y = 1 * Math.PI;
	    wall_3.position.set( 5700, 200, -150 );
	    warehouse.scene.add( wall_3 );
	    
	    // crane a-1 트랙 
	    var track_geometry_a1_1 = new THREE.PlaneGeometry( 100, 20 );
	    var track_material_a1_1 = new THREE.Mesh( track_geometry_a1_1, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a1_1.position.set( -3200, 0, -1300 );
	    track_material_a1_1.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    track_material_a1_1.rotation.z = 0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a1_1);
		
	    var track_geometry_a1_2 = new THREE.PlaneGeometry( 100+20, 20 );
	    var track_material_a1_2 = new THREE.Mesh( track_geometry_a1_2, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a1_2.position.set( -3250, 0, -1250 );
	    track_material_a1_2.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a1_2);
	    
	    var track_geometry_a1_3 = new THREE.PlaneGeometry( 2350+20, 20 );
	    var track_material_a1_3 = new THREE.Mesh( track_geometry_a1_3, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a1_3.position.set( -3300, 0, -70 );
	    track_material_a1_3.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    track_material_a1_3.rotation.z = 0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a1_3);
	    
	    // crane a-2 트랙 
	    var track_geometry_a2_1 = new THREE.PlaneGeometry( 100, 20 );
	    var track_material_a2_1 = new THREE.Mesh( track_geometry_a2_1, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a2_1.position.set( -3000, 0, -1300 );
	    track_material_a2_1.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    track_material_a2_1.rotation.z = 0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a2_1);
		
	    var track_geometry_a2_2 = new THREE.PlaneGeometry( 200+20, 20 );
	    var track_material_a2_2 = new THREE.Mesh( track_geometry_a2_2, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a2_2.position.set( -2900, 0, -1250 );
	    track_material_a2_2.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a2_2);
	    
	    var track_geometry_a2_3 = new THREE.PlaneGeometry( 2350+20, 20 );
	    var track_material_a2_3 = new THREE.Mesh( track_geometry_a2_3, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a2_3.position.set( -2800, 0, -70 );
	    track_material_a2_3.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    track_material_a2_3.rotation.z = 0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a2_3);
	    
	    // crane a-3 트랙 
	    var track_geometry_a3_1 = new THREE.PlaneGeometry( 100, 20 );
	    var track_material_a3_1 = new THREE.Mesh( track_geometry_a3_1, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a3_1.position.set( -2100, 0, -1300 );
	    track_material_a3_1.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    track_material_a3_1.rotation.z = 0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a3_1);
		
	    var track_geometry_a3_2 = new THREE.PlaneGeometry( 100+20, 20 );
	    var track_material_a3_2 = new THREE.Mesh( track_geometry_a3_2, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a3_2.position.set( -2150, 0, -1250 );
	    track_material_a3_2.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a3_2);
	    
	    var track_geometry_a3_3 = new THREE.PlaneGeometry( 2350+20, 20 );
	    var track_material_a3_3 = new THREE.Mesh( track_geometry_a3_3, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a3_3.position.set( -2200, 0, -70 );
	    track_material_a3_3.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    track_material_a3_3.rotation.z = 0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a3_3);
	    
	    // crane a-4 트랙 
	    var track_geometry_a4_1 = new THREE.PlaneGeometry( 100, 20 );
	    var track_material_a4_1 = new THREE.Mesh( track_geometry_a4_1, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a4_1.position.set( -1900, 0, -1300 );
	    track_material_a4_1.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    track_material_a4_1.rotation.z = 0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a4_1);
		
	    var track_geometry_a4_2 = new THREE.PlaneGeometry( 200+20, 20 );
	    var track_material_a4_2 = new THREE.Mesh( track_geometry_a4_2, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a4_2.position.set( -1800, 0, -1250 );
	    track_material_a4_2.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a4_2);
	    
	    var track_geometry_a4_3 = new THREE.PlaneGeometry( 2350+20, 20 );
	    var track_material_a4_3 = new THREE.Mesh( track_geometry_a4_3, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_a4_3.position.set( -1700, 0, -70 );
	    track_material_a4_3.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    track_material_a4_3.rotation.z = 0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    warehouse.scene.add(track_material_a4_3);
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
			warehouse.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			warehouse.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			warehouse.raycaster.setFromCamera( warehouse.mouse, warehouse.camera );

			var intersects = warehouse.raycaster.intersectObjects( warehouse.scene.children );

			if( intersects.length > 0 ) {
				if( warehouse.INTERSECTED != intersects[ 0 ].object ) {
					// LOC 일경우
					if( intersects[ 0 ].object.type == 'rack' || intersects[ 0 ].object.type == 'yard'){
						if( warehouse.INTERSECTED ) {
							warehouse.INTERSECTED.material.opacity = 1;	
						}
						warehouse.INTERSECTED = intersects[ 0 ].object;
						warehouse.INTERSECTED.material.opacity = 0.5;			// 투명도
						
						// callback 으로 정의된 함수 호출
						intersects[0].object.callback( intersects[0].object.name );
					}
				}
			} else {
				if ( warehouse.INTERSECTED ) {
					warehouse.INTERSECTED.material.opacity = 1;	
				}
				warehouse.INTERSECTED = null;
			}
		}
		document.addEventListener( 'mousedown', warehouse.onMouseDown, false );
		
	    
		// WindowResize 이벤트 
		warehouse.onWindowResize = function () {

			warehouse.camera.aspect = window.innerWidth / window.innerHeight;
			warehouse.camera.updateProjectionMatrix();

			warehouse.renderer.setSize( window.innerWidth, window.innerHeight );
		}
		
		window.addEventListener( 'resize', warehouse.onWindowResize, false );
	})(this);
}

/******************************************************************************************************
 * zone 객체생성
 ******************************************************************************************************/
var center_x = 6000;	// 중심축좌표
var center_z = 2000;

var zone_arr = [
		{ name: 'A01', horizontal: 150, vertical: 2300, position_x: -3500 - 25, position_z: -1300, color: 0x939393, type: 'rack', direction: 'E' }
	  ,	{ name: 'A02', horizontal: 150, vertical: 2200, position_x: -3200 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'W' }
	  ,	{ name: 'A03', horizontal: 150, vertical: 2200, position_x: -3000 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'E' }
	  ,	{ name: 'A04', horizontal: 150, vertical: 2300, position_x: -2700 - 25, position_z: -1300, color: 0x939393, type: 'rack', direction: 'W' }
	  , { name: 'A05', horizontal: 150, vertical: 2300, position_x: -2400 - 25, position_z: -1300, color: 0x939393, type: 'rack', direction: 'E' }
	  ,	{ name: 'A06', horizontal: 150, vertical: 2200, position_x: -2100 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'W' }
	  ,	{ name: 'A07', horizontal: 150, vertical: 2200, position_x: -1900 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'E' }
	  ,	{ name: 'A08', horizontal: 150, vertical: 2300, position_x: -1600 - 25, position_z: -1300, color: 0x939393, type: 'rack', direction: 'W' }
	  																					//  175차  사이간격 25.
	  ,	{ name: 'B01', horizontal: 150, vertical: 2200, position_x: -1100 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B02', horizontal: 150, vertical: 2200, position_x: -925 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B03', horizontal: 150, vertical: 2200, position_x: -750 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B04', horizontal: 150, vertical: 2200, position_x: -575 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B05', horizontal: 150, vertical: 2200, position_x: -400 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B06', horizontal: 150, vertical: 2200, position_x: -225 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B07', horizontal: 150, vertical: 2200, position_x:   -50 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B08', horizontal: 150, vertical: 2200, position_x:   125 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B09', horizontal: 150, vertical: 2200, position_x:   300 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B10', horizontal: 150, vertical: 2200, position_x:   475 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B11', horizontal: 150, vertical: 2200, position_x:   650 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'B12', horizontal: 150, vertical: 2200, position_x:   825 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  																					//1025-25+150=1150 +100=1250  //1150~1250기둥
	  ,	{ name: 'C01', horizontal: 150, vertical: 2200, position_x:  1075 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C02', horizontal: 150, vertical: 2200, position_x:  1250 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C03', horizontal: 150, vertical: 2200, position_x:  1425 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C04', horizontal: 150, vertical: 2200, position_x:  1600 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C05', horizontal: 150, vertical: 2200, position_x:  1775 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C06', horizontal: 150, vertical: 2200, position_x:  1950 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C07', horizontal: 150, vertical: 2200, position_x:  2125 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C08', horizontal: 150, vertical: 2200, position_x:  2300 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C09', horizontal: 150, vertical: 2200, position_x:  2475 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C10', horizontal: 150, vertical: 2200, position_x:  2650 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C11', horizontal: 150, vertical: 2200, position_x:  2825 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C12', horizontal: 150, vertical: 2200, position_x:  3000 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'C13', horizontal: 150, vertical: 2200, position_x:  3175 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  																					//3175-25+150=3300 +100=3600 //3300~3400 기둥
	  ,	{ name: 'D01', horizontal: 150, vertical: 2200, position_x:  3425 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D02', horizontal: 150, vertical: 2200, position_x:  3600 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D03', horizontal: 150, vertical: 2200, position_x:  3775 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D04', horizontal: 150, vertical: 2200, position_x:  3950 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D05', horizontal: 150, vertical: 2200, position_x:  4125 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D06', horizontal: 150, vertical: 2200, position_x:  4300 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D07', horizontal: 150, vertical: 2200, position_x:  4475 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D08', horizontal: 150, vertical: 2200, position_x:  4650 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D09', horizontal: 150, vertical: 2200, position_x:  4825 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D10', horizontal: 150, vertical: 2200, position_x:  5000 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
	  ,	{ name: 'D11', horizontal: 150, vertical: 2200, position_x:  5175 - 25, position_z: -1200, color: 0x939393, type: 'rack', direction: 'N' }
]
var zoneGeometry = function( zone_id, zone_name, scene ) {

	(function( zoneGeometry ) {
		
		var selectZone = function() {
			
			for(var i=0 ; i<zone_arr.length ; i++){
				
				if(zone_arr[i].name == zone_id) return zone_arr[i]; 
			}
		};
		
		zoneGeometry.zone = selectZone();

		zoneGeometry.draw = function () {

			// Document - https://threejs.org/docs/index.html#api/en/geometries/PlaneBufferGeometry
		    var zone_geometry = new THREE.PlaneGeometry( zoneGeometry.zone.horizontal, zoneGeometry.zone.vertical );
		    
		    // 평면의 중심축을 평면의 꼭지점으로 치환
		    var zone_position_x = zoneGeometry.zone.position_x + (zoneGeometry.zone.horizontal / 2);
		    var zone_position_z = zoneGeometry.zone.position_z + (zoneGeometry.zone.vertical / 2);

		    var zone_object = new THREE.Mesh( zone_geometry, new THREE.MeshBasicMaterial({color: zoneGeometry.zone.color}) ); 
		    //zone_object.material.side = THREE.DoubleSide; // 뒤집어도 바닥 보이게
		    zone_object.position.set( zone_position_x, 0, zone_position_z );
		    zone_object.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정

			// 객체에 userdata set
		    zone_object.type = 'zone';
		    zone_object.name = zoneGeometry.zone.name;
			
		    scene.add(zone_object);

		}
		
	})(this);
}

/******************************************************************************************************
 * loc 객체생성
 ******************************************************************************************************/
var loc_hR = {
		
		horizontal: 100,
		height: 100,
		vertical: 100,
		padding: 0,
		color: 0xffffff,
		texture: 'threejs/textures/edge.png'
	}
var loc_arr_hR = [];

//HighRack(hR)
var locGeometry_hR = function( zone, scene, prameter ) {
	

	if(prameter.loc_color) loc_hR.color = prameter.loc_color;
	if(prameter.loc_texture) loc_hR.texture = prameter.loc_texture;

	(function( locGeometry_hR) {


		var selectLoc = function( type, direction ) {
			
			switch( direction ) {
				case 'E': loc_hR.offset = [1, 0, 0]; break;
				case 'W': loc_hR.offset = [1, 0, 0]; break;
				case 'S': loc_hR.offset = [0, 0, 0]; break;
				case 'N': loc_hR.offset = [1, 0, 0]; break;
			}
			
			return loc_hR;
		};
		
		locGeometry_hR.loc_hR = selectLoc( zone.type, zone.direction);

		// Document - https://threejs.org/docs/index.html#api/en/geometries/BoxBufferGeometry
		var loc_geometry = new THREE.BoxBufferGeometry( locGeometry_hR.loc_hR.horizontal, 
				locGeometry_hR.loc_hR.height, locGeometry_hR.loc_hR.vertical );

		// 육면체의 중심축을 육면체의 꼭지점으로 치환
	    var loc_position_x = zone.position_x + (locGeometry_hR.loc_hR.horizontal / 2);
	    var loc_position_y = locGeometry_hR.loc_hR.height / 2;
	    var loc_position_z = zone.position_z + (locGeometry_hR.loc_hR.vertical / 2);
	    
	    // zone 의 위치대비 loc 의 위치  
	    var offset_x = locGeometry_hR.loc_hR.offset[0] * (locGeometry_hR.loc_hR.horizontal/4 + locGeometry_hR.loc_hR.padding);
	    var offset_y = locGeometry_hR.loc_hR.offset[1] * (locGeometry_hR.loc_hR.height + locGeometry_hR.loc_hR.padding);
	    var offset_z = locGeometry_hR.loc_hR.offset[2] * (locGeometry_hR.loc_hR.vertical + locGeometry_hR.loc_hR.padding);
	    
	    // DB 의 행열단 정보를 기반으로 생성
	    locGeometry_hR.draw = function () {

		    // LOC 위치에 그리기
		    var LOCROW = prameter.position_cell[0];	// 행
		    var LOCCOL = prameter.position_cell[1];	// 열
		    var LOCSTG = prameter.position_cell[2];	// 단
		    
			var x = 0;
			var y = 0;
			var z = 0;
			
			if( zone.direction == 'E' || zone.direction == 'W' ) {
				
				x = LOCROW;
				y = LOCSTG;
				z = LOCCOL;

			} else {
				
				x = LOCCOL;
				y = LOCSTG;
				z = LOCROW;
			}

			//var object;
			
			// 재고가 없으면 빈랙
			var loc_texture = new THREE.TextureLoader().load( locGeometry_hR.loc_hR.texture );
			var loc_object = new THREE.Mesh( loc_geometry, new THREE.MeshBasicMaterial( { color: locGeometry_hR.loc_hR.color, map: loc_texture } ) );

			loc_object.material.opacity = 1;			// 투명도
			loc_object.material.transparent = true;		// transparent: 투명
			
			
			// 기본 위치에서 offset 과 행열단 위치만큼 이동
			loc_object.position.x = offset_x + loc_position_x + ( locGeometry_hR.loc_hR.horizontal + locGeometry_hR.loc_hR.padding ) * x;
			loc_object.position.y = offset_y + loc_position_y + ( locGeometry_hR.loc_hR.height + locGeometry_hR.loc_hR.padding ) * y;
			loc_object.position.z = offset_z + loc_position_z + ( locGeometry_hR.loc_hR.vertical + locGeometry_hR.loc_hR.padding ) * z;
			
			// 객체에 userdata set
			loc_object.name = prameter.loc;
			loc_object.type = zone.type;
			loc_object.zone = zone.name;
			
			if (typeof prameter.clickHandler === 'function') {
				
				loc_object.callback = prameter.clickHandler;
				
			} else {
				loc_object.callback = function () {
					console.log('function not defined!!');
				}
			}

			loc_arr_hR.push(loc_object); 
			scene.add( loc_object );
		}
	})(this);
}

//FlowRack(fR)
var loc_fR = {
		
		horizontal: 100,
		height: 100,
		vertical: 2200,
		padding: 0,
		color: 0xffffff,
		texture: 'threejs/textures/edge.png'
	}
var loc_arr_fR = [];

var locGeometry_fR = function( zone, scene, prameter ) {
	

	
	if(prameter.loc_color) loc_fR.color = prameter.loc_color;
	if(prameter.loc_texture) loc_fR.texture = prameter.loc_texture;

	(function( locGeometry_fR) {


		var selectLoc = function( type, direction ) {
			
			switch( direction ) {
				case 'E': loc_fR.offset = [1, 0, 0]; break;
				case 'W': loc_fR.offset = [1, 0, 0]; break;
				case 'S': loc_fR.offset = [0, 0, 0]; break;
				case 'N': loc_fR.offset = [1, 0, 0]; break;
			}
			
			return loc_fR;
		};
		
		locGeometry_fR.loc_fR = selectLoc( zone.type, zone.direction);

		// Document - https://threejs.org/docs/index.html#api/en/geometries/BoxBufferGeometry
		var loc_geometry = new THREE.BoxBufferGeometry( locGeometry_fR.loc_fR.horizontal, 
				locGeometry_fR.loc_fR.height, locGeometry_fR.loc_fR.vertical );
		// 육면체의 중심축을 육면체의 꼭지점으로 치환
	    var loc_position_x = zone.position_x + (locGeometry_fR.loc_fR.horizontal / 2);
	    var loc_position_y = locGeometry_fR.loc_fR.height / 2;
	    var loc_position_z = zone.position_z + (locGeometry_fR.loc_fR.vertical / 2);
	    
	    // zone 의 위치대비 loc 의 위치  
	    var offset_x = locGeometry_fR.loc_fR.offset[0] * (locGeometry_fR.loc_fR.horizontal/4 + locGeometry_fR.loc_fR.padding);
	    var offset_y = locGeometry_fR.loc_fR.offset[1] * (locGeometry_fR.loc_fR.height + locGeometry_fR.loc_fR.padding);
	    var offset_z = locGeometry_fR.loc_fR.offset[2] * (locGeometry_fR.loc_fR.vertical + locGeometry_fR.loc_fR.padding);
	    
	    // DB 의 행열단 정보를 기반으로 생성
	    locGeometry_fR.draw = function () {

		    // LOC 위치에 그리기
		    var LOCROW = prameter.position_cell[0];	// 행
		    var LOCCOL = prameter.position_cell[1];	// 열
		    var LOCSTG = prameter.position_cell[2];	// 단
		    
			var x = 0;
			var y = 0;
			var z = 0;
			
			if( zone.direction == 'E' || zone.direction == 'W' ) {
				
				x = LOCROW;
				y = LOCSTG;
				z = LOCCOL;

			} else {
				
				x = LOCCOL;
				y = LOCSTG;
				z = LOCROW;
			}

			//var object;
			
			// 재고가 없으면 빈랙
			var loc_texture = new THREE.TextureLoader().load( locGeometry_fR.loc_fR.texture );
			var loc_object = new THREE.Mesh( loc_geometry, new THREE.MeshBasicMaterial( { color: locGeometry_fR.loc_fR.color, map: loc_texture } ) );

			loc_object.material.opacity = 1;			// 투명도
			loc_object.material.transparent = true;		// transparent: 투명
			
			
			// 기본 위치에서 offset 과 행열단 위치만큼 이동
			loc_object.position.x = offset_x + loc_position_x + ( locGeometry_fR.loc_fR.horizontal + locGeometry_fR.loc_fR.padding ) * x;
			loc_object.position.y = offset_y + loc_position_y + ( locGeometry_fR.loc_fR.height + locGeometry_fR.loc_fR.padding ) * y;
			loc_object.position.z = offset_z + loc_position_z + ( locGeometry_fR.loc_fR.vertical + locGeometry_fR.loc_fR.padding ) * z;
			
			// 객체에 userdata set
			loc_object.name = prameter.loc;
			loc_object.type = zone.type;
			loc_object.zone = zone.name;
			
			if (typeof prameter.clickHandler === 'function') {
				
				loc_object.callback = prameter.clickHandler;
				
			} else {
				loc_object.callback = function () {
					console.log('function not defined!!');
				}
			}

			loc_arr_fR.push(loc_object); 
			scene.add( loc_object );
		}
	})(this);
}
/******************************************************************************************************
 * conveyor 객체생성
 ******************************************************************************************************/
var conveyor_unit = {

	horizontal: 100,
	height: 	20,
	vertical: 	100,
	padding: 	0,
	color: 		0xffffff,
}

var roller = {

	radius: 	10,
	height: 	100,
	segments: 	8,		// n각
	color: 		0xffffff,
}

var conveyor_arr = [];
var route = [[-1350,-350],[-1050,-350],[-1050,350],[-750,350],[-750,-350],[-450,-350],[-450,-150],[-250,-150],[150,-150]];

var conveyorGeometry = function( scene, prameter ) {

	var roller_arr = [];
	
	(function( conveyorGeometry ) {
		
		conveyorGeometry.draw = function () {
			
			var conveyor_geometry = new THREE.BoxBufferGeometry( conveyor_unit.horizontal, conveyor_unit.height, conveyor_unit.vertical );
			
			var  conveyor_object = new THREE.Mesh( conveyor_geometry, new THREE.MeshLambertMaterial( { color: conveyor_unit.color } ) );
			conveyor_object.position.set( prameter.position[0], prameter.position[1], prameter.position[2] );
			conveyor_object.name = prameter.conveyor;
			
			conveyor_arr.push( conveyor_object ); 
			scene.add( conveyor_object );

			if( prameter.direction == 'xz' ){	// 코너 또는 분기

				var sorter_geometry = new THREE.BoxBufferGeometry( conveyor_unit.horizontal, 20, conveyor_unit.vertical );
				
				var  sorter_object = new THREE.Mesh( sorter_geometry, new THREE.MeshLambertMaterial( { color: 0x686868 } ) );
				sorter_object.position.set( prameter.position[0], prameter.position[1] + conveyor_unit.height, prameter.position[2] );

				scene.add( sorter_object );
				
			} else {
				
				var roller_geometry = new THREE.CylinderGeometry( roller.radius, roller.radius, roller.height, roller.segments );

			    for(var i=0 ; i<4 ; i++){
			    	
					var roller_object = new THREE.Mesh( roller_geometry, new THREE.MeshPhongMaterial( {color: 0x8c8c8c} ) );

					// 컨베이어의 방향과 그에 따른 롤러의 위치 결정
				    var roller_position_y = conveyor_unit.height + roller.radius;
				    
					if( prameter.direction == 'x+' || prameter.direction == 'x-' ){
						var x = (prameter.position[0] - 40) + (i * 25);
						var y = conveyor_unit.height + roller.radius;
						var z = prameter.position[2];
						roller_object.position.set( x, y, z  );
						roller_object.rotation.x = 0.5 * Math.PI;

					} else if( prameter.direction == 'z+' || prameter.direction == 'z-' ){
						var x = prameter.position[0];
						var y = conveyor_unit.height + roller.radius;
						var z = (prameter.position[2] - 40) + (i * 25);
						roller_object.position.set( x, y, z  );
						roller_object.rotation.z = 0.5 * Math.PI;
					}

					scene.add( roller_object );
					roller_arr.push( roller_object );
			    }
			}

	    }
		
		conveyorGeometry.run = function () {

			for(var i=0 ; i<roller_arr.length ; i++){
				// 컨베이어의 방향에 따른 롤러의 회전방향 결정
				switch( prameter.direction ){
					case 'x+':	roller_arr[i].rotation.y -= 0.1; break;
					case 'x-':	roller_arr[i].rotation.y += 0.1; break;
					case 'z+':	roller_arr[i].rotation.x += 0.1; break;
					case 'z-':	roller_arr[i].rotation.x -= 0.1; break;
				}
			}
			
			requestAnimationFrame( conveyorGeometry.run );
		}
	})(this);
}
/******************************************************************************************************
 * crane 객체생성
 ******************************************************************************************************/
var crane = {

		horizontal: 100,
		height: 20,
		vertical: 100,
		color: 0xff0000,
	}

	var crane_arr = [];

	var craneGeometry = function( scene, prameter ) {

		(function( craneGeometry ) {

			var crane_geometry = new THREE.BoxBufferGeometry( crane.horizontal, crane.height, crane.vertical );
			
			craneGeometry.draw = function () {
				
				// 크레인의 기본위치가 되는 객체(입고대 등)
				var gate_object = new THREE.Mesh( crane_geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );

				gate_object.material.opacity = 1;				// 투명도
				gate_object.material.transparent = true;		// transparent: 투명
				gate_object.position.set( prameter.position[0], prameter.position[1], prameter.position[2] );

				scene.add( gate_object );
				
				var crane_object = new THREE.Mesh( crane_geometry, new THREE.MeshLambertMaterial( { color: crane.color } ) );

				crane_object.material.opacity = 1;				// 투명도
				crane_object.material.transparent = true;		// transparent: 투명
				crane_object.position.set( prameter.position[0], prameter.position[1], prameter.position[2] );
				crane_object.name = prameter.crane;
				crane_object.gate = gate_object;				// 입구
				crane_object.loc = gate_object;					// 크래인 현재위치
				
				crane_arr.push(crane_object); 
				scene.add( crane_object );
		    }
		})(this);
	}
/******************************************************************************************************
 * In
 ******************************************************************************************************/
var box = {
		width: 100,
		height: 100,
		depth: 100,
		color: 0xff0000
	}
var box_arr = [];
var createBox = function(posX, posY, posZ) {

	(function(createBox) {
		var box_geometry = new THREE.BoxBufferGeometry( box.width, box.height, box.depth );
		var box_meterial = new THREE.MeshPhongMaterial({ color: box.color });
		var box_mesh = new THREE.Mesh( box_geometry, box_meterial );
		box_mesh.position.set(posX, posY, posZ);
		warehouse.scene.add(box_mesh);
		box_arr.push(box_mesh);

	})(this);
};

