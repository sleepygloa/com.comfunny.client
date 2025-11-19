// /******************************************************************************************************
//  * conveyor 전역변수
//  ******************************************************************************************************/
// var conveyor_map1 = [
//     /*[0]_[1]_[2]_[3]_[4] (S_R_A_001_R)
//     [0] rollertype : B(Begin), M(Middle), E(End)
//     [1] kind : S(Sorter), R(Roller), E(End), N(Null), I(In), O(Out), U(Upender)
//     [2] group : A, B...
//     [3] number : 001~   
//     [4] direction : L(Left), R(Right), U(Up), D(Down), N(None) 
//     sorter - 1.conveyor_3_25 , 2.conveyor_3_50, 3.conveyor_3_69 , 4.conveyor_10_69 
//     conveyor - A([9][0~4]) , B([9][5~13]), C([9][4~32]), D([9][33~67]), E([9][71~90]), F([4~7][69]), G([2][67~52]), H([2][48~27]), I([2][23~6])
//   */
//     //               0               1               2               3               4               5               6               7               8               9              10              11              12              13              14              15              16              17              18              19              20              21              22              23              24              25              26              27              28              29              30              31              32              33              34              35              36              37              38              39              40              41              42              43              44              45              46              47              48              49              50              51              52              53              54              55              56              57              58              59              60              61              62              63              64              65              66              67              68              69              70              71              72              73              74              75              76              77              78              79              80              81              82              83              84              85              86              87              88              89              90
//     /* 0  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "E_O_oB_001_R", "E_U_uB_004_R", "E_I_iB_001_R", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "E_O_oA_001_R", "E_U_uA_004_R", "E_I_iA_001_R", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            "],
//     /* 1  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "M_U_uB_003_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "M_U_uA_003_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            "],
//     /* 2  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "M_U_uB_002_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "M_U_uA_002_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            "],
//     /* 3  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "B_U_uB_001_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "B_U_uA_001_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            "],
//     /* 4  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "E_E_eC_001_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "E_E_eB_001_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            "],
//     /* 5  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "M_E_eC_001_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "M_E_eB_001_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            "],
//     /* 6  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "B_E_eC_001_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "B_E_eB_001_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            "],
//     /* 7  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "E_N_sD_004_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "E_N_sC_004_U", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            "],
//     /* 8  */ ["            ", "            ", "            ", "            ", "            ", "            ", "E_E_eD_001_N", "E_R_rI_017_L", "M_R_rI_016_L", "M_R_rI_015_L", "M_R_rI_014_L", "M_R_rI_013_L", "M_R_rI_012_L", "M_R_rI_011_L", "M_R_rI_010_L", "M_R_rI_009_L", "M_R_rI_008_L", "M_R_rI_007_L", "M_R_rI_006_L", "M_R_rI_005_L", "M_R_rI_004_L", "M_R_rI_003_L", "M_R_rI_002_L", "B_R_rI_001_L", "E_N_sD_003_L", "M_S_sD_002_L", "B_N_sD_001_L", "E_R_rH_022_L", "M_R_rH_021_L", "M_R_rH_020_L", "M_R_rH_019_L", "M_R_rH_018_L", "M_R_rH_017_L", "M_R_rH_016_L", "M_R_rH_015_L", "M_R_rH_014_L", "M_R_rH_013_L", "M_R_rH_012_L", "M_R_rH_011_L", "M_R_rH_010_L", "M_R_rH_009_L", "M_R_rH_008_L", "M_R_rH_007_L", "M_R_rH_006_L", "M_R_rH_005_L", "M_R_rH_004_L", "M_R_rH_003_L", "M_R_rH_002_L", "B_R_rH_001_L", "E_N_sC_003_L", "M_S_sC_002_L", "B_N_sC_001_L", "E_R_rG_016_L", "M_R_rG_015_L", "M_R_rG_014_L", "M_R_rG_013_L", "M_R_rG_012_L", "M_R_rG_011_L", "M_R_rG_010_L", "M_R_rG_009_L", "M_R_rG_008_L", "M_R_rG_007_L", "M_R_rG_006_L", "M_R_rG_005_L", "M_R_rG_004_L", "M_R_rG_003_L", "M_R_rG_002_L", "B_R_rG_001_L", "E_N_rB_003_L", "M_S_rB_002_U"],
//     /* 9  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "B_N_rB_001_U"],
//     /*10  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "E_R_rF_004_U"],
//     /*11  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "M_R_rF_003_U"],
//     /*12  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "M_R_rF_002_U"],
//     /*13  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "B_R_rF_001_U"],
//     /*14  */ ["            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "            ", "E_N_sA_004_U"],
//     /*15  */ ["B_R_rA_001_R", "M_R_rA_002_R", "M_R_rA_003_R", "M_R_rA_004_R", "E_R_rA_005_R", "B_R_rB_001_R", "M_R_rB_002_R", "M_R_rB_003_R", "M_R_rB_004_R", "M_R_rB_005_R", "M_R_rB_006_R", "M_R_rB_007_R", "M_R_rB_008_R", "E_R_rB_010_R", "B_R_rC_001_R", "M_R_rC_002_R", "M_R_rC_003_R", "M_R_rC_004_R", "M_R_rC_005_R", "M_R_rC_006_R", "M_R_rC_007_R", "M_R_rC_008_R", "M_R_rC_009_R", "M_R_rC_010_R", "M_R_rC_011_R", "M_R_rC_012_R", "M_R_rC_013_R", "M_R_rC_014_R", "M_R_rC_015_R", "M_R_rC_016_R", "M_R_rC_017_R", "M_R_rC_018_R", "E_R_rC_019_R", "B_R_rD_001_R", "M_R_rD_002_R", "M_R_rD_003_R", "M_R_rD_004_R", "M_R_rD_005_R", "M_R_rD_006_R", "M_R_rD_007_R", "M_R_rD_008_R", "M_R_rD_009_R", "M_R_rD_010_R", "M_R_rD_011_R", "M_R_rD_012_R", "M_R_rD_013_R", "M_R_rD_014_R", "M_R_rD_015_R", "M_R_rD_016_R", "M_R_rD_017_R", "M_R_rD_018_R", "M_R_rD_019_R", "M_R_rD_020_R", "M_R_rD_021_R", "M_R_rD_022_R", "M_R_rD_023_R", "M_R_rD_024_R", "M_R_rD_025_R", "M_R_rD_026_R", "M_R_rD_027_R", "M_R_rD_028_R", "M_R_rD_029_R", "M_R_rD_030_R", "M_R_rD_031_R", "M_R_rD_032_R", "M_R_rD_033_R", "M_R_rD_034_R", "E_R_rD_035_R", "B_N_sA_001_R", "M_S_sA_002_R", "E_N_sA_003_R", "B_R_rE_001_R", "M_R_rE_002_R", "M_R_rE_003_R", "M_R_rE_004_R", "M_R_rE_005_R", "M_R_rE_006_R", "M_R_rE_007_R", "M_R_rE_008_R", "M_R_rE_009_R", "M_R_rE_010_R", "M_R_rE_011_R", "M_R_rE_012_R", "M_R_rE_013_R", "M_R_rE_014_R", "M_R_rE_015_R", "M_R_rE_016_R", "M_R_rE_017_R", "M_R_rE_018_R", "E_R_rE_019_R", "E_E_eA_001_N"],
// ];
// //conveyor 객체가 저장된 map
// var conveyorObj_map1 = JSON.parse(JSON.stringify(conveyor_map1));
// //전체 Conveyor
// var conveyorArr = [];
// //전체 Sorter
// var sorterArr = [];
// //전체 Roller
// var rollerArr = [];
// //전체 UpenderArr
// var upenderArr = [];
// // 전체 In/out Arr
// var inArr = [];
// var outArr = [];

// var measure = {
//     roller_radius: 12.5,
//     conveyor_side: 100,
//     sorter_radius: 150,
//     end_horizontal: 200,
//     end_color: 0xb2b2b2,
//     upender_color: 0xb2b2b2,
// };

// var offset = {
//     standard_offset_X: measure.conveyor_side / 2,
//     conveyor_offset_Y: measure.roller_radius,
//     sorterRoller_offset: measure.roller_radius - measure.sorter_radius,
//     roller_offset_X: measure.roller_radius,
//     roller_offset_Z: -measure.roller_radius * 3,
// };

// var rollerInfo = {
//     texture1: new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./img/conveyorTexture4div1.png") }),
//     texture2: new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./img/conveyorTexture4div2.png") }),
//     geometry: new THREE.CylinderGeometry(measure.roller_radius, measure.roller_radius, measure.conveyor_side, 10),
//     material: new THREE.MeshBasicMaterial({ color: 0xb2b2b2 }),
// };
// var sorterInfo = {
//     geometry: new THREE.CylinderBufferGeometry(measure.sorter_radius, measure.sorter_radius, measure.roller_radius, 25),
//     material: new THREE.MeshPhongMaterial({ color: 0xffdd22 }),
// };
// var conveyorInfo = {
//     geometry: new THREE.PlaneGeometry(measure.conveyor_side, measure.conveyor_side),
//     material: new THREE.MeshBasicMaterial({ color: 0x000000 }),
// };
// var endInfo = {
//     geometry_none: new THREE.BoxBufferGeometry(measure.conveyor_side, measure.roller_radius, measure.conveyor_side),
//     geometry_up: new THREE.BoxBufferGeometry(measure.end_horizontal, measure.roller_radius, measure.conveyor_side),
//     material: new THREE.MeshLambertMaterial({ color: measure.end_color }),
// };
// var inOutInfo = {
//     geometry: new THREE.BoxBufferGeometry(measure.end_horizontal, measure.roller_radius, measure.end_horizontal),
//     material: new THREE.MeshLambertMaterial({ color: measure.end_color }),
// };
// var upenderInfo = {
//     upender_geometry: new THREE.CylinderBufferGeometry(12, 12, measure.end_horizontal, 20),
//     upender_material: new THREE.MeshLambertMaterial({ color: 0xb2b2b2 }),
//     base_geometry: new THREE.BoxBufferGeometry(measure.end_horizontal, 1, measure.end_horizontal),
//     base_material: new THREE.MeshLambertMaterial({ color: 0x000000 }),
//     head_geometry: new THREE.BoxBufferGeometry(measure.end_horizontal, 22, 250),
//     head_material: new THREE.MeshLambertMaterial({ color: measure.upender_color }),
//     body_geometry: new THREE.BoxBufferGeometry(measure.end_horizontal, measure.end_horizontal, 22),
//     body_material: new THREE.MeshLambertMaterial({ color: measure.upender_color }),
// };
// /******************************************************************************************************
//  * conveyor 객체생성
//  ******************************************************************************************************/
// var ConveyorGeometry = function (parameter) {
//     var conveyorObj = null;
//     var roller_arr = [];

//     this.draw = function () {
//         ///********************************
//         //    Conveyor
//         //********************************/
//         //Draw Conveyor
//         conveyorObj = new THREE.Mesh(conveyorInfo.geometry, conveyorInfo.meterial);
//         conveyorObj.rotation.x = -0.5 * Math.PI;
//         conveyorObj.position.set(parameter.position.x + offset.standard_offset_X, parameter.position.y + offset.conveyor_offset_Y, parameter.position.z);
//         conveyorObj.visible = true;

//         //Set Conveyor data
//         conveyorObj.name = parameter.mapId; //1-1, 1-2...
//         conveyorObj.userData = {
//             mapId: parameter.mapId,
//             conveyorId: parameter.conveyorId, //"B_R_A_001_R"..
//             kind: parameter.kind, //R , S , N ..
//             group: parameter.group, // A, B, C...
//             number: parameter.number, //001, 002, 003...
//             direction: parameter.direction, //L, R, U, D
//             stok: null, // null , stok
//             state: "working", //working, ready, stop
//         };

//         //input conveyor obj
//         conveyorArr.push(conveyorObj);
//         conveyorObj_map1[parameter.mapId.split("-")[0]][parameter.mapId.split("-")[1]] = conveyorObj;
//         warehouse.scene.add(conveyorObj);

//         ///******************************************
//         //    Sorter ( TurnTable + Roller )
//         //******************************************/
//         if (parameter.kind == "S") {
//             //Draw TurnTable
//             var sorterObj = new THREE.Mesh(sorterInfo.geometry, sorterInfo.material);

//             //Draw Roller
//             for (var i = 0; i < measure.sorter_radius / measure.roller_radius; i++) {
//                 if (i % 2 == 0) {
//                     var rollerObj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture1, rollerInfo.material, rollerInfo.material]);
//                 } else {
//                     var rollerObj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture2, rollerInfo.material, rollerInfo.material]);
//                 }

//                 //Set Roller position
//                 if (parameter.direction == "R" || parameter.direction == "L") {
//                     rollerObj.position.set(sorterObj.position.x + i * (measure.roller_radius * 2) + offset.sorterRoller_offset, sorterObj.position.y, sorterObj.position.z);
//                     rollerObj.rotation.x = 0.5 * Math.PI;
//                 } else if (parameter.direction == "D" || parameter.direction == "U") {
//                     rollerObj.position.set(sorterObj.position.x, sorterObj.position.y, sorterObj.position.z + i * (measure.roller_radius * 2) + offset.sorterRoller_offset);
//                     rollerObj.rotation.z = 0.5 * Math.PI;
//                 }

//                 //Set Roller data
//                 rollerObj.name = parameter.conveyorId;

//                 //Input Roller obj
//                 roller_arr.push(rollerObj);
//                 sorterObj.add(rollerObj);
//             }

//             //Set Sorter data
//             sorterObj.position.set(parameter.position.x + offset.standard_offset_X, parameter.position.y, parameter.position.z);
//             sorterObj.name = parameter.conveyorId;
//             sorterObj.userData = { group: parameter.group, stok: null, state: "ready" };

//             //Input Sorter obj
//             sorterArr.push(sorterObj);
//             warehouse.scene.add(sorterObj);
//         }
//         ///******************************************
//         //   None (Sorter left right up down)
//         //******************************************/
//         else if (parameter.kind == "N") {
//             //sorter left right top bottom
//         }
//         ///******************************************
//         //   End
//         //******************************************/
//         else if (parameter.kind == "E") {
//             //Draw End
//             if (parameter.direction == "N") {
//                 var end_obj = new THREE.Mesh(endInfo.geometry_none, endInfo.material);
//                 if (parameter.group == "eA") {
//                     end_obj.position.set(parameter.position.x - end_obj.geometry.parameters.width + offset.standard_offset_X, 0, parameter.position.z);
//                 } else if (parameter.group == "eD") {
//                     end_obj.position.set(parameter.position.x + end_obj.geometry.parameters.width + offset.standard_offset_X, 0, parameter.position.z);
//                 }
//             } else if (parameter.direction == "U") {
//                 var end_obj = new THREE.Mesh(endInfo.geometry_up, endInfo.material);
//                 end_obj.position.set(parameter.position.x + offset.standard_offset_X, 0, parameter.position.z);

//                 for (var i = 0; i < 4; i++) {
//                     if (i % 2 == 0) {
//                         if (i == 0 && parameter.rollerType == "E") {
//                             var rollerObj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                         } else {
//                             var rollerObj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture1, rollerInfo.material, rollerInfo.material]);
//                         }
//                     } else {
//                         if (i == 3 && parameter.rollerType == "B") {
//                             var rollerObj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                         } else {
//                             var rollerObj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture2, rollerInfo.material, rollerInfo.material]);
//                         }
//                     }

//                     rollerObj.rotation.z = 0.5 * Math.PI;
//                     rollerObj.position.set(parameter.position.x + offset.standard_offset_X, 0, parameter.position.z + i * (measure.roller_radius * 2) + offset.roller_offset_Z);

//                     //Set Roller data
//                     rollerObj.name = parameter.conveyorId;
//                     rollerObj.userData.group = parameter.group;

//                     //Input Roller obj
//                     roller_arr.push(rollerObj);
//                     rollerArr.push(rollerObj);
//                     warehouse.scene.add(rollerObj);
//                 }
//             }

//             warehouse.scene.add(end_obj);
//         }
//         ///******************************************
//         //   In(rcpt) Out(order)
//         //******************************************/
//         else if (parameter.kind == "I" || parameter.kind == "O") {
//             //Draw In Out
//             var io_obj = new THREE.Mesh(inOutInfo.geometry, inOutInfo.material);

//             if (parameter.kind == "I") {
//                 io_obj.position.set(parameter.position.x + io_obj.geometry.parameters.width / 2 + offset.standard_offset_X, 0, parameter.position.z);
//                 io_obj.userData.group = parameter.group;
//                 inArr.push(io_obj);

//                 conveyorObj.position.set(parameter.position.x + io_obj.geometry.parameters.width / 2 + offset.standard_offset_X, 0 + measure.roller_radius, parameter.position.z);
//             } else if (parameter.kind == "O") {
//                 io_obj.position.set(parameter.position.x - io_obj.geometry.parameters.width / 2 + offset.standard_offset_X, 0, parameter.position.z);
//                 io_obj.userData.group = parameter.group;
//                 outArr.push(io_obj);

//                 conveyorObj.position.set(parameter.position.x - io_obj.geometry.parameters.width / 2 + offset.standard_offset_X, 0 + measure.roller_radius, parameter.position.z);
//             }

//             //In Out roller
//             for (var i = 0; i < 8; i++) {
//                 if (i % 2 == 0) {
//                     if (i == 0) {
//                         var roller_obj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                     } else {
//                         var roller_obj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture1, rollerInfo.material, rollerInfo.material]);
//                     }
//                 } else {
//                     if (i == 7) {
//                         var roller_obj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                     } else {
//                         var roller_obj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture2, rollerInfo.material, rollerInfo.material]);
//                     }
//                 }
//                 roller_obj.rotation.x = 0.5 * Math.PI;
//                 roller_obj.position.set(i * (measure.roller_radius * 2) - io_obj.geometry.parameters.width / 2 + measure.roller_radius, 0, 0);
//                 roller_obj.name = parameter.conveyorId;
//                 roller_obj.userData.group = parameter.group;

//                 //Input Roller obj
//                 roller_arr.push(roller_obj);
//                 rollerArr.push(roller_obj);
//                 io_obj.add(roller_obj);
//             }
//             warehouse.scene.add(io_obj);
//         }
//         ///******************************************
//         //   Upender
//         //******************************************/
//         else if (parameter.kind == "U") {
//             //Draw Upender
//             if (parameter.number == "003") {
//                 //upender (head + body)
//                 var upender_obj = new THREE.Mesh(upenderInfo.upender_geometry, upenderInfo.upender_material);

//                 //upender - head
//                 var upender_head = new THREE.Mesh(upenderInfo.head_geometry, upenderInfo.head_material);
//                 upender_obj.add(upender_head);

//                 upender_head.rotation.z = -0.5 * Math.PI;
//                 upender_head.position.set(-upender_head.geometry.parameters.height / 2 + endInfo.geometry_up.parameters.height / 2, 0, upender_head.geometry.parameters.depth / 2);
//                 upender_head.name = "upender_head";

//                 //upender - head roller
//                 for (var i = 0; i < 9; i++) {
//                     if (i % 2 == 0) {
//                         if (i == 0 || i == 8) {
//                             var headRoller_obj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                         } else {
//                             var headRoller_obj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture1, rollerInfo.material, rollerInfo.material]);
//                         }
//                     } else {
//                         var headRoller_obj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture2, rollerInfo.material, rollerInfo.material]);
//                     }
//                     headRoller_obj.rotation.z = 0.5 * Math.PI;
//                     headRoller_obj.position.set(0, upender_head.geometry.parameters.height / 2 - endInfo.geometry_up.parameters.height / 2, i * (measure.roller_radius * 2) - upender_head.geometry.parameters.depth / 2 + measure.roller_radius * 3);
//                     headRoller_obj.name = parameter.conveyorId;
//                     headRoller_obj.userData.group = parameter.group;

//                     //Input Roller obj
//                     roller_arr.push(headRoller_obj);
//                     rollerArr.push(headRoller_obj);
//                     upender_head.add(headRoller_obj);
//                 }

//                 //upender - body
//                 var upender_body = new THREE.Mesh(upenderInfo.body_geometry, upenderInfo.body_material);
//                 upender_obj.add(upender_body);

//                 upender_body.rotation.z = 1 * Math.PI;
//                 upender_body.position.set(upender_body.geometry.parameters.height / 2, 0, -upender_body.geometry.parameters.depth / 2 + endInfo.geometry_up.parameters.height / 2);
//                 upender_body.name = "upender_body";

//                 //upender - body roller
//                 for (var i = 0; i < 8; i++) {
//                     if (i % 2 == 0) {
//                         if (i == 0) var bodyRoller_obj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                         else var bodyRoller_obj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture1, rollerInfo.material, rollerInfo.material]);
//                     } else {
//                         if (i == 7) var bodyRoller_obj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                         else var bodyRoller_obj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture2, rollerInfo.material, rollerInfo.material]);
//                     }
//                     bodyRoller_obj.rotation.z = 0.5 * Math.PI;
//                     bodyRoller_obj.position.set(0, i * (measure.roller_radius * 2) - upender_body.geometry.parameters.height / 2 + measure.roller_radius, +upender_body.geometry.parameters.depth / 2 - endInfo.geometry_up.parameters.height / 2);
//                     bodyRoller_obj.name = parameter.conveyorId;
//                     bodyRoller_obj.userData.group = parameter.group;

//                     //Input Roller obj
//                     roller_arr.push(bodyRoller_obj);
//                     rollerArr.push(bodyRoller_obj);
//                     upender_body.add(bodyRoller_obj);
//                 }

//                 //set upender data
//                 upender_obj.position.set(parameter.position.x + offset.standard_offset_X, 0, parameter.position.z);
//                 upender_obj.rotation.z = 0.5 * Math.PI;
//                 upender_obj.userData = { group: parameter.group, stok: null, state: "ready" };

//                 conveyorObj.position.set(upender_obj.position.x, upender_obj.position.y + measure.roller_radius, upender_obj.position.z + offset.standard_offset_X + measure.roller_radius);

//                 upenderArr.push(upender_obj);
//                 warehouse.scene.add(upender_obj);
//             } else {
//                 var upender_base_obj = new THREE.Mesh(upenderInfo.base_geometry, upenderInfo.base_material);
//                 upender_base_obj.position.set(parameter.position.x + offset.standard_offset_X, 0, parameter.position.z);
//                 warehouse.scene.add(upender_base_obj);
//             }
//         }
//         ///******************************************
//         //   Roller
//         //******************************************/
//         else if (parameter.kind == "R") {
//             //Roller
//             //Draw Roller
//             for (var i = 0; i < 4; i++) {
//                 if (i % 2 == 0) {
//                     if (i == 0 && ((parameter.rollerType == "B" && parameter.direction == "R") || (parameter.rollerType == "E" && parameter.direction == "L") || (parameter.rollerType == "B" && parameter.direction == "D") || (parameter.rollerType == "E" && parameter.direction == "U"))) {
//                         var rollerObj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                     } else {
//                         var rollerObj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture1, rollerInfo.material, rollerInfo.material]);
//                     }
//                 } else {
//                     if (i == 3 && ((parameter.rollerType == "B" && parameter.direction == "L") || (parameter.rollerType == "E" && parameter.direction == "R") || (parameter.rollerType == "B" && parameter.direction == "U") || (parameter.rollerType == "E" && parameter.direction == "D"))) {
//                         var rollerObj = new THREE.Mesh(rollerInfo.geometry, rollerInfo.material);
//                     } else {
//                         var rollerObj = new THREE.Mesh(rollerInfo.geometry, [rollerInfo.texture2, rollerInfo.material, rollerInfo.material]);
//                     }
//                 }

//                 //Set Roller position
//                 if (parameter.direction == "R" || parameter.direction == "L") {
//                     rollerObj.position.set(parameter.position.x + i * (measure.roller_radius * 2) + offset.roller_offset_X, 0, parameter.position.z);
//                     rollerObj.rotation.x = 0.5 * Math.PI;
//                 } else if (parameter.direction == "D" || parameter.direction == "U") {
//                     rollerObj.position.set(parameter.position.x + offset.standard_offset_X, 0, parameter.position.z + i * (measure.roller_radius * 2) + offset.roller_offset_Z);
//                     rollerObj.rotation.z = 0.5 * Math.PI;
//                 }

//                 //Set Roller data
//                 rollerObj.name = parameter.conveyorId;
//                 rollerObj.userData.group = parameter.group;

//                 //Input Roller obj
//                 roller_arr.push(rollerObj);
//                 rollerArr.push(rollerObj);
//                 warehouse.scene.add(rollerObj);
//             }
//         }
//     };

//     this.run = function () {
//         for (var i = 0; i < roller_arr.length; i++) {
//             if (conveyorObj.userData.state == "working") {
//                 switch (parameter.direction) {
//                     case "R":
//                         roller_arr[i].rotation.y -= warehouse.speed * 0.2;
//                         break;
//                     case "L":
//                         roller_arr[i].rotation.y += warehouse.speed * 0.2;
//                         break;
//                     case "D":
//                         roller_arr[i].rotation.x += warehouse.speed * 0.2;
//                         break;
//                     case "U":
//                         roller_arr[i].rotation.x -= warehouse.speed * 0.2;
//                         break;
//                 }
//             }
//         }
//         requestAnimationFrame(this.run.bind(this));
//     };
// };

// var conveyor = (function () {
//     //컨베이어 node 생성
//     var setConveyorNode = function (map) {
//         var calCnt = 1;

//         for (var row = 0; row < map.length; row++) {
//             for (var col = 0; col < map[row].length; col++) {
//                 if (typeof map[row][col] == "object") {
//                     var nxtConveyor = [];
//                     var currentConveyor = map[row][col];
//                     if (currentConveyor.userData.kind == "R" || currentConveyor.userData.kind == "N" || currentConveyor.userData.kind == "U" || currentConveyor.userData.kind == "I" || currentConveyor.userData.kind == "O") {
//                         if (currentConveyor.userData.direction == "R") {
//                             nxtConveyor.push(map[row][col + calCnt]);
//                         } else if (currentConveyor.userData.direction == "L") {
//                             nxtConveyor.push(map[row][col - calCnt]);
//                         } else if (currentConveyor.userData.direction == "D") {
//                             nxtConveyor.push(map[row + calCnt][col]);
//                         } else if (currentConveyor.userData.direction == "U") {
//                             nxtConveyor.push(map[row - calCnt][col]);
//                         }
//                     } else if (currentConveyor.userData.kind == "S" || currentConveyor.userData.kind == "E") {
//                         if (col - calCnt >= 0) {
//                             if (typeof map[row][col - calCnt] == "object") {
//                                 if (map[row][col - calCnt].userData.direction == "L") {
//                                     nxtConveyor.push(map[row][col - calCnt]);
//                                 }
//                             }
//                         }
//                         if (map[row].length > col + calCnt) {
//                             if (typeof map[row][col + calCnt] == "object") {
//                                 if (map[row][col + calCnt].userData.direction == "R") {
//                                     nxtConveyor.push(map[row][col + calCnt]);
//                                 }
//                             }
//                         }
//                         if (row - calCnt >= 0) {
//                             if (map[row - calCnt].length > col) {
//                                 if (typeof map[row - calCnt][col] == "object") {
//                                     if (map[row - calCnt][col].userData.direction == "U") {
//                                         nxtConveyor.push(map[row - calCnt][col]);
//                                     }
//                                 }
//                             }
//                         }
//                         if (map.length > row + calCnt) {
//                             if (map[row + calCnt].length > col) {
//                                 if (map[row + calCnt][col] == "object") {
//                                     if (map[row + calCnt][col].userData.direction == "D") {
//                                         nxtConveyor.push(map[row + calCnt][col]);
//                                     }
//                                 }
//                             }
//                         }
//                     }

//                     if (nxtConveyor.length == 0 || nxtConveyor[0] == null) {
//                         nxtConveyor = null;
//                     }
//                     currentConveyor.userData.nxtConveyor = nxtConveyor;
//                 }
//             }
//         }
//     };

//     //Conveyor 생성
//     var drawConveyorMap = function (map, startPosX, startPosZ) {
//         var positionX = startPosX;
//         var positionZ = startPosZ;

//         for (var i = 0; i < map.length; i++) {
//             for (var j = 0; j < map[i].length; j++) {
//                 if (map[i][j].trim() != "") {
//                     var conveyor = map[i][j].split("_");
//                     var conveyor_geometry = new ConveyorGeometry({
//                         mapId: i + "-" + j,
//                         conveyorId: map[i][j].trim(),
//                         rollerType: conveyor[0],
//                         kind: conveyor[1],
//                         group: conveyor[2],
//                         number: conveyor[3],
//                         direction: conveyor[4],
//                         position: { x: positionX, y: 0, z: positionZ },
//                     });
//                     conveyor_geometry.draw();
//                     conveyor_geometry.run();
//                 }
//                 positionX = positionX + measure.conveyor_side;
//             }
//             positionX = startPosX;
//             positionZ = positionZ + measure.conveyor_side;
//         }

//         setConveyorNode(conveyorObj_map1);
//         conveyor_map1 = null;
//     };

//     //move nxtConveyor
//     var moveConveyor = function (curConveyor, stok) {
//         var speed = warehouse.speed * 5;
//         var nxtConveyor = getNextConveyor(curConveyor, stok);
//         var distanceX = nxtConveyor.position.x - stok.position.x;
//         var distanceZ = nxtConveyor.position.z - stok.position.z;

//         if (nxtConveyor != null || nxtConveyor != undefined) {
//             ///******************************************
//             //   Sorter, None
//             //******************************************/
//             if (nxtConveyor.userData.kind == "S" || nxtConveyor.userData.kind == "N") {
//                 var curSorter;
//                 for (var i = 0; i < sorterArr.length; i++) {
//                     if (sorterArr[i].userData.group == nxtConveyor.userData.group) {
//                         curSorter = sorterArr[i];
//                     }
//                 }

//                 //sorter 체크
//                 if ((curSorter.userData.stok == null || curSorter.userData.stok == stok) && curSorter.userData.state == "ready" && nxtConveyor.userData.state == "working" && nxtConveyor.userData.stok == null) {
//                     //이동
//                     if (distanceX != 0 || distanceZ != 0) {
//                         if (Math.abs(distanceX) > speed) stok.position.x = stok.position.x + speed * Math.sign(distanceX);
//                         else stok.position.x = nxtConveyor.position.x;

//                         if (Math.abs(distanceZ) > speed) stok.position.z = stok.position.z + speed * Math.sign(distanceZ);
//                         else stok.position.z = nxtConveyor.position.z;

//                         requestAnimationFrame(function () {
//                             moveConveyor(curConveyor, stok);
//                         });
//                     } else {
//                         //도착
//                         curConveyor.userData.stok = null;
//                         nxtConveyor.userData.stok = stok;

//                         if (curSorter.userData.stok == null) {
//                             curSorter.userData.stok = stok;
//                         }

//                         //도착한 conveyor가 sorter일때
//                         var afterNextConveyor = getNextConveyor(nxtConveyor, stok);
//                         if (nxtConveyor.userData.kind == "S") {
//                             controlSorter(nxtConveyor, afterNextConveyor, curSorter, stok, function () {
//                                 moveConveyor(nxtConveyor, stok);
//                             });
//                         } else {
//                             moveConveyor(nxtConveyor, stok);
//                         }
//                     }
//                 } else {
//                     requestAnimationFrame(function () {
//                         moveConveyor(curConveyor, stok);
//                     });
//                 }
//             }
//             ///******************************************
//             //   Roller , End
//             //******************************************/
//             else if (nxtConveyor.userData.kind == "R" || nxtConveyor.userData.kind == "E") {
//                 if (nxtConveyor.userData.stok == null && curConveyor.userData.state == "working" && nxtConveyor.userData.state == "working") {
//                     //이동
//                     if (distanceX != 0 || distanceZ != 0) {
//                         if (Math.abs(distanceX) > speed) stok.position.x = stok.position.x + speed * Math.sign(distanceX);
//                         else stok.position.x = nxtConveyor.position.x;

//                         if (Math.abs(distanceZ) > speed) stok.position.z = stok.position.z + speed * Math.sign(distanceZ);
//                         else stok.position.z = nxtConveyor.position.z;

//                         requestAnimationFrame(function () {
//                             moveConveyor(curConveyor, stok);
//                         });
//                     } else {
//                         //도착
//                         curConveyor.userData.stok = null;
//                         nxtConveyor.userData.stok = stok;

//                         if (curConveyor.userData.kind == "N") {
//                             var curSorter;
//                             for (var i = 0; i < sorterArr.length; i++) {
//                                 if (sorterArr[i].userData.group == curConveyor.userData.group) {
//                                     curSorter = sorterArr[i];
//                                 }
//                             }
//                             if (curSorter.rotation.y != 0) {
//                                 var degree = (curSorter.rotation.y * 180) / Math.PI;
//                                 turnSorter(curSorter, degree * -1);
//                             }
//                             curSorter.userData.stok = null;
//                         }

//                         // if (nxtConveyor.userData.kind == "E") {
//                         //nxtConveyor.userData.stok = false;

//                         //End에 도착했을때,
//                         //큐등록작업 ㄱㄱㄱ해줘야됌 .
//                         //warehouse.scene.remove(stok);
//                         // } else {
//                         moveConveyor(nxtConveyor, stok);
//                         // }
//                     }
//                 } else {
//                     requestAnimationFrame(function () {
//                         moveConveyor(curConveyor, stok);
//                     });
//                 }
//             }
//             ///******************************************
//             //   Upender
//             //******************************************/
//             else if (nxtConveyor.userData.kind == "U") {
//                 var curUpender;
//                 for (var i = 0; i < upenderArr.length; i++) {
//                     if (upenderArr[i].userData.group == nxtConveyor.userData.group) {
//                         curUpender = upenderArr[i];
//                     }
//                 }

//                 if ((curUpender.userData.stok == null || curUpender.userData.stok == stok) && curUpender.userData.state == "ready") {
//                     if (curConveyor.userData.state != "working") onConveyor(curConveyor.userData.group);
//                     if (nxtConveyor.userData.state != "working") onConveyor(nxtConveyor.userData.group);

//                     //이동
//                     if (distanceX != 0 || distanceZ != 0) {
//                         if (Math.abs(distanceX) > speed) stok.position.x = stok.position.x + speed * Math.sign(distanceX);
//                         else stok.position.x = nxtConveyor.position.x;

//                         if (Math.abs(distanceZ) > speed) stok.position.z = stok.position.z + speed * Math.sign(distanceZ);
//                         else stok.position.z = nxtConveyor.position.z;

//                         requestAnimationFrame(function () {
//                             moveConveyor(curConveyor, stok);
//                         });
//                     } else {
//                         //도착
//                         curConveyor.userData.stok = null;
//                         nxtConveyor.userData.stok = stok;

//                         if (curUpender.userData.stok == null) {
//                             curUpender.userData.stok = stok;
//                         }

//                         //도착한 upender의 number가 003일때
//                         if (nxtConveyor.userData.number == "003") {
//                             turnUpender(curUpender, -90, stok, function () {
//                                 moveConveyor(nxtConveyor, stok);
//                             });
//                         } else {
//                             moveConveyor(nxtConveyor, stok);
//                         }
//                     }
//                 } else {
//                     offConveyor(curConveyor.userData.group);
//                     requestAnimationFrame(function () {
//                         moveConveyor(curConveyor, stok);
//                     });
//                 }
//             }
//             ///******************************************
//             //   In
//             //******************************************/
//             else if (nxtConveyor.userData.kind == "I") {
//                 if (nxtConveyor.userData.stok == null) {
//                     if (curConveyor.userData.state != "working") onConveyor(curConveyor.userData.group);
//                     if (nxtConveyor.userData.state != "working") onConveyor(nxtConveyor.userData.group);

//                     //이동
//                     if (distanceX != 0 || distanceZ != 0) {
//                         if (Math.abs(distanceX) > speed) stok.position.x = stok.position.x + speed * Math.sign(distanceX);
//                         else stok.position.x = nxtConveyor.position.x;

//                         if (Math.abs(distanceZ) > speed) stok.position.z = stok.position.z + speed * Math.sign(distanceZ);
//                         else stok.position.z = nxtConveyor.position.z;

//                         requestAnimationFrame(function () {
//                             moveConveyor(curConveyor, stok);
//                         });
//                     } else {
//                         //도착
//                         curConveyor.userData.stok = null;
//                         nxtConveyor.userData.stok = stok;
//                         offConveyor(nxtConveyor.userData.group);

//                         var work_obj = {
//                             conveyor: nxtConveyor,
//                             stok: stok,
//                         };

//                         //입고등록
//                         if (nxtConveyor.userData.group == "iA") {
//                             crane_arr[1].userData.workQueue.push(work_obj);
//                         } else if (nxtConveyor.userData.group == "iB") {
//                             crane_arr[0].userData.workQueue.push(work_obj);
//                         }

//                         var curUpender;
//                         for (var i = 0; i < upenderArr.length; i++) {
//                             if (curConveyor.userData.group == upenderArr[i].userData.group) {
//                                 curUpender = upenderArr[i];
//                             }
//                         }
//                         curUpender.userData.stok = null;

//                         if (curUpender.rotation.x != 0) {
//                             var degree = (curUpender.rotation.x * 180) / Math.PI;
//                             turnUpender(curUpender, degree * -1, null);
//                         }
//                     }
//                 } else {
//                     offConveyor(curConveyor.userData.group);
//                     requestAnimationFrame(function () {
//                         moveConveyor(curConveyor, stok);
//                     });
//                 }
//             }
//         }
//     };

//     function controlSorter(nxtConveyor, afterNxtConveyor, sorter, stok, callback) {
//         //top
//         if (Number(nxtConveyor.userData.mapId.split("-")[0]) - 1 == afterNxtConveyor.userData.mapId.split("-")[0]) {
//             if (nxtConveyor == conveyorObj_map1[15][69]) {
//                 turnSorter(sorter, 90, stok, callback);
//             } else if (nxtConveyor == conveyorObj_map1[8][25] || nxtConveyor == conveyorObj_map1[8][50]) {
//                 turnSorter(sorter, -90, stok, callback);
//             }
//         }
//         //left
//         else if (Number(nxtConveyor.userData.mapId.split("-")[1]) - 1 == afterNxtConveyor.userData.mapId.split("-")[1]) {
//             if (nxtConveyor == conveyorObj_map1[8][69]) {
//                 turnSorter(sorter, 90, stok, callback);
//             } else if (nxtConveyor == conveyorObj_map1[8][25] || nxtConveyor == conveyorObj_map1[8][50]) {
//                 callback();
//             }
//         }
//         //right
//         else if (Number(nxtConveyor.userData.mapId.split("-")[1]) + 1 == afterNxtConveyor.userData.mapId.split("-")[1]) {
//             if (nxtConveyor == conveyorObj_map1[15][69]) {
//                 callback();
//             }
//         }
//     }

//     //Sorter 회전
//     var turnSorter = function (sorter, degree, stok, callback) {
//         sorter.userData.state = "working";
//         offConveyor(sorter.userData.group);

//         var speed = warehouse.speed * (Math.PI / 180) * 1;
//         var beforeRadian = (Math.PI / 180) * degree;
//         var afterRadian = beforeRadian - Math.sign(beforeRadian) * speed;
//         sorter.rotation.y = sorter.rotation.y + Math.sign(beforeRadian) * speed;

//         if (stok != undefined || stok != null) {
//             stok.rotation.y = stok.rotation.y + Math.sign(beforeRadian) * speed;
//         }

//         if (Math.sign(beforeRadian) != 0 && Math.sign(beforeRadian) == Math.sign(afterRadian) && Math.abs(afterRadian) > 0.00000000000001) {
//             //이동
//             degree = (afterRadian * 180) / Math.PI;

//             requestAnimationFrame(function () {
//                 turnSorter(sorter, degree, stok, callback);
//             });
//         } else {
//             //소수점 자리수 오차 보정
//             if (Math.abs(sorter.rotation.y) > 0 && Math.abs(sorter.rotation.y) < 0.00000000000001) {
//                 sorter.rotation.y = 0;
//             } else if (Math.abs(sorter.rotation.y) > 1.57 && Math.abs(sorter.rotation.y) < 1.570796) {
//                 sorter.rotation.y = Math.sign(sorter.rotation.y) * 1.5707963267948967;
//             }
//             //중지
//             sorter.userData.state = "ready";
//             onConveyor(sorter.userData.group);
//             if (callback != undefined) {
//                 callback();
//             }
//         }
//     };

//     //conveyor Off
//     var offConveyor = function (group) {
//         for (var i = 0; i < conveyorArr.length; i++) {
//             if (conveyorArr[i].userData.group == group) {
//                 conveyorArr[i].userData.state = "ready";
//             }
//         }
//     };

//     //conveyor on
//     var onConveyor = function (group) {
//         for (var i = 0; i < conveyorArr.length; i++) {
//             if (conveyorArr[i].userData.group == group) {
//                 conveyorArr[i].userData.state = "working";
//             }
//         }
//     };

//     function getNextConveyor(curConveyor, stok) {
//         var nxtConveyorArr = curConveyor.userData.nxtConveyor;
//         var nxtConveyor;
//         var rcmd_destination = stok.userData.destination;

//         if (nxtConveyorArr != null) {
//             if (nxtConveyorArr.length == 1 && nxtConveyorArr[0] != null) {
//                 nxtConveyor = nxtConveyorArr[0];
//             } else {
//                 if (curConveyor == conveyorObj_map1[15][69]) {
//                     if (rcmd_destination == inArr[0] || rcmd_destination == inArr[1]) {
//                         nxtConveyor = conveyorObj_map1[15 - 1][69];
//                     } else {
//                         nxtConveyor = conveyorObj_map1[15][69 + 1];
//                     }
//                 } else if (curConveyor == conveyorObj_map1[8][50]) {
//                     if (rcmd_destination == inArr[0]) {
//                         nxtConveyor = conveyorObj_map1[8][50 - 1];
//                     } else if (rcmd_destination == inArr[1]) {
//                         nxtConveyor = conveyorObj_map1[8 - 1][50];
//                     }
//                 } else if (curConveyor == conveyorObj_map1[8][25]) {
//                     if (rcmd_destination == inArr[0]) {
//                         nxtConveyor = conveyorObj_map1[8 - 1][25];
//                     } else {
//                         nxtConveyor = conveyorObj_map1[8][25 - 1];
//                     }
//                 }
//             }
//         } else {
//             nxtConveyor = null;
//         }
//         return nxtConveyor;
//     }
//     var turnUpender = function (upender, degree, stok, callback) {
//         upender.userData.state = "working";
//         offConveyor(upender.userData.group);

//         var speed = warehouse.speed * (Math.PI / 180) * 1;
//         var beforeRadian = (Math.PI / 180) * degree;
//         var afterRadian = beforeRadian - Math.sign(beforeRadian) * speed;
//         upender.rotation.x = upender.rotation.x + Math.sign(beforeRadian) * speed;

//         if (stok != null || stok != undefined) {
//             upender.attach(stok);
//         }
//         if (Math.sign(beforeRadian) != 0 && Math.sign(beforeRadian) == Math.sign(afterRadian) && Math.abs(afterRadian) > 0.00000000000001) {
//             //이동
//             degree = (afterRadian * 180) / Math.PI;

//             requestAnimationFrame(function () {
//                 turnUpender(upender, degree, stok, callback);
//             });
//         } else {
//             //소수점 자리수 오차 보정  degree = 0
//             if (Math.abs(upender.rotation.x) > 0 && Math.abs(upender.rotation.x) < 0.1) {
//                 upender.rotation.x = 0;
//             }
//             //소수점 자리수 오차 보정  degree = -90
//             else if (Math.abs(upender.rotation.x) > 1.57 && Math.abs(upender.rotation.x) < 1.570797) {
//                 upender.rotation.x = Math.sign(upender.rotation.x) * 1.5707963267948967;
//                 if (stok != null || stok != undefined) {
//                     stok.rotation.z = 0;
//                     stok.rotation.y = 0;
//                     warehouse.scene.attach(stok);
//                     //warehouse.scene.attach로 생기는 rotation 오차 보정
//                     stok.rotation.x = 0;
//                 }
//             }
//             upender.userData.state = "ready";
//             onConveyor(upender.userData.group);

//             if (callback != undefined) {
//                 callback();
//             }
//         }
//     };

//     return {
//         drawConveyorMap: drawConveyorMap,
//         moveConveyor: moveConveyor,
//         turnSorter: turnSorter,
//         offConveyor: offConveyor,
//         onConveyor: onConveyor,
//         turnUpender: turnUpender,
//     };
// })();
