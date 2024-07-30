
//창고기본정보
var WarehouseInfo = function(){
    
    //창고크기
    this.warehouse_height = 5;
    
    
    //창고 시작원점 위치
    this.warehouse_std_x = 0;
    this.warehouse_std_y = 0;
    this.warehouse_std_z = 0;

}

    
var ModelInfo = function(){
    //바닥위치 
    gltfY : 1.4;
    
    //지게차 크기
    this.forklift_scale_x = 0.005;
    this.forklift_scale_y = 0.005;
    this.forklift_scale_z = 0.005;
    
    //선반 크기
    this.rack_size_width = 1; //선반크기(가로)
    this.rack_size_length = 1; //선반크기(세로)
    this.rack_size_floor = 3; //층수
}
    
    
var CameraInfo = function(){
    //카메라 위치
    camera_x = 0;
    // camera_x : -20,
    camera_y = 20;
    // camera_y : 0,
    camera_z = 0;
}
var Warehouse = function( container ) {
	(function( warehouse ) {

        //기본정보 세팅
        warehouse.WarehouseInfo = new WarehouseInfo();
        warehouse.ModelInfo = new ModelInfo();
        warehouse.CameraInfo = new CameraInfo();


        //창고 시작 위치 설정
        warehouse.WarehouseInfo.warehouse_std_x = -1 * (WarehouseInfo.warehouse_width / 2);
        warehouse.WarehouseInfo.warehouse_std_y = -1 * (WarehouseInfo.warehouse_length / 2);

    

        //카메라세팅
	    warehouse.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	    warehouse.camera.position.set( 0, 1000, 2000 );

		// Document - https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
	    warehouse.renderer = new THREE.WebGLRenderer();
	    warehouse.renderer.setPixelRatio( window.devicePixelRatio );
	    warehouse.renderer.setSize( window.innerWidth, window.innerHeight );

		container.appendChild( warehouse.renderer.domElement );

		// Renderer rendering ==========================================================================
		warehouse.animation = function () {

			warehouse.renderer.render( warehouse.scene, warehouse.camera );
			
			requestAnimationFrame( warehouse.animation );
		}
    })(this);

}
