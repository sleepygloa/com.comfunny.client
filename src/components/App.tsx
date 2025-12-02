import React, { useState, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Warehouse, Package, Archive, Settings, LogIn,
  Menu, ChevronRight, ChevronDown, X, Search,
  FileText, MonitorPlay, Wrench, MessageSquare, User,
  ArrowLeftRight, FileJson, Type, Table, FileSpreadsheet, AlignLeft, Youtube
} from 'lucide-react';

// [IMPORT] 대시보드 컴포넌트
// 실제 파일 경로에 맞게 수정 필요 (없는 경우 에러 발생 가능)
import PortalDashboard from '../pages/portal/dashboard/Dashboard';
import WmsDashboard from '../pages/wms/dashboard/WmsDashboard';

// [IMPORT] 유틸리티 도구 (블로그 메뉴)
import ExcelDataToJson from '../pages/blog/ExcelDataToJson';
import ExcelFileToJson from '../pages/blog/ExcelFileToJson'; // default export로 변경됨
import StrArrChangeStr from '../pages/blog/StrArrChangeStr'; // default export로 변경됨
import YouTubeDownloader from '../pages/blog/YouTubeDownloader';

//시스템
import Code from '../pages/wms/sys/Code';
import Scheduler from '../pages/wms/sys/Scheduler';

//기준정보
import Biz from '../pages/wms/sd/Biz';
import Client from '../pages/wms/sd/Client';
import Dc from '../pages/wms/sd/Dc';
import Item from '../pages/wms/sd/Item';
import ItemClass from '../pages/wms/sd/ItemClass';
import ItemUom from '../pages/wms/sd/ItemUom';
import Area from '../pages/wms/sd/Area';
import LocationManagement from '../pages/wms/sd/Loc';
import Store from '../pages/wms/sd/Store';
import Supplier from '../pages/wms/sd/Supplier';
import Zone from '../pages/wms/sd/Zone';

//입고
import InboundPlan from '../pages/wms/ib/InboundPlan';
import InboundExam from '../pages/wms/ib/InboundExam';
import InboundInq from '../pages/wms/ib/InboundInq';

//재고
import StockMove from '../pages/wms/st/StockMove';
import StockInqByItem from '../pages/wms/st/StockInqByItem';
import StockInqByLoc from '../pages/wms/st/stockInqByLoc';

//출고
import OutboundPlan from '../pages/wms/ob/OutboundPlan';
import OutboundAllot from '../pages/wms/ob/OutboundAllot';
import OutboundInq from '../pages/wms/ob/OutboundInq';



import { sub } from 'date-fns';



// --- 아이콘 유틸리티 ---
const iconDefaults = { width: 20, height: 20, strokeWidth: 2 };
const Icon = ({ Icon, ...props }: any) => <Icon {...iconDefaults} {...props} />;

// --- [PAGE] 내부 유틸리티: JSON to XML ---
const JsonToXmlTool = () => {
  const [input, setInput] = useState('{"name": "Comfunny", "type": "Developer"}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      const jsonObj = JSON.parse(input);
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
      for (const key in jsonObj) {
        xml += `  <${key}>${jsonObj[key]}</${key}>\n`;
      }
      xml += '</root>';
      setOutput(xml);
      setError('');
    } catch (e) {
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
        <FileJson className="text-orange-500"/> JSON to XML Converter
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">JSON Input</label>
          <textarea 
            className="w-full h-80 p-4 border border-slate-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-slate-50"
            value={input} onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">XML Output</label>
          <textarea 
            className="w-full h-80 p-4 border border-slate-300 rounded-lg font-mono text-sm bg-slate-100 text-slate-600 resize-none"
            value={output} readOnly
          />
        </div>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm font-medium">{error}</p>}
      <div className="mt-6 flex justify-end">
        <button onClick={handleConvert} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-colors shadow-sm">
          Convert JSON to XML
        </button>
      </div>
    </div>
  );
};

// --- [PAGE] 공통 플레이스홀더 ---
const PagePlaceholder = ({ title, desc }: { title: string, desc: string }) => (
  <div className="p-8 max-w-5xl mx-auto">
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 text-center">
      <h1 className="text-3xl font-bold text-slate-800 mb-3">{title}</h1>
      <p className="text-slate-500 text-lg">{desc}</p>
      <div className="mt-10 p-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
        <span className="text-slate-400 font-medium">페이지 준비 중입니다.</span>
      </div>
    </div>
  </div>
);

// --- 메뉴 데이터 정의 ---
const MENU_ITEMS = [
  { 
    name: 'Portal Home', 
    icon: LayoutDashboard, 
    path: '/portal' 
  },
  { 
    name: 'WMS System', 
    icon: Warehouse,
    subItems: [
      { name: 'Dashboard', path: '/portal/wms/dashboard' },
      { name: '기준정보', subItems: [
        { name: '사업장 관리', path: '/portal/wms/sd/biz' },
        { name: '창고 관리', path: '/portal/wms/sd/dc' },
        { name: '구역 관리', path: '/portal/wms/sd/area' },
        { name: '존 관리', path: '/portal/wms/sd/zone' },
        { name: '로케이션 관리', path: '/portal/wms/sd/loc' },
        { name: '고객사 관리', path: '/portal/wms/sd/client' },
        { name: '품목 관리', path: '/portal/wms/sd/item' },
        { name: '품목 분류 관리', path: '/portal/wms/sd/itemClass' },
        { name: '품목 단위 관리', path: '/portal/wms/sd/itemUom' },
        { name: '배송처 관리', path: '/portal/wms/sd/store' },
      ]},
      { name: '입고관리', subItems: [
        { name: '입고예정', path: '/portal/wms/inboundPlan' },
        { name: '입고검수', path: '/portal/wms/inboundExam' },
        { name: '입고현황', path: '/portal/wms/inboundInq' },
      ]},
      { name: '재고관리', subItems: [
        { name: '재고이동', path: '/portal/wms/stock/stockMove' },
        { name: '로케이션별 재고조회', path: '/portal/wms/stock/stockInqByLoc' },
        { name: '제품별 재고조회', path: '/portal/wms/stock/stockInqByItem' },
      ]},
      { name: '출고관리', subItems: [
        { name: '출고예정', path: '/portal/wms/outboundPlan' },
        { name: '출고지시', path: '/portal/wms/outboundAllot' },
        { name: '출고현황', path: '/portal/wms/outboundInq' },
      ] 
      },
    ] 
  },
  {
    name: 'Dev Tools',
    icon: Wrench,
    subItems: [
      { name: 'Excel Data to JSON', icon: Table, path: '/portal/tools/excel-data' },
      { name: 'Excel File to JSON', icon: FileSpreadsheet, path: '/portal/tools/excel-file' },
      { name: 'String Replacer', icon: AlignLeft, path: '/portal/tools/string-replace' },
      { name: 'JSON to XML', icon: FileJson, path: '/portal/tools/json2xml' },
      { name: 'YouTube Downloader', icon: Youtube, path: '/portal/tools/youtube' },
    ]
  },
  { 
    name: 'Office Board', 
    icon: MessageSquare,
    subItems: [
      { name: '공지사항', path: '/portal/board/notice' },
      { name: '자유게시판', path: '/portal/board/free' },
      { name: '기술 블로그', path: '/portal/blog/tech' },
    ] 
  },
  {
    name: 'Playground',
    icon: MonitorPlay,
    subItems: [
      { name: 'Insta Clone', path: '/portal/app/insta' },
      { name: 'Todo List', path: '/portal/app/todo' },
    ]
  }
];

// --- 사이드바 아이템 컴포넌트 ---
const SidebarItem = ({ item, depth = 0 }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // 현재 경로가 하위 아이템 경로를 포함하면 메뉴 열기
  useEffect(() => {
    if (item.subItems && item.subItems.some((sub: any) => location.pathname.startsWith(sub.path))) {
      setIsOpen(true);
    }
  }, [location.pathname, item.subItems]);

  const isActive = item.path ? location.pathname === item.path : false;
  const hasSub = item.subItems && item.subItems.length > 0;

  const handleClick = () => {
    if (hasSub) {
      setIsOpen(!isOpen);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className={`
          flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200
          ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
          ${depth > 0 ? 'pl-12 text-sm' : 'font-medium'}
        `}
      >
        <div className="flex items-center gap-3">
          {item.icon && <Icon Icon={item.icon} size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />}
          <span>{item.name}</span>
        </div>
        {hasSub && (
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </div>
      {hasSub && (
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
          <div className="bg-slate-50/50 py-1">
            {item.subItems.map((sub: any) => (
              <SidebarItem key={sub.name} item={sub} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// --- 사이드바 컴포넌트 ---
const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <>
      {/* 모바일 오버레이 */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose} 
      />
      
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-30 transition-transform duration-300 shadow-lg lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-sm">
            P
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">WMS Portal</span>
          <button className="ml-auto lg:hidden text-slate-400 hover:text-slate-600" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-64px)] py-4 custom-scrollbar">
          {MENU_ITEMS.map((item, idx) => (
            <SidebarItem key={idx} item={item} />
          ))}
        </div>
      </aside>
    </>
  );
};

// --- 헤더 컴포넌트 ---
const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
    <div className="flex items-center gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md">
        <Menu size={24} />
      </button>
      <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-64 border border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all">
        <Search size={18} className="text-slate-400 mr-2" />
        <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full text-slate-700" />
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
        <MessageSquare size={20} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>
      <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 border border-indigo-200">
          <User size={18} />
        </div>
        <div className="hidden md:flex flex-col items-start">
           <span className="text-sm font-bold text-slate-700 leading-none">Kim Developer</span>
           <span className="text-xs text-slate-500 mt-0.5">Administrator</span>
        </div>
      </div>
    </div>
  </header>
);

// --- [MAIN] App 컴포넌트 ---
export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Routes>
            {/* 1. Dashboard Routing */}
            <Route path="/" element={<PortalDashboard />} />
            <Route path="wms/dashboard" element={<WmsDashboard />} />
            
            <Route path="wms/sys/code" element={<Code />} />
            <Route path="wms/sys/scheduler" element={<Scheduler />} />
            
            {/* 2. WMS System Pages */}
            <Route path="wms/sd/biz" element={<Biz />} />
            <Route path="wms/sd/dc" element={<Dc />} />
            <Route path="wms/sd/area" element={<Area />} />
            <Route path="wms/sd/zone" element={<Zone />} />
            <Route path="wms/sd/loc" element={<LocationManagement />} />
            <Route path="wms/sd/client" element={<Client />} />
            <Route path="wms/sd/item" element={<Item />} />
            <Route path="wms/sd/itemClass" element={<ItemClass />} />
            <Route path="wms/sd/itemUom" element={<ItemUom />} />
            <Route path="wms/sd/store" element={<Store />} />
            <Route path="wms/sd/supplier" element={<Supplier />} />


            <Route path="wms/ib/inboundPlan" element={<InboundPlan />} />
            <Route path="wms/ib/inboundExam" element={<InboundExam />} />
            <Route path="wms/ib/inboundInq" element={<InboundInq />} />

            <Route path="wms/st/stockMove" element={<StockMove />} />
            <Route path="wms/st/stockInqByLoc" element={<StockInqByLoc />} />
            <Route path="wms/st/stockInqByItem" element={<StockInqByItem />} />

            <Route path="wms/ob/outboundPlan" element={<OutboundPlan />} />
            <Route path="wms/ob/outboundAllot" element={<OutboundAllot />} />
            <Route path="wms/ob/outboundInq" element={<OutboundInq />} />

            {/* 3. Office Board Pages */}
            <Route path="board/notice" element={<PagePlaceholder title="공지사항" desc="사내 주요 공지사항 게시판" />} />
            <Route path="board/free" element={<PagePlaceholder title="자유게시판" desc="임직원 자유 소통 공간" />} />
            <Route path="blog/tech" element={<PagePlaceholder title="기술 블로그" desc="개발팀 기술 공유 및 문서화" />} />

            {/* 4. Dev Tools (Actual Components) */}
            <Route path="tools/json2xml" element={<JsonToXmlTool />} />
            <Route path="tools/excel-data" element={<ExcelDataToJson />} />
            <Route path="tools/excel-file" element={<ExcelFileToJson />} />
            <Route path="tools/string-replace" element={<StrArrChangeStr />} />
            <Route path="tools/youtube" element={<YouTubeDownloader />} />
            <Route path="tools/base64" element={<PagePlaceholder title="Base64 Encoder" desc="Base64 인코딩/디코딩 도구" />} />
            <Route path="tools/diff" element={<PagePlaceholder title="Text Diff Checker" desc="텍스트/코드 차이점 비교 도구" />} />

            {/* 5. Playground Pages */}
            <Route path="app/insta" element={<PagePlaceholder title="Instagram Clone" desc="사내 소셜 미디어 앱 (Toy Project)" />} />
            <Route path="app/todo" element={<PagePlaceholder title="Todo List" desc="개인 업무 관리 투두리스트" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}