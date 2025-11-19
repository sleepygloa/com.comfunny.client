/******************************************************************************************************
 * loc 전역변수
 ******************************************************************************************************/
var locStokArr = [];
var locWireArr = [];
/******************************************************************************************************
 * loc 객체생성
 ******************************************************************************************************/
var LocGeometry = function (locData, zoneData) {
  var locWire_data = {
    width: 200,
    height: 1080,
    depth: 200,
    padding: 18.91891891,
    color: 0x9e9e9e,
    texture: "none",
  };
  // Draw할 Position 계산 (y계산 xz고정)
  function calLocPositionY(y) {
    var locNum = locData.loc.slice(-2) - 1;
    var zonePosition = zoneData.position;
    var zoneMeasureObj = {
      width: zoneData.width,
      depth: zoneData.depth,
    };

    var zoneCorner = etc.convertPosToCorner(zoneMeasureObj, zonePosition);

    var drawPosition = {
      x: zoneCorner.x + locNum * (locWire_data.width + locWire_data.padding) + locWire_data.width / 2,
      y: y / 2,
      z: zoneCorner.z + locWire_data.depth / 2,
    };
    return drawPosition;
  }
  //Loc에 stok 생성
  this.drawLocStok = function () {
    var rollType = locData.rollType;
    var stokQty = locData.stokQty;

    var rollHeight = etc.getRollTypeInfo(rollType).height;

    var drawPosition = calLocPositionY(rollHeight);

    var cylinder;
    for (var i = 1; i < stokQty; i++) {
      cylinder = etc.createCylinder(rollType, drawPosition);

      cylinder.name = "loc" + locData.loc;
      cylinder.userData.rollType = rollType;
      locStokArr.push(cylinder);

      drawPosition.y += rollHeight;
    }
  };
  // Loc에 Wire 생성
  this.drawLocWire = function () {
    var drawPosition = calLocPositionY(locWire_data.height);
    var wire = etc.createWireLack(locWire_data, drawPosition);
    locWireArr.push(wire);
  };
};
