
  /** 박스 추가 */
function addBox(rack) {
	// 위치
	let rackPos = {
		x: rack.x,
		y: 0.5,
		z: rack.z,
	};

	let rackMesh = createBox(rackPos);
	// let mesh = new THREE.Box3().setFromObject(rackMesh);
	rackMesh.userData.rackSeq = rack.seq
	rackMesh.name = "box";
	return rackMesh;
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
	return rackMesh;
}

  /** 선반 추가 */
function addFloorShelf(rack) {
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
function createRack(sizeX, sizeZ, rackFloor, rackPos) {

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
		color: "#efefef",
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
		opacity: 0.2,
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
	

	pilar1.position.set(boardBox.min.x, pilarYLen / 2 - pilarYLen * 0.2, boardBox.min.z);
	pilar2.position.set(boardBox.max.x, pilarYLen / 2 - pilarYLen * 0.2, boardBox.min.z);
	pilar3.position.set(boardBox.max.x, pilarYLen / 2 - pilarYLen * 0.2, boardBox.max.z);
	pilar4.position.set(boardBox.min.x, pilarYLen / 2 - pilarYLen * 0.2, boardBox.max.z);
	// pilar1.position.set(boardBox.min.x, boardBox.max.y + pilarYLen / 2 - pilarYLen * 0.2, boardBox.min.z);
	// pilar2.position.set(boardBox.max.x, boardBox.max.y + pilarYLen / 2 - pilarYLen * 0.2, boardBox.min.z);
	// pilar3.position.set(boardBox.max.x, boardBox.max.y + pilarYLen / 2 - pilarYLen * 0.2, boardBox.max.z);
	// pilar4.position.set(boardBox.min.x, boardBox.max.y + pilarYLen / 2 - pilarYLen * 0.2, boardBox.max.z);

	// pilar1.material.transparent = true;
	// pilar2.material.transparent = true;
	// pilar3.material.transparent = true;
	// pilar4.material.transparent = true;
	// pilar1.material.opacity = 0.5;
	// pilar2.material.opacity = 0.5;
	// pilar3.material.opacity = 0.5;
	// pilar4.material.opacity = 0.5;

	
	boardMesh.name = "locationRack"

	//Floor
	let rackFloorGroup = new THREE.Group();
	rackFloorGroup.name = "locationRack"
	rackFloorGroup.add(boardMesh, pilar1, pilar2, pilar3, pilar4);

	//Last
	let rackFloorLastGroup = new THREE.Group();
	rackFloorLastGroup.name = "locationRack"
	rackFloorLastGroup.add(boardMesh);


	const rackUnitGroup = new THREE.Group();
	// 층 입력 받으면 층 수만큼 올리는 코드 작성하기!
	for (let i = 0; i < rackFloor; i++) {

		if(i < rackFloor-1) {
			rackComponentGroup = rackFloorGroup.clone();
			rackUnitGroup.add(rackComponentGroup);
			rackFloorGroup.position.y += 1 //sizeY
		}else{
			//Floor
			rackComponentGroup = rackFloorLastGroup.clone();
			// rackComponentGroup.position.y += 1 //sizeY
			rackUnitGroup.add(rackComponentGroup);
		}

	}

	// 수정 필요
	// rackUnitGroup.name = "locationRack"
	rackUnitGroup.position.set(rackPos.x, 0.2, -rackPos.z)
	return rackUnitGroup;
}

function createBox(rackPos) {

	const board = new THREE.BoxGeometry(0.8, 0.8, 0.8);
	const board_material =[
		new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/pages/stock/loc3d/images/vr/imgs/box/box.jpg') }), //front
		new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/pages/stock/loc3d/images/vr/imgs/box/box.jpg') }), //back
		new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/pages/stock/loc3d/images/vr/imgs/box/box.jpg') }), //top
		new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/pages/stock/loc3d/images/vr/imgs/box/box.jpg') }), //bottom
		new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/pages/stock/loc3d/images/vr/imgs/box/box.jpg') }), //right
		new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/pages/stock/loc3d/images/vr/imgs/box/box.jpg') })  //left
	];

	const boardMesh = new THREE.Mesh(board, board_material);
	boardMesh.name = "box"

	let rackComponentGroup = new THREE.Group();
	rackComponentGroup.name = "boxGroup"
	rackComponentGroup.add(boardMesh);

	const rackUnitGroup = new THREE.Group();
	rackUnitGroup.add(rackComponentGroup);

	// 수정 필요
	boardMesh.position.set(rackPos.x-1, 0.6, -rackPos.z+1)
	// rackUnitGroup.position.set(rackPos.x, 0.2, -rackPos.z)
	return boardMesh;
	// return rackUnitGroup;
}