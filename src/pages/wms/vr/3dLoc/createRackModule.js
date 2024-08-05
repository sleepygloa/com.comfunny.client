import * as THREE from 'three';

  /** 선반 추가 */
export function addShelf(rack) {
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
	return rackMesh;
}


  /** 선반 추가 */
  export function addFloorShelf(rack) {
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
		1,
		rackPos
	);
	let mesh = new THREE.Box3().setFromObject(rackMesh);
	
	rackMesh.userData.rackSeq = rack.seq
	
	rackMesh.name = "선반인데요";
	return rackMesh;
	}

/** 랙 생성 모듈 함수!! 
 * sizeX => 선반의 가로
 * sizeZ => 선반의 세로
 * rackFloor => 선반의 층수
 * rackPos => 선반 위치
*/
export function createRack(sizeX, sizeZ, rackFloor, rackPos) {

	const board = new THREE.BoxGeometry(sizeX, 0.02, sizeZ, 1, 1, 1);
	// const pilar = new THREE.BoxGeometry(0.05, sizeY, 0.05);
	// const board = new THREE.BoxGeometry(1, 0.02, 1, 1, 1, 1);
	const pilar = new THREE.BoxGeometry(0.05, (rackFloor == 1 ? 0 : 1), 0.05);
	// const material = new THREE.MeshBasicMaterial({color:0xffffff})
	const randomColor = new THREE.Color(
		Math.random(),
		Math.random(),
		Math.random()
	);

	// MeshBasicMaterial을 MeshPhysicalMaterial로 바꿔볼거에ㅐ용
	const material = new THREE.MeshPhysicalMaterial({
		// color:0xf1c2ff
		color: "#2E2E2E",
		emissive: 0x000000,
		roughness: 0.5,
		metalness: 0,
		clearcoat: 0.3,
		clearcoatRoughness: 0,
		wireframe: false,
		flatShading: false,
		opacity: 0.5,
	})

	const board_material = new THREE.MeshPhysicalMaterial({
		color: "#BDBDBD",
		emissive: 0x000000,
		roughness: 0.5,
		metalness: 0,
		clearcoat: 0.3,
		clearcoatRoughness: 0,
		wireframe: false,
		flatShading: false,
		opacity: 0.5,
	})


	const boardMesh = new THREE.Mesh(board, board_material);


	const pilar1 = new THREE.Mesh(pilar, material);
	const pilar2 = new THREE.Mesh(pilar, material);
	const pilar3 = new THREE.Mesh(pilar, material);
	const pilar4 = new THREE.Mesh(pilar, material);

	// 수정 필요
	// boardMesh.position.set(rackPos.x, 0.2, rackPos.z);

	const boardBox = new THREE.Box3().setFromObject(boardMesh);
	const pilarBox = new THREE.Box3().setFromObject(pilar1);
	const pilarYLen = pilarBox.max.y - pilarBox.min.y;
	

	pilar1.position.set(boardBox.min.x, boardBox.max.y + pilarYLen / 2 - pilarYLen * 0.2, boardBox.min.z);
	pilar2.position.set(boardBox.max.x, boardBox.max.y + pilarYLen / 2 - pilarYLen * 0.2, boardBox.min.z);
	pilar3.position.set(boardBox.max.x, boardBox.max.y + pilarYLen / 2 - pilarYLen * 0.2, boardBox.max.z);
	pilar4.position.set(boardBox.min.x, boardBox.max.y + pilarYLen / 2 - pilarYLen * 0.2, boardBox.max.z);

	// pilar1.material.transparent = true;
	// pilar2.material.transparent = true;
	// pilar3.material.transparent = true;
	// pilar4.material.transparent = true;
	// pilar1.material.opacity = 0.5;
	// pilar2.material.opacity = 0.5;
	// pilar3.material.opacity = 0.5;
	// pilar4.material.opacity = 0.5;

	let rackComponentGroup = new THREE.Group();
	const rackUnitGroup = new THREE.Group();
	
	boardMesh.name = "locationRack"
	rackComponentGroup.name = "locationRack"
	rackComponentGroup.add(boardMesh, pilar1, pilar2, pilar3, pilar4);

	rackUnitGroup.add(rackComponentGroup);

	// 층 입력 받으면 층 수만큼 올리는 코드 작성하기!
	for (let i = 0; i < rackFloor - 1; i++) {
		let rackFloorGroup = rackComponentGroup.clone();
		rackFloorGroup.position.y += 1 //sizeY
		rackUnitGroup.add(rackFloorGroup);
		rackComponentGroup = rackFloorGroup.clone();
	}

	// 수정 필요
	// rackUnitGroup.name = "locationRack"
	rackUnitGroup.position.set(rackPos.x, 0.2, -rackPos.z)
	return rackUnitGroup;
}