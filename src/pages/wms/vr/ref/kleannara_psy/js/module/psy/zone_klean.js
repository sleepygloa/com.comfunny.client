/******************************************************************************************************
 * zone 전역변수
 ******************************************************************************************************/
var zoneArr = [];
/******************************************************************************************************
 * conveyor 생성
 ******************************************************************************************************/
var zone = (function () {
  //zone 생성
  var offsetZ = 400;
  var offsetX_in = 500;
  var offsetX_out = 600;
  var zone_arr = [
    { name: "A", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + offsetX_out, y: 0, z: 200 / 2 + 0 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "B", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + offsetX_in, y: 0, z: 200 / 2 + 200 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "C", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + offsetX_out, y: 0, z: 200 / 2 + 400 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "D", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + offsetX_in, y: 0, z: 200 / 2 + 600 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "E", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + offsetX_out, y: 0, z: 200 / 2 + 800 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "F", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + offsetX_in, y: 0, z: 200 / 2 + 1000 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "G", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + offsetX_out, y: 0, z: 200 / 2 + 1200 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "H", type: "stack", width: 1600, depth: 200, position: { x: 1600 / 2 + offsetX_in, y: 0, z: 200 / 2 + 1400 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "I", type: "stack", width: 1400, depth: 200, position: { x: 1400 / 2 + offsetX_in + 2600, y: 0, z: 200 / 2 + 1400 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "J", type: "stack", width: 3300, depth: 200, position: { x: 3300 / 2 + offsetX_in + 5000, y: 0, z: 200 / 2 + 1400 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "K", type: "stack", width: 1400, depth: 200, position: { x: 1400 / 2 + offsetX_out, y: 0, z: 200 / 2 + 1600 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "L", type: "stack", width: 3300, depth: 200, position: { x: 3300 / 2 + offsetX_out + 5000, y: 0, z: 200 / 2 + 1600 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "M", type: "stack", width: 1600, depth: 200, position: { x: 1600 / 2 + offsetX_in, y: 0, z: 200 / 2 + 1800 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    { name: "N", type: "stack", width: 3300, depth: 200, position: { x: 3300 / 2 + offsetX_in + 5000, y: 0, z: 200 / 2 + 1800 + offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
  ];

  //db zone
  function getZoneData(zoneName) {
    for (var i = 0; i <= zone_arr.length; i++) {
      if (zoneName == zone_arr[i].name) return zone_arr[i];
    }
  }
  //zone

  function drawZone(zoneData) {
    //zoneObj 생성
    var color = zoneData.color;
    var width = zoneData.width;
    var depth = zoneData.depth;
    var position = zoneData.position;

    var zoneGeometry = new THREE.PlaneGeometry(width, depth);
    var zoneMaterial = new THREE.MeshLambertMaterial({ color: color });
    var zoneObj = new THREE.Mesh(zoneGeometry, zoneMaterial);

    zoneObj.position.set(position.x, position.y, position.z);
    zoneObj.rotation.x = -0.5 * Math.PI;

    zoneObj.name = "zone" + zoneData.name;
    zoneObj.zone = zoneData;

    zoneArr.push(zoneObj);
    warehouse.scene.add(zoneObj);
    return zoneObj;
  }
  return {
    getZoneData: getZoneData,
    drawZone: drawZone,
  };
})();
