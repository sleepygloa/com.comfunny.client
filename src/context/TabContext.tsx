import React, { createContext, useState, useCallback, useContext, ReactNode, Dispatch, SetStateAction } from "react";

// --- 타입 정의 ---

// 탭 아이템 데이터 타입
export interface TabItem {
  idx?: number;
  menuCd: string;
  menuNm: string;
  url: string;
  menuId: string;
  [key: string]: any; // 추가 속성 허용
}

// Context가 제공할 값의 타입
interface TabContextType {
  currTabList: TabItem[];
  addTab: (item: TabItem) => void;
  removeTab: (item:  Pick<TabItem, 'menuCd'>) => void; // menuCd만 있어도 삭제 가능하도록
  selTabIdx: number;
  setSelTabIdx: Dispatch<SetStateAction<number>>;
}

// Provider Props 타입
interface TabProviderProps {
  children: ReactNode;
}

// --- Context 생성 ---

// 초기값을 undefined로 설정하여 Provider 외부 사용 시 에러를 잡도록 함
export const TabContext = createContext<TabContextType | undefined>(undefined);

// --- Custom Hook ---

export const useTab = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};

// --- Provider 컴포넌트 ---

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  // 초기 탭 리스트 설정
  const [currTabList, setCurrTabList] = useState<TabItem[]>([
    { idx: 0, menuCd: '10001', menuNm: '대쉬보드', url: '/app/dashboard', menuId: 'Dashboard' }
  ]);
  const [selTabIdx, setSelTabIdx] = useState<number>(0);

  const addTab = useCallback((item: TabItem) => {
    if (!item.menuCd) {
      console.log("메뉴 코드가 없습니다.");
      return;
    }
    if (!item.menuId) {
      console.log("메뉴 아이디가 없습니다.");
      return;
    }
    if (!item.url) {
      console.log("메뉴 URL이 없습니다.");
      return;
    }
    if (!item.menuNm) {
      console.log("메뉴 명이 없습니다.");
      return;
    }

    if (currTabList.length > 10) {
      alert('10개이상 메뉴를 열수 없습니다.');
      return;
    }

    // 이미 열려있는지 확인
    let openFlag = false;
    let idx = -1;

    currTabList.forEach((list) => {
      if (list.menuCd === item.menuCd) {
        openFlag = true;
        idx = list.idx!; // 기존 아이템에는 idx가 반드시 있다고 가정
      }
    });

    // 신규 탭일 때만 추가
    if (!openFlag) {
      // 새 인덱스 계산 (현재 리스트 길이 사용)
      idx = currTabList.length; 
      // 탭 추가 시 idx 속성 부여
      const newTab = { ...item, idx: idx };
      setCurrTabList((prev) => [...prev, newTab]);
    }

    // 탭 활성화 (선택된 탭 인덱스 변경)
    setSelTabIdx(idx);
  }, [currTabList]);

  const removeTab = useCallback((item: Pick<TabItem, 'menuCd'>) => {
    if (!item.menuCd) return;

    // 닫으려는 탭이 존재하는지 확인
    const targetTab = currTabList.find((tab) => tab.menuCd === item.menuCd);
    
    if (targetTab) {
      // 탭 삭제: 해당 menuCd를 제외한 리스트로 업데이트
      setCurrTabList((prev) => prev.filter((tab) => tab.menuCd !== item.menuCd));
      
      // (선택 사항) 만약 현재 보고 있는 탭을 닫았다면, 인덱스 조정 로직이 필요할 수 있습니다.
      // 여기서는 기존 로직을 유지하여 단순히 리스트에서 제거만 합니다.
    }
  }, [currTabList]);

  return (
    <TabContext.Provider value={{ currTabList, addTab, removeTab, selTabIdx, setSelTabIdx }}>
      {children}
    </TabContext.Provider>
  );
};