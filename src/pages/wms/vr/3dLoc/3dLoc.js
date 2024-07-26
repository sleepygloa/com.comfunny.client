import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../../components/PageTitle/PageTitle.js";
import { Grid } from "@mui/material";


import {client} from "../../../../contraints.js"

//Modeul
import createRack from "./createRackModule";

//API
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls';


// }, 1000);

export default function Loc3d(props) {
  const menuTitle = '3D 로케이션';
  const containerRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const [objects, setObjects] = useState([]);



  //창고기본정보
  var WarehouseInfo = {
    "bizCd" : "COMFUNNY_DEVELOPERS",
    "dcCd" : "1001",
    "clientCd" : "1001",

    warehouse_width : 25,
    warehouse_length : 25,
    warehouse_height : 5,
  }

  var ModelInfo = {
    //바닥위치 
    gltfY : 1.4,

    //지게차 크기
    forklift_scale_x : 0.005,
    forklift_scale_y : 0.005,
    forklift_scale_z : 0.005,

    //선반 크기
    rack_size_width : 1, //선반크기(가로)
    rack_size_length : 1, //선반크기(세로)
    rack_size_floor : 3, //층수
  }

  var RackGroup = new THREE.Group();


  const [locDataList, setLocDataList] = useState([]);
  const selectLocList = () => {
    var data = {};
    client.post(`/wms/sd/loc/selectLocList`, data, {})
      .then(res => {
        var dataList = res.data;
        setLocDataList(dataList);
      }).catch(error => { 
        console.log('error = '+error); 
      })
  }

  useEffect(() => {
    if (!containerRef.current) return;
    if (locDataList.length === 0) {
      //로케이션 정보 조회 
      selectLocList();
      return;
    }

    console.log("Warehouse");

    var warehouse = containerRef.current;
    var scene = sceneRef.current
    warehouse.data = WarehouseInfo;

    //Default
    warehouse.width = (warehouse.width ? warehouse.width : WarehouseInfo.warehouse_width);
    warehouse.legnth = (warehouse.legnth ? warehouse.legnth : WarehouseInfo.warehouse_length);
    warehouse.height = (warehouse.height ? warehouse.height : WarehouseInfo.warehouse_height);

    //컨테이너 생성
    const { renderer, width, height } = setupContainer(warehouse);

    //카메라 생성
    const camera = setupCamera(warehouse);

    //조명 생성
    setupLight(scene);

    // 중심좌표가이드 : Document - https://threejs.org/docs/#api/en/helpers/AxesHelper
    scene.add( new THREE.AxesHelper(500) );

    // 화살표가이드 : Document - https://threejs.org/docs/#api/en/helpers/ArrowHelper
    scene.add( new THREE.ArrowHelper( new THREE.Vector3( 0, -1, 0 ), new THREE.Vector3( 0, 350, 0 ), 25, 0xff0000, 25, 25 ) );

    // 바닥 추가
    addFloor(warehouse, scene);

    // 모델 로드
    loadModelContainer(warehouse, scene);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;

    // 드래그 컨트롤 초기화
    const dragControls = new DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('drag', event => {
      event.object.position.y = 0;
    });

    // 애니메이션 루프
    const animate = function () {
      var frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(sceneRef.current, camera);
    };
    animate();

    return () => {
      controls.dispose();
      dragControls.dispose();
      renderer.dispose();
      // cancelAnimationFrame(frame);
    };
  }, [locDataList]);

  // 컨테이너 생성
  function setupContainer(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);
    return { renderer, width, height };
  }
  
  // 카메라 생성
  function setupCamera(container) {
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }
  
  // 조명 생성
  function setupLight(scene) {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(50, 50, 50);
    scene.add(light);
  }
  
  // 바닥 추가
  function addFloor(container, scene) {
    // 바닥의 지오메트리 및 재질을 생성
    const floorGeometry = new THREE.PlaneGeometry(container.width, container.length);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
  
    // 격자 추가
    const gridHelper = new THREE.GridHelper(container.width, container.legnth, 0x000000, 0x888888);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);
  }
  
  // 모델 로드
  function loadModelContainer(container, scene) {
    // 벽
		var wall_geometry = new THREE.PlaneGeometry(container.width, container.height);
		var wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
		wall_object.material.side = THREE.DoubleSide; // 양면다 보이게
		wall_object.position.set( 0, container.height/2, container.width/2);
		wall_object.material.opacity = 0.5;			// 투명도
		wall_object.material.transparent = true;		// transparent: 투명
    scene.add( wall_object );

		var wall_geometry = new THREE.PlaneGeometry(container.width, container.height);
		var wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
		wall_object.material.side = THREE.DoubleSide; // 양면다 보이게
		wall_object.position.set( 0, container.height/2, -container.width/2);
		wall_object.material.opacity = 0.5;			// 투명도
		wall_object.material.transparent = true;		// transparent: 투명
    scene.add( wall_object );

		var wall_geometry = new THREE.PlaneGeometry(container.width, container.height);
		var wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
		wall_object.material.side = THREE.DoubleSide; // 양면다 보이게
		wall_object.position.set( container.width/2, container.height/2, 0);
		wall_object.material.opacity = 0.5;			// 투명도
		wall_object.material.transparent = true;		// transparent: 투명
    wall_object.rotation.y = 0.5 * Math.PI;
    scene.add( wall_object );

		var wall_geometry = new THREE.PlaneGeometry(container.width, container.height);
		var wall_object = new THREE.Mesh( wall_geometry, new THREE.MeshBasicMaterial({color: 0xc2c2c2}) ); 
		wall_object.material.side = THREE.DoubleSide; // 양면다 보이게
		wall_object.position.set( -container.width/2, container.height/2, 0);
		wall_object.material.opacity = 0.5;			// 투명도
		wall_object.material.transparent = true;		// transparent: 투명
    wall_object.rotation.y = -0.5 * Math.PI;
    scene.add( wall_object );


    const loader = new GLTFLoader();
    //랙 모델 로드
    //https://sketchfab.com/3d-models/rack-1
    // loader.load(`/images/vr/model/low/industrial_storage_rack.glb`, gltf => {
    //   gltf.scene.scale.set(1, 1, 1);
    //   gltf.scene.position.set(0, ModelInfo.gltfY, 0);
    //   scene.add(gltf.scene);
    //   setObjects(prevObjects => [...prevObjects, gltf.scene]);
    // });

    //지게차 모델 로드
    //https://sketchfab.com/3d-models/forklift-truck-060f3f8bc7de4e6ca2f348d414702e9d
    loader.load(`/images/vr/model/low/forklift_truck.glb`, gltf => {
      gltf.scene.scale.set(ModelInfo.forklift_scale_x, ModelInfo.forklift_scale_y, ModelInfo.forklift_scale_z);
      gltf.scene.position.set(10, ModelInfo.gltfY, 10);
      scene.add(gltf.scene);
      setObjects(prevObjects => [...prevObjects, gltf.scene]);
    });

    //선반추가
    for(let i = 0; i < locDataList.length; i++){
      addShelf({
        seq : i+1,
        rackX : -WarehouseInfo.warehouse_width/2 - 2 + Number(locDataList[i].linCd),
        rackZ : -WarehouseInfo.warehouse_length/2 - 2 + Number(locDataList[i].rowCd),
        rackWidth : ModelInfo.rack_size_width,
        rackLength : ModelInfo.rack_size_length,
        rackFloor : ModelInfo.rack_size_floor,
      });
    }
    sceneRef.current.add(RackGroup);
  }
  

  /** 선반 추가 */
  function addShelf(rack) {
    // 선반 만들기

    let rackPos = {
      // x: this.rackX.position.x,
      x: rack.rackX,
      y: 0.5,
      // z: this.rackZ.position.z
      z: rack.rackZ,
    };

    // Rack 생성부분 - createRack 호출

    let rackMesh = createRack(
      rack.rackWidth,
      rack.rackLength,
      rack.rackFloor,
      rackPos
    );
    let mesh = new THREE.Box3().setFromObject(rackMesh);

    rackMesh.userData.rackSeq = rack.seq

    rackMesh.name = "선반인데요";
    RackGroup.add(rackMesh);
  }

  return (
    <>
      <PageTitle title={menuTitle} />
      <Grid item xs={12} style={{ height: 750, width: '100%' }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>
      </Grid>
    </>
  );
}
