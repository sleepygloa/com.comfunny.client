
class Warehouse {

}

export default Warehouse;
// var Warehouse = (function Warehouse( scene ) {
    
        
//         //Tutorial
        

//         //씬 세팅
//         // warehouse.scene = new THREE.Scene();
//         // warehouse.scene.background = new THREE.Color( 0xffffff );


//         // //컨테이너 세팅
// 	    // warehouse.renderer = new THREE.WebGLRenderer();
// 	    // warehouse.renderer.setPixelRatio( window.devicePixelRatio );
// 	    // warehouse.renderer.setSize( window.innerWidth, window.innerHeight );
//         // warehouse.renderer.setClearColor( 0xffffff, 1 );

//         // //카메라세팅
// 	    // warehouse.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// 	    // warehouse.camera.position.set( warehouse.CameraInfo.camera_x, warehouse.CameraInfo.camera_y, warehouse.CameraInfo.camera_z );
//         // warehouse.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

//         // //조명 세팅
//         // warehouse.light = new THREE.DirectionalLight( 0xffffff, 1 );
//         // warehouse.light.position.set( warehouse.CameraInfo.camera_x, warehouse.CameraInfo.camera_y, warehouse.CameraInfo.camera_z ).normalize();
//         // warehouse.scene.add( warehouse.light );

//         // //지면 세팅
//         // var geometry = new THREE.PlaneGeometry( 100, 100, 100, 100 );
//         // var material = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide } );
//         // var plane = new THREE.Mesh( geometry, material );
//         // plane.rotation.x = Math.PI / 2;
//         // plane.position.y = 0;
//         // warehouse.scene.add( plane );

//         // //바닥 세팅
//         // var geometry = new THREE.BoxGeometry( 100, 0.1, 100 );
//         // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//         // var cube = new THREE.Mesh( geometry, material );
//         // cube.position.set( 0, 0, 0 );
//         // warehouse.scene.add( cube );

//         // // 중심좌표가이드 : Document - https://threejs.org/docs/#api/en/helpers/AxesHelper
//         // warehouse.scene.add( new THREE.AxesHelper(500) );

//         // // 화살표가이드 : Document - https://threejs.org/docs/#api/en/helpers/ArrowHelper
//         // warehouse.scene.add( new THREE.ArrowHelper( new THREE.Vector3( 0, -1, 0 ), new THREE.Vector3( 0, 350, 0 ), 25, 0xff0000, 25, 25 ) );


//         // const controls = new OrbitControls(camera, renderer.domElement);
//         // controls.enableDamping = true;
//         // controls.dampingFactor = 0.05;
//         // controls.screenSpacePanning = false;

        
//         // //지게차 세팅
//         // // var loader = new THREE.GLTFLoader();
//         // // loader.load( '/static/3d/forklift/scene.gltf', function ( gltf ) {
//         // //     gltf.scene.scale.set( warehouse.ModelInfo.forklift_scale_x, warehouse.ModelInfo.forklift_scale_y, warehouse.ModelInfo.forklift_scale_z );
//         // //     gltf.scene.position.set( 0, 0, 0 );
//         // //     warehouse.scene.add( gltf.scene );
//         // // }, undefined, function ( error ) {
//         // //     console.error( error );
//         // // } );

//         // //선반 세팅
//         // var rack = new THREE.Group();
//         // var geometry = new THREE.BoxGeometry( warehouse.ModelInfo.rack_size_width, warehouse.ModelInfo.rack_size_length, warehouse.ModelInfo.rack_size_floor );
//         // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//         // var cube = new THREE.Mesh( geometry, material );
//         // cube.position.set( 0, 0, 0 );
//         // rack.add( cube );
//         // warehouse.scene.add( rack );

//         // //컨테이너에 렌더러 추가
// 		// container.appendChild( warehouse.renderer.domElement );

// 		// // Camera Moving Controls ==========================================================================
// 		// warehouse.cameraControls = function () {
			
// 		// 	warehouse.controls = new THREE.OrbitControls( warehouse.camera, warehouse.renderer.domElement );
// 		// 	warehouse.controls.rotateSpeed = 0.5; 				// 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
// 		// 	warehouse.controls.zoomSpeed = 1; 					// 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
// 		// 	warehouse.controls.panSpeed = 1; 					// 패닝 속도 입니다. 기본값(Float)은 1입니다.
// 		// 	warehouse.controls.minDistance = 500; 				// 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
// 		// 	warehouse.controls.maxDistance = 2500; 				// 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.
// 		// 	warehouse.controls.minPolarAngle = 0;				// 상하 각도조절 제약
// 		// 	warehouse.controls.maxPolarAngle = Math.PI/2;		// 상하 각도조절 제약
// 		//     //warehouse.controls.minAzimuthAngle = 0;			// 좌우 각도조절 제약
// 		//     //warehouse.controls.maxAzimuthAngle = Math.PI/2;	// 좌우 각도조절 제약
			
//         //     warehouse.controls.target.set(0, 0, 700);	// 포커스변경
//         //     warehouse.controls.update();
// 		// }

// 		// // Renderer rendering ==========================================================================
// 		// warehouse.animation = function () {

// 		// 	requestAnimationFrame( warehouse.animation );
// 		// 	warehouse.renderer.render( warehouse.scene, warehouse.camera );
// 		// 	controls();
// 		// }
//         // warehouse.animation();
// })()