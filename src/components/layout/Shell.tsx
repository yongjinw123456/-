import React from 'react';
import { LayoutDashboard, Map as MapIcon, Database, Info, AlertTriangle, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ShellProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Shell({ children, activeTab, onTabChange }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Map View', icon: MapIcon },
    { id: 'data', label: 'Reservoir Data', icon: Database },
  ];

  return (
    <div className="flex h-screen bg-[#E4E3E0] text-[#141414] font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="relative h-full bg-white border-r border-[#141414] flex flex-col"
      >
        <div className="p-6 border-b border-[#141414] flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#141414] flex items-center justify-center rounded">
              <Database className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">HydroSafe</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 border border-transparent",
                activeTab === item.id 
                  ? "bg-[#141414] text-white" 
                  : "hover:bg-[#141414] hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#141414] space-y-4 overflow-hidden">
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
            <div className="text-xs text-yellow-800">
              <p className="font-bold">2 Warnings Active</p>
              <p className="opacity-80">Zeya Reservoir rainfall above threshold.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 text-xs opacity-50 uppercase tracking-widest font-bold">
            <Info className="w-3 h-3" />
            System Status: Nominal
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#E4E3E0]">
        <header className="h-16 bg-white border-b border-[#141414] flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-serif italic text-lg opacity-60">
              {navItems.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-mono">
            <div className="flex flex-col items-end">
              <span className="opacity-40 uppercase">Last Sync</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="opacity-40 uppercase">Location</span>
              <span>Wenzhou, CN</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
