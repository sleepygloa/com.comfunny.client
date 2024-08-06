import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../../components/PageTitle/PageTitle.js";

import {client} from "../../../../contraints.js"

export default function Loc3d(props) {
  const menuTitle = '3D 로케이션';

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Axios를 사용하여 서버에서 HTML 데이터 가져오기
    const fetchHtmlContent = async () => {
      try {
        const response = await client.get('http://localhost:3000/pages/stock/loc3d/loc3d.html', {
          responseType: 'text'  // 서버 응답을 text 형태로 받음
        });
        const html = response.data;
        setHtmlContent(html);
        executeScript(html);
      } catch (error) {
        console.error('Failed to fetch HTML:', error);
      }
    };

    fetchHtmlContent();

  }, []);

  const executeScript = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.text = script.text;
      document.body.appendChild(newScript).parentNode.removeChild(newScript);
    });
  };


  return (
    <>
      <PageTitle title={"3D 재고조회"}  />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      
    </>
  );
}



