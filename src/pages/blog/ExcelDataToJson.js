import React, { useState } from 'react';

export function ExcelDataToJson() {
  const [previewData, setPreviewData] = useState([]);
  const [returnJsonData, setReturnJsonData] = useState([]);

const initData = (e) => {
  setPreviewData([]);
  setReturnJsonData([]);
}

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    const rows = clipboardData.trim().split('\n').map(row => row.split('\t'));
    setPreviewData(rows);
  };

  const convertToJson = () => {
    const headers = previewData[0];
    const jsonData = previewData.slice(1).map(row => {
      let rowData = {};
      row.forEach((cell, index) => {
        rowData[headers[index]] = cell;
      });
      return rowData;
    });
    console.log(jsonData);
    setReturnJsonData(jsonData);
    // 여기서 jsonData를 서버로 업로드하거나 필요한 처리를 할 수 있습니다.
    

    try {
      navigator.clipboard.writeText(JSON.stringify(jsonData).replace(/},/g, '},\n'));
      alert('Text copied to clipboard');
    } catch (err) {
        alert('Failed to copy: ', err);
    }
  };

  return (
    <div>
      <p>2. ExcelData To Json</p>
      <button onClick={convertToJson}>Upload & Convert to JSON</button>
      <button onClick={initData}>Init</button>
      <div></div>
      {returnJsonData.length > 0 && (<div>{JSON.stringify(returnJsonData).replace(/},/g, '},\n')}</div>)}
      <textarea
        placeholder="여기에 엑셀 데이터를 붙여넣으세요..."
        onPaste={handlePaste}
        rows={10}
        cols={50}
      />
      {previewData.length > 0 && (
        <div style={{height:'500px', overflowY:'auto'}}>
          <table>
            <tbody>
              {previewData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}