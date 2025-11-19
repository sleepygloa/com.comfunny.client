import React, { useEffect, useMemo, useState, useContext, createContext, useReducer, ReactNode, Dispatch } from "react";
// import 경로를 명확하게 지정 (확장자 생략 가능하지만, 파일이 반드시 존재해야 함)
import { API_URL, client } from "../constraints";

// --- 타입 정의 ---

// 리듀서 상태 타입
interface UserState {
  isAuthenticated: boolean;
}

// 리듀서 액션 타입
type UserAction =
  | { type: "LOGIN_SUCCESS" }
  | { type: "SIGN_OUT_SUCCESS" }
  | { type: "LOGIN_FAILURE" }
  | { type: "SIGNUP_FAILURE" };

// 팝업 제어 객체 타입
interface PopAction {
  openPop: () => void;
  closePop: () => void;
}

// UserStateContext가 제공할 값의 타입
interface UserContextValue {
  isLoginPop: boolean;
  isLoginPopAction: PopAction;
  isSignupPop: boolean;
  isSignupPopAction: PopAction;
  signOut: () => void;
  state: UserState;
}

// Dispatch 타입
type UserDispatch = Dispatch<UserAction>;

// Provider Props 타입
interface UserProviderProps {
  children: ReactNode;
}

// --- Context 생성 ---

export const UserStateContext = createContext<UserContextValue | undefined>(undefined);
export const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

// --- Custom Hooks ---

export const useLogin = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a UserProvider");
  }
  return context;
};

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};

// --- Reducer 함수 ---

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      alert("로그인에 성공하였습니다.");
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      alert("로그아웃 되었습니다.");
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      alert("로그인에 실패하였습니다.");
      return state; // 상태 변경 없음
    case "SIGNUP_FAILURE":
      alert("회원가입에 실패하였습니다.");
      return state; // 상태 변경 없음
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

// --- Provider 컴포넌트 ---

export function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, {
    isAuthenticated: false, // 초기 로그인 상태 설정
  });

  // 로그인 팝업 상태 관리
  const [isLoginPop, setIsLoginPop] = useState<boolean>(false);
  
  const isLoginPopAction = useMemo<PopAction>(
    () => ({
      openPop() {
        console.log("로그인 팝업 true");
        setIsLoginPop(true);
      },
      closePop() {
        setIsLoginPop(false);
      },
    }),
    [] // 의존성 배열이 비어있어도 setState 함수는 안정적이므로 괜찮습니다.
  );

  // 회원가입 팝업 상태 관리
  const [isSignupPop, setIsSignupPop] = useState<boolean>(false);
  
  const isSignupPopAction = useMemo<PopAction>(
    () => ({
      openPop() {
        setIsSignupPop(true);
      },
      closePop() {
        setIsSignupPop(false);
      },
    }),
    []
  );

  // 로그아웃 함수
  function signOut() {
    client
      .post(`${API_URL}/login/logout`)
      .then((res) => {
        // 쿠키 삭제 로직
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        dispatch({ type: "SIGN_OUT_SUCCESS" });
        window.location.href = "/";
      })
      .catch((error) => {
        alert("로그아웃에 실패했습니다.");
      });
  }

  return (
    <UserStateContext.Provider
      value={{
        isLoginPop,
        isLoginPopAction,
        isSignupPop,
        isSignupPopAction,
        signOut,
        state,
      }}
    >
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}