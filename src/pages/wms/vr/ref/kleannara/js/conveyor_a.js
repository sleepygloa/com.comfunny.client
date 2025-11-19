var conveyor_map = [
	[ '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, 'R_M12_03_L'	, 'R_M12_99_X'	, 'R_M12_04_R'	, '          '	, '          ' , '          ' ,'          '	, '          '	, '          '	, '          '	, '          '	, 'R_M11_03_L'	, 'R_M11_99_X'	, 'R_M11_04_R'	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          ' ],
	[ '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, 'R_M12_02_U'	, '          '	, '          '	, '          ' , '          ' ,'          '	, '          '	, '          '	, '          '	, '          '	, '          '	, 'R_M11_02_U'	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          ' ],
	[ '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, 'R_M12_01_U'	, '          '	, '          '	, '          ' , '          ' ,'          '	, '          '	, '          '	, '          '	, '          '	, '          '	, 'R_M11_01_U'	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          ' ],
	[ '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          ' , '          ' ,'          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, '          '	, 'R_M05_00_U'	, '          '	, '          '	, '          '	, '          '	, '          '	, '          ' ],
	[ 'R_M08_02_L'	, 'R_M08_02_L'	, 'R_M08_02_L'	, 'R_M08_02_L'	, 'R_M08_02_L'	, 'R_M07_01_L'	, 'R_M07_02_L'	, 'R_M07_03_L'	, 'R_M07_04_L'	, 'R_M07_00_L'	, 'T_M07_05_L'	, 'R_M07_00_L'	, 'R_M06_01_L'	, 'R_M06_02_L' , 'R_M06_02_L' , 'R_M06_02_L', 'R_M06_02_L'	, 'R_M06_03_L'	, 'R_M06_04_L'	, 'R_M06_05_L'	, 'R_M06_00_L'	, 'T_M06_06_L'	, 'R_M06_00_L'	, 'R_M05_01_L'	, 'R_M05_02_L'	, 'R_M05_03_L'	, 'R_M05_04_L' , 'R_M05_04_L' , 'R_M05_04_L'	, '          '	, 'T_M05_05_U'	, '          '	, '          '	, '          '	, '          '	, '          '	, '          ' ]
];

/******************************************************************************************************
 * Conveyor 객체
 ******************************************************************************************************/
var conveyor_info = {
		
	squareside: 100,
	height: 	6
};

var roller_info = {

	radius: 	5,
	height: 	40,
	segments: 	8,		// n각
	speed:		10
};

var turntable_info = {

	radius: 	140,
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
			if( prameter.kind == 'R' && prameter.direction == 'X' ){	// 예외적 직각 Conveyor
				conveyor_object.position.set( prameter.position[0], prameter.position[1] + 47, prameter.position[2] + 47 );
				conveyor_object.rotation.x = 0.5 * Math.PI;
			} else {
				conveyor_object.position.set( prameter.position[0], prameter.position[1], prameter.position[2] );
			}
			conveyor_object.material.opacity = 0.8;				// 투명도
			conveyor_object.material.transparent = true;		// transparent: 투명

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
			    for(var i=0 ; i<10 ; i++){
			    	
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
						var x = (prameter.position[0] -45) + (i * 10);
						var y = 0;
						var z = prameter.position[2];
						roller_object.position.set( x, y, z  );
						roller_object.rotation.x = 0.5 * Math.PI;
						
					} else if( prameter.direction == 'U' || prameter.direction == 'D' ){
						var x = prameter.position[0];
						var y = 0;
						var z = (prameter.position[2] - 45) + (i * 10);
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
				    for(var i=0 ; i<7 ; i++){
				    	
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
							var x = (prameter.position[0] -30) + (i * 10);
							var y = 0;
							var z = prameter.position[2];
							roller_object.position.set( x, y, z  );
							roller_object.rotation.x = 0.5 * Math.PI;
							
						} else if( prameter.direction == 'U' || prameter.direction == 'D' ){
							var x = prameter.position[0];
							var y = 0;
							var z = (prameter.position[2] - 30) + (i * 10);
							roller_object.position.set( x, y, z  );
							roller_object.rotation.z = 0.5 * Math.PI;
							
						} else if( prameter.direction == 'X' ){
							var x = (prameter.position[0] -30) + (i * 10);
							var y = 50;
							var z = prameter.position[2] + 50;
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
				    for(var i=0 ; i<10 ; i++){
				    	
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
							var x = (prameter.position[0] -45) + (i * 10);
							var y = 0;
							var z = prameter.position[2];
							roller_object.position.set( x, y, z  );
							roller_object.rotation.x = 0.5 * Math.PI;
							
						} else if( prameter.direction == 'U' || prameter.direction == 'D' ){
							var x = prameter.position[0];
							var y = 0;
							var z = (prameter.position[2] - 45) + (i * 10);
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