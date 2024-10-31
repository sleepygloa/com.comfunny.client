import React, { useState, createContext, useContext } from "react";

// 현재 open된 modal들을 나타냄.
export const ModalsStateContext = createContext();
export const useModal = () => useContext(ModalsStateContext);

export const ModalsProvider = ({children}) => {
    const [modals, setModals] = useState([]);

    const openModal = (key, title, content, callback, width, height) => {
        setModals(prev => ({ ...prev, [key]: { open: true, title, content, callback, width, height, data:{} } }));
    }

    // 모달의 데이터를 업데이트하는 함수
    const updateModalData = (key, data) => {
        setModals(prev => ({
        ...prev,
        [key]: { ...prev[key], data }
        }));
    };

    // 특정 모달의 데이터를 가져오는 함수
    const getModalData = (key) => {
        return modals[key] ? modals[key].data : null;
    };

    const closeModal = (key) => {
        setModals(prev => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
    }
    return (
        <ModalsStateContext.Provider value={{modals, openModal, closeModal, updateModalData, getModalData}}>
            {children}
        </ModalsStateContext.Provider>
    );
}
