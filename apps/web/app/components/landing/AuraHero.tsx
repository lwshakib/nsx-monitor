import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

const AuraHero: React.FC = () => {
  const tunnelRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = "Navigate your architecture in absolute clarity.";
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
          <span class="text-[10px] text-neutral-400">Latency</span>
          <span class="text-blue-400 flex items-center"><iconify-icon icon="solar:chart-square-bold-duotone"></iconify-icon></span>
        </div>
        <div class="flex items-end gap-1 h-12">
          ${Array.from({ length: 6 }).map(() => `<div class="flex-1 bg-blue-500/20 rounded-t-sm" style="height:${Math.random() * 100}%"></div>`).join('')}
        </div>`,
      stats: () => `
        <div class="text-[10px] text-neutral-500 mb-1">Nodes Active</div>
        <div class="text-2xl font-mono text-white">1,024</div>
        <div class="mt-2 text-[9px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded w-fit">+12.5%</div>`,
      status: () => `
        <div class="flex justify-between items-center mb-4">
          <span class="text-[10px] text-neutral-200">DB Sync</span>
          <div class="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]"></div>
        </div>
        <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div class="h-full bg-indigo-500 w-[85%]"></div>
        </div>`
    };

    const numPanels = window.innerWidth < 768 ? 12 : 30;
    const panels: { el: HTMLDivElement, x: number, y: number, z: number }[] = [];
    const types = Object.keys(generators) as Array<keyof typeof generators>;

    if (tunnelRef.current) {
      for (let i = 0; i < numPanels; i++) {
        const el = document.createElement('div');
        el.className = 'absolute top-1/2 left-1/2 w-48 p-4 rounded-xl backdrop-blur-xl border border-white/10 flex flex-col will-change-transform';
        el.style.background = 'rgba(10,10,10,0.8)';
        el.style.zIndex = '0';
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
    <section className="aura-section overflow-hidden flex flex-col w-full h-[800px] md:h-screen" id="nexus-engine-hero">
      <div className="aura-container flex-1 flex flex-col bg-aura-dark overflow-hidden" 
           style={{ backgroundColor: 'var(--aura-bg-dark)', background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
        
        {/* Corner Decorative Markers */}
        <div className="absolute top-4 left-4 w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute top-4 right-4 w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute bottom-4 left-4 w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute bottom-4 right-4 w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8">
          <div ref={viewportRef} id="telemetry-viewport" className="relative flex-1 w-full rounded-[2rem] overflow-hidden flex flex-col items-center justify-center min-h-[500px] border border-white/10" 
               style={{ background: 'linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.8)) padding-box, linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%) border-box' }}>

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
              <a href="#" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-normal text-gray-300 mb-8 border border-white/10 hover:bg-white/[0.08] transition-all backdrop-blur-md" 
                 style={{ background: 'linear-gradient(#111, #111) padding-box, linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%) border-box' }}>
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                </span>
                Core Infrastructure v3.0 deployed
                <Icon icon="solar:alt-arrow-right-bold-duotone" className="text-xs text-gray-400" />
              </a>

              <h1 ref={titleRef} id="telemetry-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.05]" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}></h1>

              <p ref={subtitleRef} id="telemetry-subtitle" className="text-sm md:text-base text-neutral-400 mb-10 max-w-2xl leading-relaxed opacity-0">
                A dimensional telemetry engine that translates complex microservices, databases, and edge networks
                into an intuitive, explorable topology.
              </p>

              <div ref={actionsRef} id="telemetry-actions" className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto opacity-0">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2.5">
                  <Icon icon="solar:rocket-bold-duotone" className="text-lg" /> Initialize Instance
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900/40 text-white font-normal text-sm hover:bg-neutral-800 transition-all backdrop-blur-md border border-white/10 flex items-center justify-center gap-2.5" 
                        style={{ background: 'linear-gradient(rgba(20,20,20,0.4), rgba(20,20,20,0.4)) padding-box, linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%) border-box' }}>
                  API Reference
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

export default AuraHero;
