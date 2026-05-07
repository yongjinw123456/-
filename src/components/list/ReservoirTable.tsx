import { reservoirs } from '@/src/data';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function ReservoirTable() {
  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="bg-white border border-[#141414] flex-1 flex flex-col min-h-0">
        <header className="p-6 border-b border-[#141414] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight uppercase">Master Data Inventory</h2>
            <p className="font-serif italic opacity-60 text-sm">Full telemetry listing for all monitored basins</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input 
                type="text" 
                placeholder="Search index..."
                className="pl-9 pr-4 py-2 border border-[#141414] text-xs font-mono focus:bg-gray-50 outline-none w-64"
              />
            </div>
            <button className="p-2 border border-[#141414] hover:bg-gray-100 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white z-10 border-b-2 border-[#141414]">
              <tr>
                <th className="p-4 text-left font-serif italic text-[11px] uppercase tracking-wider opacity-40 border-r border-[#141414] w-12">No.</th>
                <th className="p-4 text-left font-serif italic text-[11px] uppercase tracking-wider opacity-40 border-r border-[#141414]">Reservoir Name</th>
                <th className="p-4 text-left font-serif italic text-[11px] uppercase tracking-wider opacity-40 border-r border-[#141414]">Storage (%)</th>
                <th className="p-4 text-left font-serif italic text-[11px] uppercase tracking-wider opacity-40 border-r border-[#141414]">Water Level</th>
                <th className="p-4 text-left font-serif italic text-[11px] uppercase tracking-wider opacity-40 border-r border-[#141414]">Rainfall (24h)</th>
                <th className="p-4 text-left font-serif italic text-[11px] uppercase tracking-wider opacity-40">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservoirs.map((res, i) => (
                <motion.tr 
                  key={res.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-[#141414] hover:text-white transition-all cursor-pointer border-b border-[#141414]/10 last:border-0"
                >
                  <td className="p-4 font-mono text-xs opacity-40 border-r border-[#141414]/10 group-hover:border-[#141414]/30">{String(i + 1).padStart(2, '0')}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm tracking-tight">{res.name}</span>
                      <span className="text-[10px] uppercase font-mono opacity-40 group-hover:opacity-60">{res.location.lat.toFixed(4)}N, {res.location.lng.toFixed(4)}E</span>
                    </div>
                  </td>
                  <td className="p-4 border-l border-[#141414]/10 group-hover:border-[#141414]/30">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-1000",
                            res.status === 'normal' ? "bg-blue-500" : "bg-yellow-500"
                          )} 
                          style={{ width: `${(res.waterLevel / res.limitLevel * 100).toFixed(0)}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs">{(res.waterLevel / res.limitLevel * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm border-l border-[#141414]/10 group-hover:border-[#141414]/30">
                    <div className="flex items-center gap-1">
                      <span>{res.waterLevel}</span>
                      <span className="text-[10px] opacity-40">m</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm border-l border-[#141414]/10 group-hover:border-[#141414]/30">
                    <div className="flex items-center gap-1">
                      <span>{res.rainfall24h}</span>
                      <span className="text-[10px] opacity-40">mm</span>
                    </div>
                  </td>
                  <td className="p-4 border-l border-[#141414]/10 group-hover:border-[#141414]/30">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-2 py-1 text-[10px] font-mono uppercase border shrink-0",
                      res.status === 'normal' 
                        ? "border-green-600 text-green-600 group-hover:bg-green-600 group-hover:text-white" 
                        : "border-yellow-600 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white"
                    )}>
                      {res.status}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <footer className="p-4 bg-gray-50 border-t border-[#141414] flex items-center justify-between">
          <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
            Total Records: {reservoirs.length} | Page 1 of 1
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-[#141414] text-xs font-mono opacity-50 hover:opacity-100 disabled:opacity-20 cursor-not-allowed">PREV</button>
            <button className="px-3 py-1 border border-[#141414] text-xs font-mono hover:bg-[#141414] hover:text-white transition-colors">NEXT</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
