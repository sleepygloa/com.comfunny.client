import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Package, PackagePlus, PackageMinus, Archive } from 'lucide-react';

// --- 아이콘 유틸리티 ---
const iconDefaults = { width: 24, height: 24, strokeWidth: 2 };
const Icon = ({ Icon, ...props }: any) => <Icon {...iconDefaults} {...props} />;

const DashboardWidget = ({ title, value, icon, trend, chart }: any) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
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
      <div className="p-3 bg-blue-50 rounded-full text-blue-600">
        {icon}
      </div>
    </div>
    {chart && <div className="mt-4 h-24">{chart}</div>}
  </div>
);

const WmsDashboard = () => {
  const THEME_COLORS = {
    primary: '#3B82F6',
    secondary: '#10B981',
  };

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
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
         <h1 className="text-2xl font-bold text-slate-800">WMS Operation Dashboard</h1>
         <span className="text-sm text-slate-500">Real-time Logistics Data</span>
      </div>
      
      {/* Widgets Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget
          title="Orders Today"
          value="1,280"
          icon={<Icon Icon={Package} />}
          trend="+12.5%"
        />
        <DashboardWidget
          title="Inbound Shipments"
          value="42"
          icon={<Icon Icon={PackagePlus} />}
          trend="+2.4%"
        />
        <DashboardWidget
          title="Outbound Shipments"
          value="36"
          icon={<Icon Icon={PackageMinus} />}
          trend="-1.8%"
        />
        <DashboardWidget
          title="Inventory Fill Rate"
          value="92.8%"
          icon={<Icon Icon={Archive} />}
          trend="+0.5%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
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
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
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

export default WmsDashboard;