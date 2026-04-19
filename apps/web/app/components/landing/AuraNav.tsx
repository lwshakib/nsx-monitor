import React from 'react';
import { Icon } from '@iconify/react';

const AuraNav: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-md transition-all duration-300">
      <div className="aura-container border-none flex justify-between items-center h-20 px-6 md:px-10">
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold text-xl">A</div>
          <span className="text-white font-bold text-xl tracking-tighter">AURA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-widest text-neutral-400">
          <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-neutral-700 group-hover:bg-white transition-colors"></span>
            ENGINE
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-neutral-700 group-hover:bg-white transition-colors"></span>
            STUDIO
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-neutral-700 group-hover:bg-white transition-colors"></span>
            RESEARCH
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-[8px] font-mono text-neutral-500 text-right uppercase tracking-wider">
            <span>System: Online</span>
            <span className="text-neutral-400">Ping: 12ms</span>
          </div>
          <button className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-neutral-900 bg-white border border-white rounded-full hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2">
            Initialize
            <Icon icon="solar:arrow-right-linear" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AuraNav;
