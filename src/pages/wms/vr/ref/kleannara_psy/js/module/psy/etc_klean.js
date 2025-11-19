var etc = (function () {
    //Roll 정보
    function getRollTypeInfo(handlingSize) {
        var radius, height;

        switch (handlingSize) {
            case "0.76t":
                radius = 150 / 2;
                height = 54.5;
                break;
            case "1.53t":
                radius = 210 / 2;
                height = 54.5;
                break;
            case "1.24t":
                radius = 150 / 2;
                height = 88.9;
                break;
            case "2.49t":
                radius = 210 / 2;
                height = 88.9;
                break;
            case "2.38t":
                radius = 150 / 2;
                height = 170;
                break;
            case "4.76t":
                radius = 210 / 2;
                height = 170;
                break;
            case "2.66t":
                radius = 150 / 2;
                height = 190;
                break;
            case "5.32t":
                radius = 210 / 2;
                height = 190;
                break;
        }
        return {
            radius: radius,
            height: height,
        };
    }

    function convertPosToCorner(mesureObj, positionObj) {
        var width = mesureObj.width;
        var height = mesureObj.hegith;
        var depth = mesureObj.depth;

        var cornerX, cornerY, cornerZ;
        if (typeof width === "number") cornerX = positionObj.x - width / 2;
        else cornerX = null;
        if (typeof height === "number") cornerY = positionObj.y - height / 2;
        else cornerY = null;
        if (typeof depth === "number") cornerZ = positionObj.z - depth / 2;
        else cornerZ = null;

        return {
            x: cornerX,
            y: cornerY,
            z: cornerZ,
        };
    }

    function createWireLack(measureObj, positionObj = { x: 0, y: 0, z: 0 }) {
        var width = measureObj.width;
        var height = measureObj.height;
        var depth = measureObj.depth;
        var color = measureObj.color;
        var positionX = positionObj.x;
        var positionY = positionObj.y;
        var positionZ = positionObj.z;

        var boxGeometry = new THREE.BoxBufferGeometry(width, height, depth);
        var edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        var wireMeterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa, linewidth: 10 });
        var wireframe = new THREE.LineSegments(edgesGeometry, wireMeterial);
        wireframe.position.set(positionX, positionY, positionZ);

        warehouse.scene.add(wireframe);
        return wireframe;
    }

    function createCylinder(handlingSize, positionObj = { x: 0, y: 0, z: 0 }) {
        //texture 생성
        var loader = new THREE.TextureLoader();
        var textureTop = loader.load("./img/tb.png");
        textureTop.magFilter = THREE.LinearMipmapLinearFilter;
        var textureSide = loader.load("./img/side2.png");
        textureSide.magFilter = THREE.LinearMipmapLinearFilter;
        var textureBottom = loader.load("./img/50.png");
        textureBottom.magFilter = THREE.LinearMipmapLinearFilter;
        var material_top = new THREE.MeshBasicMaterial({ map: textureTop });
        var material_side = new THREE.MeshBasicMaterial({ map: textureSide });
        var material_bottom = new THREE.MeshBasicMaterial({ map: textureBottom });

        //Cylinder 생성
        var rollTypeInfo = getRollTypeInfo(handlingSize);
        var radius = rollTypeInfo.radius;
        var height = rollTypeInfo.height;
        var radialSegments = 15;

        var cylinderGeometry = new THREE.CylinderBufferGeometry(radius, radius, height, radialSegments);
        //var cylinderMesh = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        //var cylinderObject = new THREE.Mesh(cylinderGeometry, cylinderMesh);
        var cylinderObject = new THREE.Mesh(cylinderGeometry, [material_side, material_top, material_bottom]);

        cylinderObject.position.set(positionObj.x, positionObj.y, positionObj.z);

        warehouse.scene.add(cylinderObject);
        return cylinderObject;
    }

    function createBox(width, height, depth, Px, Py, Pz, color) {
        if (color != undefined || color != null) {
            color = color;
        } else {
            color = 0x0f00f0;
        }
        var boxGeometry = new THREE.BoxBufferGeometry(width, height, depth);
        var boxMesh = new THREE.MeshLambertMaterial({
            color: color,
        });
        var boxObject = new THREE.Mesh(boxGeometry, boxMesh);
        boxObject.position.set(Px, Py + height / 2, Pz);
        boxObject.type = "box";

        warehouse.scene.add(boxObject);
        return boxObject;
    }

    function popupInfo(event, intersect) {
        console.log(event);
        console.log(intersect);
        var popupInfo = document.querySelector(".popup-info");
        popupInfo.style.display = "block";
    }

    var signal;
    function setReceiveSignal(signals) {
        if (signals) {
            signal = signals;
        }
    }

    function getSignalConveyor() {
        for (var i = 0; i < sorter_arr.length; i++) {
            if (sorter_arr[i].sorterId == signal) {
                return sorter_arr[i];
            }
        }
    }

    return {
        getRollTypeInfo: getRollTypeInfo,
        convertPosToCorner: convertPosToCorner,
        createBox: createBox,
        popupInfo: popupInfo,
        setReceiveSignal: setReceiveSignal,
        getSignalConveyor: getSignalConveyor,
        createCylinder: createCylinder,
        createWireLack: createWireLack,
    };
})();

var StokGeometry = function (handlingSize) {
    var stok = etc.createCylinder(handlingSize);
    stok.position.set(0, 100, 2800);
};
