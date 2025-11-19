import React, { useState, createContext, useContext, ReactNode } from "react";

// --- 타입 정의 ---

// 개별 모달 아이템의 구조
interface ModalItem {
    open: boolean;
    title: string;
    content: ReactNode; // JSX 요소나 문자열 등
    callback?: (data?: any) => void; // 선택적 콜백 함수
    width?: string | number;
    height?: string | number;
    data: any; // 모달 내부에서 사용할 유동적인 데이터
}

// 전체 모달 상태 (key: value 형태)
interface ModalsState {
    [key: string]: ModalItem;
}

// Context가 제공할 값의 타입
interface ModalContextType {
    modals: ModalsState;
    openModal: (key: string, title: string, content: ReactNode, callback?: (data?: any) => void, width?: string | number, height?: string | number) => void;
    closeModal: (key: string) => void;
    updateModalData: (key: string, data: any) => void;
    getModalData: (key: string) => any;
}

// Provider Props 타입
interface ModalProviderProps {
    children: ReactNode;
}

// --- Context 생성 ---

// 초기값을 null로 설정
export const ModalsStateContext = createContext<ModalContextType | null>(null);

// --- Custom Hooks ---

export const useModal = () => {
    const context = useContext(ModalsStateContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalsProvider');
    }
    return context;
};

export const useOpenModal = () => {
    const { openModal } = useModal();
    return openModal;
};


// --- Provider 컴포넌트 ---

export const ModalsProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modals, setModals] = useState<ModalsState>({});

    const openModal = (key: string, title: string, content: ReactNode, callback?: (data?: any) => void, width?: string | number, height?: string | number) => {
        setModals(prev => ({
            ...prev,
            [key]: {
                open: true,
                title,
                content,
                callback,
                width,
                height,
                data: {}
            }
        }));
    }

    // 모달의 데이터를 업데이트하는 함수
    const updateModalData = (key: string, data: any) => {
        setModals(prev => {
            // 해당 키의 모달이 없으면 업데이트하지 않음
            if (!prev[key]) return prev;
            
            return {
                ...prev,
                [key]: { ...prev[key], data }
            };
        });
    };

    // 특정 모달의 데이터를 가져오는 함수
    const getModalData = (key: string) => {
        return modals[key] ? modals[key].data : null;
    };

    const closeModal = (key: string) => {
        setModals(prev => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
        });
    }

    return (
        <ModalsStateContext.Provider value={{ modals, openModal, closeModal, updateModalData, getModalData }}>
            {children}
        </ModalsStateContext.Provider>
    );
}