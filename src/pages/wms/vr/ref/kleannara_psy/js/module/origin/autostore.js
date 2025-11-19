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
var autostore = function( container ) {

	(function( autostore ) {

		autostore.INTERSECTED;
		
	    autostore.mouse = new THREE.Vector2();
	    autostore.raycaster = new THREE.Raycaster();
	    
		// 장면 :  Document - https://threejs.org/docs/#api/en/scenes/Scene
		autostore.scene = new THREE.Scene();
		autostore.scene.background = new THREE.Color( 0xeaeaea );

		// 조명 : Document - https://threejs.org/docs/#api/en/lights/DirectionalLight
		autostore.light = new THREE.DirectionalLight( 0xffffff, 1.0 );
		autostore.light.position.set( 1, 1, 1 ).normalize();
		autostore.scene.add( autostore.light );
		
		// 중심좌표가이드 : Document - https://threejs.org/docs/#api/en/helpers/AxesHelper
	    autostore.scene.add( new THREE.AxesHelper(500) );

	    // 화살표가이드 : Document - https://threejs.org/docs/#api/en/helpers/ArrowHelper
	    autostore.arrow = new THREE.ArrowHelper( new THREE.Vector3( 0, -1, 0 ), new THREE.Vector3( 0, 350, 0 ), 25, 0xff0000, 25, 25 );
	    autostore.scene.add( autostore.arrow );
	    
	    // 바닥그리드가이드 : Document - https://threejs.org/docs/#api/en/helpers/GridHelper
	    var grid_1 = new THREE.GridHelper( 500, 10 );
	    grid_1.position.x = -500;
		autostore.scene.add( grid_1 );

	    var grid_2 = new THREE.GridHelper( 500, 10 );
	    grid_2.position.x = 0;
		autostore.scene.add( grid_2 );

	    var grid_3 = new THREE.GridHelper( 500, 10 );
	    grid_3.position.x = 500;
		autostore.scene.add( grid_3 );

		// 트랙 =======================================================================================
	    var track_geometry_1 = new THREE.PlaneGeometry( 1400, 20 );
	    var track_material_1 = new THREE.Mesh( track_geometry_1, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_1.position.set( 0, 0, -25 );
	    track_material_1.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    autostore.scene.add(track_material_1);
		
	    var track_geometry_2 = new THREE.PlaneGeometry( 20, 235 );
	    var track_material_2 = new THREE.Mesh( track_geometry_2, new THREE.MeshPhongMaterial({color: 0xff5e00}) ); 
	    track_material_2.position.set( -25, 0, 83 );
	    track_material_2.rotation.x = -0.5 * Math.PI; // 평면이 x-z 축에 보이도록 보정
	    autostore.scene.add(track_material_2);

		// 배경벽(북쪽, 서쪽) ==========================================================================
		var wall_north_geometry = new THREE.PlaneGeometry(1500, 400);
		var wall_north_material = new THREE.MeshPhongMaterial({color: 0x5a7cc0})

		var wall_north = new THREE.Mesh( wall_north_geometry, wall_north_material ); 
		wall_north.position.set( 0, 200, -250 );
	    autostore.scene.add( wall_north );

		var wall_west_geometry = new THREE.PlaneGeometry(500, 400);
		var wall_west_material = new THREE.MeshPhongMaterial({color: 0x5a7cc0})
		
	    var wall_west = new THREE.Mesh( wall_west_geometry, wall_west_material ); 
	    wall_west.rotation.y = 0.5 * Math.PI;
	    wall_west.position.set( -750, 200, 0 );
	    autostore.scene.add( wall_west );

		var wall_east_geometry = new THREE.PlaneGeometry(500, 400);
		var wall_east_material = new THREE.MeshPhongMaterial({color: 0x5a7cc0})
		
	    var wall_east = new THREE.Mesh( wall_east_geometry, wall_east_material ); 
		wall_east.rotation.y = 0.5 * Math.PI;
		wall_east.position.set( 750, 200, 0 );
	    autostore.scene.add( wall_east );
	    
		/* 카메라 : Document - https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
		 * THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT, NEAR, FAR)
		 * FIELD_OF_VIEW: 카메라의 시야각을 의미한다. 커질 수록 카메라가 바라보는 시야각이 넓어짐을 의미한다. 단위는 degree.
		 * ASPECT: 시야의 가로세로비를 의미한다. 컨테이너의 가로세로비와 동일한 값을 넣어주는게 좋다. 단위 없음.
		 * NEAR: 렌더링 할 물체 거리의 하한값으로, 너무 가까이 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 작은 물체는 화면에 그리지 않는다. 0보다 크고 FAR 보다 작은 값을 가질 수 있다.
		 * FAR: 렌더링 할 물체 거리의 상한값으로, 너무 멀리 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 큰 물체는 화면에 그리지 않는다. */
	    autostore.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	    autostore.camera.position.set( 0, 500, 1000 );
	    
		// Document - https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
	    autostore.renderer = new THREE.WebGLRenderer();
	    autostore.renderer.setPixelRatio( window.devicePixelRatio );
	    autostore.renderer.setSize( window.innerWidth, window.innerHeight );
	    
		container.appendChild( autostore.renderer.domElement );

		// Camera Moving Controls ==========================================================================
		autostore.cameraControls = function () {
			
			autostore.controls = new THREE.OrbitControls( autostore.camera, autostore.renderer.domElement );
			autostore.controls.rotateSpeed = 0.5; 			// 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
			autostore.controls.zoomSpeed = 1; 				// 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
			autostore.controls.panSpeed = 1; 					// 패닝 속도 입니다. 기본값(Float)은 1입니다.
			autostore.controls.minDistance = 200; 			// 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
			autostore.controls.maxDistance = 3000; 			// 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
			autostore.controls.minPolarAngle = 0;				// 상하 각도조절 제약
			autostore.controls.maxPolarAngle = Math.PI/2;		// 상하 각도조절 제약
		    //autostore.controls.minAzimuthAngle = 0;			// 좌우 각도조절 제약
		    //autostore.controls.maxAzimuthAngle = Math.PI/2;	// 좌우 각도조절 제약
		}
		
		// Renderer rendering ==========================================================================
		autostore.animation = function () {

			requestAnimationFrame( autostore.animation );

			autostore.renderer.render( autostore.scene, autostore.camera );
		}
		
		// MouseDown 이벤트 ==========================================================================
		autostore.onMouseDown = function () {

			// 객체를 클릭했을경우 반응
			event.preventDefault();
			autostore.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			autostore.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			autostore.raycaster.setFromCamera( autostore.mouse, autostore.camera );

			var intersects = autostore.raycaster.intersectObjects( autostore.scene.children );

			if( intersects.length > 0 ) {

				if( autostore.INTERSECTED != intersects[ 0 ].object ) {

					// LOC 일경우
					if( intersects[ 0 ].object.type == 'rack' || intersects[ 0 ].object.type == 'yard'){
						
						if( autostore.INTERSECTED ) {
							autostore.INTERSECTED.material.opacity = 1;	
						}

						autostore.INTERSECTED = intersects[ 0 ].object;
						autostore.INTERSECTED.material.opacity = 0.5;			// 투명도
						
						// callback 으로 정의된 함수 호출
						intersects[0].object.callback( intersects[0].object.name );
					}
				}

			} else {

				if ( autostore.INTERSECTED ) {
					autostore.INTERSECTED.material.opacity = 1;	
				}

				autostore.INTERSECTED = null;
			}
		}

		document.addEventListener( 'mousedown', autostore.onMouseDown, false );
		
		// WindowResize 이벤트 ==========================================================================
		autostore.onWindowResize = function () {

			autostore.camera.aspect = window.innerWidth / window.innerHeight;
			autostore.camera.updateProjectionMatrix();

			autostore.renderer.setSize( window.innerWidth, window.innerHeight );
		}
		
		window.addEventListener( 'resize', autostore.onWindowResize, false );
		
	})(this);
}

/******************************************************************************************************
 * zone 객체생성
 ******************************************************************************************************/
var center_x = 700;	// 중심축좌표
var center_z = 200;

var zone_arr = [

	{ name: 'S1', horizontal: 1400, vertical: 100, position_x: 0 - center_x, position_z: 0 - center_z, color: 0xffffff, type: 'rack', direction: 'S' }
  ,	{ name: 'S2', horizontal: 600, vertical: 100, position_x: 0 - center_x, position_z: 250 - center_z, color: 0xffffff, type: 'rack', direction: 'N' }
  ,	{ name: 'S3', horizontal: 650, vertical: 100, position_x: 750 - center_x, position_z: 250 - center_z, color: 0xffffff, type: 'rack', direction: 'N' }
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
	    locGeometry.draw = function () {

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
	})(this);
}

/******************************************************************************************************
 * crane 객체생성
 ******************************************************************************************************/
var crane = {

	horizontal: 50,
	height: 20,
	vertical: 50,
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

