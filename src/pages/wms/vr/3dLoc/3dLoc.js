import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../../../../components/PageTitle/PageTitle.js";
import { client } from "../../../../contraints.js";

export default function Loc3d(props) {
  const menuTitle = '3D 로케이션';

  const [htmlContent, setHtmlContent] = useState('');
  const [scripts, setScripts] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await client.get('http://localhost:3000/pages/stock/loc3d/loc3d.html', {
          responseType: 'text'  // 서버 응답을 text 형태로 받음
        });
        const html = response.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract and remove scripts from the document
        const scriptElements = Array.from(doc.querySelectorAll('script'));
        const scriptSources = scriptElements.map(script => ({
          src: script.src,
          content: script.textContent
        }));
        scriptElements.forEach(script => script.parentNode.removeChild(script));

        setHtmlContent(doc.body.innerHTML);
        setScripts(scriptSources);
      } catch (error) {
        console.error('Failed to fetch HTML:', error);
      }
    };

    fetchHtmlContent();
  }, []);

  useEffect(() => {
    const loadScripts = () => {
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.content;
        }
        document.body.appendChild(newScript);
      });
    };

    if (htmlContent && contentRef.current) {
      contentRef.current.innerHTML = htmlContent;
      loadScripts();
    }
  }, [htmlContent, scripts]);

  return (
    <>
      <PageTitle title={"3D 재고조회"} />
      <div ref={contentRef} />
    </>
  );
}
