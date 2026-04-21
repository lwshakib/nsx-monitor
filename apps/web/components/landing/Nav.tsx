import React from 'react';
import { Icon } from '@iconify/react';
import { ModeToggle } from './ModeToggle';
import Logo from '../Logo';
import { Link } from 'react-router';

const Nav: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-ui-border bg-brand-bg/40 dark:bg-black/40 backdrop-blur-md transition-all duration-300">
      <div className="ui-container border-none flex justify-between items-center h-20 px-6 md:px-10">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-widest text-ui-text-muted">
          <a href="#features" className="hover:text-ui-text transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-ui-border group-hover:bg-ui-text transition-colors"></span>
            FEATURES
          </a>
          <a href="#dashboard" className="hover:text-ui-text transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-ui-border group-hover:bg-ui-text transition-colors"></span>
            DASHBOARD
          </a>
          <a href="#docs" className="hover:text-ui-text transition-colors duration-300 flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-ui-border group-hover:bg-ui-text transition-colors"></span>
            DOCUMENTATION
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          
          <Link to="/download" className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-brand-bg bg-ui-text border border-ui-border rounded-full hover:opacity-80 transition-all active:scale-95 shadow-[0_0_20px_var(--accent-glow)] flex items-center gap-2">
            Download
            <Icon icon="solar:download-bold-duotone" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
