/******************************************************************************************************
 * scene, light, camera, renderer 등 객체생성
 ******************************************************************************************************/
var font_label;
var conveyor = function( container ) {

	(function( conveyor ) {

		conveyor.INTERSECTED;
		
	    conveyor.mouse = new THREE.Vector2();
	    conveyor.raycaster = new THREE.Raycaster();
	    
		// 장면 :  Document - https://threejs.org/docs/#api/en/scenes/Scene
		conveyor.scene = new THREE.Scene();
		conveyor.scene.background = new THREE.Color( 0xeaeaea );

		// 조명 : Document - https://threejs.org/docs/#api/en/lights/DirectionalLight
		conveyor.light = new THREE.DirectionalLight( 0xffffff, 1.0 );
		conveyor.light.position.set( 1, 1, 1 ).normalize();
		conveyor.scene.add( conveyor.light );
		
		// 중심좌표가이드 : Document - https://threejs.org/docs/#api/en/helpers/AxesHelper
	    conveyor.scene.add( new THREE.AxesHelper(500) );

	    // 화살표가이드 : Document - https://threejs.org/docs/#api/en/helpers/ArrowHelper
	    conveyor.arrow = new THREE.ArrowHelper( new THREE.Vector3( 0, -1, 0 ), new THREE.Vector3( 0, 350, 0 ), 25, 0xff0000, 25, 25 );
	    conveyor.scene.add( conveyor.arrow );
	    
	    // 바닥그리드가이드 : Document - https://threejs.org/docs/#api/en/helpers/GridHelper
	    var grid_1 = new THREE.GridHelper( 1000, 20 );
	    grid_1.position.x = -1000;
		conveyor.scene.add( grid_1 );

	    var grid_2 = new THREE.GridHelper( 1000, 20 );
	    grid_2.position.x = 0;
		conveyor.scene.add( grid_2 );

	    var grid_3 = new THREE.GridHelper( 1000, 20 );
	    grid_3.position.x = 1000;
		conveyor.scene.add( grid_3 );

		// 배경벽(북쪽, 서쪽) ==========================================================================
		var wall_north_geometry = new THREE.PlaneGeometry(3000, 200);
		var wall_north_material = new THREE.MeshPhongMaterial({color: 0x5a7cc0})

		var wall_north = new THREE.Mesh( wall_north_geometry, wall_north_material ); 
		wall_north.position.set( 0, 100, -500 );
	    conveyor.scene.add( wall_north );

		var wall_west_geometry = new THREE.PlaneGeometry(1000, 200);
		var wall_west_material = new THREE.MeshPhongMaterial({color: 0x5a7cc0})
		
	    var wall_west = new THREE.Mesh( wall_west_geometry, wall_west_material ); 
	    wall_west.rotation.y = 0.5 * Math.PI;
	    wall_west.position.set( -1500, 100, 0 );
	    conveyor.scene.add( wall_west );

		var wall_east_geometry = new THREE.PlaneGeometry(500, 200);
		var wall_east_material = new THREE.MeshPhongMaterial({color: 0x5a7cc0})

		/* 카메라 : Document - https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
		 * THREE.PerspectiveCamera(FIELD_OF_VIEW, ASPECT, NEAR, FAR)
		 * FIELD_OF_VIEW: 카메라의 시야각을 의미한다. 커질 수록 카메라가 바라보는 시야각이 넓어짐을 의미한다. 단위는 degree.
		 * ASPECT: 시야의 가로세로비를 의미한다. 컨테이너의 가로세로비와 동일한 값을 넣어주는게 좋다. 단위 없음.
		 * NEAR: 렌더링 할 물체 거리의 하한값으로, 너무 가까이 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 작은 물체는 화면에 그리지 않는다. 0보다 크고 FAR 보다 작은 값을 가질 수 있다.
		 * FAR: 렌더링 할 물체 거리의 상한값으로, 너무 멀리 있는 물체를 그리는 것을 막기 위해 사용한다. 카메라로부터의 거리가 이 값보다 큰 물체는 화면에 그리지 않는다. */
	    conveyor.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	    conveyor.camera.position.set( 0, 500, 1000 );
	    
		// Document - https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
	    conveyor.renderer = new THREE.WebGLRenderer();
	    conveyor.renderer.setPixelRatio( window.devicePixelRatio );
	    conveyor.renderer.setSize( window.innerWidth, window.innerHeight );
	    
		container.appendChild( conveyor.renderer.domElement );

		// Renderer rendering ==========================================================================
		conveyor.animation = function () {

			requestAnimationFrame( conveyor.animation );

			conveyor.renderer.render( conveyor.scene, conveyor.camera );
		}

		// Camera Moving Controls ==========================================================================
		conveyor.cameraControls = function () {
			
			conveyor.controls = new THREE.OrbitControls( conveyor.camera, conveyor.renderer.domElement );
			conveyor.controls.rotateSpeed = 0.5; 			// 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
			conveyor.controls.zoomSpeed = 1; 				// 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
			conveyor.controls.panSpeed = 1; 					// 패닝 속도 입니다. 기본값(Float)은 1입니다.
			conveyor.controls.minDistance = 200; 			// 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
			conveyor.controls.maxDistance = 3000; 			// 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
			conveyor.controls.minPolarAngle = 0;				// 상하 각도조절 제약
			conveyor.controls.maxPolarAngle = Math.PI/2;		// 상하 각도조절 제약
		    //conveyor.controls.minAzimuthAngle = 0;			// 좌우 각도조절 제약
		    //conveyor.controls.maxAzimuthAngle = Math.PI/2;	// 좌우 각도조절 제약
		}

		// MouseDown 이벤트 ==========================================================================
		conveyor.onMouseDown = function () {

		}

		document.addEventListener( 'mousedown', conveyor.onMouseDown, false );

		// WindowResize 이벤트 ==========================================================================
		conveyor.onWindowResize = function () {

			conveyor.camera.aspect = window.innerWidth / window.innerHeight;
			conveyor.camera.updateProjectionMatrix();

			conveyor.renderer.setSize( window.innerWidth, window.innerHeight );
		}
		
		window.addEventListener( 'resize', conveyor.onWindowResize, false );
		
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
