import React, { useState } from 'react';
import {
  CheckSquare, Bell, ExternalLink, FileJson, LayoutDashboard,
  Calendar, Users, TrendingUp, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- 아이콘 유틸리티 ---
const iconDefaults = { width: 20, height: 20, strokeWidth: 2 };
const Icon = ({ Icon, className, ...props }: any) => <Icon {...iconDefaults} className={className} {...props} />;

// --- [Widget] Summary Card ---
const SummaryCard = ({ title, value, icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} text-white shadow-sm`}>
        <Icon Icon={icon} size={20} />
      </div>
    </div>
    {trend && (
      <div className="flex items-center text-sm">
        <span className={`font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-slate-400 ml-2">vs last month</span>
      </div>
    )}
  </div>
);

// --- [Widget] Todo List ---
const TodoListWidget = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'WMS 입고 로직 검토', done: false },
    { id: 2, text: 'API 문서 업데이트', done: true },
    { id: 3, text: '주간 회의 자료 준비', done: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Icon Icon={CheckSquare} className="text-blue-500" /> My Tasks
        </h3>
        <button className="text-xs text-slate-400 hover:text-blue-600">View All</button>
      </div>
      <div className="space-y-3">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" onClick={() => toggleTodo(todo.id)}>
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${todo.done ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
              {todo.done && <span className="text-white text-xs">✓</span>}
            </div>
            <span className={`text-sm ${todo.done ? 'text-slate-400 line-through' : 'text-slate-600'}`}>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- [Widget] Quick Links ---
const QuickLinksWidget = () => {
  const navigate = useNavigate();
  const links = [
    { name: 'JSON Converter', icon: FileJson, path: '/portal/tools/json2xml', color: 'bg-orange-50 text-orange-600' },
    { name: 'WMS Dashboard', icon: LayoutDashboard, path: '/portal/wms/dashboard', color: 'bg-blue-50 text-blue-600' },
    { name: 'Company Home', icon: ExternalLink, path: '/', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Icon Icon={ExternalLink} className="text-purple-500" /> Quick Links
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {links.map((link, idx) => (
          <button 
            key={idx}
            onClick={() => navigate(link.path)}
            className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left w-full"
          >
            <div className={`p-2 rounded-lg mr-4 ${link.color}`}>
              <Icon Icon={link.icon} size={18} />
            </div>
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 flex-1">{link.name}</span>
            <Icon Icon={ArrowRight} className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </div>
  );
};

// --- [Widget] Notice Board ---
const NoticeWidget = () => {
  const notices = [
    { id: 1, title: '[공지] 서버 정기 점검 안내', date: '2025-05-20', tag: 'System' },
    { id: 2, title: '5월 사내 해커톤 개최', date: '2025-05-15', tag: 'Event' },
    { id: 3, title: '신규 입사자 환영회', date: '2025-05-10', tag: 'Culture' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Icon Icon={Bell} className="text-red-500" /> Notice
        </h3>
        <button className="text-xs text-slate-400 hover:text-blue-600">More</button>
      </div>
      <div className="space-y-4">
        {notices.map(notice => (
          <div key={notice.id} className="border-b border-slate-50 last:border-0 pb-3 last:pb-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500">{notice.tag}</span>
              <span className="text-xs text-slate-400">{notice.date}</span>
            </div>
            <p className="text-sm text-slate-700 hover:text-blue-600 cursor-pointer truncate">{notice.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back, Kim! 👋</h1>
          <p className="text-slate-500 text-sm">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-2">
           <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">Ver 1.2.0</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Active Users" value="2,345" icon={Users} color="bg-blue-500" trend={12} />
        <SummaryCard title="Total Orders" value="842" icon={CheckSquare} color="bg-purple-500" trend={5} />
        <SummaryCard title="Revenue" value="$12.5k" icon={TrendingUp} color="bg-green-500" trend={-2} />
        <SummaryCard title="Events" value="8" icon={Calendar} color="bg-orange-500" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-96">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <h3 className="font-bold text-slate-800 mb-4">Weekly Activity</h3>
           <div className="w-full h-64 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
             Chart Component Area
           </div>
        </div>
        
        {/* Right Column (1/3) - Todo */}
        <div className="lg:col-span-1">
          <TodoListWidget />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <QuickLinksWidget />
         <NoticeWidget />
      </div>
    </div>
  );
};

export default Dashboard;