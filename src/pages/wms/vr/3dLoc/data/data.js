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
function createMatrixDataFromList(baseMatrix, list){
    const maxX = baseMatrix[0].length;
    const maxY = baseMatrix.length;

    list.forEach(item => {
        const x = parseInt(item.std_loc_x, 10) - 1; // Adjust if indexing in your data starts from 1
        const y = parseInt(item.std_loc_y, 10) - 1; // Adjust if indexing in your data starts from 1
        if (x >= 0 && x < maxX && y >= 0 && y < maxY) {
            baseMatrix[y][x] = Number(item.row_cd); // Set to 1 (or another specific value) to indicate presence
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
        {"dc_cd":"DC001","dc_nm":"서울 물류창고","std_width":"30","std_length":"20","std_loc_x":"0","std_loc_y":"0","std_loc_z":"0"},
        // {"dc_cd":"DC002","dc_nm":"경기 물류창고","std_width":"52","std_length":"52","std_loc_x":"0","std_loc_y":"0","std_loc_z":"0"}
    ]


var areaData =
    [
        {"dc_cd":"DC001","area_cd":"A","area_nm":"A구역","std_width":"7","std_length":"20", "std_loc_x":"0","std_loc_y":"0","std_loc_z":"0"},
        {"dc_cd":"DC001","area_cd":"B","area_nm":"B구역","std_width":"24","std_length":"20", "std_loc_x":"8","std_loc_y":"0","std_loc_z":"0"},
        {"dc_cd":"DC001","area_cd":"C","area_nm":"C구역","std_width":"30","std_length":"20", "std_loc_x":"25","std_loc_y":"0","std_loc_z":"0"},
    ]

var zoneData = [
        {"dc_cd":"DC001","zone_cd":"A1","zone_nm":"입고대기존","std_width":"1","std_length":"19", "std_loc_x":"0","std_loc_y":"1","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"A2","zone_nm":"입고검수존","std_width":"6","std_length":"19", "std_loc_x":"4","std_loc_y":"1","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"B1","zone_nm":"보관1","std_width":"23","std_length":"9", "std_loc_x":"9","std_loc_y":"1","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"B2","zone_nm":"보관2","std_width":"23","std_length":"19", "std_loc_x":"9","std_loc_y":"11","std_loc_z":"1"},
        // {"dc_cd":"DC001","zone_cd":"C1","zone_nm":"출고대기존","std_width":"26","std_length":"26", "std_loc_x":"","std_loc_y":"","std_loc_z":""},
        {"dc_cd":"DC001","zone_cd":"C2","zone_nm":"출고피킹존","std_width":"27","std_length":"19", "std_loc_x":"26","std_loc_y":"1","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"C3","zone_nm":"출고상차존","std_width":"30","std_length":"19", "std_loc_x":"29","std_loc_y":"1","std_loc_z":"1"},
    ]


var locData = [
    // 입고대기존 1구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"3","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"3","std_loc_z":"1"},
    //입고대기존 2구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"7","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"7","std_loc_z":"1"},
    //입고대기존 3구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1110101","lin_cd":"11","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"11","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1120101","lin_cd":"12","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"11","std_loc_z":"1"},
    //입고대기존 4구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1130101","lin_cd":"13","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1140101","lin_cd":"14","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1150101","lin_cd":"15","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"15","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1160101","lin_cd":"16","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"15","std_loc_z":"1"},
    //입고대기존 5구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1170101","lin_cd":"17","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1180101","lin_cd":"18","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1190101","lin_cd":"19","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"19","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1200101","lin_cd":"20","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"19","std_loc_z":"1"},
    //입고대기존 6구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1210101","lin_cd":"21","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"22","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1220101","lin_cd":"22","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"22","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1230101","lin_cd":"23","row_cd":"1","lev_cd":"1","std_loc_x":"1","std_loc_y":"23","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1240101","lin_cd":"24","row_cd":"1","lev_cd":"1","std_loc_x":"2","std_loc_y":"23","std_loc_z":"1"},


    //입고검수 존 1구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"3","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"3","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"3","std_loc_z":"1"},

    //입고검수 존 2구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"7","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2110101","lin_cd":"11","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"7","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2120101","lin_cd":"12","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"7","std_loc_z":"1"},
    
    //입고검수 존 3구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2130101","lin_cd":"13","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2140101","lin_cd":"14","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2150101","lin_cd":"15","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2160101","lin_cd":"16","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"11","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2170101","lin_cd":"17","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"11","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2180101","lin_cd":"18","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"11","std_loc_z":"1"},
    
    //입고검수 존 4구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2190101","lin_cd":"19","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2200101","lin_cd":"20","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2210101","lin_cd":"21","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2220101","lin_cd":"22","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"15","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2230101","lin_cd":"23","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"15","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2240101","lin_cd":"24","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"15","std_loc_z":"1"},
    
    //입고검수 존 5구역
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2250101","lin_cd":"25","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2260101","lin_cd":"26","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2270101","lin_cd":"27","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2280101","lin_cd":"28","row_cd":"1","lev_cd":"1","std_loc_x":"5","std_loc_y":"19","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2290101","lin_cd":"29","row_cd":"1","lev_cd":"1","std_loc_x":"6","std_loc_y":"19","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2300101","lin_cd":"30","row_cd":"1","lev_cd":"1","std_loc_x":"7","std_loc_y":"19","std_loc_z":"1"},
    
    //보관존 1
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1010101","lin_cd":"1","row_cd":"3","lev_cd":"1","std_loc_x":"10","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1020101","lin_cd":"2","row_cd":"3","lev_cd":"1","std_loc_x":"11","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1030101","lin_cd":"3","row_cd":"3","lev_cd":"1","std_loc_x":"12","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1040201","lin_cd":"4","row_cd":"3","lev_cd":"1","std_loc_x":"13","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1050201","lin_cd":"5","row_cd":"3","lev_cd":"1","std_loc_x":"14","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1060201","lin_cd":"6","row_cd":"3","lev_cd":"1","std_loc_x":"15","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1070101","lin_cd":"7","row_cd":"3","lev_cd":"1","std_loc_x":"16","std_loc_y":"3","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1080101","lin_cd":"8","row_cd":"3","lev_cd":"1","std_loc_x":"18","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1090201","lin_cd":"9","row_cd":"3","lev_cd":"1","std_loc_x":"19","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1100101","lin_cd":"10","row_cd":"3","lev_cd":"1","std_loc_x":"20","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1110101","lin_cd":"11","row_cd":"3","lev_cd":"1","std_loc_x":"21","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1120101","lin_cd":"12","row_cd":"3","lev_cd":"1","std_loc_x":"22","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1130101","lin_cd":"13","row_cd":"3","lev_cd":"1","std_loc_x":"23","std_loc_y":"3","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1140101","lin_cd":"14","row_cd":"3","lev_cd":"1","std_loc_x":"24","std_loc_y":"3","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1150101","lin_cd":"15","row_cd":"3","lev_cd":"1","std_loc_x":"10","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1160101","lin_cd":"16","row_cd":"3","lev_cd":"1","std_loc_x":"11","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1170101","lin_cd":"17","row_cd":"3","lev_cd":"1","std_loc_x":"12","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1180201","lin_cd":"18","row_cd":"3","lev_cd":"1","std_loc_x":"13","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1190201","lin_cd":"19","row_cd":"3","lev_cd":"1","std_loc_x":"14","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1200201","lin_cd":"20","row_cd":"3","lev_cd":"1","std_loc_x":"15","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1210101","lin_cd":"21","row_cd":"3","lev_cd":"1","std_loc_x":"16","std_loc_y":"4","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1220101","lin_cd":"22","row_cd":"3","lev_cd":"1","std_loc_x":"18","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1230201","lin_cd":"23","row_cd":"3","lev_cd":"1","std_loc_x":"19","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1240101","lin_cd":"24","row_cd":"3","lev_cd":"1","std_loc_x":"20","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1250101","lin_cd":"25","row_cd":"3","lev_cd":"1","std_loc_x":"21","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1260101","lin_cd":"26","row_cd":"3","lev_cd":"1","std_loc_x":"22","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1270101","lin_cd":"27","row_cd":"3","lev_cd":"1","std_loc_x":"23","std_loc_y":"4","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1280101","lin_cd":"28","row_cd":"3","lev_cd":"1","std_loc_x":"24","std_loc_y":"4","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1290101","lin_cd":"29","row_cd":"3","lev_cd":"1","std_loc_x":"10","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1300101","lin_cd":"30","row_cd":"3","lev_cd":"1","std_loc_x":"11","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1310101","lin_cd":"31","row_cd":"3","lev_cd":"1","std_loc_x":"12","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1320201","lin_cd":"32","row_cd":"3","lev_cd":"1","std_loc_x":"13","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1330201","lin_cd":"33","row_cd":"3","lev_cd":"1","std_loc_x":"14","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1340201","lin_cd":"34","row_cd":"3","lev_cd":"1","std_loc_x":"15","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1350101","lin_cd":"35","row_cd":"3","lev_cd":"1","std_loc_x":"16","std_loc_y":"8","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1360101","lin_cd":"36","row_cd":"3","lev_cd":"1","std_loc_x":"18","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1370201","lin_cd":"37","row_cd":"3","lev_cd":"1","std_loc_x":"19","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1380101","lin_cd":"38","row_cd":"3","lev_cd":"1","std_loc_x":"20","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1390101","lin_cd":"39","row_cd":"3","lev_cd":"1","std_loc_x":"21","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1400101","lin_cd":"40","row_cd":"3","lev_cd":"1","std_loc_x":"22","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1410101","lin_cd":"41","row_cd":"3","lev_cd":"1","std_loc_x":"23","std_loc_y":"8","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1420101","lin_cd":"42","row_cd":"3","lev_cd":"1","std_loc_x":"24","std_loc_y":"8","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1430101","lin_cd":"43","row_cd":"3","lev_cd":"1","std_loc_x":"10","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1440101","lin_cd":"44","row_cd":"3","lev_cd":"1","std_loc_x":"11","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1450101","lin_cd":"45","row_cd":"3","lev_cd":"1","std_loc_x":"12","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1460201","lin_cd":"46","row_cd":"3","lev_cd":"1","std_loc_x":"13","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1470201","lin_cd":"47","row_cd":"3","lev_cd":"1","std_loc_x":"14","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1480201","lin_cd":"48","row_cd":"3","lev_cd":"1","std_loc_x":"15","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1490101","lin_cd":"49","row_cd":"3","lev_cd":"1","std_loc_x":"16","std_loc_y":"9","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1500101","lin_cd":"50","row_cd":"3","lev_cd":"1","std_loc_x":"18","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1510201","lin_cd":"51","row_cd":"3","lev_cd":"1","std_loc_x":"19","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1520101","lin_cd":"52","row_cd":"3","lev_cd":"1","std_loc_x":"20","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1530101","lin_cd":"53","row_cd":"3","lev_cd":"1","std_loc_x":"21","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1540101","lin_cd":"54","row_cd":"3","lev_cd":"1","std_loc_x":"22","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1550101","lin_cd":"55","row_cd":"3","lev_cd":"1","std_loc_x":"23","std_loc_y":"9","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1560101","lin_cd":"56","row_cd":"3","lev_cd":"1","std_loc_x":"24","std_loc_y":"9","std_loc_z":"2"},

    //보관존 2
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2010101","lin_cd":"1","row_cd":"3","lev_cd":"1","std_loc_x":"10","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2020101","lin_cd":"2","row_cd":"3","lev_cd":"1","std_loc_x":"11","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2030101","lin_cd":"3","row_cd":"3","lev_cd":"1","std_loc_x":"12","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2040201","lin_cd":"4","row_cd":"3","lev_cd":"1","std_loc_x":"13","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2050201","lin_cd":"5","row_cd":"3","lev_cd":"1","std_loc_x":"14","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2060201","lin_cd":"6","row_cd":"3","lev_cd":"1","std_loc_x":"15","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2070101","lin_cd":"7","row_cd":"3","lev_cd":"1","std_loc_x":"16","std_loc_y":"13","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2080101","lin_cd":"8","row_cd":"3","lev_cd":"1","std_loc_x":"18","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2090201","lin_cd":"9","row_cd":"3","lev_cd":"1","std_loc_x":"19","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2100101","lin_cd":"10","row_cd":"3","lev_cd":"1","std_loc_x":"20","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2110101","lin_cd":"11","row_cd":"3","lev_cd":"1","std_loc_x":"21","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2120101","lin_cd":"12","row_cd":"3","lev_cd":"1","std_loc_x":"22","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2130101","lin_cd":"13","row_cd":"3","lev_cd":"1","std_loc_x":"23","std_loc_y":"13","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2140101","lin_cd":"14","row_cd":"3","lev_cd":"1","std_loc_x":"24","std_loc_y":"13","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2150101","lin_cd":"15","row_cd":"3","lev_cd":"1","std_loc_x":"10","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2160101","lin_cd":"16","row_cd":"3","lev_cd":"1","std_loc_x":"11","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2170101","lin_cd":"17","row_cd":"3","lev_cd":"1","std_loc_x":"12","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2180201","lin_cd":"18","row_cd":"3","lev_cd":"1","std_loc_x":"13","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2190201","lin_cd":"19","row_cd":"3","lev_cd":"1","std_loc_x":"14","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2200201","lin_cd":"20","row_cd":"3","lev_cd":"1","std_loc_x":"15","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2210101","lin_cd":"21","row_cd":"3","lev_cd":"1","std_loc_x":"16","std_loc_y":"14","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2220101","lin_cd":"22","row_cd":"3","lev_cd":"1","std_loc_x":"18","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2230201","lin_cd":"23","row_cd":"3","lev_cd":"1","std_loc_x":"19","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2240101","lin_cd":"24","row_cd":"3","lev_cd":"1","std_loc_x":"20","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2250101","lin_cd":"25","row_cd":"3","lev_cd":"1","std_loc_x":"21","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2260101","lin_cd":"26","row_cd":"3","lev_cd":"1","std_loc_x":"22","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2270101","lin_cd":"27","row_cd":"3","lev_cd":"1","std_loc_x":"23","std_loc_y":"14","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2280101","lin_cd":"28","row_cd":"3","lev_cd":"1","std_loc_x":"24","std_loc_y":"14","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2290101","lin_cd":"29","row_cd":"3","lev_cd":"1","std_loc_x":"10","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2300101","lin_cd":"30","row_cd":"3","lev_cd":"1","std_loc_x":"11","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2310101","lin_cd":"31","row_cd":"3","lev_cd":"1","std_loc_x":"12","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2320201","lin_cd":"32","row_cd":"3","lev_cd":"1","std_loc_x":"13","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2330201","lin_cd":"33","row_cd":"3","lev_cd":"1","std_loc_x":"14","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2340201","lin_cd":"34","row_cd":"3","lev_cd":"1","std_loc_x":"15","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2350101","lin_cd":"35","row_cd":"3","lev_cd":"1","std_loc_x":"16","std_loc_y":"18","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2360101","lin_cd":"36","row_cd":"3","lev_cd":"1","std_loc_x":"18","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2370201","lin_cd":"37","row_cd":"3","lev_cd":"1","std_loc_x":"19","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2380101","lin_cd":"38","row_cd":"3","lev_cd":"1","std_loc_x":"20","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2390101","lin_cd":"39","row_cd":"3","lev_cd":"1","std_loc_x":"21","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2400101","lin_cd":"40","row_cd":"3","lev_cd":"1","std_loc_x":"22","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2410101","lin_cd":"41","row_cd":"3","lev_cd":"1","std_loc_x":"23","std_loc_y":"18","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2420101","lin_cd":"42","row_cd":"3","lev_cd":"1","std_loc_x":"24","std_loc_y":"18","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2430101","lin_cd":"43","row_cd":"3","lev_cd":"1","std_loc_x":"10","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2440101","lin_cd":"44","row_cd":"3","lev_cd":"1","std_loc_x":"11","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2450101","lin_cd":"45","row_cd":"3","lev_cd":"1","std_loc_x":"12","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2460201","lin_cd":"46","row_cd":"3","lev_cd":"1","std_loc_x":"13","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2470201","lin_cd":"47","row_cd":"3","lev_cd":"1","std_loc_x":"14","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2480201","lin_cd":"48","row_cd":"3","lev_cd":"1","std_loc_x":"15","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2490101","lin_cd":"49","row_cd":"3","lev_cd":"1","std_loc_x":"16","std_loc_y":"19","std_loc_z":"2"},

    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2500101","lin_cd":"50","row_cd":"3","lev_cd":"1","std_loc_x":"18","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2510201","lin_cd":"51","row_cd":"3","lev_cd":"1","std_loc_x":"19","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2520101","lin_cd":"52","row_cd":"3","lev_cd":"1","std_loc_x":"20","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2530101","lin_cd":"53","row_cd":"3","lev_cd":"1","std_loc_x":"21","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2540101","lin_cd":"54","row_cd":"3","lev_cd":"1","std_loc_x":"22","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2550101","lin_cd":"55","row_cd":"3","lev_cd":"1","std_loc_x":"23","std_loc_y":"19","std_loc_z":"2"},
    {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2560101","lin_cd":"56","row_cd":"3","lev_cd":"1","std_loc_x":"24","std_loc_y":"19","std_loc_z":"2"},



    //출고피킹 존 1구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"3","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"3","std_loc_z":"1"},

    //출고피킹 존 2구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"7","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"7","std_loc_z":"1"},

    //출고피킹 존 3구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1110101","lin_cd":"11","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"11","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1120101","lin_cd":"12","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"11","std_loc_z":"1"},
    
    //출고피킹 존 4구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1130101","lin_cd":"13","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1140101","lin_cd":"14","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1150101","lin_cd":"15","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"15","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1160101","lin_cd":"16","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"15","std_loc_z":"1"},

    //출고피킹 존 5구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1170101","lin_cd":"17","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1180101","lin_cd":"18","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1190101","lin_cd":"19","row_cd":"1","lev_cd":"1","std_loc_x":"27","std_loc_y":"19","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1200101","lin_cd":"20","row_cd":"1","lev_cd":"1","std_loc_x":"28","std_loc_y":"19","std_loc_z":"1"},

    //출고상차존 1구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2010101","lin_cd":"1","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2020101","lin_cd":"2","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"2","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2030101","lin_cd":"3","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"3","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2040101","lin_cd":"4","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"3","std_loc_z":"1"},
    //출고상차존 2구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2050101","lin_cd":"5","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2060101","lin_cd":"6","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"6","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2070101","lin_cd":"7","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"7","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2080101","lin_cd":"8","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"7","std_loc_z":"1"},
    //출고상차존 3구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2090101","lin_cd":"9","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2100101","lin_cd":"10","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"10","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2110101","lin_cd":"11","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"11","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2120101","lin_cd":"12","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"11","std_loc_z":"1"},
    //출고상차존 4구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2130101","lin_cd":"13","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2140101","lin_cd":"14","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"14","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2150101","lin_cd":"15","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"15","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2160101","lin_cd":"16","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"15","std_loc_z":"1"},
    //출고상차존 5구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2170101","lin_cd":"17","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2180101","lin_cd":"18","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"18","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2190101","lin_cd":"19","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"19","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2200101","lin_cd":"20","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"19","std_loc_z":"1"},
    //출고상차존 6구역
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2210101","lin_cd":"21","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"22","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2220101","lin_cd":"22","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"22","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2230101","lin_cd":"23","row_cd":"1","lev_cd":"1","std_loc_x":"30","std_loc_y":"23","std_loc_z":"1"},
    {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2240101","lin_cd":"24","row_cd":"1","lev_cd":"1","std_loc_x":"31","std_loc_y":"23","std_loc_z":"1"},

]