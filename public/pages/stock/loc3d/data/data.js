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

//List 배열중 stdLocx, stdLocy, std_loc_z를 기준으로 매트릭스 데이터 생성
function createMatrixDataFromList(baseMatrix, list, value){
    const maxX = baseMatrix[0].length;
    const maxY = baseMatrix.length;

    list.forEach(item => {
        const x = parseInt(item.stdLocx, 10) - 1; // Adjust if indexing in your data starts from 1
        const y = parseInt(item.stdLocy, 10) - 1; // Adjust if indexing in your data starts from 1
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
        const x = parseInt(item.stdLocx, 10) - 1; // Adjust if indexing in your data starts from 1
        const y = parseInt(item.stdLocy, 10) - 1; // Adjust if indexing in your data starts from 1

        if (x >= 0 && x < maxX && y >= 0 && y < maxY) {
            baseMatrix[y][x] = Number(item.rowCd); // Set to 1 (or another specific value) to indicate presence
        }
    });

    return baseMatrix;
}
function createMatrixMapDataFromList(baseMatrix, list){
    const maxX = baseMatrix[0].length;
    const maxY = baseMatrix.length;

    list.forEach(item => {
        const x = parseInt(item.stdLocx, 10) - 1; // Adjust if indexing in your data starts from 1
        const y = parseInt(item.stdLocy, 10) - 1; // Adjust if indexing in your data starts from 1

        if (x >= 0 && x < maxX && y >= 0 && y < maxY) {
            baseMatrix[y][x] = item; // Set to 1 (or another specific value) to indicate presence
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
        {"dc_cd":"DC001","dc_nm":"서울 물류창고","stdWidth":"30","stdLength":"20","stdLocx":"0","stdLocy":"0","std_loc_z":"0"},
    ]

var areaData =
    [
        {"dc_cd":"DC001","area_cd":"A","area_nm":"A구역","stdWidth":"7","stdLength":"20", "stdLocx":"0","stdLocy":"0","std_loc_z":"0"},
        {"dc_cd":"DC001","area_cd":"B","area_nm":"B구역","stdWidth":"24","stdLength":"20", "stdLocx":"8","stdLocy":"0","std_loc_z":"0"},
        {"dc_cd":"DC001","area_cd":"C","area_nm":"C구역","stdWidth":"30","stdLength":"20", "stdLocx":"25","stdLocy":"0","std_loc_z":"0"},
    ]

var zoneData = [
        {"dc_cd":"DC001","zone_cd":"A1","zone_nm":"입고대기존","stdWidth":"1","stdLength":"19", "stdLocx":"0","stdLocy":"1","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"A2","zone_nm":"입고검수존","stdWidth":"6","stdLength":"19", "stdLocx":"4","stdLocy":"1","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"B1","zone_nm":"보관1","stdWidth":"23","stdLength":"9", "stdLocx":"9","stdLocy":"1","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"B2","zone_nm":"보관2","stdWidth":"23","stdLength":"19", "stdLocx":"9","stdLocy":"11","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"C2","zone_nm":"출고피킹존","stdWidth":"27","stdLength":"19", "stdLocx":"26","stdLocy":"1","std_loc_z":"1"},
        {"dc_cd":"DC001","zone_cd":"C3","zone_nm":"출고상차존","stdWidth":"30","stdLength":"19", "stdLocx":"29","stdLocy":"1","std_loc_z":"1"},
    ]


var locData = [
    // 입고대기존 1구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1010101","linCd":"1","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1020101","linCd":"2","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1030101","linCd":"3","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"3","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1040101","linCd":"4","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"3","std_loc_z":"1"},
    // //입고대기존 2구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1050101","linCd":"5","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1060101","linCd":"6","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1070101","linCd":"7","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"7","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1080101","linCd":"8","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"7","std_loc_z":"1"},
    // //입고대기존 3구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1090101","linCd":"9","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1100101","linCd":"10","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1110101","linCd":"11","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"11","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1120101","linCd":"12","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"11","std_loc_z":"1"},
    // //입고대기존 4구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1130101","linCd":"13","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1140101","linCd":"14","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1150101","linCd":"15","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"15","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1160101","linCd":"16","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"15","std_loc_z":"1"},
    // //입고대기존 5구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1170101","linCd":"17","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1180101","linCd":"18","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1190101","linCd":"19","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"19","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1200101","linCd":"20","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"19","std_loc_z":"1"},
    // //입고대기존 6구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1210101","linCd":"21","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"22","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1220101","linCd":"22","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"22","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1230101","linCd":"23","rowCd":"1","levCd":"1","stdLocx":"1","stdLocy":"23","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A1240101","linCd":"24","rowCd":"1","levCd":"1","stdLocx":"2","stdLocy":"23","std_loc_z":"1"},


    // //입고검수 존 1구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2010101","linCd":"1","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2020101","linCd":"2","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2030101","linCd":"3","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2040101","linCd":"4","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"3","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2050101","linCd":"5","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"3","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2060101","linCd":"6","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"3","std_loc_z":"1"},

    // //입고검수 존 2구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2070101","linCd":"7","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2080101","linCd":"8","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2090101","linCd":"9","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2100101","linCd":"10","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"7","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2110101","linCd":"11","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"7","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2120101","linCd":"12","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"7","std_loc_z":"1"},
    
    // //입고검수 존 3구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2130101","linCd":"13","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2140101","linCd":"14","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2150101","linCd":"15","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2160101","linCd":"16","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"11","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2170101","linCd":"17","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"11","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2180101","linCd":"18","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"11","std_loc_z":"1"},
    
    // //입고검수 존 4구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2190101","linCd":"19","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2200101","linCd":"20","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2210101","linCd":"21","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2220101","linCd":"22","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"15","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2230101","linCd":"23","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"15","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2240101","linCd":"24","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"15","std_loc_z":"1"},
    
    // //입고검수 존 5구역
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2250101","linCd":"25","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2260101","linCd":"26","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2270101","linCd":"27","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2280101","linCd":"28","rowCd":"1","levCd":"1","stdLocx":"5","stdLocy":"19","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2290101","linCd":"29","rowCd":"1","levCd":"1","stdLocx":"6","stdLocy":"19","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"A","loc_cd":"A2300101","linCd":"30","rowCd":"1","levCd":"1","stdLocx":"7","stdLocy":"19","std_loc_z":"1"},
    
    // //보관존 1
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1010101","linCd":"1","rowCd":"3","levCd":"1","stdLocx":"10","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1020101","linCd":"2","rowCd":"3","levCd":"1","stdLocx":"11","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1030101","linCd":"3","rowCd":"3","levCd":"1","stdLocx":"12","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1040201","linCd":"4","rowCd":"3","levCd":"1","stdLocx":"13","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1050201","linCd":"5","rowCd":"3","levCd":"1","stdLocx":"14","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1060201","linCd":"6","rowCd":"3","levCd":"1","stdLocx":"15","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1070101","linCd":"7","rowCd":"3","levCd":"1","stdLocx":"16","stdLocy":"3","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1080101","linCd":"8","rowCd":"3","levCd":"1","stdLocx":"18","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1090201","linCd":"9","rowCd":"3","levCd":"1","stdLocx":"19","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1100101","linCd":"10","rowCd":"3","levCd":"1","stdLocx":"20","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1110101","linCd":"11","rowCd":"3","levCd":"1","stdLocx":"21","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1120101","linCd":"12","rowCd":"3","levCd":"1","stdLocx":"22","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1130101","linCd":"13","rowCd":"3","levCd":"1","stdLocx":"23","stdLocy":"3","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1140101","linCd":"14","rowCd":"3","levCd":"1","stdLocx":"24","stdLocy":"3","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1150101","linCd":"15","rowCd":"3","levCd":"1","stdLocx":"10","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1160101","linCd":"16","rowCd":"3","levCd":"1","stdLocx":"11","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1170101","linCd":"17","rowCd":"3","levCd":"1","stdLocx":"12","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1180201","linCd":"18","rowCd":"3","levCd":"1","stdLocx":"13","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1190201","linCd":"19","rowCd":"3","levCd":"1","stdLocx":"14","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1200201","linCd":"20","rowCd":"3","levCd":"1","stdLocx":"15","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1210101","linCd":"21","rowCd":"3","levCd":"1","stdLocx":"16","stdLocy":"4","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1220101","linCd":"22","rowCd":"3","levCd":"1","stdLocx":"18","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1230201","linCd":"23","rowCd":"3","levCd":"1","stdLocx":"19","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1240101","linCd":"24","rowCd":"3","levCd":"1","stdLocx":"20","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1250101","linCd":"25","rowCd":"3","levCd":"1","stdLocx":"21","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1260101","linCd":"26","rowCd":"3","levCd":"1","stdLocx":"22","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1270101","linCd":"27","rowCd":"3","levCd":"1","stdLocx":"23","stdLocy":"4","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1280101","linCd":"28","rowCd":"3","levCd":"1","stdLocx":"24","stdLocy":"4","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1290101","linCd":"29","rowCd":"3","levCd":"1","stdLocx":"10","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1300101","linCd":"30","rowCd":"3","levCd":"1","stdLocx":"11","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1310101","linCd":"31","rowCd":"3","levCd":"1","stdLocx":"12","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1320201","linCd":"32","rowCd":"3","levCd":"1","stdLocx":"13","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1330201","linCd":"33","rowCd":"3","levCd":"1","stdLocx":"14","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1340201","linCd":"34","rowCd":"3","levCd":"1","stdLocx":"15","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1350101","linCd":"35","rowCd":"3","levCd":"1","stdLocx":"16","stdLocy":"8","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1360101","linCd":"36","rowCd":"3","levCd":"1","stdLocx":"18","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1370201","linCd":"37","rowCd":"3","levCd":"1","stdLocx":"19","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1380101","linCd":"38","rowCd":"3","levCd":"1","stdLocx":"20","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1390101","linCd":"39","rowCd":"3","levCd":"1","stdLocx":"21","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1400101","linCd":"40","rowCd":"3","levCd":"1","stdLocx":"22","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1410101","linCd":"41","rowCd":"3","levCd":"1","stdLocx":"23","stdLocy":"8","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1420101","linCd":"42","rowCd":"3","levCd":"1","stdLocx":"24","stdLocy":"8","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1430101","linCd":"43","rowCd":"3","levCd":"1","stdLocx":"10","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1440101","linCd":"44","rowCd":"3","levCd":"1","stdLocx":"11","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1450101","linCd":"45","rowCd":"3","levCd":"1","stdLocx":"12","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1460201","linCd":"46","rowCd":"3","levCd":"1","stdLocx":"13","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1470201","linCd":"47","rowCd":"3","levCd":"1","stdLocx":"14","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1480201","linCd":"48","rowCd":"3","levCd":"1","stdLocx":"15","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1490101","linCd":"49","rowCd":"3","levCd":"1","stdLocx":"16","stdLocy":"9","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1500101","linCd":"50","rowCd":"3","levCd":"1","stdLocx":"18","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1510201","linCd":"51","rowCd":"3","levCd":"1","stdLocx":"19","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1520101","linCd":"52","rowCd":"3","levCd":"1","stdLocx":"20","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1530101","linCd":"53","rowCd":"3","levCd":"1","stdLocx":"21","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1540101","linCd":"54","rowCd":"3","levCd":"1","stdLocx":"22","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1550101","linCd":"55","rowCd":"3","levCd":"1","stdLocx":"23","stdLocy":"9","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B1560101","linCd":"56","rowCd":"3","levCd":"1","stdLocx":"24","stdLocy":"9","std_loc_z":"2"},

    // //보관존 2
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2010101","linCd":"1","rowCd":"3","levCd":"1","stdLocx":"10","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2020101","linCd":"2","rowCd":"3","levCd":"1","stdLocx":"11","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2030101","linCd":"3","rowCd":"3","levCd":"1","stdLocx":"12","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2040201","linCd":"4","rowCd":"3","levCd":"1","stdLocx":"13","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2050201","linCd":"5","rowCd":"3","levCd":"1","stdLocx":"14","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2060201","linCd":"6","rowCd":"3","levCd":"1","stdLocx":"15","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2070101","linCd":"7","rowCd":"3","levCd":"1","stdLocx":"16","stdLocy":"13","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2080101","linCd":"8","rowCd":"3","levCd":"1","stdLocx":"18","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2090201","linCd":"9","rowCd":"3","levCd":"1","stdLocx":"19","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2100101","linCd":"10","rowCd":"3","levCd":"1","stdLocx":"20","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2110101","linCd":"11","rowCd":"3","levCd":"1","stdLocx":"21","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2120101","linCd":"12","rowCd":"3","levCd":"1","stdLocx":"22","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2130101","linCd":"13","rowCd":"3","levCd":"1","stdLocx":"23","stdLocy":"13","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2140101","linCd":"14","rowCd":"3","levCd":"1","stdLocx":"24","stdLocy":"13","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2150101","linCd":"15","rowCd":"3","levCd":"1","stdLocx":"10","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2160101","linCd":"16","rowCd":"3","levCd":"1","stdLocx":"11","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2170101","linCd":"17","rowCd":"3","levCd":"1","stdLocx":"12","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2180201","linCd":"18","rowCd":"3","levCd":"1","stdLocx":"13","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2190201","linCd":"19","rowCd":"3","levCd":"1","stdLocx":"14","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2200201","linCd":"20","rowCd":"3","levCd":"1","stdLocx":"15","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2210101","linCd":"21","rowCd":"3","levCd":"1","stdLocx":"16","stdLocy":"14","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2220101","linCd":"22","rowCd":"3","levCd":"1","stdLocx":"18","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2230201","linCd":"23","rowCd":"3","levCd":"1","stdLocx":"19","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2240101","linCd":"24","rowCd":"3","levCd":"1","stdLocx":"20","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2250101","linCd":"25","rowCd":"3","levCd":"1","stdLocx":"21","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2260101","linCd":"26","rowCd":"3","levCd":"1","stdLocx":"22","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2270101","linCd":"27","rowCd":"3","levCd":"1","stdLocx":"23","stdLocy":"14","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2280101","linCd":"28","rowCd":"3","levCd":"1","stdLocx":"24","stdLocy":"14","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2290101","linCd":"29","rowCd":"3","levCd":"1","stdLocx":"10","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2300101","linCd":"30","rowCd":"3","levCd":"1","stdLocx":"11","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2310101","linCd":"31","rowCd":"3","levCd":"1","stdLocx":"12","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2320201","linCd":"32","rowCd":"3","levCd":"1","stdLocx":"13","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2330201","linCd":"33","rowCd":"3","levCd":"1","stdLocx":"14","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2340201","linCd":"34","rowCd":"3","levCd":"1","stdLocx":"15","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2350101","linCd":"35","rowCd":"3","levCd":"1","stdLocx":"16","stdLocy":"18","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2360101","linCd":"36","rowCd":"3","levCd":"1","stdLocx":"18","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2370201","linCd":"37","rowCd":"3","levCd":"1","stdLocx":"19","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2380101","linCd":"38","rowCd":"3","levCd":"1","stdLocx":"20","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2390101","linCd":"39","rowCd":"3","levCd":"1","stdLocx":"21","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2400101","linCd":"40","rowCd":"3","levCd":"1","stdLocx":"22","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2410101","linCd":"41","rowCd":"3","levCd":"1","stdLocx":"23","stdLocy":"18","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2420101","linCd":"42","rowCd":"3","levCd":"1","stdLocx":"24","stdLocy":"18","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2430101","linCd":"43","rowCd":"3","levCd":"1","stdLocx":"10","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2440101","linCd":"44","rowCd":"3","levCd":"1","stdLocx":"11","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2450101","linCd":"45","rowCd":"3","levCd":"1","stdLocx":"12","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2460201","linCd":"46","rowCd":"3","levCd":"1","stdLocx":"13","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2470201","linCd":"47","rowCd":"3","levCd":"1","stdLocx":"14","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2480201","linCd":"48","rowCd":"3","levCd":"1","stdLocx":"15","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2490101","linCd":"49","rowCd":"3","levCd":"1","stdLocx":"16","stdLocy":"19","std_loc_z":"2"},

    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2500101","linCd":"50","rowCd":"3","levCd":"1","stdLocx":"18","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2510201","linCd":"51","rowCd":"3","levCd":"1","stdLocx":"19","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2520101","linCd":"52","rowCd":"3","levCd":"1","stdLocx":"20","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2530101","linCd":"53","rowCd":"3","levCd":"1","stdLocx":"21","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2540101","linCd":"54","rowCd":"3","levCd":"1","stdLocx":"22","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2550101","linCd":"55","rowCd":"3","levCd":"1","stdLocx":"23","stdLocy":"19","std_loc_z":"2"},
    // {"dc_cd":"DC001","area_cd":"B","loc_cd":"B2560101","linCd":"56","rowCd":"3","levCd":"1","stdLocx":"24","stdLocy":"19","std_loc_z":"2"},



    // //출고피킹 존 1구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1010101","linCd":"1","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1020101","linCd":"2","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1030101","linCd":"3","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"3","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1040101","linCd":"4","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"3","std_loc_z":"1"},

    // //출고피킹 존 2구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1050101","linCd":"5","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1060101","linCd":"6","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1070101","linCd":"7","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"7","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1080101","linCd":"8","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"7","std_loc_z":"1"},

    // //출고피킹 존 3구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1090101","linCd":"9","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1100101","linCd":"10","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1110101","linCd":"11","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"11","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1120101","linCd":"12","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"11","std_loc_z":"1"},
    
    // //출고피킹 존 4구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1130101","linCd":"13","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1140101","linCd":"14","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1150101","linCd":"15","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"15","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1160101","linCd":"16","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"15","std_loc_z":"1"},

    // //출고피킹 존 5구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1170101","linCd":"17","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1180101","linCd":"18","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1190101","linCd":"19","rowCd":"1","levCd":"1","stdLocx":"27","stdLocy":"19","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C1200101","linCd":"20","rowCd":"1","levCd":"1","stdLocx":"28","stdLocy":"19","std_loc_z":"1"},

    // //출고상차존 1구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2010101","linCd":"1","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2020101","linCd":"2","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"2","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2030101","linCd":"3","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"3","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2040101","linCd":"4","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"3","std_loc_z":"1"},
    // //출고상차존 2구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2050101","linCd":"5","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2060101","linCd":"6","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"6","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2070101","linCd":"7","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"7","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2080101","linCd":"8","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"7","std_loc_z":"1"},
    // //출고상차존 3구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2090101","linCd":"9","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2100101","linCd":"10","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"10","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2110101","linCd":"11","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"11","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2120101","linCd":"12","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"11","std_loc_z":"1"},
    // //출고상차존 4구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2130101","linCd":"13","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2140101","linCd":"14","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"14","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2150101","linCd":"15","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"15","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2160101","linCd":"16","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"15","std_loc_z":"1"},
    // //출고상차존 5구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2170101","linCd":"17","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2180101","linCd":"18","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"18","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2190101","linCd":"19","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"19","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2200101","linCd":"20","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"19","std_loc_z":"1"},
    // //출고상차존 6구역
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2210101","linCd":"21","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"22","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2220101","linCd":"22","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"22","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2230101","linCd":"23","rowCd":"1","levCd":"1","stdLocx":"30","stdLocy":"23","std_loc_z":"1"},
    // {"dc_cd":"DC001","area_cd":"C","loc_cd":"C2240101","linCd":"24","rowCd":"1","levCd":"1","stdLocx":"31","stdLocy":"23","std_loc_z":"1"},

]