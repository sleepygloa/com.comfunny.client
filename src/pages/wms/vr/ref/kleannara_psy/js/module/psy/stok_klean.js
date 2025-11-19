/******************************************************************************************************
 * stok 전역변수
 ******************************************************************************************************/
var lotNum = 0;
var pltNum;
var stokInfo = {
    materialTB: new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load("./img/tb.png"),
        transparent: true,
        side: THREE.DoubleSide,
    }),
    materialSide: new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load("./img/cylinderSide.png"),
        transparent: true,
        side: THREE.DoubleSide,
    }),
};
/******************************************************************************************************
 * stok 생성
 ******************************************************************************************************/
var stokGeo = (function () {
    //stok생성
    var createStok = function () {
        //Set start Conveyor
        var curConveyor = conveyorObj_map1[conveyorObj_map1.length - 1][0];

        //create Stok
        if (curConveyor.userData.stok == null) {
            var stok = createStokCylinder(randomSku().rollType);

            stok.rotation.z = 0.5 * Math.PI;
            stok.position.set(curConveyor.position.x, curConveyor.position.y + stok.geometry.parameters.radiusTop, curConveyor.position.z);

            stok.userData.type = "RCPT";
            stok.userData.db = {
                lot: lotNum,
                pltId: pltNum++,
                area: "A",
                zone: "A1",
                loc: randomLocation(),
                sku: randomSku(),
                stokqty: 1,
            };

            for (var i = 0; i < locFloorArr.length; i++) {
                if (locFloorArr[i].name == stok.userData.db.loc) {
                    stok.userData.loc_position = locFloorArr[i].position;
                }
            }

            //rcmd_location 에 따른
            if (stok.userData.db.loc.slice(-2) <= 19) {
                stok.userData.destination = inArr[0];
            } else if (stok.userData.db.loc.slice(-2) > 19) {
                stok.userData.destination = inArr[1];
            }
            stokDB.push(stok.userData.db);

            curConveyor.userData.stok = stok;
            conveyor.moveConveyor(curConveyor, stok);
            warehouse.scene.add(stok);

            // console.log(stok);
            console.log(stokDB);
        }
    };

    function createStokCylinder(rollType) {
        //Cylinder 생성
        var rollTypeInfo = etc.getRollTypeInfo(rollType);
        var stokGeo = new THREE.CylinderBufferGeometry(rollTypeInfo.radius, rollTypeInfo.radius, rollTypeInfo.height, 20);
        var stokObj = new THREE.Mesh(stokGeo, [stokInfo.materialSide, stokInfo.materialTB, stokInfo.materialTB]);

        warehouse.scene.add(stokObj);
        return stokObj;
    }

    function randomLocation() {
        var zone = "A1";
        var row = ("0" + String(Math.floor(Math.random() * 10) + 1)).slice(-2);
        var col;

        if (row <= 7) {
            col = ("0" + String(Math.floor(Math.random() * 38) + 1)).slice(-2);
        } else if (row == 8) {
            var pocket = [];
            pocket[0] = "0" + String(Math.floor(Math.random() * 7) + 1);
            pocket[1] = Math.floor(Math.random() * (18 - 13 + 1)) + 13;
            pocket[2] = Math.floor(Math.random() * (38 - 24 + 1)) + 24;
            col = pocket[Math.floor(Math.random() * 3)];
        } else if (row == 9) {
            var pocket = [];
            pocket[0] = "0" + String(Math.floor(Math.random() * 6) + 1);
            pocket[1] = Math.floor(Math.random() * (38 - 24 + 1)) + 24;
            col = pocket[Math.floor(Math.random() * 2)];
        } else if (row == 10) {
            var pocket = [];
            pocket[0] = "0" + String(Math.floor(Math.random() * 7) + 1);
            pocket[1] = Math.floor(Math.random() * (38 - 24 + 1)) + 24;
            col = pocket[Math.floor(Math.random() * 2)];
        }
        return zone + "-" + String(row) + "-" + String(col);
    }

    function randomSku() {
        var sku = [
            { rollType: "0.76t", radius: 150 / 2, height: 54.5 },
            { rollType: "1.53t", radius: 210 / 2, height: 54.5 },
            { rollType: "1.24t", radius: 150 / 2, height: 88.9 },
            { rollType: "2.49t", radius: 210 / 2, height: 88.9 },
            { rollType: "2.38t", radius: 150 / 2, height: 170 },
            { rollType: "4.76t", radius: 210 / 2, height: 170 },
            { rollType: "2.66t", radius: 150 / 2, height: 190 },
            { rollType: "5.32t", radius: 210 / 2, height: 190 },
        ];
        var randomNum = Math.floor(Math.random() * sku.length);
        return sku[randomNum];
    }

    return {
        createStok: createStok,
        createStokCylinder: createStokCylinder,
    };
})();
