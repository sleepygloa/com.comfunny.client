/******************************************************************************************************
 * 객체라벨추가
 ******************************************************************************************************/
function addLabel( name, scene, location, rotation, font_size ) {

	var loader = new THREE.FontLoader();

	loader.load( 'threejs/font/dohyeon_regular.json', function ( font ) {

		// 택스트 :  Document - https://threejs.org/docs/#api/en/geometries/TextBufferGeometry
		var label_geometry = new THREE.TextBufferGeometry( name, {font: font, size: font_size, height: 1} );
		var label = new THREE.Mesh( label_geometry, new THREE.MeshBasicMaterial( { color: 0x0100ff } ) );
		label.position.copy( location );
		label.rotation.copy( rotation );
		scene.add( label );
	} );
}

/******************************************************************************************************
 * scene, light, camera, renderer 등 객체생성
 ******************************************************************************************************/
var font_label;
var warehouse = function( container ) {

	(function( warehouse ) {

		warehouse.INTERSECTED;
		
	    warehouse.mouse = new THREE.Vector2();
	    warehouse.raycaster = new THREE.Raycaster();
	    
		// 장면 :  Document - https://threejs.org/docs/#api/en/scenes/Scene
		warehouse.scene = new THREE.Scene();
		warehouse.scene.background = new THREE.Color( 0xeaeaea );

		// 조명 : Document - https://threejs.org/docs/#api/en/lights/DirectionalLight
		warehouse.light = new THREE.DirectionalLight( 0xffffff, 1.0 );
		warehouse.light.position.set( 1, 1, 1 ).normalize();
		warehouse.scene.add( warehouse.light );
		
		// 중심좌표가이드 : Document - https://threejs.org/docs/#api/en/helpers/AxesHelper
	    warehouse.scene.add( new THREE.AxesHelper(500) );

	    // 화살표가이드 : Document - https://threejs.org/docs/#api/en/helpers/ArrowHelper
	    warehouse.arrow = new THREE.ArrowHelper( new THREE.Vector3( 0, -1, 0 ), new THREE.Vector3( 0, 350, 0 ), 25, 0xff0000, 25, 25 );
	    warehouse.scene.add( warehouse.arrow );
	  
	    // 바닥그리드가이드 : Document - https://threejs.org/docs/#api/en/helpers/GridHelper
	    var grid_1 = new THREE.GridHelper( 2000, 20 );
	    grid_1.position.x = -2000;
		warehouse.scene.add( grid_1 );

	    var grid_2 = new THREE.GridHelper( 2000, 20 );
	    grid_2.position.x = 0;
		warehouse.scene.add( grid_2 );

	    var grid_3 = new THREE.GridHelper( 2000, 20 );
	    grid_3.position.x = 2000;
		warehouse.scene.add( grid_3 );
		
		// 배경벽(북쪽, 서쪽) ==========================================================================
		var wall_north_geometry = new THREE.PlaneGeometry(6000, 400);
		var wall_north_material = new THREE.MeshPhongMaterial({color: 0x5a7cc0})

		var wall_north = new THREE.Mesh( wall_north_geometry, wall_north_material ); 
		wall_north.position.set( 0, 200, -1000 );
	    warehouse.scene.add( wall_north );

		var wall_west_geometry = new THREE.PlaneGeometry(2000, 400);
		var wall_west_material = new THREE.MeshPhongMaterial({color: 0x5a7cc0})
		
	    var wall_west = new THREE.Mesh( wall_west_geometry, wall_west_material ); 
	    wall_west.rotation.y = 0.5 * Math.PI;
	    wall_west.position.set( -3000, 200, 0 );
	    warehouse.scene.add( wall_west );

		/* 카메라 : Document - https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
		 * THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT, NEAR, FAR)
		 * FIELD_OF_VIEW: 카메라의 시야각을 의미한다. 커질 수록 카메라가 바라보는 시야각이 넓어짐을 의미한다. 단위는 degree.
		 * ASPECT: 시야의 가로세로비를 의미한다. 컨테이너의 가로세로비와 동일한 값을 넣어주는게 좋다. 단위 없음.
		 * NEAR: 렌더링 할 물체 거리의 하한값으로, 너무 가까이 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 작은 물체는 화면에 그리지 않는다. 0보다 크고 FAR 보다 작은 값을 가질 수 있다.
		 * FAR: 렌더링 할 물체 거리의 상한값으로, 너무 멀리 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 큰 물체는 화면에 그리지 않는다. */
	    warehouse.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	    warehouse.camera.position.set( 0, 1000, 2000 );
	    
		// Document - https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
	    warehouse.renderer = new THREE.WebGLRenderer();
	    warehouse.renderer.setPixelRatio( window.devicePixelRatio );
	    warehouse.renderer.setSize( window.innerWidth, window.innerHeight );
	    
		container.appendChild( warehouse.renderer.domElement );

		// Camera Moving Controls ==========================================================================
		warehouse.cameraControls = function () {
			
			warehouse.controls = new THREE.OrbitControls( warehouse.camera, warehouse.renderer.domElement );
			warehouse.controls.rotateSpeed = 0.5; 			// 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
			warehouse.controls.zoomSpeed = 1; 				// 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.panSpeed = 1; 					// 패닝 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.minDistance = 200; 			// 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
			warehouse.controls.maxDistance = 3000; 			// 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
			warehouse.controls.minPolarAngle = 0;				// 상하 각도조절 제약
			warehouse.controls.maxPolarAngle = Math.PI/2;		// 상하 각도조절 제약
		    //warehouse.controls.minAzimuthAngle = 0;			// 좌우 각도조절 제약
		    //warehouse.controls.maxAzimuthAngle = Math.PI/2;	// 좌우 각도조절 제약
		}
		
		// Renderer rendering ==========================================================================
		warehouse.animation = function () {
			
			requestAnimationFrame( warehouse.animation );

			warehouse.renderer.render( warehouse.scene, warehouse.camera );
		}

		// MouseDown 이벤트 ==========================================================================
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

		// WindowResize 이벤트 ==========================================================================
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
var center_x = 2800;	// 중심축좌표
var center_z = 800;

var zone_arr = [

	{ name: 'A1', horizontal: 100, vertical: 500, position_x: 900 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'A2', horizontal: 100, vertical: 500, position_x: 1010 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'A3', horizontal: 100, vertical: 500, position_x: 1190 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'A4', horizontal: 100, vertical: 500, position_x: 1300 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  , { name: 'A5', horizontal: 100, vertical: 500, position_x: 900 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'A6', horizontal: 100, vertical: 500, position_x: 1010 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'A7', horizontal: 100, vertical: 500, position_x: 1190 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'A8', horizontal: 100, vertical: 500, position_x: 1300 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }

  ,	{ name: 'B1', horizontal: 100, vertical: 500, position_x: 1490 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'B2', horizontal: 100, vertical: 500, position_x: 1600 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'B3', horizontal: 100, vertical: 500, position_x: 1790 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'B4', horizontal: 100, vertical: 500, position_x: 1900 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'B5', horizontal: 100, vertical: 500, position_x: 1490 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'B6', horizontal: 100, vertical: 500, position_x: 1600 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'B7', horizontal: 100, vertical: 500, position_x: 1790 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'B8', horizontal: 100, vertical: 500, position_x: 1900 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }

  ,	{ name: 'C1', horizontal: 100, vertical: 500, position_x: 2090 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'C2', horizontal: 100, vertical: 500, position_x: 2200 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'C3', horizontal: 100, vertical: 500, position_x: 2390 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'C4', horizontal: 100, vertical: 500, position_x: 2500 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'C5', horizontal: 100, vertical: 500, position_x: 2090 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'C6', horizontal: 100, vertical: 500, position_x: 2200 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'C7', horizontal: 100, vertical: 500, position_x: 2390 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'C8', horizontal: 100, vertical: 500, position_x: 2500 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }

  ,	{ name: 'D1', horizontal: 100, vertical: 500, position_x: 2990 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'D2', horizontal: 100, vertical: 500, position_x: 3100 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'D3', horizontal: 100, vertical: 500, position_x: 3290 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'D4', horizontal: 100, vertical: 500, position_x: 3400 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'D5', horizontal: 100, vertical: 500, position_x: 2990 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'D6', horizontal: 100, vertical: 500, position_x: 3100 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'D7', horizontal: 100, vertical: 500, position_x: 3290 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'D8', horizontal: 100, vertical: 500, position_x: 3400 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }

  ,	{ name: 'E1', horizontal: 100, vertical: 500, position_x: 3590 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'E2', horizontal: 100, vertical: 500, position_x: 3700 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'E3', horizontal: 100, vertical: 500, position_x: 3890 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'E4', horizontal: 100, vertical: 500, position_x: 4000 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'E5', horizontal: 100, vertical: 500, position_x: 3590 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'E6', horizontal: 100, vertical: 500, position_x: 3700 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'E7', horizontal: 100, vertical: 500, position_x: 3890 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'E8', horizontal: 100, vertical: 500, position_x: 4000 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }

  ,	{ name: 'F1', horizontal: 100, vertical: 500, position_x: 4190 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'F2', horizontal: 100, vertical: 500, position_x: 4300 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'F3', horizontal: 100, vertical: 500, position_x: 4490 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'F4', horizontal: 100, vertical: 500, position_x: 4600 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'F5', horizontal: 100, vertical: 500, position_x: 4190 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'F6', horizontal: 100, vertical: 500, position_x: 4300 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'F7', horizontal: 100, vertical: 500, position_x: 4490 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'F8', horizontal: 100, vertical: 500, position_x: 4600 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  
  ,	{ name: 'G1', horizontal: 100, vertical: 500, position_x: 4790 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'G2', horizontal: 100, vertical: 500, position_x: 4900 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'G3', horizontal: 100, vertical: 500, position_x: 5090 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'G4', horizontal: 100, vertical: 500, position_x: 5200 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'G5', horizontal: 100, vertical: 500, position_x: 4790 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'G6', horizontal: 100, vertical: 500, position_x: 4900 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
  ,	{ name: 'G7', horizontal: 100, vertical: 500, position_x: 5090 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'W' }
  ,	{ name: 'G8', horizontal: 100, vertical: 500, position_x: 5200 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'E' }
 
  , { name: 'L1', horizontal: 500, vertical: 100, position_x: 0 - center_x, position_z: 710 - center_z, color: 0xffffff, type: 'rack', direction: 'S' }
  , { name: 'L2', horizontal: 500, vertical: 100, position_x: 0 - center_x, position_z: 600 - center_z, color: 0xffffff, type: 'rack', direction: 'N' }
  , { name: 'L3', horizontal: 500, vertical: 100, position_x: 0 - center_x, position_z: 400 - center_z, color: 0xffffff, type: 'rack', direction: 'S' }
  , { name: 'L4', horizontal: 500, vertical: 100, position_x: 0 - center_x, position_z: 290 - center_z, color: 0xffffff, type: 'rack', direction: 'N' }
  , { name: 'L5', horizontal: 500, vertical: 100, position_x: 0 - center_x, position_z: 110 - center_z, color: 0xffffff, type: 'rack', direction: 'S' }
  ,	{ name: 'L6', horizontal: 500, vertical: 100, position_x: 0 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'N' }

  , { name: 'W1', horizontal: 800, vertical: 200, position_x: 1800 - center_x, position_z: 1400 - center_z, color: 0xffffff, type: 'yard', direction: 'S' }
  , { name: 'R1', horizontal: 800, vertical: 200, position_x: 900 - center_x, position_z: 1400 - center_z, color: 0xffeaea, type: 'yard', direction: 'S' }
  , { name: 'X1', horizontal: 500, vertical: 600, position_x: 0 - center_x, position_z: 1000 - center_z, color: 0xcef279, type: 'yard', direction: 'S' }
  , { name: 'Y1', horizontal: 2000, vertical: 200, position_x: 3300 - center_x, position_z: 1400 - center_z, color: 0xb5b2ff, type: 'yard', direction: 'S' }
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

		    var zone_object = new THREE.Mesh( zone_geometry, new THREE.MeshPhongMaterial({color: zoneGeometry.zone.color}) ); 
		    //zone_object.material.side = THREE.DoubleSide; // 뒤집어도 바닥 보이게
		    zone_object.position.set( zone_position_x, 0, zone_position_z );
		    zone_object.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정

			// 객체에 userdata set
		    zone_object.type = 'zone';
		    zone_object.name = zoneGeometry.zone.name;
			
		    scene.add(zone_object);
		    
		    // ZONE Label 추가
			var rotation = new THREE.Euler( 0, 0, 0 );

			if( zoneGeometry.zone.direction == 'E' ) {

				rotation = new THREE.Euler( 0, 0.5 * Math.PI, 0 );
				zone_position_x = zone_position_x + ( zoneGeometry.zone.horizontal / 2 ) + 10;
				zone_position_z = zone_position_z + ( zoneGeometry.zone.vertical / 2 ) - 10;
				
			} else if( zoneGeometry.zone.direction == 'W' ) {
				
				rotation = new THREE.Euler( 0, -0.5 * Math.PI, 0 );
				zone_position_x = zone_position_x - ( zoneGeometry.zone.horizontal / 2 ) - 10;
				zone_position_z = zone_position_z - ( zoneGeometry.zone.vertical / 2 ) + 10;
				
			} else if( zoneGeometry.zone.direction == 'S' ) {
				
				rotation = new THREE.Euler( 0, 0, 0 );
				zone_position_x = zone_position_x - ( zoneGeometry.zone.horizontal / 2 ) + 10;
				zone_position_z = zone_position_z + ( zoneGeometry.zone.vertical / 2 ) + 10;
				
			} else if( zoneGeometry.zone.direction == 'N' ) {

				rotation = new THREE.Euler( 0, Math.PI, 0 );
				zone_position_x = zone_position_x + ( zoneGeometry.zone.horizontal / 2 ) - 10;
				zone_position_z = zone_position_z - ( zoneGeometry.zone.vertical / 2 ) - 10;
			}

			addLabel( zone_name, scene, new THREE.Vector3( zone_position_x, 0, zone_position_z ), rotation, 20 );
		}
		
	})(this);
}

/******************************************************************************************************
 * loc 객체생성
 ******************************************************************************************************/
var loc = {

	horizontal: 50,
	height: 50,
	vertical: 50,
	padding: 0,
	color: 0xffffff,
	texture: 'threejs/textures/edge.png'
}

var loc_arr = [];

var locGeometry = function( zone, scene, prameter ) {

	if(prameter.loc_color) loc.color = prameter.loc_color;
	if(prameter.loc_texture) loc.texture = prameter.loc_texture;

	
	(function( locGeometry ) {
	
		var selectLoc = function( type, direction ) {

			switch( type ) {
				case 'rack': locGeometry.draw = dataDraw; break;
				case 'yard': locGeometry.draw = autoDraw; break;
			}
			
			switch( direction ) {
				case 'E': loc.offset = [0, 0, 0]; break;
				case 'W': loc.offset = [1, 0, 0]; break;
				case 'S': loc.offset = [0, 0, 0]; break;
				case 'N': loc.offset = [0, 0, 1]; break;
			}
			
			return loc;
		};
		
		locGeometry.loc = selectLoc( zone.type, zone.direction);

		// Document - https://threejs.org/docs/index.html#api/en/geometries/BoxBufferGeometry
		var loc_geometry = new THREE.BoxBufferGeometry( locGeometry.loc.horizontal, locGeometry.loc.height, locGeometry.loc.vertical );

		// 육면체의 중심축을 육면체의 꼭지점으로 치환
	    var loc_position_x = zone.position_x + (locGeometry.loc.horizontal / 2);
	    var loc_position_y = locGeometry.loc.height / 2;
	    var loc_position_z = zone.position_z + (locGeometry.loc.vertical / 2);
	    
	    // zone 의 위치대비 loc 의 위치  
	    var offset_x = locGeometry.loc.offset[0] * (locGeometry.loc.horizontal + locGeometry.loc.padding);
	    var offset_y = locGeometry.loc.offset[1] * (locGeometry.loc.height + locGeometry.loc.padding);
	    var offset_z = locGeometry.loc.offset[2] * (locGeometry.loc.vertical + locGeometry.loc.padding);
	    
	    // DB 의 행열단 정보를 기반으로 생성
		function dataDraw() {

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
			var loc_texture = new THREE.TextureLoader().load( locGeometry.loc.texture );
			var loc_object = new THREE.Mesh( loc_geometry, new THREE.MeshBasicMaterial( { color: locGeometry.loc.color, map: loc_texture } ) );

			loc_object.material.opacity = 1;			// 투명도
			loc_object.material.transparent = true;		// transparent: 투명
			
			
			// 기본 위치에서 offset 과 행열단 위치만큼 이동
			loc_object.position.x = offset_x + loc_position_x + ( locGeometry.loc.horizontal + locGeometry.loc.padding ) * x;
			loc_object.position.y = offset_y + loc_position_y + ( locGeometry.loc.height + locGeometry.loc.padding ) * y;
			loc_object.position.z = offset_z + loc_position_z + ( locGeometry.loc.vertical + locGeometry.loc.padding ) * z;
			
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

			loc_arr.push(loc_object); 
			
			scene.add( loc_object );
		}
		
		// LOC 의 SKU 갯수만큼 임의모양으로 생성
		function autoDraw() {

			var count_x = 0, count_y = 0, count_z = 0;
			
			// yard 일경우 SKU 당 1개의 박스를 자동으로 생성
			if(prameter.skuqty > 0){
				// ZONE 의 가로길이 / LOC 의 가로길이
				count_x = parseInt( zone.horizontal / locGeometry.loc.horizontal );
				
				// ZONE 의 세로길이 / LOC 의 세로길이
				count_z = parseInt( zone.vertical / locGeometry.loc.vertical );
				
				count_y = prameter.skuqty / ( count_x * count_z );
			}

			var cellcount = prameter.skuqty;	// 셀갯수

		    // cellcount 만큼 그렸으면 종료
			for ( var x = 0, cnt = 0; x < count_x && cnt < cellcount; x++ ) {
				
				for ( var y = 0; y < count_y && cnt < cellcount; y++ ) {
					
					for ( var z = 0; z < count_z && cnt < cellcount; z++, cnt ++) {

						var texture = new THREE.TextureLoader().load( locGeometry.loc.texture );

						var object = new THREE.Mesh( loc_geometry, new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } ) );
						object.position.x = offset_x + loc_position_x + (locGeometry.loc.horizontal + locGeometry.loc.padding) * x;
						object.position.y = offset_y + loc_position_y + (locGeometry.loc.height + locGeometry.loc.padding) * y;
						object.position.z = offset_z + loc_position_z + (locGeometry.loc.height + locGeometry.loc.padding) * z;
						
						// 객체에 userdata set
						object.name = prameter.loc;
						object.type = zone.type;
						object.zone = zone.name;

						if (typeof prameter.clickHandler === 'function') {
							
							object.callback = prameter.clickHandler;
							
						} else {
							
							object.callback = function () {
								
								console.log('function not defined!!');
							}
						}

						loc_arr.push( object ); 
						
						scene.add( object );
					}
				}
			}
		}

	})(this);
}