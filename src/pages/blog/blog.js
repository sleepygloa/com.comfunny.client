import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // UUID 패키지 설치 필요
import axios from 'axios';

function BlogPostForm() {
  const [items, setItems] = useState([]);

  const addItem = (type) => {
    const newItem = {
      id: uuidv4(),
      type,
      content: type === 'text' ? '' : null,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id, updatedContent) => {
    setItems(items.map(item => item.id === id ? { ...item, content: updatedContent } : item));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    items.forEach((item, index) => {
      if (item.type === 'text') {
        formData.append(`text_${index}`, item.content);
      } else if (item.type === 'image') {
        formData.append(`image_${index}`, item.content);
      }
    });

    try {
      await axios.post('http://localhost:8080/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // 성공 처리 로직
    } catch (error) {
      console.error(error);
      // 에러 처리 로직
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => addItem('text')}>텍스트 추가</button>
      <button type="button" onClick={() => addItem('image')}>이미지 추가</button>
      <button type="submit">제출</button>
      {items.map((item, index) => (
        <div key={item.id}>
          {item.type === 'text' ? (
            <textarea
              placeholder="텍스트 입력"
              onChange={(e) => updateItem(item.id, e.target.value)}
            />
          ) : (
            <input
              type="file"
              onChange={(e) => updateItem(item.id, e.target.files[0])}
              accept="image/*"
            />
          )}
        </div>
      ))}
    </form>
  );
}

export default BlogPostForm;
