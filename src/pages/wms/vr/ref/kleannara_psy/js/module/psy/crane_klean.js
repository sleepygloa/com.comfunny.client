/******************************************************************************************************
 * crane 전역변수
 ******************************************************************************************************/
var crane_common_info = {
    vacuumLifterGeo: new THREE.CylinderBufferGeometry(85, 100, 120, 12),
    vacuumLifterMaterial: new THREE.MeshPhongMaterial({ color: 0xffdd22 }),
    liftWireGeo: new THREE.CylinderBufferGeometry(5, 5, 1, 7),
    liftWireMaterial: new THREE.MeshPhongMaterial({ color: 0x000000 }),
    trolleyFrameGeo: new THREE.BoxGeometry(550, 100, 550),
    trolleyFrameMaterial: new THREE.MeshPhongMaterial({
        color: 0xffdd22,
        emissive: 0x444444,
        map: new THREE.TextureLoader().load("img/frame.png"),
        transparent: true,
        side: THREE.DoubleSide,
    }),
    girderVerticalGeo: new THREE.BoxBufferGeometry(150, 150, 2800),
    girderVerticalMaterial: new THREE.MeshPhongMaterial({ color: 0xffdd22 }),
    girderHorizontalGeo: new THREE.BoxBufferGeometry(400, 50, 50),
    girderHorizontalMaterial: new THREE.MeshPhongMaterial({ color: 0xffdd22 }),
    hoistGeo: new THREE.CylinderBufferGeometry(50, 50, 400, 12),
    hoistMaterial: new THREE.MeshPhongMaterial({ color: 0xffdd22 }),
};
var crane_left_info = {
    craneName: "Left_Crane",
    init_position: { x: 300, y: 1600, z: 2850 / 2 }, // 기본위치
    rcpt_position: { x: 2750, y: 0, z: 2050 },
    speed: 20,
    horizontal: 100,
    vertical: 100,
    height: 20,
    color: 0xff0000,
};
var crane_right_info = {
    craneName: "Right_Crane",
    init_position: { x: 9500 - 200 - 75, y: 1600, z: 2850 / 2 }, // 기본위치
    rcpt_position: { x: 5250, y: 0, z: 2050 },
    speed: 20,
    horizontal: 100,
    vertical: 100,
    height: 20,
    color: 0xff0000,
};
var crane_arr = [];

/******************************************************************************************************
 * crane 객체 생성
 ******************************************************************************************************/
var CraneGeometry = function (parameter) {
    var crane_geo = new THREE.BoxBufferGeometry(1000, 10, 10);
    var crane_mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var crane_main = new THREE.Mesh(crane_geo, crane_mat);

    this.draw = function () {
        console.log(crane_common_info);
        //Crane - Trolley Frame
        var trolleyFrame_obj = new THREE.Mesh(crane_common_info.trolleyFrameGeo, crane_common_info.trolleyFrameMaterial);
        trolleyFrame_obj.position.set(0, crane_common_info.trolleyFrameGeo.parameters.height / 2 + crane_common_info.girderVerticalGeo.parameters.height / 2, 0);
        trolleyFrame_obj.name = "trolleyFrame";

        crane_main.add(trolleyFrame_obj);

        //Crane - Trolley Frame - Hoist
        var hoist_obj = new THREE.Mesh(crane_common_info.hoistGeo, crane_common_info.hoistMaterial);
        hoist_obj.rotation.z = 0.5 * Math.PI;
        hoist_obj.name = "hoist";

        trolleyFrame_obj.add(hoist_obj);
        trolleyFrame_obj.userData.hoist = hoist_obj;

        //Crane - Trolley Frame - vacuum Lifter
        var vacuumLifter_obj = new THREE.Mesh(crane_common_info.vacuumLifterGeo, crane_common_info.vacuumLifterMaterial);
        vacuumLifter_obj.position.set(0, 0 - crane_common_info.trolleyFrameGeo.parameters.height / 2 - crane_common_info.girderVerticalGeo.parameters.height / 2, 0);
        vacuumLifter_obj.name = parameter.craneName + "_vacuumLifter";

        trolleyFrame_obj.add(vacuumLifter_obj);
        trolleyFrame_obj.userData.vacuumLifter = vacuumLifter_obj;

        //Crane - Trolley Frame - vacuum Lifter Wire
        var liftWire_obj = new THREE.Mesh(crane_common_info.liftWireGeo, crane_common_info.liftWireMaterial);
        liftWire_obj.position.set(0, (hoist_obj.position.y - hoist_obj.geometry.parameters.radiusTop / 2 + (vacuumLifter_obj.position.y + vacuumLifter_obj.geometry.parameters.height / 2)) / 2, 0);
        liftWire_obj.scale.set(1, hoist_obj.position.y - hoist_obj.geometry.parameters.radiusTop / 2 - (vacuumLifter_obj.position.y + vacuumLifter_obj.geometry.parameters.height / 2), 1);
        liftWire_obj.name = "liftWire";

        trolleyFrame_obj.add(liftWire_obj);
        trolleyFrame_obj.userData.liftWire = liftWire_obj;

        //Crane - Girder Frame
        var girderFrame_left_Obj = new THREE.Mesh(crane_common_info.girderVerticalGeo, crane_common_info.girderVerticalMaterial);
        var girderFrame_right_Obj = new THREE.Mesh(crane_common_info.girderVerticalGeo, crane_common_info.girderVerticalMaterial);
        var girderFrame_top_Obj = new THREE.Mesh(crane_common_info.girderHorizontalGeo, crane_common_info.girderHorizontalMaterial);
        var girderFrame_bottom_Obj = new THREE.Mesh(crane_common_info.girderHorizontalGeo, crane_common_info.girderHorizontalMaterial);
        girderFrame_left_Obj.position.set(-200, 0, 0);
        girderFrame_right_Obj.position.set(200, 0, 0);
        girderFrame_top_Obj.position.set(0, 0, -crane_common_info.girderVerticalGeo.parameters.depth / 2 + 25);
        girderFrame_bottom_Obj.position.set(0, 0, +crane_common_info.girderVerticalGeo.parameters.depth / 2 - 25);
        girderFrame_left_Obj.name = "girderFrame_left";
        girderFrame_right_Obj.name = "girderFrame_right";
        girderFrame_top_Obj.name = "girderFrame_top";
        girderFrame_bottom_Obj.name = "girderFrame_bottom";

        crane_main.add(girderFrame_left_Obj, girderFrame_right_Obj, girderFrame_top_Obj, girderFrame_bottom_Obj);

        //Crane set Info
        crane_main.name = parameter.craneName;
        crane_main.userData = {
            speed: parameter.speed,
            workQueue: [],
            trolleyFrame: trolleyFrame_obj,
            vacuumLifter: vacuumLifter_obj,
            liftWire: liftWire_obj,
            init_position: parameter.init_position,
            rcpt_position: parameter.rcpt_position,
            state: "ready",
        };
        crane_main.position.set(parameter.init_position.x, parameter.init_position.y, parameter.init_position.z);

        crane_arr.push(crane_main);
        warehouse.scene.add(crane_main);
    };
    this.run = function () {
        setInterval(function () {
            if (crane_main.userData.state == "ready" && crane_main.userData.workQueue.length > 0) {
                crane_main.userData.state = "working";
                var stok = crane_main.userData.workQueue[0].stok;
                var rcpt_conveyor = crane_main.userData.workQueue[0].conveyor;
                var lift_initPosition_y = crane_main.position.y;
                var lift_position_y = stok.position.y + stok.geometry.parameters.height / 2 + crane_main.userData.vacuumLifter.geometry.parameters.height / 2;
                var vacuumLifter_worldPosition_y = crane_main.position.y + crane_main.userData.trolleyFrame.position.y + crane_main.userData.vacuumLifter.position.y;

                //입고
                if (crane_main.userData.workQueue[0].stok.userData.type == "RCPT") {
                    //pick
                    //입고대로 x, z 위치 이동 ( x : crane_main, z : trollreyFrame)
                    moveCrane(crane_main, { x: crane_main.userData.rcpt_position.x, y: vacuumLifter_worldPosition_y, z: crane_main.userData.rcpt_position.z }, function () {
                        //입고대 stok으로 y위치 이동 (y : vacuumLifter)
                        moveCrane(crane_main, { x: crane_main.userData.rcpt_position.x, y: lift_position_y, z: crane_main.userData.rcpt_position.z }, function () {
                            //stok vaccuumLifter에 고정
                            crane_main.userData.vacuumLifter.attach(stok);
                            //vacuumLifter 원위치
                            moveCrane(crane_main, { x: crane_main.userData.rcpt_position.x, y: lift_initPosition_y, z: crane_main.userData.rcpt_position.z }, function () {
                                //현재 컨베이어에서 stok 제거, conveyor 작동
                                rcpt_conveyor.userData.stok = null;
                                conveyor.onConveyor(rcpt_conveyor.userData.group);
                                //put
                                //권장위치로 x, z 이동  ( x : crane_main, z : trollreyFrame)
                                moveCrane(crane_main, { x: stok.userData.loc_position.x, y: lift_initPosition_y, z: stok.userData.loc_position.z }, function () {
                                    //적치할 y position 계산.
                                    var locObj;
                                    for (var i = 0; i < locFloorArr.length; i++) {
                                        if (locFloorArr[i].name == stok.userData.db.loc) locObj = locFloorArr[i];
                                    }
                                    var putPosition_y = locObj.position.y + locObj.userData.stageHeight + stok.geometry.parameters.height + crane_main.userData.vacuumLifter.geometry.parameters.height / 2;
                                    locObj.userData.stageHeight += stok.geometry.parameters.height;

                                    //권장위치로 y 이동 (y : vacuumLifter)
                                    moveCrane(crane_main, { x: stok.userData.loc_position.x, y: putPosition_y, z: stok.userData.loc_position.z }, function () {
                                        warehouse.scene.attach(stok);
                                        crane_main.userData.workQueue.shift();
                                        // 입고 정보 입력 및 수정.

                                        //vacuumLifter 원위치
                                        moveCrane(crane_main, { x: stok.userData.loc_position.x, y: lift_initPosition_y, z: stok.userData.loc_position.z }, function () {
                                            if (crane_main.userData.workQueue.length == 0) {
                                                if (crane_main.name == "Left_Crane") {
                                                    moveCrane(crane_main, { x: crane_left_info.init_position.x, y: lift_initPosition_y, z: crane_left_info.init_position.z }, function () {
                                                        crane_main.userData.state = "ready";
                                                    });
                                                } else {
                                                    moveCrane(crane_main, { x: crane_right_info.init_position.x, y: lift_initPosition_y, z: crane_right_info.init_position.z }, function () {
                                                        crane_main.userData.state = "ready";
                                                    });
                                                }
                                            } else {
                                                crane_main.userData.state = "ready";
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                //출고
                else if (crane_main.userData.workQueue[0].type == "ODER") {
                }
            }
        }, 1000);
    };

    function moveCrane(crane, destination, callback) {
        var distance_x = destination.x - crane.position.x; //목적지.x(worldPosition) - crane.x (worldPosition)
        var distance_y = Math.floor(destination.y - (crane.position.y + crane.userData.trolleyFrame.position.y + crane.userData.vacuumLifter.position.y)); //목적지y(worldPosition) - vacuumlifter.y (worldPosition)
        var distance_z = destination.z - (crane.position.z + crane.userData.trolleyFrame.position.z);
        var speed = crane.userData.speed * warehouse.speed;

        if (distance_x != 0 || distance_y != 0 || distance_z != 0) {
            if (Math.abs(distance_x) > speed) {
                crane.position.x = crane.position.x + speed * Math.sign(distance_x);
            } else {
                crane.position.x = destination.x;
            }

            if (Math.abs(distance_y) > speed) {
                crane.userData.vacuumLifter.position.y = crane.userData.vacuumLifter.position.y + speed * Math.sign(distance_y);
            } else {
                crane.userData.vacuumLifter.position.y = crane.userData.vacuumLifter.position.y + Math.sign(distance_y);
            }
            //wire 조절
            crane.userData.trolleyFrame.userData.liftWire.scale.set(1, crane.userData.trolleyFrame.userData.hoist.position.y - crane.userData.trolleyFrame.userData.hoist.geometry.parameters.radiusTop / 2 - (crane.userData.trolleyFrame.userData.vacuumLifter.position.y + crane.userData.trolleyFrame.userData.vacuumLifter.geometry.parameters.height / 2), 1);
            crane.userData.trolleyFrame.userData.liftWire.position.y = (crane.userData.trolleyFrame.userData.hoist.position.y - crane.userData.trolleyFrame.userData.hoist.geometry.parameters.radiusTop / 2 + (crane.userData.trolleyFrame.userData.vacuumLifter.position.y + crane.userData.trolleyFrame.userData.vacuumLifter.geometry.parameters.height / 2)) / 2;

            if (Math.abs(distance_z) > speed) {
                crane.userData.trolleyFrame.position.z = crane.userData.trolleyFrame.position.z + speed * Math.sign(distance_z);
            } else {
                crane.userData.trolleyFrame.position.z = destination.z - crane.position.z;
            }

            //if()

            requestAnimationFrame(function () {
                moveCrane(crane, destination, callback);
            });
        } else {
            callback();
        }
    }
};
