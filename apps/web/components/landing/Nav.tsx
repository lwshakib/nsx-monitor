import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Menu } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import Logo from '../Logo';
import { Link } from 'react-router';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the fixed nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Dashboard', id: 'engine' }, 
    { name: 'Documentation', id: 'topology' }, 
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-ui-border bg-brand-bg/40 dark:bg-black/40 backdrop-blur-md transition-all duration-300">
      <div className="ui-container border-none flex justify-between items-center h-20 px-6 md:px-10">
        <Logo />
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-mono tracking-widest text-ui-text-muted">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={(e) => scrollToSection(e, link.id)}
              className="hover:text-ui-text transition-colors duration-300 flex items-center gap-2 group"
            >
              <span className="w-1 h-1 rounded-full bg-ui-border group-hover:bg-ui-text transition-colors"></span>
              {link.name}
            </a>
          ))}
          
          <a 
            href="https://github.com/lwshakib/nsx-monitor" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-ui-text transition-colors duration-300 flex items-center gap-2 group ml-4"
          >
            <Icon icon="ri:github-fill" className="text-xl" />
            GitHub
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          
          {/* Download Button (Desktop Only) */}
          <Link 
            to="/download" 
            className="hidden md:flex px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-brand-bg bg-ui-text border border-ui-border rounded-full hover:opacity-80 transition-all active:scale-95 shadow-[0_0_20px_var(--accent-glow)] items-center gap-2"
          >
            Download
            <Icon icon="solar:download-bold-duotone" />
          </Link>

          {/* Mobile Menu with Shadcn Sheet */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-ui-text hover:bg-brand-surface rounded-lg">
                  <Menu size={24} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:max-w-sm bg-background backdrop-blur-none border-l border-ui-border p-0 flex flex-col h-full shadow-2xl">
                <SheetHeader className="h-20 px-6 border-b border-ui-border flex flex-row items-center justify-between">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full p-8 md:p-10">
                  <nav className="flex flex-col gap-4">
                    <p className="text-[10px] tracking-[0.2em] text-ui-text-muted/50 mb-4 px-2 sidebar-item-anim" style={{ animationDelay: '0.1s' }}>Navigation</p>
                    {navLinks.map((link, index) => (
                      <a 
                        key={link.id}
                        href={`#${link.id}`} 
                        onClick={(e) => scrollToSection(e, link.id)}
                        className="text-xs tracking-[0.2em] text-ui-text-muted hover:text-ui-text transition-colors flex items-center gap-4 group py-3 px-2 rounded-xl hover:bg-ui-text/5 sidebar-item-anim"
                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                      >
                         <span className="w-1.5 h-1.5 rounded-full bg-ui-border group-hover:bg-ui-text transition-all scale-75 group-hover:scale-100"></span>
                        {link.name}
                      </a>
                    ))}
                    
                    <div className="h-[1px] w-full bg-ui-border/50 my-6 sidebar-item-anim" style={{ animationDelay: `${0.2 + navLinks.length * 0.1}s` }}></div>
                    
                    <p className="text-[10px] tracking-[0.2em] text-ui-text-muted/50 mb-4 px-2 sidebar-item-anim" style={{ animationDelay: `${0.3 + navLinks.length * 0.1}s` }}>External</p>
                    <a 
                      href="https://github.com/lwshakib/nsx-monitor" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-xs tracking-[0.2em] text-ui-text-muted hover:text-ui-text transition-colors py-3 px-2 rounded-xl hover:bg-ui-text/5 sidebar-item-anim"
                      style={{ animationDelay: `${0.4 + navLinks.length * 0.1}s` }}
                    >
                      <Icon icon="ri:github-fill" className="text-lg" />
                      Repository
                    </a>
                  </nav>

                  <div className="mt-auto pb-6">
                    <Link 
                      to="/download" 
                      onClick={() => setIsOpen(false)}
                      className="w-full px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-brand-bg bg-ui-text rounded-xl flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_var(--accent-glow)] active:scale-[0.98] transition-all sidebar-item-anim"
                      style={{ animationDelay: `${0.5 + navLinks.length * 0.1}s` }}
                    >
                      Download App
                      <Icon icon="solar:download-bold-duotone" className="text-base" />
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
