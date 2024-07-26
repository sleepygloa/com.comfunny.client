/******************************************************************************************************
 * 객체라벨추가
 ******************************************************************************************************/
var loaded_font = null;
var loader = new THREE.FontLoader();
loader.load( '/vr/threejs/font/dohyeon_regular.json', function ( font ) {
	loaded_font = font;
} );

function addLabel( name, location, rotation, font_size, font_color ) {

	// 택스트 :  Document - https://threejs.org/docs/?q=TextGeometry#api/en/geometries/TextGeometry
	var label_geometry = new THREE.TextGeometry( name, {font: loaded_font, size: font_size, height: 1} );
	var label_object = new THREE.Mesh( label_geometry, new THREE.MeshBasicMaterial( { color: font_color } ) );
	label_object.position.copy( location );
	label_object.rotation.copy( rotation );
	label_object.name = name;
	label_object.type = 'font';
	warehouse.scene.add( label_object );
}

/******************************************************************************************************
 * scene, light, camera, renderer 등 객체생성
 ******************************************************************************************************/
var warehouseData = function() {
	
	this.biz = "KNR";
	this.dc = "11";
	this.client = "KNR";
};

var warehouse = function( container ) {

	(function( warehouse ) {

		warehouse.data = new warehouseData();

		warehouse.INTERSECTED;	// 선택된 객체

	    warehouse.mouse = new THREE.Vector2();
	    warehouse.raycaster = new THREE.Raycaster();
	    
		// 장면 :  Document - https://threejs.org/docs/#api/en/scenes/Scene
		warehouse.scene = new THREE.Scene();
		warehouse.scene.background = new THREE.Color( 0xffffff );

		// 조명 : Document - https://threejs.org/docs/#api/en/lights/DirectionalLight
		warehouse.light = new THREE.DirectionalLight( 0xffffff, 1.0 );
		warehouse.light.position.set( 1, 1, 1 ).normalize();
		warehouse.scene.add( warehouse.light );
		
		// 중심좌표가이드 : Document - https://threejs.org/docs/#api/en/helpers/AxesHelper
	    warehouse.scene.add( new THREE.AxesHelper(500) );

	    // 화살표가이드 : Document - https://threejs.org/docs/#api/en/helpers/ArrowHelper
	    warehouse.arrow = new THREE.ArrowHelper( new THREE.Vector3( 0, -1, 0 ), new THREE.Vector3( 0, 350, 0 ), 25, 0xff0000, 25, 25 );
	    warehouse.scene.add( warehouse.arrow );

	    // 바닥 =====================================================================================
	    // 바닥그리드가이드 : Document - https://threejs.org/docs/#api/en/helpers/GridHelper
	    var floor_1 = new THREE.GridHelper( 1600, 40 );
	    floor_1.position.x = -1200;
		warehouse.scene.add( floor_1 );

	    var floor_2 = new THREE.GridHelper( 1600, 40 );
		warehouse.scene.add( floor_2 );

	    var floor_3 = new THREE.GridHelper( 1600, 40 );
	    floor_3.position.x = 1200;
		warehouse.scene.add( floor_3 );
		
		var floor_geometry = new THREE.PlaneGeometry(2360, 1600);
		var floor_object = new THREE.Mesh( floor_geometry, new THREE.MeshBasicMaterial({color: 0x93cc8d}) );  
		floor_object.position.set( 820, -1, 0);
		floor_object.rotation.x = -0.5 * Math.PI;
		warehouse.scene.add( floor_object );

		floor_geometry = new THREE.PlaneGeometry(800, 1480);
		floor_object = new THREE.Mesh( floor_geometry, new THREE.MeshBasicMaterial({color: 0x93cc8d}) );
		floor_object.position.set( -760, -1, 60);
		floor_object.rotation.x = -0.5 * Math.PI;
		warehouse.scene.add( floor_object );
		
		floor_geometry = new THREE.PlaneGeometry(840, 400);
		floor_object = new THREE.Mesh( floor_geometry, new THREE.MeshBasicMaterial({color: 0x93cc8d}) );  
		floor_object.position.set( -1580, -1, 600);
		floor_object.rotation.x = -0.5 * Math.PI;
		warehouse.scene.add( floor_object );
		
		// 리와인더 =====================================================================================
		// R/W #2
		var rewinder_geometry = new THREE.BoxBufferGeometry( 80, 80, 320 );
		var rewinder_object = new THREE.Mesh( rewinder_geometry, new THREE.MeshLambertMaterial( { color: 0xfafafa } ) );
		rewinder_object.material.opacity = 0.8;				// 투명도
		rewinder_object.material.transparent = true;		// transparent: 투명
		rewinder_object.position.set( -1400, 40, 760 );
		rewinder_object.rotation.y = 0.5 * Math.PI;
		warehouse.scene.add( rewinder_object );

		// R/W #3 구형
		rewinder_geometry = new THREE.BoxBufferGeometry( 160, 80, 320 );
		rewinder_object = new THREE.Mesh( rewinder_geometry, new THREE.MeshLambertMaterial( { color: 0xfafafa } ) );
		rewinder_object.material.opacity = 0.8;				// 투명도
		rewinder_object.material.transparent = true;		// transparent: 투명
		rewinder_object.position.set( -600, 40, 240 );
		warehouse.scene.add( rewinder_object );
		
		// R/W #3 신형
		rewinder_object = new THREE.Mesh( rewinder_geometry, new THREE.MeshLambertMaterial( { color: 0xfafafa } ) );
		rewinder_object.material.opacity = 0.8;				// 투명도
		rewinder_object.material.transparent = true;		// transparent: 투명
		rewinder_object.position.set( -600, 40, -160 );
		rewinder_object.rotation.y = 0.5 * Math.PI;
		warehouse.scene.add( rewinder_object );
		
		// 벽 ======================================================================
		// 반투명 중간벽 가로 1
		var wall_geometry = new THREE.PlaneGeometry(1520, 100);
		var wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
		wall_object.material.side = THREE.DoubleSide; // 양면다 보이게
		wall_object.position.set( 520, 50, -200 );
		wall_object.material.opacity = 0.5;			// 투명도
		wall_object.material.transparent = true;		// transparent: 투명
	    warehouse.scene.add( wall_object );

	    // 반투명 중간벽 가로 2
		wall_geometry = new THREE.PlaneGeometry(560, 100);
		wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
		wall_object.material.side = THREE.DoubleSide; // 양면다 보이게
		wall_object.position.set( 1720, 50, -200 );
		wall_object.material.opacity = 0.5;			// 투명도
		wall_object.material.transparent = true;		// transparent: 투명
	    warehouse.scene.add( wall_object );

	    // 반투명 중간벽 세로 1
		var wall_geometry = new THREE.PlaneGeometry(720, 100);
	    var wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
	    wall_object.material.side = THREE.DoubleSide; 	// 양면다 보이게
	    wall_object.rotation.y = 0.5 * Math.PI;
	    wall_object.position.set( -366, 50, -440 );
	    wall_object.material.opacity = 0.5;				// 투명도
	    wall_object.material.transparent = true;		// transparent: 투명
	    warehouse.scene.add( wall_object );

	    // 반투명 중간벽 세로 2
		wall_geometry = new THREE.PlaneGeometry(720, 100);
	    wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
	    wall_object.material.side = THREE.DoubleSide; 	// 양면다 보이게
	    wall_object.rotation.y = 0.5 * Math.PI;
	    wall_object.position.set( -366, 50, 440 );
	    wall_object.material.opacity = 0.5;				// 투명도
	    wall_object.material.transparent = true;		// transparent: 투명
	    warehouse.scene.add( wall_object );

	    // 서쪽외벽
		wall_geometry = new THREE.PlaneGeometry(120, 200);
	    wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
	    wall_object.rotation.y = 0.5 * Math.PI;
	    wall_object.position.set( -360, 100, -740 );
	    warehouse.scene.add( wall_object );

		wall_geometry = new THREE.PlaneGeometry(800, 200);
	    wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
	    wall_object.position.set( -760, 100, -680 );
	    warehouse.scene.add( wall_object );

		wall_geometry = new THREE.PlaneGeometry(1080, 200);
	    wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
	    wall_object.rotation.y = 0.5 * Math.PI;
	    wall_object.position.set( -1160, 100, -140 );
	    warehouse.scene.add( wall_object );

		wall_geometry = new THREE.PlaneGeometry(840, 200);
	    wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
	    wall_object.position.set( -1580, 100, 400 );
	    warehouse.scene.add( wall_object );
	    
	    // 동쪽외벽 
		var wall_geometry_e = new THREE.PlaneGeometry(1600, 200);
	    var wall_object_e = new THREE.Mesh( wall_geometry_e, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
	    wall_object_e.rotation.y = -0.5 * Math.PI;
	    wall_object_e.position.set( 2000, 100, 0 );
	    warehouse.scene.add( wall_object_e );

        //크레인 빔 ==============================================================================
        var crane_beam_material = new THREE.MeshLambertMaterial({ color: 0xfafafa, transparent: true, opacity: 0.8 });
        var crane_beam_geometry_h = new THREE.BoxBufferGeometry(10, 10, 550);
        var crane_beam_geometry_v = new THREE.BoxBufferGeometry(10, 220, 10);

        var crane_beam_object = new THREE.Mesh(crane_beam_geometry_v, crane_beam_material);
        crane_beam_object.position.set(-360, 100, -480);
        warehouse.scene.add(crane_beam_object);

        crane_beam_object = new THREE.Mesh(crane_beam_geometry_v, crane_beam_material);
        crane_beam_object.position.set(-360, 100, 80);
        warehouse.scene.add(crane_beam_object);
	    
        crane_beam_object = new THREE.Mesh(crane_beam_geometry_v, crane_beam_material);
        crane_beam_object.position.set(-280, 100, -480);
        warehouse.scene.add(crane_beam_object);

        crane_beam_object = new THREE.Mesh(crane_beam_geometry_v, crane_beam_material);
        crane_beam_object.position.set(-280, 100, 80);
        warehouse.scene.add(crane_beam_object);
	    
        crane_beam_object = new THREE.Mesh(crane_beam_geometry_h, crane_beam_material);
        crane_beam_object.position.set(-360, 205, -200);
        warehouse.scene.add(crane_beam_object);
	    
        crane_beam_object = new THREE.Mesh(crane_beam_geometry_h, crane_beam_material);
        crane_beam_object.position.set(-280, 205, -200);
        warehouse.scene.add(crane_beam_object);
        
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
			warehouse.controls.rotateSpeed = 0.5; 				// 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
			warehouse.controls.zoomSpeed = 1; 					// 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.panSpeed = 1; 					// 패닝 속도 입니다. 기본값(Float)은 1입니다.
			warehouse.controls.minDistance = 500; 				// 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
			warehouse.controls.maxDistance = 2500; 				// 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
			warehouse.controls.minPolarAngle = 0;				// 상하 각도조절 제약
			warehouse.controls.maxPolarAngle = Math.PI/2;		// 상하 각도조절 제약
		    //warehouse.controls.minAzimuthAngle = 0;			// 좌우 각도조절 제약
		    //warehouse.controls.maxAzimuthAngle = Math.PI/2;	// 좌우 각도조절 제약
			
            warehouse.controls.target.set(0, 0, 700);	// 포커스변경
            warehouse.controls.update();
		}
		
		// Renderer rendering ==========================================================================
		warehouse.animation = function () {

			warehouse.renderer.render( warehouse.scene, warehouse.camera );
			
			requestAnimationFrame( warehouse.animation );
		}

		// MouseDown 이벤트 ==========================================================================
		warehouse.onMouseDown = function ( e ) {

			// 현재 카메라 위치 및 초점 확인
			//console.log(warehouse.camera.position);
			//console.log(warehouse.controls.target);
			
			// 객체를 클릭했을경우 반응
			event.preventDefault();
			warehouse.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			warehouse.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			warehouse.raycaster.setFromCamera( warehouse.mouse, warehouse.camera );

			var intersects = warehouse.raycaster.intersectObjects( warehouse.scene.children );
	
			// 마우스 오른쪽버튼
			if( e.button == 2 ){

			}
			// 마우스 왼쪽버튼
			else if( e.button == 0 ){

				if( intersects.length > 0 ) {
					
					if( warehouse.INTERSECTED != intersects[ 0 ].object ) {
	
						if( intersects[ 0 ].object.type == 'stok' || intersects[ 0 ].object.type == 'stat' ){

							// 이미 연동되어 있는 객체를 해제
							if( warehouse.INTERSECTED && warehouse.INTERSECTED_COVER ) {
								warehouse.scene.remove( warehouse.INTERSECTED_COVER );
							}

							// 새로운 객체를 연동
							if( intersects[ 0 ].object.type == 'stok' ){
								warehouse.INTERSECTED = intersects[ 0 ].object;
								
							} else if( intersects[ 0 ].object.type == 'stat' ){
								warehouse.INTERSECTED = intersects[ 0 ].object.stok;
							}
							
							// callback 으로 정의된 함수 호출
							warehouse.INTERSECTED.callback( intersects[0].object );
							
							//=============================================================
							// 재고객체의 경우 material array 를 사용하면서 성능향상을 위해 전역변수로 설정하여 material 를 부분적으로 컨트롤 할 수 없다
							// 그러기에 선택 객체와 동일한 cover 객체를 생성하여 선택효과를 준다.
							var cover_geometry = new THREE.CylinderGeometry( warehouse.INTERSECTED.diameter, warehouse.INTERSECTED.diameter, warehouse.INTERSECTED.rlbt, 32 );
							var cover_object = new THREE.Mesh( cover_geometry, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) );
							cover_object.position.x = warehouse.INTERSECTED.position.x;
							cover_object.position.y = warehouse.INTERSECTED.position.y;
							cover_object.position.z = warehouse.INTERSECTED.position.z;
							cover_object.material.opacity = 0.5;			// 투명도
							cover_object.material.transparent = true;		// transparent: 투명
							
							if( warehouse.INTERSECTED.direction == 'R' || warehouse.INTERSECTED.direction == 'L' ){
								cover_object.rotation.z = 0.5 * Math.PI;
								
							} else if( warehouse.INTERSECTED.direction == 'U' || warehouse.INTERSECTED.direction == 'D' ){
								cover_object.rotation.x = 0.5 * Math.PI;
							}

							warehouse.scene.add( cover_object );
							
							warehouse.INTERSECTED_COVER = cover_object;
							//=============================================================
						}
						// 객체가 아닌 빈공간에서 이벤트가 발생할 경우
						else {
							// 이미 연동된 객체가 있다면 해제
							if ( warehouse.INTERSECTED && warehouse.INTERSECTED_COVER ) {
								warehouse.scene.remove( warehouse.INTERSECTED_COVER );
							}

							warehouse.INTERSECTED = null;
							warehouse.INTERSECTED_COVER  = null;
							
							_app.callAppMethod("unSelectStok");
						}
					}
				}
				// 객체가 아닌 빈공간에서 이벤트가 발생할 경우
				else {
					// 이미 연동된 객체가 있다면 해제
					if ( warehouse.INTERSECTED && warehouse.INTERSECTED_COVER ) {
						warehouse.scene.remove( warehouse.INTERSECTED_COVER );
					}

					warehouse.INTERSECTED = null;
					warehouse.INTERSECTED_COVER  = null;
					
					_app.callAppMethod("unSelectStok");
				}
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
 * 재고 객체생성
 ******************************************************************************************************/
var texture_loader = new THREE.TextureLoader();

//https://threejs.org/docs/index.html?q=MeshPhongMaterial#api/en/materials/MeshBasicMaterial
var roll_material_normal = [
    new THREE.MeshBasicMaterial( { map: texture_loader.load( '/vr/threejs/textures/roll_side.png' ) } ),
    new THREE.MeshBasicMaterial( { map: texture_loader.load( '/vr/threejs/textures/roll_top.png' ) } ),
    new THREE.MeshBasicMaterial( { map: texture_loader.load( '/vr/threejs/textures/roll_top.png' ) } )
];

var roller_material_plan = [	// 입고예정
    new THREE.MeshBasicMaterial( { map: texture_loader.load( '/vr/threejs/textures/roll_side.png' ), transparent: true, opacity: 0.5} ),
    new THREE.MeshBasicMaterial( { map: texture_loader.load( '/vr/threejs/textures/roll_top.png' ), transparent: true, opacity: 0.3} ),
    new THREE.MeshBasicMaterial( { map: texture_loader.load( '/vr/threejs/textures/roll_top.png' ), transparent: true, opacity: 0.3} )
];

var roller_material_empty = new THREE.MeshPhongMaterial( {color: 0xeaeaea, transparent: true, opacity: 0.1} );

var rollGeometry = function( prameter ) {
	
	var roll_material = null;
	
	// 조회조건이 부합되며 입고예정이 아니면 일반 재고모양
	if(prameter.visible && prameter.stokstat != '01'){
		roll_material = roll_material_normal;
	} 
	// 반투명 예정색상 재고모양
	else if(prameter.visible && prameter.stokstat == '01'){
		roll_material = roller_material_plan;
	}
	// 반투명 재고모양
	else {
		roll_material = roller_material_empty;
	}
	
	(function( rollGeometry ) {

		rollGeometry.draw = function () {
			var roll_geometry = new THREE.CylinderGeometry( prameter.diameter, prameter.diameter, prameter.rlbt, 32 );
	    	var roll_object = new THREE.Mesh( roll_geometry, roll_material );

			// 기본 위치에서 offset 과 행열단 위치만큼 이동
			roll_object.position.x = prameter.position[0];
			roll_object.position.y = prameter.position[1];
			roll_object.position.z = prameter.position[2];
			
			if( prameter.direction == 'R' || prameter.direction == 'L' ){
				roll_object.rotation.z = 0.5 * Math.PI;
				
			} else if( prameter.direction == 'U' || prameter.direction == 'D' ){
				roll_object.rotation.x = 0.5 * Math.PI;
			}

			// 객체정보
			roll_object.name = prameter.eaid;
			roll_object.type = 'stok';
			roll_object.rank = prameter.rank;
			roll_object.sku = prameter.sku;
			roll_object.loc = prameter.loc;
			roll_object.rlbt = prameter.rlbt;			//지폭
			roll_object.diameter = prameter.diameter;	//지름
			roll_object.direction = prameter.direction;	//방향
			roll_object.visible = prameter.visible;		//재고표시여부
			roll_object.stokstat = prameter.stokstat;	//재고상태
			
			
			if (typeof prameter.clickHandler === 'function') {
				roll_object.callback = prameter.clickHandler;
				
			} else {
				roll_object.callback = function () {
					console.log('function not defined!!');
				}
			}

			warehouse.scene.add( roll_object );
			
			// 재고상태바
	    	if(prameter.visible){
	    		
	    		if( prameter.stokstat == '54' || prameter.stokstat == '55' || prameter.stokstat == '56'){
					var stat_geometry = new THREE.CylinderGeometry( prameter.diameter + 1, prameter.diameter + 1, 10, 32 );
					var stat_material = null;
					
					if( prameter.stokstat == '54'){	//입고중 
						stat_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
						
					} else if( prameter.stokstat == '55'){	//이동중 
						stat_material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
						
					} else if( prameter.stokstat == '56'){	//출고중 
						stat_material = new THREE.MeshBasicMaterial( { color: 0xd9418c } );
						
					}
					
					var stat_object = new THREE.Mesh( stat_geometry, stat_material);
					stat_object.material.opacity = 0.8;			// 투명도
					stat_object.material.transparent = true;	// transparent: 투명
					
					stat_object.position.x = roll_object.position.x;
					stat_object.position.y = roll_object.position.y;
					stat_object.position.z = roll_object.position.z;

					if( prameter.direction == 'R' || prameter.direction == 'L' ){
						stat_object.rotation.z = 0.5 * Math.PI;
						
					} else if( prameter.direction == 'U' || prameter.direction == 'D' ){
						stat_object.rotation.x = 0.5 * Math.PI;
					}
					
					stat_object.name = prameter.eaid;
					stat_object.type = 'stat';
					
					//상태바에 재고 매핑, 클릭 시 이벤트 발생
					stat_object.stok = roll_object;
					
					warehouse.scene.add( stat_object );
	    		}
	    	}
	    		
			return roll_object;
		}
	})(this);
}


