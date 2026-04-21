import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = "Real-time Network Telemetry for Your Workspace.";
    if (titleRef.current) {
      titleRef.current.innerHTML = text.split(' ').map(w => 
        `<span class="inline-block overflow-hidden pb-1"><span class="t-word inline-block translate-y-full opacity-0 text-ui-text">${w}</span></span>`
      ).join(' ');
    }

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to('.t-word', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out' })
      .to([subtitleRef.current, actionsRef.current], { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");

  }, []);

  return (
    <section className="ui-section overflow-hidden flex flex-col w-full h-[700px] md:h-[85vh] relative" id="hero">
      <div className="ui-container flex-1 flex flex-col items-center justify-center relative bg-ui-bg">
        
        {/* Background Gradients (Minimal) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ui-text/5 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>
        </div>

        {/* Corner Decorative Markers */}
        <div className="absolute top-6 left-6 w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute top-6 right-6 w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute bottom-6 left-6 w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute bottom-6 right-6 w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>

        {/* Content */}
        <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-ui-text-muted mb-8 border border-ui-border bg-brand-surface/50 backdrop-blur-sm shadow-sm group">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            System Online
          </div>

          <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-ui-text mb-6 leading-[1.05] max-w-4xl"></h1>

          <p ref={subtitleRef} className="text-sm md:text-base text-ui-text-muted mb-10 max-w-2xl leading-relaxed opacity-0">
            A high-performance desktop application for real-time bandwidth monitoring, 
            historical usage tracking, and intelligent network diagnostics across all Windows interfaces.
          </p>

          <div ref={actionsRef} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto opacity-0">
            <Link to="/download" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-ui-text text-brand-bg font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-[0_0_30px_var(--accent-glow)] flex items-center justify-center gap-2.5">
              <Icon icon="solar:download-bold-duotone" className="text-xl" />
              Download for Windows
            </Link>
            <a href="https://github.com/lwshakib/nsx-monitor" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-surface text-ui-text font-normal text-sm hover:bg-ui-border-bright transition-all backdrop-blur-md border border-ui-border flex items-center justify-center gap-2.5 shadow-sm">
              <Icon icon="ri:github-fill" className="text-xl" />
              View Source
            </a>
          </div>
        </main>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ui-bg to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Hero;
