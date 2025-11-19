var conveyor_map = [
	[ 'R_M03_34_R'	,'R_M03_33_R'	,'R_M03_32_R'	,'R_M03_31_R'	,'R_M03_30_R'	, 'R_M03_29_R'	, 'R_M03_28_R'	, 'R_M03_27_R'	, 'R_M03_26_R'	, 'R_M03_25_R'	, 'R_M03_24_R'	, 'R_M03_23_R'	, 'R_M03_22_R'	, 'R_M03_21_R'	, 'R_M03_20_R'	, 'R_M03_19_R'	, 'R_M03_18_R'	, 'R_M03_17_R'	, 'R_M03_16_R'	, 'R_M03_15_R'	, 'R_M03_14_R'	, 'R_M03_13_R'	, 'R_M03_12_R'	, 'R_M03_11_R'	, 'R_M03_10_R'	, 'R_M03_09_R'	, 'R_M03_08_R'	, 'R_M03_07_R'	, 'R_M03_06_R'	, 'R_M03_05_R'	, 'R_M03_04_R'	, 'R_M03_03_R'	, 'R_M03_02_R'	, 'R_M03_01_R'	, 'R_M05_00_R'	, 'T_M05_08_R'	, 'R_M05_00_R'	, 'R_M04_14_R', 'R_M04_13_R', 'R_M04_12_R', 'R_M04_11_R', 'R_M04_10_R', 'R_M04_09_R', 'R_M04_08_R', 'R_M04_07_R', 'R_M04_06_R', 'R_M04_05_R'	, 'R_M04_04_R'	, 'R_M04_03_R'	, 'R_M04_02_R'	, 'R_M04_01_R' ]
];

/******************************************************************************************************
 * Conveyor 객체
 ******************************************************************************************************/
var conveyor_info = {
		
	squareside: 80,
	height: 	6
};

var roller_info = {

	radius: 	5,
	height: 	30,
	segments: 	8,		// n각
	speed:		10
};

var turntable_info = {

	radius: 	110,
	height: 	6,
	segments: 	32,		// n각
	speed:		10
};

var conveyor_arr = [];

var conveyor_geometry = new THREE.BoxBufferGeometry( conveyor_info.squareside, conveyor_info.height, conveyor_info.squareside );
var conveyor_material = new THREE.MeshLambertMaterial( { color: 0xfafafa } );

var roller_geometry = new THREE.CylinderGeometry( roller_info.radius, roller_info.radius, roller_info.height, roller_info.segments );
var roller_material_1 = new THREE.MeshPhongMaterial( {color: 0xfafafa} );
var roller_material_2 = new THREE.MeshPhongMaterial( {color: 0xfafafa} );

var turntable_geometry = new THREE.CylinderGeometry( turntable_info.radius, turntable_info.radius, turntable_info.height, turntable_info.segments );
var turntable_material = new THREE.MeshLambertMaterial( {color: 0xfafafa} );

var conveyorGeometry = function( prameter ) {

	var roller_arr = [];
	var direction_arr = [];
	var conveyor_object = null;

	(function( conveyorGeometry ) {
		
		conveyorGeometry.draw = function () {

			conveyor_object = new THREE.Mesh( conveyor_geometry, conveyor_material );
			conveyor_object.material.opacity = 0.8;				// 투명도
			conveyor_object.material.transparent = true;		// transparent: 투명
			conveyor_object.position.set( prameter.position[0], prameter.position[1], prameter.position[2] );

			// 객체정보
			conveyor_object.name = prameter.conveyor;
			conveyor_object.type = 'conveyor';
			conveyor_object.kind = prameter.kind;
			conveyor_object.group = prameter.group;
			conveyor_object.number = prameter.number;
			conveyor_object.direction = prameter.direction;
			conveyor_object.work = prameter.work;
			//conveyor_object.next = null;
			//conveyor_object.stok_existence = null;

			// Turntable 영역은 바닥 안그림
			if( prameter.kind != 'T' && prameter.number != '00' ) warehouse.scene.add( conveyor_object );

			// Turntable ==============================================================================
			if( prameter.kind == 'T' ){

				var  turntable_object = new THREE.Mesh( turntable_geometry, turntable_material );
				turntable_object.material.opacity = 0.8;				// 투명도
				turntable_object.material.transparent = true;		// transparent: 투명
				turntable_object.position.set( prameter.position[0], prameter.position[1], prameter.position[2] );
				
				// 객체정보
				turntable_object.type = 'turntable';
				turntable_object.conveyor = conveyor_object;
				
				warehouse.scene.add( turntable_object );
				
				// Turntable Roller
			    for(var i=0 ; i<8 ; i++){
			    	
					var roller_object = null;
	
					if( i % 2 == 0 ){
						roller_object = new THREE.Mesh( roller_geometry, roller_material_1 );
						
					} else {
						roller_object = new THREE.Mesh( roller_geometry, roller_material_2 );
					}
					
					roller_object.material.opacity = 0.8;				// 투명도
					roller_object.material.transparent = true;		// transparent: 투명
					
					// 컨베이어의 방향과 그에 따른 롤러의 위치 결정
				    var roller_position_y = conveyor_info.height + roller_info.radius;
				    
					if( prameter.direction == 'R' || prameter.direction == 'L' ){
						var x = (prameter.position[0] -35) + (i * 10);
						var y = 0;
						var z = prameter.position[2];
						roller_object.position.set( x, y, z  );
						roller_object.rotation.x = 0.5 * Math.PI;
						
					} else if( prameter.direction == 'U' || prameter.direction == 'D' ){
						var x = prameter.position[0];
						var y = 0;
						var z = (prameter.position[2] - 35) + (i * 10);
						roller_object.position.set( x, y, z  );
						roller_object.rotation.z = 0.5 * Math.PI;
					}
					
					// 객체정보
					roller_object.type = 'roller';
					roller_object.conveyor = conveyor_object;
					
					warehouse.scene.add( roller_object );
					roller_arr.push( roller_object );
			    }
			}

			// Roller ==============================================================================
			if( prameter.kind == 'R' ){
				if( prameter.number == '00' || prameter.number == '99' ) {	// 99는 예외적 직각방향 Roller
					
					// Turntable Sub Roller
				    for(var i=0 ; i<6 ; i++){
				    	
						var roller_object = null;
		
						if( i % 2 == 0 ){
							roller_object = new THREE.Mesh( roller_geometry, roller_material_1 );
							
						} else {
							roller_object = new THREE.Mesh( roller_geometry, roller_material_2 );
						}
						
						roller_object.material.opacity = 0.8;				// 투명도
						roller_object.material.transparent = true;		// transparent: 투명
						
						// 컨베이어의 방향과 그에 따른 롤러의 위치 결정
					    var roller_position_y = conveyor_info.height + roller_info.radius;
					    
						if( prameter.direction == 'R' || prameter.direction == 'L' ){
							var x = (prameter.position[0] -25) + (i * 10);
							var y = 0;
							var z = prameter.position[2];
							roller_object.position.set( x, y, z  );
							roller_object.rotation.x = 0.5 * Math.PI;
							
						} else if( prameter.direction == 'U' || prameter.direction == 'D' ){
							var x = prameter.position[0];
							var y = 0;
							var z = (prameter.position[2] - 25) + (i * 10);
							roller_object.position.set( x, y, z  );
							roller_object.rotation.z = 0.5 * Math.PI;
							
						} else if( prameter.direction == 'X' ){
							var x = (prameter.position[0] -25) + (i * 10);
							var y = 40;
							var z = prameter.position[2] + 40;
							roller_object.position.set( x, y, z  );
							//roller_object.rotation.x = 0.5 * Math.PI;
							//roller_object.rotation.y = 0.5 * Math.PI;
						}
						
						// 객체정보
						roller_object.type = 'roller';
						roller_object.conveyor = conveyor_object;
						
						warehouse.scene.add( roller_object );
						roller_arr.push( roller_object );
				    }
				    
				} else {
					// Roller
				    for(var i=0 ; i<8 ; i++){
				    	
						var roller_object = null;
		
						if( i % 2 == 0 ){
							roller_object = new THREE.Mesh( roller_geometry, roller_material_1 );
							
						} else {
							roller_object = new THREE.Mesh( roller_geometry, roller_material_2 );
						}
						
						roller_object.material.opacity = 0.8;				// 투명도
						roller_object.material.transparent = true;		// transparent: 투명
						
						// 컨베이어의 방향과 그에 따른 롤러의 위치 결정
					    var roller_position_y = conveyor_info.height + roller_info.radius;
					    
						if( prameter.direction == 'R' || prameter.direction == 'L' ){
							var x = (prameter.position[0] -35) + (i * 10);
							var y = 0;
							var z = prameter.position[2];
							roller_object.position.set( x, y, z  );
							roller_object.rotation.x = 0.5 * Math.PI;
							
						} else if( prameter.direction == 'U' || prameter.direction == 'D' ){
							var x = prameter.position[0];
							var y = 0;
							var z = (prameter.position[2] - 35) + (i * 10);
							roller_object.position.set( x, y, z  );
							roller_object.rotation.z = 0.5 * Math.PI;
						}
						
						roller_object.type = 'roller';
						roller_object.conveyor = conveyor_object;
						
						warehouse.scene.add( roller_object );
						roller_arr.push( roller_object );
				    }
				}
			}
	    }
	})(this);
}

/******************************************************************************************************
 * Conveyor 생성 및 동작
 ******************************************************************************************************/
// conveyor_map 정보를 기반으로 컨베이어 생성
function setConveyor(center_x, center_z, conveyor_map, callback) { 

	var x = center_x;
	var z = center_z;

	for (var i = 0; i < conveyor_map.length; i++) {

		x = center_x;
		z = z + conveyor_info.squareside;
		
		for (var j = 0; j < conveyor_map[i].length; j++) {
			
			x = x + conveyor_info.squareside;
			
			if( conveyor_map[i][j].trim() != '' ){

				// S_A_001_U : Conveyor Type(Roll, Turntable) _ Group Code _ Number _ Direction(Up, Down, Left, Right, End, X)
				var conveyor_name_info = conveyor_map[i][j].split('_');

				var conveyor_geometry = new conveyorGeometry( {
					conveyor: conveyor_map[i][j],
					kind: conveyor_name_info[0],
					group: conveyor_name_info[1],
					number: conveyor_name_info[2],
					direction: conveyor_name_info[3],
					position: [x, -3, z],
					work: 'OFF'
				});

				conveyor_geometry.draw();
			}
		}
	} 
	
	if( callback != null ) callback();
}