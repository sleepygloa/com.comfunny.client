import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from "react";

// --- 타입 정의 ---

// State 타입 정의
interface LayoutState {
  isSidebarOpened: boolean;
}

// Action 타입 정의
// 현재는 액션이 하나뿐이지만, 추후 추가될 수 있으므로 Union 타입으로 정의 가능
type LayoutAction = { type: "TOGGLE_SIDEBAR" };

// Dispatch 타입 정의
type LayoutDispatch = Dispatch<LayoutAction>;

// Provider Props 타입 정의
interface LayoutProviderProps {
  children: ReactNode;
}

// --- Context 생성 ---

// 초기값을 undefined로 설정하여, Provider 없이 사용했을 때 에러를 잡을 수 있게 합니다.
const LayoutStateContext = createContext<LayoutState | undefined>(undefined);
const LayoutDispatchContext = createContext<LayoutDispatch | undefined>(undefined);

// --- Reducer 함수 ---

function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default: {
      throw new Error(`Unhandled action type: ${(action as LayoutAction).type}`);
    }
  }
}

// --- Provider 컴포넌트 ---

function LayoutProvider({ children }: LayoutProviderProps) {
  const [state, dispatch] = useReducer(layoutReducer, {
    isSidebarOpened: false, // 초기값: 사이드바 닫힘
  });

  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

// --- Custom Hooks ---

function useLayoutState(): LayoutState {
  const context = useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch(): LayoutDispatch {
  const context = useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

// --- Helper Functions ---

function toggleSidebar(dispatch: LayoutDispatch) {
  dispatch({
    type: "TOGGLE_SIDEBAR",
  });
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar };