import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const tunnelRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = "Real-time Network Telemetry for Your Workspace.";
    if (titleRef.current) {
      titleRef.current.innerHTML = text.split(' ').map(w => 
        `<span class="inline-block overflow-hidden pb-1"><span class="t-word inline-block translate-y-full opacity-0">${w}</span></span>`
      ).join(' ');
    }

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to('.t-word', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out' })
      .to([subtitleRef.current, actionsRef.current], { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");

    // 3D Engine
    const generators = {
      chart: () => `
        <div class="flex items-center justify-between mb-3">
          <span class="text-[10px] text-neutral-400">Throughput</span>
          <span class="text-blue-400 flex items-center"><iconify-icon icon="solar:graph-up-bold-duotone"></iconify-icon></span>
        </div>
        <div class="flex items-end gap-1 h-12">
          ${Array.from({ length: 6 }).map(() => `<div class="flex-1 bg-blue-500/20 rounded-t-sm" style="height:${Math.random() * 100}%"></div>`).join('')}
        </div>`,
      stats: () => `
        <div class="text-[10px] text-muted-foreground mb-1">Download Speed</div>
        <div class="text-2xl font-mono text-foreground">${(Math.random() * 50).toFixed(1)} <span class="text-xs text-neutral-500">MB/s</span></div>
        <div class="mt-2 text-[9px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded w-fit">Stable</div>`,
      status: () => `
        <div class="flex justify-between items-center mb-4">
          <span class="text-[10px] text-muted-foreground">Interface Eth0</span>
          <div class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
        </div>
        <div class="h-1 w-full bg-ui-border rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 w-[95%]"></div>
        </div>`
    };

    const numPanels = window.innerWidth < 768 ? 12 : 30;
    const panels: { el: HTMLDivElement, x: number, y: number, z: number }[] = [];
    const types = Object.keys(generators) as Array<keyof typeof generators>;

    if (tunnelRef.current) {
      for (let i = 0; i < numPanels; i++) {
        const el = document.createElement('div');
        el.className = 'absolute top-1/2 left-1/2 w-48 p-4 rounded-xl backdrop-blur-xl border border-ui-border flex flex-col will-change-transform';
        el.style.background = 'var(--ui-bg-alt)';
        el.style.opacity = '0.8';
        el.style.zIndex = '0';
        el.style.transition = 'background 0.5s ease, border 0.5s ease';
        el.innerHTML = generators[types[Math.floor(Math.random() * types.length)]]();
        tunnelRef.current.appendChild(el);

        panels.push({
          el,
          x: (Math.random() - 0.5) * (window.innerWidth < 768 ? 400 : 800),
          y: (Math.random() - 0.5) * (window.innerWidth < 768 ? 400 : 600),
          z: -Math.random() * 3000
        });
      }
    }

    let animationFrameId: number;
    const animate = () => {
      panels.forEach(p => {
        p.z += 1.5;
        if (p.z > 200) p.z = -3000;

        const opacity = p.z > -200 ? (200 - p.z) / 400 : p.z < -2500 ? (p.z + 3000) / 500 : 1;
        const blur = p.z < -1500 ? Math.min(8, (Math.abs(p.z) - 1500) / 200) : 0;

        p.el.style.transform = `translate(-50%, -50%) translate3d(${p.x}px, ${p.y}px, ${p.z}px)`;
        p.el.style.opacity = Math.max(0, opacity).toString();
        p.el.style.filter = `blur(${blur}px)`;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      if (!viewportRef.current || !sceneRef.current) return;
      const rect = viewportRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      gsap.to(sceneRef.current, { 
        perspectiveOrigin: `${45 + x * 10}% ${45 + y * 10}%`, 
        duration: 2, 
        ease: 'power2.out' 
      });
    };

    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (viewport) {
        viewport.removeEventListener('mousemove', handleMouseMove);
      }
      // Cleanup DOM added by loop if component unmounts
      if (tunnelRef.current) {
        panels.forEach(p => p.el.remove());
      }
    };
  }, []);

  return (
    <section className="ui-section overflow-hidden flex flex-col w-full h-[800px] md:h-screen" id="nexus-engine-hero">
      <div className="ui-container flex-1 flex flex-col bg-ui-bg overflow-hidden"
           style={{ background: 'radial-gradient(ellipse at top, var(--accent-glow) 0%, transparent 100%)', transition: 'background 0.5s ease' }}>
        
        {/* Corner Decorative Markers */}
        <div className="absolute top-4 left-4 w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute top-4 right-4 w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute bottom-4 left-4 w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute bottom-4 right-4 w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8">
          <div ref={viewportRef} id="telemetry-viewport" className="relative flex-1 w-full rounded-[2rem] overflow-hidden flex flex-col items-center justify-center min-h-[500px] border border-ui-border"
               style={{ background: 'linear-gradient(var(--brand-bg), var(--brand-bg)) padding-box, linear-gradient(180deg, var(--ui-border-bright) 0%, transparent 100%) border-box', transition: 'background 0.5s ease, border 0.5s ease' }}>

            {/* Atmospheric Glows */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-[60vw] max-w-[600px] aspect-square bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen opacity-70"></div>
              <div className="absolute w-[30vw] max-w-[300px] aspect-square bg-indigo-500/10 rounded-full blur-[80px] mix-blend-screen opacity-50 translate-y-10"></div>
            </div>

            {/* 3D Tunnel Scene */}
            <div ref={sceneRef} id="telemetry-scene" className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-80" style={{ perspective: '900px' }}>
              <div ref={tunnelRef} id="telemetry-tunnel" className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}></div>
            </div>

            {/* Content Overlay */}
            <main className="relative z-40 flex-1 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl mx-auto">
              <a href="#" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-normal text-ui-text-muted mb-8 border border-ui-border hover:bg-ui-border-bright transition-all backdrop-blur-md" 
                 style={{ background: 'var(--brand-bg)', transition: 'background 0.5s ease, border 0.5s ease' }}>
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Precision Monitoring v1.0.2 Live
                <Icon icon="solar:alt-arrow-right-bold-duotone" className="text-xs text-ui-text-muted" />
              </a>

              <h1 ref={titleRef} id="telemetry-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.05]" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}></h1>

              <p ref={subtitleRef} id="telemetry-subtitle" className="text-sm md:text-base text-neutral-400 mb-10 max-w-2xl leading-relaxed opacity-0">
                A high-performance desktop application for real-time bandwidth monitoring, 
                historical usage tracking, and intelligent network diagnostics.
              </p>

              <div ref={actionsRef} id="telemetry-actions" className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto opacity-0">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-ui-text text-brand-bg font-semibold text-sm hover:opacity-80 transition-all active:scale-95 shadow-[0_0_30px_var(--accent-glow)] flex items-center justify-center gap-2.5">
                  <Icon icon="solar:download-bold-duotone" className="text-lg" /> Download for Windows
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-surface text-ui-text font-normal text-sm hover:bg-ui-border-bright transition-all backdrop-blur-md border border-ui-border flex items-center justify-center gap-2.5" 
                        style={{ transition: 'background 0.5s ease, border 0.5s ease' }}>
                  View GitHub
                </button>
              </div>
            </main>

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
