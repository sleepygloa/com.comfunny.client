  // 바닥 추가
function addFloor(container, scene) {
  // 바닥의 지오메트리 및 재질을 생성
  const floorGeometry = new THREE.PlaneGeometry(container.width, container.length);
  const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;

  floor.layers.set(0);  // Add the cube to layer 1
  scene.add(floor);
}