var gui = (function () {
    function updateLight() {
        // helper1.update();
        // helper2.update();
        // helper3.update();
        // helper4.update();
    }
    function makeXYZGUI(gui, vector3, name, onChangeFn) {
        // var folder = gui.addFolder(name);
        // folder.add(vector3, "x", -10000, 10000).onChange(onChangeFn);
        // folder.add(vector3, "y", -10000, 10000).onChange(onChangeFn);
        // folder.add(vector3, "z", -10000, 10000).onChange(onChangeFn);
        // folder.open();
    }
    function createGui() {
        // var gui = new dat.GUI();
        // gui.add(warehouse.light1, "intensity", 0, 2, 0.01);
        // gui.add(warehouse.light2, "intensity", 0, 2, 0.01);
        // gui.add(warehouse.light3, "intensity", 0, 2, 0.01);
        // gui.add(warehouse.light4, "intensity", 0, 2, 0.01);
        // gui.add(warehouse.light1, "distance", 0, 40).onChange(updateLight);
        // gui.add(warehouse.light2, "distance", 0, 40).onChange(updateLight);
        // gui.add(warehouse.light3, "distance", 0, 40).onChange(updateLight);
        // gui.add(warehouse.light4, "distance", 0, 40).onChange(updateLight);
        // makeXYZGUI(gui, warehouse.light1.position, "position1");
        // makeXYZGUI(gui, warehouse.light2.position, "position2");
        // makeXYZGUI(gui, warehouse.light3.position, "position3");
        // makeXYZGUI(gui, warehouse.light4.position, "position4");
    }
    return {
        createGui: createGui,
    };
})();
