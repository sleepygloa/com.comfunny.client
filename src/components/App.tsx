import React, { useState, createContext, useContext, Suspense, useEffect, ComponentType } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// --- SVG 아이콘 정의 ---

// 아이콘 컴포넌트에 size prop을 추가하기 위한 타입
interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// 아이콘 기본 속성
const iconDefaults: React.SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// 헬퍼 함수
const iconProps = (props: IconComponentProps) => { // 타입 변경
  const { size, ...rest } = props; // size prop 분리

  const finalProps: React.SVGProps<SVGSVGElement> = {
    ...iconDefaults,
    ...rest, // className 등 나머지 props 적용
  };

  // size prop이 있으면 width/height를 덮어씀
  if (size) {
    finalProps.width = size;
    finalProps.height = size;
  }
  
  return finalProps;
};

// 아이콘 컴포넌트들
const IconLayoutDashboard: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
const IconWarehouse: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-4a2 2 0 0 1 1.48 0l8 4A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><path d="M15 22v-8l-3-3-3 3v8"/></svg>
);
const IconPackage: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M21 10V5a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 5v5l-2 1.95A2 2 0 0 0 0 13.5v5A2.5 2.5 0 0 0 2.5 21h19A2.5 2.5 0 0 0 24 18.5v-5a2 2 0 0 0-1-1.55Z"/><path d="m3 12 9 5 9-5"/><path d="M12 21v-8"/><path d="m7.5 15.5 9-5"/><path d="m16.5 10.5-9 5"/></svg>
);
const IconLogIn: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
);
const IconMenu: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const IconChevronRight: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><polyline points="9 18 15 12 9 6"/></svg>
);
const IconX: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const IconPackagePlus: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M16 16h6M21 13v6"/><path d="M12.4 12.3 8 10 3 12.3V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5.7l-2.6-2.4Z"/><path d="m3 12 9 5 9-5"/><path d="M12 22v-9"/><path d="M 8 10 12 8l4 2"/><path d="M12 8V2l-4 2-4-2v6"/><path d="M12 8 4 6"/><path d="m16 4 4 2-4-2Z"/></svg>
);
const IconPackageMinus: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M16 16h6"/><path d="M12.4 12.3 8 10 3 12.3V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5.7l-2.6-2.4Z"/><path d="m3 12 9 5 9-5"/><path d="M12 22v-9"/><path d="M 8 10 12 8l4 2"/><path d="M12 8V2l-4 2-4-2v6"/><path d="M12 8 4 6"/><path d="m16 4 4 2-4-2Z"/></svg>
);
const IconSearch: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
);
const IconFileText: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);
const IconMove: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/></svg>
);
const IconArchive: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><rect width="20" height="5" x="2" y="3" rx="1"/><rect width="20" height="5" x="2" y="16" rx="1"/><path d="M4 8h16"/><path d="M4 12h16"/></svg>
);
const IconUsers2: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M14 19a6 6 0 0 0-12 0"/><circle cx="8" cy="9" r="4"/><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/></svg>
);
const IconBuilding: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
);
const IconMapPin: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconBox: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
);
const IconRuler: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6c-1 1-2.6.9-3.5 0l-8-8c-.9-.9-.9-2.5 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0L21.3 15.3Z"/><path d="m9.3 14.7 2 2"/><path d="m13.3 10.7 2 2"/><path d="m2.3 2.3 5.1 5.1"/><path d="m16.7 13.3 1-1"/></svg>
);
const IconBuilding2: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
);
const IconGlobe2: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/><path d="M13 2.05S16 6 16 12c0 6-3 9.95-3 9.95"/><path d="M11 1.95S8 6 8 12c0 6 3 10.05 3 10.05"/><path d="M2 12h20"/></svg>
);
const IconListTree: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M21 12h-8"/><path d="M21 6H8"/><path d="M21 18h-8"/><path d="M3 6v4c0 1.1.9 2 2 2h3"/><path d="M3 14v4c0 1.1.9 2 2 2h3"/></svg>
);
const IconAppWindow: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/></svg>
);
const IconDatabase: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
);
const IconBrain: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.16a1 1 0 0 0 .8.98L15 7.5a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1l2.2-.86a1 1 0 0 0 .8-.98V4.5A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14 11.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Z" />
    <path d="M11.5 12.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
    <path d="M10 14.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Z" />
    <path d="M12.5 15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
    <path d="M14 17.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Z" />
    <path d="M11.5 18.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
    <path d="M17 12.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Z" />
    <path d="M14.5 13.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
    <path d="M17 15.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Z" />
    <path d="M14.5 16.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
    <path d="M7 12.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Z" />
    <path d="M9.5 13.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
    <path d="M7 15.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Z" />
    <path d="M9.5 16.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
  </svg>
);
const IconWorkflow: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
);
const IconFileDown: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
);
const IconFileUp: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 12v6"/><path d="m9 15 3-3 3 3"/></svg>
);
const IconReplace: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M14 4c0-1.1.9-2 2-2"/><path d="M20 2c1.1 0 2 .9 2 2"/><path d="M22 8c0 1.1-.9 2-2 2"/><path d="M16 10c-1.1 0-2-.9-2-2"/><path d="M7 21v-4"/><path d="M3 17v4"/><path d="M5 19H3"/><path d="M7 19H5"/><path d="m20.7 18.2-1.1-1.1a2 2 0 0 0-2.8 0L14 20h-2v-2l2.8-2.8a2 2 0 0 0 0-2.8l-1.1-1.1"/><path d="M11 4H9a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Z"/><path d="M5 10v4c0 1.1.9 2 2 2h4"/></svg>
);
const IconYoutube: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);
const IconSettings: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V10a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="8" r="2"/></svg>
);
const IconPieChart: React.FC<IconComponentProps> = (props) => ( // 타입 변경
  <svg {...iconProps(props)}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
);

// --- Global Constants ---
const THEME_COLORS = {
  primary: '#3B82F6', // blue-500
  secondary: '#10B981', // emerald-500
  background: '#f1f5f9', // slate-100
  card: '#ffffff',
  text: '#1e293b', // slate-800
  textSecondary: '#64748b', // slate-500
  accent: '#f43f5e', // rose-500
};

// --- Type Definitions ---
interface StStockMoveProps {
  title: string;
  refVal1?: string;
}

interface PagePlaceholderProps {
  title: string;
}

interface NavItemProps {
  item: NavMenuItem;
  currentPage: CurrentPage;
  onPageChange: (page: string, props?: Record<string, any>) => void;
}

interface NavMenuItem {
  name: string;
  icon: React.ReactNode;
  page?: string;
  props?: Record<string, any>;
  subItems?: NavMenuItem[];
}

interface CurrentPage {
  page: string;
  props?: Record<string, any>;
}

interface UserContextType {
  user: { name: string } | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
  openLoginModal: () => void;
}

// --- Utility Components ---

/**
 * A simple, reusable modal component.
 */
const Modal: React.FC<React.PropsWithChildren<{ isOpen: boolean; onClose: () => void }>> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Login</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <IconX size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/**
 * A loading spinner component.
 */
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full w-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

/**
 * A placeholder for a page or component.
 */
const PagePlaceholder: React.FC<PagePlaceholderProps> = ({ title }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
    <p className="mt-2 text-slate-600">This is a placeholder page for {title}.</p>
    <div className="mt-6 border border-dashed border-slate-300 rounded-lg h-64 flex items-center justify-center">
      <span className="text-slate-400 text-lg">Content Area</span>
    </div>
  </div>
);

// --- Authentication Context ---

const UserContext = createContext<UserContextType | null>(null);

/**
 * Provides user authentication state and login/logout functions.
 */
const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = (username: string) => {
    setUser({ name: username });
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    openLoginModal,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
      <LoginPop isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </UserContext.Provider>
  );
};

/**
 * Hook to access user context.
 */
const useLogin = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useLogin must be used within a UserProvider');
  }
  return context;
};

// --- Authentication Components ---

/**
 * A simple login popup modal.
 */
const LoginPop: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const { login } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-center mb-6">WMS Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="username-modal">
              Username
            </label>
            <input
              id="username-modal"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., admin"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </Modal>
  );
};

/**
 * A full-page login component.
 */
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const { login } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <IconWarehouse size={48} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          WMS Portal
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="username-page">
              Username
            </label>
            <input
              id="username-page"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password-page">
              Password
            </label>
            <input
              id="password-page"
              type="password"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
          <p className="text-center text-sm text-slate-500 mt-4">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

// --- Page Components (Placeholders) ---
// All pages are defined here to avoid import errors.

const RegisterPage: React.FC = () => <PagePlaceholder title="Register" />;
const ErrorPage: React.FC = () => <PagePlaceholder title="Error: Page Not Found" />;

// Blog Pages
const ExcelFileToJson: React.FC = () => <PagePlaceholder title="Excel File to JSON" />;
const ExcelDataToJson: React.FC = () => <PagePlaceholder title="Excel Data to JSON" />;
const StrArrChangeStr: React.FC = () => <PagePlaceholder title="String Array Change String" />;
const YouTubeDownloader: React.FC = () => <PagePlaceholder title="YouTube Downloader" />;

// Company Pages
const CompanyOverview: React.FC = () => <PagePlaceholder title="Company Overview" />;
const CompanyVision: React.FC = () => <PagePlaceholder title="Company Vision" />;

// WMS System Pages
const SysCode: React.FC = () => <PagePlaceholder title="System Code Management" />;

// WMS Standard Data (SD) Pages
const SdBiz: React.FC = () => <PagePlaceholder title="Business Partners" />;
const SdClient: React.FC = () => <PagePlaceholder title="Clients" />;
const SdDc: React.FC = () => <PagePlaceholder title="Distribution Centers" />;
const SdArea: React.FC = () => <PagePlaceholder title="Storage Areas" />;
const SdZone: React.FC = () => <PagePlaceholder title="Storage Zones" />;
const SdLoc: React.FC = () => <PagePlaceholder title="Storage Locations" />;
const SdStore: React.FC = () => <PagePlaceholder title="Stores" />;
const SdSupplier: React.FC = () => <PagePlaceholder title="Suppliers" />;
const SdItem: React.FC = () => <PagePlaceholder title="Items" />;
const SdItemClass: React.FC = () => <PagePlaceholder title="Item Classes" />;
const SdItemUom: React.FC = () => <PagePlaceholder title="Item Units of Measure" />;
const Sd3dLoc: React.FC = () => <PagePlaceholder title="3D Location View" />;

// WMS Inbound (IB) Pages
const IbInboundInq: React.FC = () => <PagePlaceholder title="Inbound Inquiry" />;
const IbInboundPlan: React.FC = () => <PagePlaceholder title="Inbound Plan" />;
const IbInboundExam: React.FC = () => <PagePlaceholder title="Inbound Examination" />;
// IbInboundPutw is handled by StStockMove with props

// WMS Stock (ST) Pages
// This component now handles multiple "pages" via props
const StStockMove: React.FC<StStockMoveProps> = ({ title, refVal1 }) => (
  <PagePlaceholder title={`${title} (Ref: ${refVal1 || 'N/A'})`} />
);
const StStockInqueryByItem: React.FC = () => <PagePlaceholder title="Stock Inquiry by Item" />;
const StStockInqueryByLoc: React.FC = () => <PagePlaceholder title="Stock Inquiry by Location" />;

// WMS Outbound (OB) Pages
const ObOutboundPlan: React.FC = () => <PagePlaceholder title="Outbound Plan" />;
const ObOutboundAllot: React.FC = () => <PagePlaceholder title="Outbound Allotment" />;
// ObOutboundPicking is handled by StStockMove with props

// --- Dashboard Component ---

/**
 * A widget for the dashboard.
 */
const DashboardWidget: React.FC<{ title: string, value: string, icon: React.ReactNode, trend?: string, chart?: React.ReactNode }> = ({ title, value, icon, trend, chart }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-start">
      <div>
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
        {trend && (
          <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend} vs last month
          </span>
        )}
      </div>
      <div className="p-3 bg-blue-100 rounded-full text-blue-500">
        {icon}
      </div>
    </div>
    {chart && <div className="mt-4 h-24">{chart}</div>}
  </div>
);

/**
 * The main dashboard page content.
 */
const Dashboard: React.FC = () => {
  const inboundData = [
    { name: 'Mon', Inbound: 400 },
    { name: 'Tue', Inbound: 300 },
    { name: 'Wed', Inbound: 500 },
    { name: 'Thu', Inbound: 700 },
    { name: 'Fri', Inbound: 600 },
    { name: 'Sat', Inbound: 800 },
  ];

  const outboundData = [
    { name: 'Mon', Outbound: 350 },
    { name: 'Tue', Outbound: 280 },
    { name: 'Wed', Outbound: 550 },
    { name: 'Thu', Outbound: 650 },
    { name: 'Fri', Outbound: 620 },
    { name: 'Sat', Outbound: 750 },
  ];

  const inventoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Apparel', value: 300 },
    { name: 'Groceries', value: 300 },
    { name: 'Home Goods', value: 200 },
  ];
  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
      
      {/* Widgets Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget
          title="Orders Today"
          value="1,280"
          icon={<IconPackage size={24} />}
          trend="+12.5%"
        />
        <DashboardWidget
          title="Inbound Shipments"
          value="42"
          icon={<IconPackagePlus size={24} />}
          trend="+2.4%"
        />
        <DashboardWidget
          title="Outbound Shipments"
          value="36"
          icon={<IconPackageMinus size={24} />}
          trend="-1.8%"
        />
        <DashboardWidget
          title="Inventory Fill Rate"
          value="92.8%"
          icon={<IconArchive size={24} />}
          trend="+0.5%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Shipment Volume</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inboundData.map((d, i) => ({ ...d, Outbound: outboundData[i].Outbound }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Inbound" fill={THEME_COLORS.primary} />
              <Bar dataKey="Outbound" fill={THEME_COLORS.secondary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Inventory by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


// --- Layout Components ---

/**
 * Header component with search and user menu.
 */
const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { user, logout, openLoginModal } = useLogin();

  return (
    <header className="flex items-center justify-between h-16 bg-white shadow-md px-4 md:px-6 z-10">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:text-slate-800 mr-4"
        >
          <IconMenu size={24} />
        </button>
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-transparent focus:bg-white focus:border-slate-300 focus:outline-none"
          />
          <IconSearch size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <button className="flex items-center space-x-2">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline text-sm font-medium text-slate-700">{user.name}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Settings</a>
              <button
                onClick={logout}
                className="w-full text-left block px-4 py-2 text-sm text-rose-500 hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={openLoginModal}
            className="flex items-center text-sm font-medium text-blue-500 hover:text-blue-600"
          >
            <IconLogIn size={18} className="mr-1" />
            Login
          </button>
        )}
      </div>
    </header>
  );
};

// --- Sidebar Navigation Data ---
// Updated to include props for StStockMove pages
const navMenu: NavMenuItem[] = [
  { name: 'Dashboard', icon: <IconLayoutDashboard size={20} />, page: 'Dashboard' },
  { 
    name: 'WMS', 
    icon: <IconWarehouse size={20} />,
    subItems: [
      { 
        name: 'System', 
        icon: <IconSettings size={18} />, 
        subItems: [
          { name: 'Code', icon: <IconAppWindow size={16} />, page: 'SysCode' }
        ] 
      },
      { 
        name: 'Standard Data', 
        icon: <IconDatabase size={18} />, 
        subItems: [
          { name: 'Biz Partner', icon: <IconUsers2 size={16} />, page: 'SdBiz' },
          { name: 'Client', icon: <IconBuilding2 size={16} />, page: 'SdClient' },
          { name: 'DC', icon: <IconBuilding size={16} />, page: 'SdDc' },
          { name: 'Area', icon: <IconMapPin size={16} />, page: 'SdArea' },
          { name: 'Zone', icon: <IconMapPin size={16} />, page: 'SdZone' },
          { name: 'Location', icon: <IconMapPin size={16} />, page: 'SdLoc' },
          { name: 'Store', icon: <IconBuilding2 size={16} />, page: 'SdStore' },
          { name: 'Supplier', icon: <IconUsers2 size={16} />, page: 'SdSupplier' },
          { name: 'Item', icon: <IconBox size={16} />, page: 'SdItem' },
          { name: 'Item Class', icon: <IconListTree size={16} />, page: 'SdItemClass' },
          { name: 'Item UOM', icon: <IconRuler size={16} />, page: 'SdItemUom' },
          { name: '3D Location', icon: <IconGlobe2 size={16} />, page: 'Sd3dLoc' },
        ]
      },
      { 
        name: 'Inbound', 
        icon: <IconPackagePlus size={18} />,
        subItems: [
          { name: 'Inbound Inquiry', icon: <IconSearch size={16} />, page: 'IbInboundInq' },
          { name: 'Inbound Plan', icon: <IconFileText size={16} />, page: 'IbInboundPlan' },
          { name: 'Inbound Exam', icon: <IconFileText size={16} />, page: 'IbInboundExam' },
          { name: 'Inbound Putaway', icon: <IconMove size={16} />, page: 'StStockMove', props: { title: '입고 적치', refVal1: 'IB_INST' } },
        ]
      },
      { 
        name: 'Stock', 
        icon: <IconArchive size={18} />,
        subItems: [
          { name: 'Stock Move', icon: <IconMove size={16} />, page: 'StStockMove', props: { title: '재고 이동' } },
          { name: 'Inquiry (Item)', icon: <IconSearch size={16} />, page: 'StStockInqueryByItem' },
          { name: 'Inquiry (Loc)', icon: <IconSearch size={16} />, page: 'StStockInqueryByLoc' },
        ]
      },
      { 
        name: 'Outbound', 
        icon: <IconPackageMinus size={18} />,
        subItems: [
          { name: 'Outbound Plan', icon: <IconFileText size={16} />, page: 'ObOutboundPlan' },
          { name: 'Outbound Allot', icon: <IconWorkflow size={16} />, page: 'ObOutboundAllot' },
          { name: 'Outbound Picking', icon: <IconMove size={16} />, page: 'StStockMove', props: { title: '출고 피킹', refVal1: 'OB_INST' } },
        ]
      },
    ] 
  },
  { 
    name: 'Company', 
    icon: <IconBuilding size={20} />, 
    subItems: [
      { name: 'Overview', icon: <IconPieChart size={18} />, page: 'CompanyOverview' },
      { name: 'Vision', icon: <IconBrain size={18} />, page: 'CompanyVision' },
    ]
  },
  {
    name: 'Blog',
    icon: <IconFileText size={20} />,
    subItems: [
      { name: 'Excel to JSON', icon: <IconFileUp size={18} />, page: 'ExcelFileToJson' },
      { name: 'Data to JSON', icon: <IconFileDown size={18} />, page: 'ExcelDataToJson' },
      { name: 'String Array', icon: <IconReplace size={18} />, page: 'StrArrChangeStr' },
      { name: 'YouTube', icon: <IconYoutube size={18} />, page: 'YouTubeDownloader' },
    ]
  }
];

/**
 * A single navigation item in the sidebar, handles sub-menus.
 */
const NavItem: React.FC<NavItemProps> = ({ item, currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isParentActive = item.subItems && item.subItems.some(sub => 
    sub.page === currentPage.page || (sub.subItems && sub.subItems.some(s => s.page === currentPage.page))
  );
  
  // Auto-open parent if a child is active
  useEffect(() => {
    if (isParentActive) {
      setIsOpen(true);
    }
  }, [isParentActive]);

  const handleClick = () => {
    if (item.subItems) {
      setIsOpen(!isOpen);
    } else if (item.page) {
      onPageChange(item.page, item.props);
    }
  };

  const isActive = currentPage.page === item.page && JSON.stringify(currentPage.props) === JSON.stringify(item.props);

  return (
    <li className="my-1">
      <button
        onClick={handleClick}
        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md transition-colors duration-150
          ${isActive ? 'bg-blue-500 text-white shadow-lg' :
            (isParentActive ? 'text-blue-500' : 'text-slate-200 hover:text-white hover:bg-slate-700/50')}
        `}
      >
        <div className="flex items-center space-x-3">
          {item.icon}
          <span className="font-medium text-sm">{item.name}</span>
        </div>
        {item.subItems && (
          <IconChevronRight size={16} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        )}
      </button>
      {item.subItems && isOpen && (
        <ul className="pl-6 mt-1 border-l border-slate-700">
          {item.subItems.map(subItem => (
            <NavItem key={subItem.name} item={subItem} currentPage={currentPage} onPageChange={onPageChange} />
          ))}
        </ul>
      )}
    </li>
  );
};

/**
 * Sidebar component.
 */
const Sidebar: React.FC<{ isSidebarOpen: boolean; currentPage: CurrentPage; onPageChange: (page: string, props?: Record<string, any>) => void }> = ({ isSidebarOpen, currentPage, onPageChange }) => {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-800 text-white
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col shadow-lg`}
    >
      <div className="flex items-center justify-center h-16 px-4 shadow-md bg-slate-900/50">
        <IconWarehouse size={28} className="text-blue-400" />
        <h1 className="ml-3 text-xl font-bold text-white">WMS Portal</h1>
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul>
          {navMenu.map(item => (
            <NavItem key={item.name} item={item} currentPage={currentPage} onPageChange={onPageChange} />
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400">&copy; 2025 WMS Inc.</p>
      </div>
    </aside>
  );
};

// --- Page Component Mapping ---
// Maps page name strings to the actual components
const pageMap: { [key: string]: ComponentType<any> } = {
  Dashboard,
  ErrorPage,
  LoginPage,
  RegisterPage,
  ExcelFileToJson,
  ExcelDataToJson,
  StrArrChangeStr,
  YouTubeDownloader,
  CompanyOverview,
  CompanyVision,
  SysCode,
  SdBiz,
  SdClient,
  SdDc,
  SdArea,
  SdZone,
  SdLoc,
  SdStore,
  SdSupplier,
  SdItem,
  SdItemClass,
  SdItemUom,
  Sd3dLoc,
  IbInboundInq,
  IbInboundPlan,
  IbInboundExam,
  StStockMove,
  StStockInqueryByItem,
  StStockInqueryByLoc,
  ObOutboundPlan,
  ObOutboundAllot,
};


/**
 * Main layout combining Sidebar, Header, and content area.
 */
const MainLayout: React.FC<{ currentPage: CurrentPage; onPageChange: (page: string, props?: Record<string, any>) => void }> = ({ currentPage, onPageChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlePageChange = (page: string, props?: Record<string, any>) => {
    onPageChange(page, props);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const CurrentPageComponent = pageMap[currentPage.page] || ErrorPage;

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          aria-hidden="true"
        ></div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          <Suspense fallback={<LoadingSpinner />}>
            <CurrentPageComponent {...currentPage.props} />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

/**
 * The main App component.
 * It manages authentication state and renders either the
 * Login page or the Main Layout.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>({ page: 'Dashboard' });

  return (
    <UserProvider>
      <AppContent 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
    </UserProvider>
  );
}

const AppContent: React.FC<{ currentPage: CurrentPage; setCurrentPage: (page: CurrentPage) => void }> = ({ currentPage, setCurrentPage }) => {
  const { isLoggedIn } = useLogin();

  const handlePageChange = (page: string, props: Record<string, any> = {}) => {
    setCurrentPage({ page, props });
  };

  // 라우팅은 index.js에서 처리하므로, WMS 포탈 앱은
  // 인증 상태에 따라 로그인 페이지 또는 메인 레이아웃을 보여주는 로직만 가집니다.
  
  // index.js에서 /portal/* 로 이미 들어온 상태이므로,
  // 여기서는 로그인 여부만 체크합니다.
  if (!isLoggedIn) {
     // WMS 포탈 내의 로그인 페이지
     // return <LoginPage />;
    
    // 또는, 이 예제처럼 로그인 모달을 띄우기 위해
    // 메인 레이아웃을 보여주고 헤더에서 로그인을 유도할 수 있습니다.
    return <MainLayout currentPage={currentPage} onPageChange={handlePageChange} />;
  }
  
  return <MainLayout currentPage={currentPage} onPageChange={handlePageChange} />;
};