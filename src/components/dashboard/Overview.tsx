import { motion } from 'motion/react';
import { Database, Droplet, CloudRain, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { reservoirs } from '@/src/data';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '@/src/lib/utils';

export default function Dashboard() {
  const totalCapacity = reservoirs.reduce((acc, r) => acc + r.capacity, 0);
  const avgLevel = (reservoirs.reduce((acc, r) => acc + (r.waterLevel / r.limitLevel), 0) / reservoirs.length * 100).toFixed(1);
  const maxRainfall = Math.max(...reservoirs.map(r => r.rainfall24h));

  const stats = [
    { label: 'Total Managed Capacity', value: `${totalCapacity}M m³`, icon: Database, color: 'text-blue-600' },
    { label: 'Average Storage Level', value: `${avgLevel}%`, icon: Droplet, color: 'text-teal-600' },
    { label: 'Max 24h Rainfall', value: `${maxRainfall}mm`, icon: CloudRain, color: 'text-indigo-600' },
    { label: 'System Health', value: '98.2%', icon: Activity, color: 'text-green-600' },
  ];

  const chartData = [
    { time: '00:00', level: 85, rain: 2 },
    { time: '04:00', level: 86, rain: 5 },
    { time: '08:00', level: 88, rain: 12 },
    { time: '12:00', level: 92, rain: 25 },
    { time: '16:00', level: 90, rain: 18 },
    { time: '20:00', level: 89, rain: 10 },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 border border-[#141414] relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded bg-opacity-10", stat.color.replace('text', 'bg'))}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <span className="text-[10px] font-mono opacity-40 uppercase tracking-tighter">Real-time</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-serif italic opacity-60 leading-none">{stat.label}</p>
              <h3 className="text-3xl font-mono tracking-tighter font-bold">{stat.value}</h3>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono">
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                <span>+2.4%</span>
              </div>
              <span className="opacity-40 uppercase">vs yesterday</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#141414] p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight">System-wide Water Level Trend</h2>
              <p className="font-serif italic opacity-60 text-sm">Aggregated storage data over the last 24 hours</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-mono opacity-60 uppercase">Water Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-mono opacity-60 uppercase">Rainfall</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#999' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#999' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#141414', 
                    border: 'none', 
                    borderRadius: '0',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLevel)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#141414] text-white p-8 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-xl font-bold tracking-tight mb-2">Priority Alerts</h2>
            <p className="opacity-60 text-xs font-mono uppercase tracking-widest mb-6">Immediate Action Required</p>
            
            <div className="space-y-4">
              {reservoirs.filter(r => r.status !== 'normal').map(r => (
                <div key={r.id} className="p-4 border border-white/20 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono text-yellow-500 uppercase">Warning</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-bold">{r.name}</h3>
                  <p className="text-sm opacity-60 font-serif italic mt-1">
                    Rainfall ({r.rainfall24h}mm) exceeding 24h threshold. Monitoring sluice gates.
                  </p>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <button className="w-full py-3 text-xs font-mono uppercase tracking-widest border border-white/20 hover:bg-white hover:text-[#141414] transition-all">
                  View Response Plan
                </button>
              </div>
            </div>
          </div>
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
