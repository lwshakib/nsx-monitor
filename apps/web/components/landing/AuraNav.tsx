import React from 'react';
import { Icon } from '@iconify/react';
import { ModeToggle } from './ModeToggle';

const AuraNav: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-aura-border bg-brand-bg/40 dark:bg-black/40 backdrop-blur-md transition-all duration-300">
      <div className="aura-container border-none flex justify-between items-center h-20 px-6 md:px-10">
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 bg-aura-text text-brand-bg rounded flex items-center justify-center font-bold text-xl transition-colors">A</div>
          <span className="text-aura-text font-bold text-xl tracking-tighter">AURA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-widest text-aura-text-muted">
          <a href="#" className="hover:text-aura-text transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-aura-border group-hover:bg-aura-text transition-colors"></span>
            ENGINE
          </a>
          <a href="#" className="hover:text-aura-text transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-aura-border group-hover:bg-aura-text transition-colors"></span>
            STUDIO
          </a>
          <a href="#" className="hover:text-aura-text transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-aura-border group-hover:bg-aura-text transition-colors"></span>
            RESEARCH
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          
          <div className="hidden md:flex flex-col text-[8px] font-mono text-aura-text-muted text-right uppercase tracking-wider">
            <span>System: Online</span>
            <span className="opacity-70">Ping: 12ms</span>
          </div>
          <button className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-brand-bg bg-aura-text border border-aura-border rounded-full hover:opacity-80 transition-all active:scale-95 shadow-[0_0_20px_var(--accent-glow)] flex items-center gap-2">
            Initialize
            <Icon icon="solar:arrow-right-linear" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AuraNav;
