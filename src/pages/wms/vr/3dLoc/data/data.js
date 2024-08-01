//매트릭스 데이터 생성
function createMatrixData(minX, maxX, minY, maxY) {
    const rows = maxY - minY + 1;
    const cols = maxX - minX + 1;

    let matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

    return createMatrixArrToData(matrix);
}
//매트릭스 데이터의 배열 생성
function createMatrixArrData(minX, maxX, minY, maxY) {
    const rows = maxY - minY + 1;
    const cols = maxX - minX + 1;

    return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}
//매트릭스 배열을 매트릭스 데이터로 변환
function createMatrixArrToData(matrix) {
    return matrix.map(row => row.join('')).join('\n');
}

//매트릭스 데이터를 매트릭스 배열로 변환
function createMatrixDataToArr(matrixData) {
    return matrixData.trim().split('\n').map(row => row.split(''));
}

//매트릭스 데이터로 Geometry 생성
function createGeometryOfMatrixData(geometry, rows, cols){
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) { // every 3rd index is a z-coordinate in a flat array of x, y, z
        const x = vertices[i];   // x-coordinate
        const y = vertices[i+1]; // y-coordinate
        const row = Math.floor(y);
        const col = Math.floor(x);
        if (row < rows && col < cols) {
            //  vertices[i+2] = matrix[row][col]; // Set z based on matrix value
            vertices[i+2] = 0
        }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals(); // To ensure lighting calculations reflect the new geometry
    return geometry;
}

//매트릭스 데이터 중 특정 값의 위치만 추출
function getValidDataOfMatrixData(matrix, value){
    if(value == undefined) return;
    const positions = [];
    
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === value) {
                positions.push({ x, y });
            }
        }
    }
    return positions;
}

//List 배열중 std_loc_x, std_loc_y, std_loc_z를 기준으로 매트릭스 데이터 생성
function createMatrixDataFromList(baseMatrix, list, value){
    const maxX = baseMatrix[0].length;
    const maxY = baseMatrix.length;

    list.forEach(item => {
        const x = parseInt(item.std_loc_x, 10) - 1; // Adjust if indexing in your data starts from 1
        const y = parseInt(item.std_loc_y, 10) - 1; // Adjust if indexing in your data starts from 1
        if (x >= 0 && x < maxX && y >= 0 && y < maxY) {
            baseMatrix[y][x] = value; // Set to 1 (or another specific value) to indicate presence
        }
    });

    return baseMatrix;
}

//매트릭스 데이터 2개를 더하기
function addMatrices(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    return result;
}

var dcData = 
    [   
        {"dc_cd":"DC001","dc_nm":"서울 물류창고","std_width":"26","std_length":"26","std_loc_x":"0","std_loc_y":"0","std_loc_z":"0"},
        {"dc_cd":"DC002","dc_nm":"경기 물류창고","std_width":"52","std_length":"52","std_loc_x":"0","std_loc_y":"0","std_loc_z":"0"}
    ]


var areaData =
    [
        {"dc_cd":"DC001","area_cd":"A","area_nm":"A구역","std_width":"26","std_length":"26", "std_loc_x":"0","std_loc_y":"0","std_loc_z":"0"},
        {"dc_cd":"DC001","area_cd":"B","area_nm":"B구역","std_width":"26","std_length":"26", "std_loc_x":"0","std_loc_y":"0","std_loc_z":"0"},
        {"dc_cd":"DC001","area_cd":"C","area_nm":"C구역","std_width":"26","std_length":"26", "std_loc_x":"0","std_loc_y":"0","std_loc_z":"0"},
    ]

var zoneData = [
        {"dc_cd":"DC001","zone_cd":"A1","zone_nm":"입고대기존","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
        {"dc_cd":"DC001","zone_cd":"A2","zone_nm":"입고검수존","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
        {"dc_cd":"DC001","zone_cd":"B1","zone_nm":"보관1","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
        {"dc_cd":"DC001","zone_cd":"B2","zone_nm":"보관2","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
        {"dc_cd":"DC001","zone_cd":"B3","zone_nm":"보관3 ","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
        {"dc_cd":"DC001","zone_cd":"C1","zone_nm":"출고대기존","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
        {"dc_cd":"DC001","zone_cd":"C2","zone_nm":"출고피킹존","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
        {"dc_cd":"DC001","zone_cd":"C3","zone_nm":"출고상차존","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
    ]


var locData = [
        {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"1","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"2","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"3","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1010102","lin_cd":"1","row_cd":"1","lev_cd":"2","std_loc_x":"3","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1010103","lin_cd":"1","row_cd":"1","lev_cd":"3","std_loc_x":"3","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1010201","lin_cd":"1","row_cd":"2","lev_cd":"1","std_loc_x":"4","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1010202","lin_cd":"1","row_cd":"2","lev_cd":"2","std_loc_x":"4","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1010203","lin_cd":"1","row_cd":"2","lev_cd":"3","std_loc_x":"4","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1020102","lin_cd":"2","row_cd":"1","lev_cd":"2","std_loc_x":"5","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1020103","lin_cd":"2","row_cd":"1","lev_cd":"3","std_loc_x":"5","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1020201","lin_cd":"2","row_cd":"2","lev_cd":"1","std_loc_x":"6","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1020202","lin_cd":"2","row_cd":"2","lev_cd":"2","std_loc_x":"6","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1020203","lin_cd":"2","row_cd":"2","lev_cd":"3","std_loc_x":"6","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1030102","lin_cd":"3","row_cd":"1","lev_cd":"2","std_loc_x":"7","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1030103","lin_cd":"3","row_cd":"1","lev_cd":"3","std_loc_x":"7","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1030201","lin_cd":"3","row_cd":"2","lev_cd":"1","std_loc_x":"8","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1030202","lin_cd":"3","row_cd":"2","lev_cd":"2","std_loc_x":"8","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1030203","lin_cd":"3","row_cd":"2","lev_cd":"3","std_loc_x":"8","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"9","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1040102","lin_cd":"4","row_cd":"1","lev_cd":"2","std_loc_x":"9","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1040103","lin_cd":"4","row_cd":"1","lev_cd":"3","std_loc_x":"9","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1040201","lin_cd":"4","row_cd":"2","lev_cd":"1","std_loc_x":"10","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1040202","lin_cd":"4","row_cd":"2","lev_cd":"2","std_loc_x":"10","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1040203","lin_cd":"4","row_cd":"2","lev_cd":"3","std_loc_x":"10","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"11","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1050102","lin_cd":"5","row_cd":"1","lev_cd":"2","std_loc_x":"11","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1050103","lin_cd":"5","row_cd":"1","lev_cd":"3","std_loc_x":"11","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1050201","lin_cd":"5","row_cd":"2","lev_cd":"1","std_loc_x":"12","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1050202","lin_cd":"5","row_cd":"2","lev_cd":"2","std_loc_x":"12","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1050203","lin_cd":"5","row_cd":"2","lev_cd":"3","std_loc_x":"12","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"13","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1060102","lin_cd":"6","row_cd":"1","lev_cd":"2","std_loc_x":"13","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1060103","lin_cd":"6","row_cd":"1","lev_cd":"3","std_loc_x":"13","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1060201","lin_cd":"6","row_cd":"2","lev_cd":"1","std_loc_x":"14","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1060202","lin_cd":"6","row_cd":"2","lev_cd":"2","std_loc_x":"14","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1060203","lin_cd":"6","row_cd":"2","lev_cd":"3","std_loc_x":"14","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"15","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1070102","lin_cd":"7","row_cd":"1","lev_cd":"2","std_loc_x":"15","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1070103","lin_cd":"7","row_cd":"1","lev_cd":"3","std_loc_x":"15","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1070201","lin_cd":"7","row_cd":"2","lev_cd":"1","std_loc_x":"16","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1070202","lin_cd":"7","row_cd":"2","lev_cd":"2","std_loc_x":"16","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1070203","lin_cd":"7","row_cd":"2","lev_cd":"3","std_loc_x":"16","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"17","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1080102","lin_cd":"8","row_cd":"1","lev_cd":"2","std_loc_x":"17","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1080103","lin_cd":"8","row_cd":"1","lev_cd":"3","std_loc_x":"17","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1080201","lin_cd":"8","row_cd":"2","lev_cd":"1","std_loc_x":"18","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1080202","lin_cd":"8","row_cd":"2","lev_cd":"2","std_loc_x":"18","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1080203","lin_cd":"8","row_cd":"2","lev_cd":"3","std_loc_x":"18","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"19","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1090102","lin_cd":"9","row_cd":"1","lev_cd":"2","std_loc_x":"19","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1090103","lin_cd":"9","row_cd":"1","lev_cd":"3","std_loc_x":"19","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1090201","lin_cd":"9","row_cd":"2","lev_cd":"1","std_loc_x":"20","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1090202","lin_cd":"9","row_cd":"2","lev_cd":"2","std_loc_x":"20","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1090203","lin_cd":"9","row_cd":"2","lev_cd":"3","std_loc_x":"20","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"21","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1100102","lin_cd":"10","row_cd":"1","lev_cd":"2","std_loc_x":"21","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1100103","lin_cd":"10","row_cd":"1","lev_cd":"3","std_loc_x":"21","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1100201","lin_cd":"10","row_cd":"2","lev_cd":"1","std_loc_x":"22","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1100202","lin_cd":"10","row_cd":"2","lev_cd":"2","std_loc_x":"22","std_loc_y":"5","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1100203","lin_cd":"10","row_cd":"2","lev_cd":"3","std_loc_x":"22","std_loc_y":"5","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1110101","lin_cd":"11","row_cd":"1","lev_cd":"1","std_loc_x":"3","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1110102","lin_cd":"11","row_cd":"1","lev_cd":"2","std_loc_x":"3","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1110103","lin_cd":"11","row_cd":"1","lev_cd":"3","std_loc_x":"3","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1110201","lin_cd":"11","row_cd":"2","lev_cd":"1","std_loc_x":"4","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1110202","lin_cd":"11","row_cd":"2","lev_cd":"2","std_loc_x":"4","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1110203","lin_cd":"11","row_cd":"2","lev_cd":"3","std_loc_x":"4","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1120101","lin_cd":"12","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1120102","lin_cd":"12","row_cd":"1","lev_cd":"2","std_loc_x":"5","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1120103","lin_cd":"12","row_cd":"1","lev_cd":"3","std_loc_x":"5","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1120201","lin_cd":"12","row_cd":"2","lev_cd":"1","std_loc_x":"6","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1120202","lin_cd":"12","row_cd":"2","lev_cd":"2","std_loc_x":"6","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1120203","lin_cd":"12","row_cd":"2","lev_cd":"3","std_loc_x":"6","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1130101","lin_cd":"13","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1130102","lin_cd":"13","row_cd":"1","lev_cd":"2","std_loc_x":"7","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1130103","lin_cd":"13","row_cd":"1","lev_cd":"3","std_loc_x":"7","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1130201","lin_cd":"13","row_cd":"2","lev_cd":"1","std_loc_x":"8","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1130202","lin_cd":"13","row_cd":"2","lev_cd":"2","std_loc_x":"8","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1130203","lin_cd":"13","row_cd":"2","lev_cd":"3","std_loc_x":"8","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1140101","lin_cd":"14","row_cd":"1","lev_cd":"1","std_loc_x":"9","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1140102","lin_cd":"14","row_cd":"1","lev_cd":"2","std_loc_x":"9","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1140103","lin_cd":"14","row_cd":"1","lev_cd":"3","std_loc_x":"9","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1140201","lin_cd":"14","row_cd":"2","lev_cd":"1","std_loc_x":"10","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1140202","lin_cd":"14","row_cd":"2","lev_cd":"2","std_loc_x":"10","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1140203","lin_cd":"14","row_cd":"2","lev_cd":"3","std_loc_x":"10","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1150101","lin_cd":"15","row_cd":"1","lev_cd":"1","std_loc_x":"11","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1150102","lin_cd":"15","row_cd":"1","lev_cd":"2","std_loc_x":"11","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1150103","lin_cd":"15","row_cd":"1","lev_cd":"3","std_loc_x":"11","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1150201","lin_cd":"15","row_cd":"2","lev_cd":"1","std_loc_x":"12","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1150202","lin_cd":"15","row_cd":"2","lev_cd":"2","std_loc_x":"12","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1150203","lin_cd":"15","row_cd":"2","lev_cd":"3","std_loc_x":"12","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1160101","lin_cd":"16","row_cd":"1","lev_cd":"1","std_loc_x":"13","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1160102","lin_cd":"16","row_cd":"1","lev_cd":"2","std_loc_x":"13","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1160103","lin_cd":"16","row_cd":"1","lev_cd":"3","std_loc_x":"13","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1160201","lin_cd":"16","row_cd":"2","lev_cd":"1","std_loc_x":"14","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1160202","lin_cd":"16","row_cd":"2","lev_cd":"2","std_loc_x":"14","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1160203","lin_cd":"16","row_cd":"2","lev_cd":"3","std_loc_x":"14","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1170101","lin_cd":"17","row_cd":"1","lev_cd":"1","std_loc_x":"15","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1170102","lin_cd":"17","row_cd":"1","lev_cd":"2","std_loc_x":"15","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1170103","lin_cd":"17","row_cd":"1","lev_cd":"3","std_loc_x":"15","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1170201","lin_cd":"17","row_cd":"2","lev_cd":"1","std_loc_x":"16","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1170202","lin_cd":"17","row_cd":"2","lev_cd":"2","std_loc_x":"16","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1170203","lin_cd":"17","row_cd":"2","lev_cd":"3","std_loc_x":"16","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1180101","lin_cd":"18","row_cd":"1","lev_cd":"1","std_loc_x":"17","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1180102","lin_cd":"18","row_cd":"1","lev_cd":"2","std_loc_x":"17","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1180103","lin_cd":"18","row_cd":"1","lev_cd":"3","std_loc_x":"17","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1180201","lin_cd":"18","row_cd":"2","lev_cd":"1","std_loc_x":"18","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1180202","lin_cd":"18","row_cd":"2","lev_cd":"2","std_loc_x":"18","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1180203","lin_cd":"18","row_cd":"2","lev_cd":"3","std_loc_x":"18","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1190101","lin_cd":"19","row_cd":"1","lev_cd":"1","std_loc_x":"19","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1190102","lin_cd":"19","row_cd":"1","lev_cd":"2","std_loc_x":"19","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1190103","lin_cd":"19","row_cd":"1","lev_cd":"3","std_loc_x":"19","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1190201","lin_cd":"19","row_cd":"2","lev_cd":"1","std_loc_x":"20","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1190202","lin_cd":"19","row_cd":"2","lev_cd":"2","std_loc_x":"20","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1190203","lin_cd":"19","row_cd":"2","lev_cd":"3","std_loc_x":"20","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1200101","lin_cd":"20","row_cd":"1","lev_cd":"1","std_loc_x":"21","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1200102","lin_cd":"20","row_cd":"1","lev_cd":"2","std_loc_x":"21","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1200103","lin_cd":"20","row_cd":"1","lev_cd":"3","std_loc_x":"21","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1200201","lin_cd":"20","row_cd":"2","lev_cd":"1","std_loc_x":"22","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1200202","lin_cd":"20","row_cd":"2","lev_cd":"2","std_loc_x":"22","std_loc_y":"6","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1200203","lin_cd":"20","row_cd":"2","lev_cd":"3","std_loc_x":"22","std_loc_y":"6","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"3","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2010102","lin_cd":"1","row_cd":"1","lev_cd":"2","std_loc_x":"3","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2010103","lin_cd":"1","row_cd":"1","lev_cd":"3","std_loc_x":"3","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2010201","lin_cd":"1","row_cd":"2","lev_cd":"1","std_loc_x":"4","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2010202","lin_cd":"1","row_cd":"2","lev_cd":"2","std_loc_x":"4","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2010203","lin_cd":"1","row_cd":"2","lev_cd":"3","std_loc_x":"4","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2020102","lin_cd":"2","row_cd":"1","lev_cd":"2","std_loc_x":"5","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2020103","lin_cd":"2","row_cd":"1","lev_cd":"3","std_loc_x":"5","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2020201","lin_cd":"2","row_cd":"2","lev_cd":"1","std_loc_x":"6","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2020202","lin_cd":"2","row_cd":"2","lev_cd":"2","std_loc_x":"6","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2020203","lin_cd":"2","row_cd":"2","lev_cd":"3","std_loc_x":"6","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2030102","lin_cd":"3","row_cd":"1","lev_cd":"2","std_loc_x":"7","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2030103","lin_cd":"3","row_cd":"1","lev_cd":"3","std_loc_x":"7","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2030201","lin_cd":"3","row_cd":"2","lev_cd":"1","std_loc_x":"8","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2030202","lin_cd":"3","row_cd":"2","lev_cd":"2","std_loc_x":"8","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2030203","lin_cd":"3","row_cd":"2","lev_cd":"3","std_loc_x":"8","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"9","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2040102","lin_cd":"4","row_cd":"1","lev_cd":"2","std_loc_x":"9","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2040103","lin_cd":"4","row_cd":"1","lev_cd":"3","std_loc_x":"9","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2040201","lin_cd":"4","row_cd":"2","lev_cd":"1","std_loc_x":"10","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2040202","lin_cd":"4","row_cd":"2","lev_cd":"2","std_loc_x":"10","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2040203","lin_cd":"4","row_cd":"2","lev_cd":"3","std_loc_x":"10","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"11","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2050102","lin_cd":"5","row_cd":"1","lev_cd":"2","std_loc_x":"11","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2050103","lin_cd":"5","row_cd":"1","lev_cd":"3","std_loc_x":"11","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2050201","lin_cd":"5","row_cd":"2","lev_cd":"1","std_loc_x":"12","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2050202","lin_cd":"5","row_cd":"2","lev_cd":"2","std_loc_x":"12","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2050203","lin_cd":"5","row_cd":"2","lev_cd":"3","std_loc_x":"12","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"13","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2060102","lin_cd":"6","row_cd":"1","lev_cd":"2","std_loc_x":"13","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2060103","lin_cd":"6","row_cd":"1","lev_cd":"3","std_loc_x":"13","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2060201","lin_cd":"6","row_cd":"2","lev_cd":"1","std_loc_x":"14","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2060202","lin_cd":"6","row_cd":"2","lev_cd":"2","std_loc_x":"14","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2060203","lin_cd":"6","row_cd":"2","lev_cd":"3","std_loc_x":"14","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"15","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2070102","lin_cd":"7","row_cd":"1","lev_cd":"2","std_loc_x":"15","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2070103","lin_cd":"7","row_cd":"1","lev_cd":"3","std_loc_x":"15","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2070201","lin_cd":"7","row_cd":"2","lev_cd":"1","std_loc_x":"16","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2070202","lin_cd":"7","row_cd":"2","lev_cd":"2","std_loc_x":"16","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2070203","lin_cd":"7","row_cd":"2","lev_cd":"3","std_loc_x":"16","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"17","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2080102","lin_cd":"8","row_cd":"1","lev_cd":"2","std_loc_x":"17","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2080103","lin_cd":"8","row_cd":"1","lev_cd":"3","std_loc_x":"17","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2080201","lin_cd":"8","row_cd":"2","lev_cd":"1","std_loc_x":"18","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2080202","lin_cd":"8","row_cd":"2","lev_cd":"2","std_loc_x":"18","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2080203","lin_cd":"8","row_cd":"2","lev_cd":"3","std_loc_x":"18","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"19","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2090102","lin_cd":"9","row_cd":"1","lev_cd":"2","std_loc_x":"19","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2090103","lin_cd":"9","row_cd":"1","lev_cd":"3","std_loc_x":"19","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2090201","lin_cd":"9","row_cd":"2","lev_cd":"1","std_loc_x":"20","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2090202","lin_cd":"9","row_cd":"2","lev_cd":"2","std_loc_x":"20","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2090203","lin_cd":"9","row_cd":"2","lev_cd":"3","std_loc_x":"20","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"21","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2100102","lin_cd":"10","row_cd":"1","lev_cd":"2","std_loc_x":"21","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2100103","lin_cd":"10","row_cd":"1","lev_cd":"3","std_loc_x":"21","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2100201","lin_cd":"10","row_cd":"2","lev_cd":"1","std_loc_x":"22","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2100202","lin_cd":"10","row_cd":"2","lev_cd":"2","std_loc_x":"22","std_loc_y":"9","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2100203","lin_cd":"10","row_cd":"2","lev_cd":"3","std_loc_x":"22","std_loc_y":"9","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2110101","lin_cd":"11","row_cd":"1","lev_cd":"1","std_loc_x":"3","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2110102","lin_cd":"11","row_cd":"1","lev_cd":"2","std_loc_x":"3","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2110103","lin_cd":"11","row_cd":"1","lev_cd":"3","std_loc_x":"3","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2110201","lin_cd":"11","row_cd":"2","lev_cd":"1","std_loc_x":"4","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2110202","lin_cd":"11","row_cd":"2","lev_cd":"2","std_loc_x":"4","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2110203","lin_cd":"11","row_cd":"2","lev_cd":"3","std_loc_x":"4","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2120101","lin_cd":"12","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2120102","lin_cd":"12","row_cd":"1","lev_cd":"2","std_loc_x":"5","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2120103","lin_cd":"12","row_cd":"1","lev_cd":"3","std_loc_x":"5","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2120201","lin_cd":"12","row_cd":"2","lev_cd":"1","std_loc_x":"6","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2120202","lin_cd":"12","row_cd":"2","lev_cd":"2","std_loc_x":"6","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2120203","lin_cd":"12","row_cd":"2","lev_cd":"3","std_loc_x":"6","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2130101","lin_cd":"13","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2130102","lin_cd":"13","row_cd":"1","lev_cd":"2","std_loc_x":"7","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2130103","lin_cd":"13","row_cd":"1","lev_cd":"3","std_loc_x":"7","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2130201","lin_cd":"13","row_cd":"2","lev_cd":"1","std_loc_x":"8","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2130202","lin_cd":"13","row_cd":"2","lev_cd":"2","std_loc_x":"8","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2130203","lin_cd":"13","row_cd":"2","lev_cd":"3","std_loc_x":"8","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2140101","lin_cd":"14","row_cd":"1","lev_cd":"1","std_loc_x":"9","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2140102","lin_cd":"14","row_cd":"1","lev_cd":"2","std_loc_x":"9","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2140103","lin_cd":"14","row_cd":"1","lev_cd":"3","std_loc_x":"9","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2140201","lin_cd":"14","row_cd":"2","lev_cd":"1","std_loc_x":"10","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2140202","lin_cd":"14","row_cd":"2","lev_cd":"2","std_loc_x":"10","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2140203","lin_cd":"14","row_cd":"2","lev_cd":"3","std_loc_x":"10","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2150101","lin_cd":"15","row_cd":"1","lev_cd":"1","std_loc_x":"11","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2150102","lin_cd":"15","row_cd":"1","lev_cd":"2","std_loc_x":"11","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2150103","lin_cd":"15","row_cd":"1","lev_cd":"3","std_loc_x":"11","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2150201","lin_cd":"15","row_cd":"2","lev_cd":"1","std_loc_x":"12","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2150202","lin_cd":"15","row_cd":"2","lev_cd":"2","std_loc_x":"12","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2150203","lin_cd":"15","row_cd":"2","lev_cd":"3","std_loc_x":"12","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2160101","lin_cd":"16","row_cd":"1","lev_cd":"1","std_loc_x":"13","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2160102","lin_cd":"16","row_cd":"1","lev_cd":"2","std_loc_x":"13","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2160103","lin_cd":"16","row_cd":"1","lev_cd":"3","std_loc_x":"13","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2160201","lin_cd":"16","row_cd":"2","lev_cd":"1","std_loc_x":"14","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2160202","lin_cd":"16","row_cd":"2","lev_cd":"2","std_loc_x":"14","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2160203","lin_cd":"16","row_cd":"2","lev_cd":"3","std_loc_x":"14","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2170101","lin_cd":"17","row_cd":"1","lev_cd":"1","std_loc_x":"15","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2170102","lin_cd":"17","row_cd":"1","lev_cd":"2","std_loc_x":"15","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2170103","lin_cd":"17","row_cd":"1","lev_cd":"3","std_loc_x":"15","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2170201","lin_cd":"17","row_cd":"2","lev_cd":"1","std_loc_x":"16","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2170202","lin_cd":"17","row_cd":"2","lev_cd":"2","std_loc_x":"16","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2170203","lin_cd":"17","row_cd":"2","lev_cd":"3","std_loc_x":"16","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2180101","lin_cd":"18","row_cd":"1","lev_cd":"1","std_loc_x":"17","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2180102","lin_cd":"18","row_cd":"1","lev_cd":"2","std_loc_x":"17","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2180103","lin_cd":"18","row_cd":"1","lev_cd":"3","std_loc_x":"17","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2180201","lin_cd":"18","row_cd":"2","lev_cd":"1","std_loc_x":"18","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2180202","lin_cd":"18","row_cd":"2","lev_cd":"2","std_loc_x":"18","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2180203","lin_cd":"18","row_cd":"2","lev_cd":"3","std_loc_x":"18","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2190101","lin_cd":"19","row_cd":"1","lev_cd":"1","std_loc_x":"19","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2190102","lin_cd":"19","row_cd":"1","lev_cd":"2","std_loc_x":"19","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2190103","lin_cd":"19","row_cd":"1","lev_cd":"3","std_loc_x":"19","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2190201","lin_cd":"19","row_cd":"2","lev_cd":"1","std_loc_x":"20","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2190202","lin_cd":"19","row_cd":"2","lev_cd":"2","std_loc_x":"20","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2190203","lin_cd":"19","row_cd":"2","lev_cd":"3","std_loc_x":"20","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2200101","lin_cd":"20","row_cd":"1","lev_cd":"1","std_loc_x":"21","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2200102","lin_cd":"20","row_cd":"1","lev_cd":"2","std_loc_x":"21","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2200103","lin_cd":"20","row_cd":"1","lev_cd":"3","std_loc_x":"21","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2200201","lin_cd":"20","row_cd":"2","lev_cd":"1","std_loc_x":"22","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2200202","lin_cd":"20","row_cd":"2","lev_cd":"2","std_loc_x":"22","std_loc_y":"10","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2200203","lin_cd":"20","row_cd":"2","lev_cd":"3","std_loc_x":"22","std_loc_y":"10","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"3","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3010102","lin_cd":"1","row_cd":"1","lev_cd":"2","std_loc_x":"3","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3010103","lin_cd":"1","row_cd":"1","lev_cd":"3","std_loc_x":"3","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3010201","lin_cd":"1","row_cd":"2","lev_cd":"1","std_loc_x":"4","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3010202","lin_cd":"1","row_cd":"2","lev_cd":"2","std_loc_x":"4","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3010203","lin_cd":"1","row_cd":"2","lev_cd":"3","std_loc_x":"4","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3020102","lin_cd":"2","row_cd":"1","lev_cd":"2","std_loc_x":"5","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3020103","lin_cd":"2","row_cd":"1","lev_cd":"3","std_loc_x":"5","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3020201","lin_cd":"2","row_cd":"2","lev_cd":"1","std_loc_x":"6","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3020202","lin_cd":"2","row_cd":"2","lev_cd":"2","std_loc_x":"6","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3020203","lin_cd":"2","row_cd":"2","lev_cd":"3","std_loc_x":"6","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3030102","lin_cd":"3","row_cd":"1","lev_cd":"2","std_loc_x":"7","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3030103","lin_cd":"3","row_cd":"1","lev_cd":"3","std_loc_x":"7","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3030201","lin_cd":"3","row_cd":"2","lev_cd":"1","std_loc_x":"8","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3030202","lin_cd":"3","row_cd":"2","lev_cd":"2","std_loc_x":"8","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3030203","lin_cd":"3","row_cd":"2","lev_cd":"3","std_loc_x":"8","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"9","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3040102","lin_cd":"4","row_cd":"1","lev_cd":"2","std_loc_x":"9","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3040103","lin_cd":"4","row_cd":"1","lev_cd":"3","std_loc_x":"9","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3040201","lin_cd":"4","row_cd":"2","lev_cd":"1","std_loc_x":"10","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3040202","lin_cd":"4","row_cd":"2","lev_cd":"2","std_loc_x":"10","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3040203","lin_cd":"4","row_cd":"2","lev_cd":"3","std_loc_x":"10","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"11","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3050102","lin_cd":"5","row_cd":"1","lev_cd":"2","std_loc_x":"11","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3050103","lin_cd":"5","row_cd":"1","lev_cd":"3","std_loc_x":"11","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3050201","lin_cd":"5","row_cd":"2","lev_cd":"1","std_loc_x":"12","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3050202","lin_cd":"5","row_cd":"2","lev_cd":"2","std_loc_x":"12","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3050203","lin_cd":"5","row_cd":"2","lev_cd":"3","std_loc_x":"12","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"13","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3060102","lin_cd":"6","row_cd":"1","lev_cd":"2","std_loc_x":"13","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3060103","lin_cd":"6","row_cd":"1","lev_cd":"3","std_loc_x":"13","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3060201","lin_cd":"6","row_cd":"2","lev_cd":"1","std_loc_x":"14","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3060202","lin_cd":"6","row_cd":"2","lev_cd":"2","std_loc_x":"14","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3060203","lin_cd":"6","row_cd":"2","lev_cd":"3","std_loc_x":"14","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"15","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3070102","lin_cd":"7","row_cd":"1","lev_cd":"2","std_loc_x":"15","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3070103","lin_cd":"7","row_cd":"1","lev_cd":"3","std_loc_x":"15","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3070201","lin_cd":"7","row_cd":"2","lev_cd":"1","std_loc_x":"16","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3070202","lin_cd":"7","row_cd":"2","lev_cd":"2","std_loc_x":"16","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3070203","lin_cd":"7","row_cd":"2","lev_cd":"3","std_loc_x":"16","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"17","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3080102","lin_cd":"8","row_cd":"1","lev_cd":"2","std_loc_x":"17","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3080103","lin_cd":"8","row_cd":"1","lev_cd":"3","std_loc_x":"17","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3080201","lin_cd":"8","row_cd":"2","lev_cd":"1","std_loc_x":"18","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3080202","lin_cd":"8","row_cd":"2","lev_cd":"2","std_loc_x":"18","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3080203","lin_cd":"8","row_cd":"2","lev_cd":"3","std_loc_x":"18","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"19","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3090102","lin_cd":"9","row_cd":"1","lev_cd":"2","std_loc_x":"19","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3090103","lin_cd":"9","row_cd":"1","lev_cd":"3","std_loc_x":"19","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3090201","lin_cd":"9","row_cd":"2","lev_cd":"1","std_loc_x":"20","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3090202","lin_cd":"9","row_cd":"2","lev_cd":"2","std_loc_x":"20","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3090203","lin_cd":"9","row_cd":"2","lev_cd":"3","std_loc_x":"20","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"21","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3100102","lin_cd":"10","row_cd":"1","lev_cd":"2","std_loc_x":"21","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3100103","lin_cd":"10","row_cd":"1","lev_cd":"3","std_loc_x":"21","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3100201","lin_cd":"10","row_cd":"2","lev_cd":"1","std_loc_x":"22","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3100202","lin_cd":"10","row_cd":"2","lev_cd":"2","std_loc_x":"22","std_loc_y":"13","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3100203","lin_cd":"10","row_cd":"2","lev_cd":"3","std_loc_x":"22","std_loc_y":"13","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3110101","lin_cd":"11","row_cd":"1","lev_cd":"1","std_loc_x":"3","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3110102","lin_cd":"11","row_cd":"1","lev_cd":"2","std_loc_x":"3","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3110103","lin_cd":"11","row_cd":"1","lev_cd":"3","std_loc_x":"3","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3110201","lin_cd":"11","row_cd":"2","lev_cd":"1","std_loc_x":"4","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3110202","lin_cd":"11","row_cd":"2","lev_cd":"2","std_loc_x":"4","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3110203","lin_cd":"11","row_cd":"2","lev_cd":"3","std_loc_x":"4","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3120101","lin_cd":"12","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3120102","lin_cd":"12","row_cd":"1","lev_cd":"2","std_loc_x":"5","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3120103","lin_cd":"12","row_cd":"1","lev_cd":"3","std_loc_x":"5","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3120201","lin_cd":"12","row_cd":"2","lev_cd":"1","std_loc_x":"6","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3120202","lin_cd":"12","row_cd":"2","lev_cd":"2","std_loc_x":"6","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3120203","lin_cd":"12","row_cd":"2","lev_cd":"3","std_loc_x":"6","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3130101","lin_cd":"13","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3130102","lin_cd":"13","row_cd":"1","lev_cd":"2","std_loc_x":"7","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3130103","lin_cd":"13","row_cd":"1","lev_cd":"3","std_loc_x":"7","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3130201","lin_cd":"13","row_cd":"2","lev_cd":"1","std_loc_x":"8","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3130202","lin_cd":"13","row_cd":"2","lev_cd":"2","std_loc_x":"8","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3130203","lin_cd":"13","row_cd":"2","lev_cd":"3","std_loc_x":"8","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3140101","lin_cd":"14","row_cd":"1","lev_cd":"1","std_loc_x":"9","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3140102","lin_cd":"14","row_cd":"1","lev_cd":"2","std_loc_x":"9","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3140103","lin_cd":"14","row_cd":"1","lev_cd":"3","std_loc_x":"9","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3140201","lin_cd":"14","row_cd":"2","lev_cd":"1","std_loc_x":"10","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3140202","lin_cd":"14","row_cd":"2","lev_cd":"2","std_loc_x":"10","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3140203","lin_cd":"14","row_cd":"2","lev_cd":"3","std_loc_x":"10","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3150101","lin_cd":"15","row_cd":"1","lev_cd":"1","std_loc_x":"11","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3150102","lin_cd":"15","row_cd":"1","lev_cd":"2","std_loc_x":"11","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3150103","lin_cd":"15","row_cd":"1","lev_cd":"3","std_loc_x":"11","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3150201","lin_cd":"15","row_cd":"2","lev_cd":"1","std_loc_x":"12","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3150202","lin_cd":"15","row_cd":"2","lev_cd":"2","std_loc_x":"12","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3150203","lin_cd":"15","row_cd":"2","lev_cd":"3","std_loc_x":"12","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3160101","lin_cd":"16","row_cd":"1","lev_cd":"1","std_loc_x":"13","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3160102","lin_cd":"16","row_cd":"1","lev_cd":"2","std_loc_x":"13","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3160103","lin_cd":"16","row_cd":"1","lev_cd":"3","std_loc_x":"13","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3160201","lin_cd":"16","row_cd":"2","lev_cd":"1","std_loc_x":"14","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3160202","lin_cd":"16","row_cd":"2","lev_cd":"2","std_loc_x":"14","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3160203","lin_cd":"16","row_cd":"2","lev_cd":"3","std_loc_x":"14","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3170101","lin_cd":"17","row_cd":"1","lev_cd":"1","std_loc_x":"15","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3170102","lin_cd":"17","row_cd":"1","lev_cd":"2","std_loc_x":"15","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3170103","lin_cd":"17","row_cd":"1","lev_cd":"3","std_loc_x":"15","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3170201","lin_cd":"17","row_cd":"2","lev_cd":"1","std_loc_x":"16","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3170202","lin_cd":"17","row_cd":"2","lev_cd":"2","std_loc_x":"16","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3170203","lin_cd":"17","row_cd":"2","lev_cd":"3","std_loc_x":"16","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3180101","lin_cd":"18","row_cd":"1","lev_cd":"1","std_loc_x":"17","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3180102","lin_cd":"18","row_cd":"1","lev_cd":"2","std_loc_x":"17","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3180103","lin_cd":"18","row_cd":"1","lev_cd":"3","std_loc_x":"17","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3180201","lin_cd":"18","row_cd":"2","lev_cd":"1","std_loc_x":"18","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3180202","lin_cd":"18","row_cd":"2","lev_cd":"2","std_loc_x":"18","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3180203","lin_cd":"18","row_cd":"2","lev_cd":"3","std_loc_x":"18","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3190101","lin_cd":"19","row_cd":"1","lev_cd":"1","std_loc_x":"19","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3190102","lin_cd":"19","row_cd":"1","lev_cd":"2","std_loc_x":"19","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3190103","lin_cd":"19","row_cd":"1","lev_cd":"3","std_loc_x":"19","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3190201","lin_cd":"19","row_cd":"2","lev_cd":"1","std_loc_x":"20","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3190202","lin_cd":"19","row_cd":"2","lev_cd":"2","std_loc_x":"20","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3190203","lin_cd":"19","row_cd":"2","lev_cd":"3","std_loc_x":"20","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3200101","lin_cd":"20","row_cd":"1","lev_cd":"1","std_loc_x":"21","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3200102","lin_cd":"20","row_cd":"1","lev_cd":"2","std_loc_x":"21","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3200103","lin_cd":"20","row_cd":"1","lev_cd":"3","std_loc_x":"21","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3200201","lin_cd":"20","row_cd":"2","lev_cd":"1","std_loc_x":"22","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3200202","lin_cd":"20","row_cd":"2","lev_cd":"2","std_loc_x":"22","std_loc_y":"14","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"B","loc_cd":"B3200203","lin_cd":"20","row_cd":"2","lev_cd":"3","std_loc_x":"22","std_loc_y":"14","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1010201","lin_cd":"1","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1010301","lin_cd":"1","row_cd":"3","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1020201","lin_cd":"2","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1020301","lin_cd":"2","row_cd":"3","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1030201","lin_cd":"3","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1030301","lin_cd":"3","row_cd":"3","lev_cd":"1","std_loc_x":"2","std_loc_y":"20","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2010201","lin_cd":"1","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2020201","lin_cd":"2","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2030201","lin_cd":"3","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2040201","lin_cd":"4","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2050201","lin_cd":"5","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2060201","lin_cd":"6","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2070201","lin_cd":"7","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2080201","lin_cd":"8","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2090201","lin_cd":"9","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2100201","lin_cd":"10","row_cd":"2","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"2"},

        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"},
        {"dc_cd":"DC001","area_cd":"C","loc_cd":"C3100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"25","std_loc_z":"2"}
    ]