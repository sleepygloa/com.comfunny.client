/******************************************************************************************************
 * Crane 객체 생성
 ******************************************************************************************************/
var texture_loader = new THREE.TextureLoader();

//A Zone 의 크레인
var craneGeometry = function ( parameter ) {
	
    var crane_geometry = new THREE.BoxBufferGeometry(10, 10, 10);
    var crane_object = new THREE.Mesh(crane_geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    crane_object.position.set(parameter.position[0], parameter.position[1], parameter.position[2]);
    
	(function( craneGeometry ) {

		craneGeometry.draw = function () {

	        //Crane - Girder Frame
			var girder_material = new THREE.MeshPhongMaterial({ color: 0xffdd22, transparent: true, opacity: 0.6 });
			var girder_v_geometry = new THREE.BoxBufferGeometry(40, 40, 1130);
			var girder_h_geometry = new THREE.BoxBufferGeometry(200, 20, 30);
			
			var girder_object = new THREE.Mesh(girder_v_geometry, girder_material);
			girder_object.position.set(-75, 10, 0);
			crane_object.add(girder_object);
			
			girder_object = new THREE.Mesh(girder_v_geometry, girder_material);
			girder_object.position.set(75, 10, 0);
			crane_object.add(girder_object);

			girder_object = new THREE.Mesh(girder_h_geometry, girder_material);
			girder_object.position.set(0, -10, -1130 / 2 + 15);
			crane_object.add(girder_object);

			girder_object = new THREE.Mesh(girder_h_geometry, girder_material);
			girder_object.position.set(0, -10, 1130 / 2 - 15);
			crane_object.add(girder_object);

	        //Crane - Trolley Frame
	    	var trolley_frame_material = new THREE.MeshPhongMaterial({
	            color: 0xffdd22,
	            emissive: 0x444444,
	            map: new texture_loader.load('/vr/threejs/textures/trolley_frame.png'),
	            transparent: true,
	            opacity: 0.8,
	            side: THREE.DoubleSide
	        });
	    	
	    	var trolley_frame_geometry = new THREE.BoxGeometry(180, 40, 180);
	        var trolley_frame_obj = new THREE.Mesh(trolley_frame_geometry, trolley_frame_material);
	        trolley_frame_obj.position.set(0, 55, 0);
	        crane_object.add( trolley_frame_obj );

	        //Crane - Hoist
	        var hoist_geometry = new THREE.CylinderBufferGeometry(10, 10, 150, 12);
	        var hoist_object = new THREE.Mesh(hoist_geometry, new THREE.MeshPhongMaterial({ color: 0xffdd22 }));
	        hoist_object.rotation.z = 0.5 * Math.PI;
	        trolley_frame_obj.add( hoist_object );

	        //Crane - Vacuum Lifter
	        var vacuum_lifter_geometry = new THREE.CylinderBufferGeometry(30, 50, 50, 32);
	        var vacuum_lifter_object = new THREE.Mesh(vacuum_lifter_geometry, new THREE.MeshPhongMaterial({ color: 0xffdd22 }));
	        vacuum_lifter_object.position.y = -50;
	        trolley_frame_obj.add( vacuum_lifter_object );

	        //Crane - Lifter Wire
	        var lifter_wire_geometry = new THREE.CylinderBufferGeometry(4, 4, 50, 8);
	        var lifter_wire_object = new THREE.Mesh(lifter_wire_geometry, new THREE.MeshPhongMaterial({ color: 0xfafafa }));
	        lifter_wire_object.position.y = -20;
	        trolley_frame_obj.add( lifter_wire_object );

	        warehouse.scene.add( crane_object );
		}
	})(this);
};

//B Zone 의 커터
var cutterGeometry = function ( parameter ) {
	
	var cutter_opacity = 0.8;
	var cutter_material = new THREE.MeshLambertMaterial({ color: 0xb7f0b1, transparent: true, opacity: cutter_opacity });
    var cutter_geometry = new THREE.BoxBufferGeometry(80, 40, 80);
    var cutter_object = new THREE.Mesh(cutter_geometry, cutter_material);
    cutter_object.position.set(parameter.position[0], parameter.position[1], parameter.position[2]);
    
	(function( cutterGeometry ) {

		cutterGeometry.draw = function () {

			//Cutter - Side
			var cutter_side_geometry = new THREE.BoxBufferGeometry(10, 50, 160);
		    var cutter_side_object = new THREE.Mesh(cutter_side_geometry, cutter_material);
		    cutter_side_object.position.set(-45, 5, -40);
			cutter_object.add( cutter_side_object );

		    cutter_side_object = new THREE.Mesh(cutter_side_geometry, cutter_material);
		    cutter_side_object.position.set(45, 5, -40);
			cutter_object.add( cutter_side_object );
			
			var cutter_support_geometry = new THREE.PlaneGeometry(80, 56);
			var cutter_support_object = new THREE.Mesh( cutter_support_geometry, new THREE.MeshLambertMaterial({color: 0xb7f0b1, side: THREE.DoubleSide }) );  
			cutter_support_object.position.set(0, 5, -55);
			cutter_support_object.rotation.x = 0.25 * Math.PI;
			cutter_object.add( cutter_support_object );

			//Cutter - Fixture (롤러)
	        var cutter_roller_geometry = new THREE.CylinderBufferGeometry(6, 6, 80, 16);
	        var cutter_roller_object = new THREE.Mesh(cutter_roller_geometry, new THREE.MeshPhongMaterial({ color: 0xfafafa, transparent: true, opacity: cutter_opacity }));;
	        cutter_roller_object.rotation.z = 0.5 * Math.PI;
	        cutter_roller_object.position.set(0, 0, -100);
	        cutter_object.add( cutter_roller_object );
			
	        warehouse.scene.add( cutter_object );
		}
	})(this);
};

//M Zone 의 크레인
var miniCraneGeometry = function ( parameter ) {
	
    var crane_geometry = new THREE.BoxBufferGeometry(10, 10, 10);
    var crane_object = new THREE.Mesh(crane_geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    crane_object.position.set(parameter.position[0], parameter.position[1], parameter.position[2]);
    
	(function( craneGeometry ) {

		craneGeometry.draw = function () {

	        //Crane - Girder Frame
			var girder_material = new THREE.MeshPhongMaterial({ color: 0xffdd22, transparent: true, opacity: 0.6 });
			
			var girder_v_geometry = new THREE.BoxBufferGeometry(10, 10, 90);
			var girder_h_geometry = new THREE.BoxBufferGeometry(90, 15, 10);
			
			var girder_object = new THREE.Mesh(girder_v_geometry, girder_material);
			girder_object.position.set(-40, 7, 0);
			crane_object.add(girder_object);
			
			girder_object = new THREE.Mesh(girder_v_geometry, girder_material);
			girder_object.position.set(40, 7, 0);
			crane_object.add(girder_object);

			girder_object = new THREE.Mesh(girder_h_geometry, girder_material);
			girder_object.position.set(0, -3, -90 / 2 + 5);
			crane_object.add(girder_object);

			girder_object = new THREE.Mesh(girder_h_geometry, girder_material);
			girder_object.position.set(0, -3, 90 / 2 - 5);
			crane_object.add(girder_object);

	        //Crane - Trolley Frame
	    	var trolley_frame_material = new THREE.MeshPhongMaterial({
	            color: 0xffdd22,
	            emissive: 0x444444,
	            map: new texture_loader.load('/vr/threejs/textures/trolley_frame.png'),
	            transparent: true,
	            opacity: 0.8,
	            side: THREE.DoubleSide
	        });
	    	
	    	var trolley_frame_geometry = new THREE.BoxGeometry(90, 10, 40);
	        var trolley_frame_obj = new THREE.Mesh(trolley_frame_geometry, trolley_frame_material);
	        trolley_frame_obj.position.set(0, 17, 0);
	        crane_object.add( trolley_frame_obj );

	        //Crane - Lifter Hoist
	        var hoist_geometry = new THREE.CylinderBufferGeometry(4, 4, 80, 12);
	        var hoist_object = new THREE.Mesh(hoist_geometry, new THREE.MeshPhongMaterial({ color: 0xffdd22 }));
	        hoist_object.rotation.z = 0.5 * Math.PI;
	        trolley_frame_obj.add( hoist_object );

	        //Crane - Lifter Wire
	        var lifter_wire_geometry = new THREE.CylinderBufferGeometry(4, 4, 30, 8);
	        var lifter_wire_object = new THREE.Mesh(lifter_wire_geometry, new THREE.MeshPhongMaterial({ color: 0xfafafa }));
	        lifter_wire_object.position.y = -15;
	        trolley_frame_obj.add( lifter_wire_object );

	        //Crane - Lifter
	        var lifter_geometry = new THREE.BoxGeometry(40, 10, 40);
	        var lifter_object = new THREE.Mesh(lifter_geometry, new THREE.MeshPhongMaterial({ color: 0xffdd22 }));
	        lifter_object.position.y = -25;
	        trolley_frame_obj.add( lifter_object );

	        lifter_geometry = new THREE.BoxGeometry(10, 10, 60);
	        lifter_object = new THREE.Mesh(lifter_geometry, new THREE.MeshPhongMaterial({ color: 0xffdd22 }));
	        lifter_object.position.set(20, -25, 0);
	        trolley_frame_obj.add( lifter_object );
	        
	        lifter_geometry = new THREE.BoxGeometry(10, 10, 60);
	        lifter_object = new THREE.Mesh(lifter_geometry, new THREE.MeshPhongMaterial({ color: 0xffdd22 }));
	        lifter_object.position.set(-20, -25, 0);
	        trolley_frame_obj.add( lifter_object );
	        
	        // 집게
	        lifter_geometry = new THREE.RingGeometry(20, 30, 30, 5, Math.PI * -0.1, Math.PI * 1.2);

			lifter_object = new THREE.Mesh( lifter_geometry, new THREE.MeshPhongMaterial({ color: 0xffdd22, side: THREE.DoubleSide}));
			lifter_object.position.set(0, -55, 20);
			trolley_frame_obj.add( lifter_object );
	        
			lifter_object = new THREE.Mesh( lifter_geometry, new THREE.MeshPhongMaterial({ color: 0xffdd22, side: THREE.DoubleSide}));
			lifter_object.position.set(0, -55, -20);
			trolley_frame_obj.add( lifter_object );

	        crane_object.rotation.y = 0.5 * Math.PI;
	        
	        warehouse.scene.add( crane_object );
		}
	})(this);
};

// M Zone 의 푸셔
var pusherGeometry = function ( parameter ) {
	
	var pusher_opacity = 0.8;
	var pusher_material = new THREE.MeshLambertMaterial({ color: 0xb7f0b1, transparent: true, opacity: pusher_opacity });
    var pusher_geometry = new THREE.BoxBufferGeometry(80, 10, 80);
    var pusher_object = new THREE.Mesh(pusher_geometry, pusher_material);
    pusher_object.position.set(parameter.position[0], parameter.position[1], parameter.position[2]);
    
	(function( pusherGeometry ) {

		pusherGeometry.draw = function () {

			//Pusher - Side
			var pusher_side_geometry = new THREE.BoxBufferGeometry(10, 80, 60);
		    var pusher_side_object = new THREE.Mesh(pusher_side_geometry, pusher_material);
		    pusher_side_object.position.set(-35, 40, 0);
			pusher_object.add( pusher_side_object );

		    pusher_side_object = new THREE.Mesh(pusher_side_geometry, pusher_material);
		    pusher_side_object.position.set(35, 40, 0);
			pusher_object.add( pusher_side_object );

	        var side_fixture_geometry = new THREE.CylinderBufferGeometry(6, 6, 60, 16);
	        var side_fixture_object = new THREE.Mesh(side_fixture_geometry, pusher_material);
	        side_fixture_object.rotation.z = 0.5 * Math.PI;
	        side_fixture_object.position.set(0, 40, -10);
	        pusher_object.add( side_fixture_object );
	        
			//Pusher - Holder (중앙이빈 반원 모양의 거치대)
			//https://threejs.org/docs/index.html?q=RingGeometry#api/en/geometries/RingGeometry
			//RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
			var holder_geometry = new THREE.RingGeometry(30, 40, 30, 5, Math.PI * -0.5, Math.PI * 0.8);

			var holder_material = new THREE.MeshBasicMaterial( { color: 0xffe400, side: THREE.DoubleSide, transparent: true, opacity: pusher_opacity } );
			var holder_object = new THREE.Mesh( holder_geometry, holder_material );
			holder_object.position.set(28, 45, 45);
			holder_object.rotation.y = 0.5 * Math.PI;
			pusher_object.add( holder_object );

			holder_object = new THREE.Mesh( holder_geometry, holder_material );
			holder_object.position.set(-28, 45, 45);
			holder_object.rotation.y = 0.5 * Math.PI;
			pusher_object.add( holder_object );
			
			//Pusher - Holder Fixture (거치대의 지지대)
	        var holder_fixture_geometry = new THREE.CylinderBufferGeometry(4, 4, 54, 16);
	        var holder_fixture_object = new THREE.Mesh(holder_fixture_geometry, holder_material);
	        holder_fixture_object.rotation.z = 0.5 * Math.PI;
	        holder_fixture_object.position.set(0, 70, 20);
	        pusher_object.add( holder_fixture_object );
			
	        holder_fixture_object = new THREE.Mesh(holder_fixture_geometry, holder_material);
	        holder_fixture_object.rotation.z = 0.5 * Math.PI;
	        holder_fixture_object.position.set(0, 61, 13);
	        pusher_object.add( holder_fixture_object );

	        holder_fixture_object = new THREE.Mesh(holder_fixture_geometry, holder_material);
	        holder_fixture_object.rotation.z = 0.5 * Math.PI;
	        holder_fixture_object.position.set(0, 14, 30);
	        pusher_object.add( holder_fixture_object );

			//Pusher - 축
			var pusher_shaft_geometry = new THREE.BoxBufferGeometry(4, 40, 4);
			var pusher_shaft_material = new THREE.MeshLambertMaterial({ color: 0xfafafa, transparent: true, opacity: pusher_opacity });
			pusher_shaft_object = new THREE.Mesh(pusher_shaft_geometry, pusher_shaft_material);
			pusher_shaft_object.rotation.x = -0.25 * Math.PI;
			pusher_shaft_object.position.set(0, 30, 15);
			pusher_object.add( pusher_shaft_object );
			
	        holder_fixture_object = new THREE.Mesh(holder_fixture_geometry, pusher_shaft_material);
	        holder_fixture_object.rotation.z = 0.5 * Math.PI;
	        holder_fixture_object.position.set(0, 10, 43);
	        pusher_object.add( holder_fixture_object );
	        
	        warehouse.scene.add( pusher_object );
		}
	})(this);
};

//M Zone 의 커터배경
var bgCutterGeometry = function ( parameter ) {
	
	var cutter_opacity = 0.8;
	var cutter_material = new THREE.MeshLambertMaterial({ color: 0xfafafa, transparent: true, opacity: cutter_opacity });
    var cutter_geometry = new THREE.BoxBufferGeometry(40, 20, 40);
    var cutter_object = new THREE.Mesh(cutter_geometry, cutter_material);
    cutter_object.position.set(parameter.position[0], parameter.position[1], parameter.position[2]);
    
	(function( bgCutterGeometry ) {

		bgCutterGeometry.draw = function () {

			//Cutter - Side
			var cutter_side_geometry = new THREE.BoxBufferGeometry(5, 25, 80);
		    var cutter_side_object = new THREE.Mesh(cutter_side_geometry, cutter_material);
		    cutter_side_object.position.set(-23, 3, -20);
			cutter_object.add( cutter_side_object );

		    cutter_side_object = new THREE.Mesh(cutter_side_geometry, cutter_material);
		    cutter_side_object.position.set(23, 3, -20);
			cutter_object.add( cutter_side_object );
			
			var cutter_support_geometry = new THREE.PlaneGeometry(40, 28);
			var cutter_support_object = new THREE.Mesh( cutter_support_geometry, new THREE.MeshLambertMaterial({color: 0xb7f0b1, side: THREE.DoubleSide }) );  
			cutter_support_object.position.set(0, 3, -28);
			cutter_support_object.rotation.x = 0.25 * Math.PI;
			cutter_object.add( cutter_support_object );

			//Cutter - Fixture (롤러)
	        var cutter_roller_geometry = new THREE.CylinderBufferGeometry(3, 3, 40, 16);
	        var cutter_roller_object = new THREE.Mesh(cutter_roller_geometry, new THREE.MeshPhongMaterial({ color: 0xfafafa, transparent: true, opacity: cutter_opacity }));;
	        cutter_roller_object.rotation.z = 0.5 * Math.PI;
	        cutter_roller_object.position.set(0, 0, -50);
	        cutter_object.add( cutter_roller_object );
			
	        warehouse.scene.add( cutter_object );
		}
	})(this);
};

