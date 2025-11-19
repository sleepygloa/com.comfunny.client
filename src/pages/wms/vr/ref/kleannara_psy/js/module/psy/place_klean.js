/******************************************************************************************************
 * place 전역변수
 ******************************************************************************************************/
var locFloorArr = [];
/******************************************************************************************************
 * place 생성
 ******************************************************************************************************/
var placeGeo = (function () {
    /******************************************************************************************************
     * Area 생성
     ******************************************************************************************************/
    var areaFloorArr = [];
    var area_A_offsetX = 400;
    var area_A_offsetZ = 400;
    var area_B_offsetX = 800;
    var area_B_offsetZ = 3800;
    var area_arr = [
        { area: "A", type: "밀롤창고지역", width: 8400 + 200, depth: 2000 + 200, position: { x: (8400 + 200) / 2 + area_A_offsetX, y: 0, z: 2000 / 2 + area_A_offsetZ }, color: 0xcccccc, textrue: null },
        { area: "B", type: "커터대기창고지역", width: 8300 + 200, depth: 2000 + 200, position: { x: (8100 + 200) / 2 + area_B_offsetX, y: 0, z: 2000 / 2 + area_B_offsetZ }, color: 0xcccccc, textrue: null },
    ];

    var getAreaData = function (areaName) {
        for (var i = 0; i < area_arr.length; i++) {
            if (area_arr[i].area == areaName) return area_arr[i];
        }
    };

    var drawArea = function (areaName) {
        for (var i = 0; i < area_arr.length; i++) {
            if (area_arr[i].area == areaName) {
                var areaGeometry = new THREE.PlaneGeometry(area_arr[i].width, area_arr[i].depth);
                var areaMaterial = new THREE.MeshLambertMaterial({ color: area_arr[i].color });
                var areaObj = new THREE.Mesh(areaGeometry, areaMaterial);

                areaObj.position.set(area_arr[i].position.x, area_arr[i].position.y - 3, area_arr[i].position.z);
                areaObj.rotation.x = -0.5 * Math.PI;
                areaObj.name = "area" + area_arr[i].area;
                areaObj.userData.area = area_arr[i];

                areaFloorArr.push(areaObj);
                warehouse.scene.add(areaObj);
            }
        }
    };

    /******************************************************************************************************
     * Zone 생성
     ******************************************************************************************************/
    var zoneFloorArr = [];
    //zone 생성
    var zone_A_offsetX_in = 500;
    var zone_A_offsetX_out = 600;
    var zone_A_offsetZ = 400;
    var zone_B_offsetX = 800;
    var zone_B_offsetZ = 2000;
    var zone_arr = [
        { zone: "A1", zoneRow: "01", startCol: "01", finishCol: "38", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + zone_A_offsetX_out, y: 0, z: 200 / 2 + 0 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "02", startCol: "01", finishCol: "38", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + zone_A_offsetX_in, y: 0, z: 200 / 2 + 200 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "03", startCol: "01", finishCol: "38", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + zone_A_offsetX_out, y: 0, z: 200 / 2 + 400 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "04", startCol: "01", finishCol: "38", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + zone_A_offsetX_in, y: 0, z: 200 / 2 + 600 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "05", startCol: "01", finishCol: "38", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + zone_A_offsetX_out, y: 0, z: 200 / 2 + 800 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "06", startCol: "01", finishCol: "38", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + zone_A_offsetX_in, y: 0, z: 200 / 2 + 1000 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "07", startCol: "01", finishCol: "38", type: "stack", width: 8300, depth: 200, position: { x: 8300 / 2 + zone_A_offsetX_out, y: 0, z: 200 / 2 + 1200 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "08", startCol: "01", finishCol: "07", type: "stack", width: 1600, depth: 200, position: { x: 1600 / 2 + zone_A_offsetX_in, y: 0, z: 200 / 2 + 1400 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "08", startCol: "13", finishCol: "18", type: "stack", width: 1400, depth: 200, position: { x: 1400 / 2 + zone_A_offsetX_in + 2600, y: 0, z: 200 / 2 + 1400 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "08", startCol: "24", finishCol: "38", type: "stack", width: 3300, depth: 200, position: { x: 3300 / 2 + zone_A_offsetX_in + 5000, y: 0, z: 200 / 2 + 1400 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "09", startCol: "01", finishCol: "06", type: "stack", width: 1400, depth: 200, position: { x: 1400 / 2 + zone_A_offsetX_out, y: 0, z: 200 / 2 + 1600 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "09", startCol: "24", finishCol: "38", type: "stack", width: 3300, depth: 200, position: { x: 3300 / 2 + zone_A_offsetX_out + 5000, y: 0, z: 200 / 2 + 1600 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "10", startCol: "01", finishCol: "07", type: "stack", width: 1600, depth: 200, position: { x: 1600 / 2 + zone_A_offsetX_in, y: 0, z: 200 / 2 + 1800 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "A1", zoneRow: "10", startCol: "24", finishCol: "38", type: "stack", width: 3300, depth: 200, position: { x: 3300 / 2 + zone_A_offsetX_in + 5000, y: 0, z: 200 / 2 + 1800 + zone_A_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B1", zoneRow: "01", startCol: "01", finishCol: "05", type: "yard", width: 750, depth: 2000, position: { x: 750 / 2 + zone_B_offsetX + 0, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B2", zoneRow: "00", startCol: "00", finishCol: "00", type: "yard", width: 800, depth: 2000, position: { x: 800 / 2 + zone_B_offsetX + 750 + 150, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B3", zoneRow: "00", startCol: "00", finishCol: "00", type: "yard", width: 800, depth: 2000, position: { x: 800 / 2 + zone_B_offsetX + 900 + 800 + 200, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B4", zoneRow: "00", startCol: "00", finishCol: "00", type: "yard", width: 800, depth: 2000, position: { x: 800 / 2 + zone_B_offsetX + 1900 + 800 + 150, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B5", zoneRow: "00", startCol: "00", finishCol: "00", type: "yard", width: 750, depth: 2000, position: { x: 750 / 2 + zone_B_offsetX + 2850 + 800 + 200, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B6", zoneRow: "00", startCol: "00", finishCol: "00", type: "yard", width: 750, depth: 2000, position: { x: 750 / 2 + zone_B_offsetX + 3850 + 750 + 150, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B7", zoneRow: "00", startCol: "00", finishCol: "00", type: "yard", width: 750, depth: 2000, position: { x: 750 / 2 + zone_B_offsetX + 4750 + 750 + 200, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B8", zoneRow: "00", startCol: "00", finishCol: "00", type: "yard", width: 750, depth: 2000, position: { x: 750 / 2 + zone_B_offsetX + 5700 + 750 + 150, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
        { zone: "B9", zoneRow: "00", startCol: "00", finishCol: "00", type: "yard", width: 750, depth: 2000, position: { x: 750 / 2 + zone_B_offsetX + 6600 + 750 + 200, y: 0, z: 2000 / 2 + 1800 + zone_B_offsetZ }, color: 0xfafafa, texture: null, direction: "none" },
    ];

    function getdrawZoneArr(zoneName) {
        var arr = [];
        for (var i = 0; i < zone_arr.length; i++) {
            if (zone_arr[i].zone == zoneName) {
                arr.push(zone_arr[i]);
            }
        }
        return arr;
    }

    function drawZone(zoneName) {
        for (var i = 0; i < zone_arr.length; i++) {
            if (zone_arr[i].zone == zoneName) {
                var zoneGeometry = new THREE.PlaneGeometry(zone_arr[i].width, zone_arr[i].depth);
                var zoneMaterial = new THREE.MeshLambertMaterial({ color: zone_arr[i].color });
                var zoneObj = new THREE.Mesh(zoneGeometry, zoneMaterial);

                zoneObj.position.set(zone_arr[i].position.x, zone_arr[i].position.y, zone_arr[i].position.z);
                zoneObj.rotation.x = -0.5 * Math.PI;
                zoneObj.name = "zone" + zone_arr[i].zone;
                zoneObj.userData.zone = zone_arr[i];

                zoneFloorArr.push(zoneObj);
                warehouse.scene.add(zoneObj);
            }
        }
    }

    /******************************************************************************************************
     * loc 생성
     ******************************************************************************************************/
    var wireInfo = {
        width: 200,
        height: 1080,
        depth: 200,
        padding: 18.91891891,
        color: 0x9e9e9e,
        texture: "none",
    };
    var floorInfo = {
        width: 200,
        depth: 200,
        padding: 18.91891891,
        geometry: new THREE.PlaneBufferGeometry(200, 200, 1),
        material: new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    };
    var locWireArr = [];

    var drawLocWire = function (zoneData, locData) {
        var locNum = locData.loc.slice(-2) - (zoneData.startCol - 1) - 1;
        var zoneMesure_Obj = {
            width: zoneData.width,
            depth: zoneData.depth,
        };
        var zone_corner = etc.convertPosToCorner(zoneMesure_Obj, zoneData.position);

        var drawPosition = {
            x: zone_corner.x + locNum * (wireInfo.width + wireInfo.padding) + wireInfo.width / 2,
            y: wireInfo.height / 2,
            z: zone_corner.z + wireInfo.depth / 2,
        };
        var wire = etc.createWireLack(wireInfo, drawPosition);
        locWireArr.push(wire);
    };

    var drawLocFloor = function (zoneData, locData) {
        var locNum = locData.loc.slice(-2) - (zoneData.startCol - 1) - 1;
        var zoneMesure_Obj = {
            width: zoneData.width,
            depth: zoneData.depth,
        };
        var zone_corner = etc.convertPosToCorner(zoneMesure_Obj, zoneData.position);

        var drawPosition = {
            x: zone_corner.x + locNum * (floorInfo.width + floorInfo.padding) + floorInfo.width / 2,
            y: 0,
            z: zone_corner.z + floorInfo.depth / 2,
        };
        var floorObj = new THREE.Mesh(floorInfo.geometry, floorInfo.material);
        floorObj.rotation.x = -0.5 * Math.PI;
        floorObj.position.set(drawPosition.x, drawPosition.y, drawPosition.z);
        floorObj.visible = false;

        floorObj.name = locData.loc;
        floorObj.userData.loc = locData.loc;
        floorObj.userData.stok = [];
        floorObj.userData.stage = null;
        floorObj.userData.stageHeight = 0;
        floorObj.userData.maxHeight = 10800;

        locFloorArr.push(floorObj);
        warehouse.scene.add(floorObj);
        return floorObj;
    };

    //Loc에 stok 생성
    var drawLocStok = function (stokData, locObj) {
        var stokObj = stokGeo.createStokCylinder(stokData.SKU);

        var drawPosition_y = locObj.position.y + locObj.userData.stageHeight + stokData.height / 2;
        stokObj.position.set(locObj.position.x, drawPosition_y, locObj.position.z);
        stokObj.userData.db = stokData;

        locObj.userData.stageHeight = locObj.userData.stageHeight + stokData.height;

        return stokObj;
    };
    return {
        getAreaData: getAreaData,
        drawArea: drawArea,
        getdrawZoneArr: getdrawZoneArr,
        drawZone: drawZone,
        drawLocWire: drawLocWire,
        drawLocFloor: drawLocFloor,
        drawLocStok: drawLocStok,
    };
})();
