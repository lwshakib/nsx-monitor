import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AuraExpansion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const targetRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Masked Reveal Logic for Hero Text
    if (targetRef.current) {
        const text = targetRef.current.innerText;
        targetRef.current.innerHTML = ''; 

        const words = text.trim().split(/\s+/);
        words.forEach(word => {
            const outerSpan = document.createElement('span');
            outerSpan.className = 'mask-word';
            const innerSpan = document.createElement('span');
            innerSpan.className = 'mask-word-inner';
            innerSpan.textContent = word;
            outerSpan.appendChild(innerSpan);
            targetRef.current?.appendChild(outerSpan);
        });
    }

    // Hero Animation Timeline
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl.to(heroBadgeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
          .to('.mask-word-inner', {
              y: "0%",
              duration: 1.2,
              stagger: 0.04,
              ease: "power4.out"
          }, "-=0.4")
          .to(heroDescRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6");

    // 2. Progressive Grid Expansion Logic via Scroll
    const expandTl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
        }
    });

    expandTl.to('.seq-l1', { opacity: 1, y: 0, duration: 1 })
            .to('.seq-line-v1', { scaleY: 1, duration: 1.5, ease: "none" })
            .to('.seq-line-h1', { scaleX: 1, duration: 1, ease: "power1.inOut" }, "-=0.5")
            .to('.seq-l2', { opacity: 1, y: 0, duration: 1, stagger: 0.2 }, "-=0.2")
            .to('.seq-line-v2', { scaleY: 1, duration: 1.5, ease: "none", stagger: 0.1 })
            .to('.seq-line-h2', { scaleX: 1, duration: 1, ease: "power1.inOut" }, "-=0.5")
            .to('.seq-l3', {
                opacity: 1, y: 0, duration: 1, stagger: 0.15
            }, "-=0.2");

    return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="aura-section flex flex-col w-full items-center overflow-hidden">
      <div className="aura-container border-t border-aura-border min-h-screen flex flex-col">
        {/* Corner Decorative Markers */}
        <div className="absolute -top-[7px] -left-[7px] w-3.5 h-3.5 text-aura-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -top-[7px] -right-[7px] w-3.5 h-3.5 text-aura-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>

        {/* Hero Section */}
        <header className="pt-32 pb-24 px-6 md:px-12 relative z-10 flex flex-col items-center text-center w-full overflow-hidden">
          <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-aura-border bg-brand-surface text-[10px] font-mono uppercase tracking-widest text-aura-text-muted mb-8 opacity-0 shadow-[0_0_20px_var(--accent-glow)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            System initialization complete
          </div>

          <h1 ref={targetRef} className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-aura-text w-full max-w-[1100px] leading-[1.06] break-words whitespace-normal text-balance">
            Architecture that scales organically with your complexity.
          </h1>

          <p ref={heroDescRef} className="mt-8 text-sm md:text-base text-aura-text-muted max-w-2xl font-light leading-relaxed opacity-0">
            Begin with a single core. As data flows increase, the system progressively reveals deeper layers, connections, and autonomous sub-routines. Scroll to initiate expansion.
          </p>
        </header>

        {/* Expansion Area */}
        <div ref={containerRef} className="mx-4 md:mx-10 mb-32 p-6 md:p-16 border border-aura-border rounded-[2.5rem] bg-aura-bg-alt relative z-10 overflow-hidden shadow-2xl transition-colors duration-500" id="expansion-container">
          <div className="relative flex flex-col items-center w-full min-h-[1200px] py-10">
            
            {/* LEVEL 1: Primary Core */}
            <div className="w-full max-w-sm z-20 seq-node seq-l1 opacity-0" style={{ transform: 'translateY(20px)' }}>
              <div className="p-[1px] rounded-2xl bg-gradient-to-b from-aura-border-bright via-aura-border to-transparent w-full">
                <div className="bg-brand-surface/90 backdrop-blur-md h-full w-full rounded-[15px] p-6 flex flex-col items-center text-center border border-aura-border/50">
                  <div className="w-12 h-12 rounded-xl bg-brand-surface border border-aura-border flex items-center justify-center mb-4 text-aura-text shadow-[0_0_15px_var(--accent-glow)]">
                    <Icon icon="solar:cpu-bolt-bold-duotone" className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium tracking-tight text-aura-text">Primary Core</h3>
                  <p className="mt-2 text-xs text-aura-text-muted font-normal leading-relaxed">
                    Single point of origin. Awaiting data saturation to expand network topography.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[1px] h-32 bg-gradient-to-b from-aura-border-bright to-transparent z-10 seq-line seq-line-v1" style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}></div>

            {/* LEVEL 2 */}
            <div className="w-full relative z-20 mt-[-1px]">
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-aura-border seq-line-h seq-line-h1" style={{ transformOrigin: 'center', transform: 'scaleX(0)' }}></div>
              <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-32 pt-8 text-balance">
                <div className="w-full max-w-sm seq-node seq-l2 opacity-0" style={{ transform: 'translateY(20px)' }}>
                  <div className="p-[1px] rounded-2xl bg-gradient-to-br from-aura-border-bright via-aura-border to-transparent w-full h-full">
                    <div className="bg-brand-surface/90 backdrop-blur-sm h-full w-full rounded-[15px] p-6 text-left border border-aura-border">
                      <Icon icon="solar:database-bold-duotone" className="text-xl text-aura-text-muted mb-3" />
                      <h3 className="text-sm font-medium tracking-tight text-aura-text">Data Persistence</h3>
                      <p className="mt-1 text-xs text-aura-text-muted font-normal leading-relaxed">
                        State is separated from execution. Local cache clusters begin forming to handle increased read throughput.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-sm seq-node seq-l2 opacity-0" style={{ transform: 'translateY(20px)' }}>
                  <div className="p-[1px] rounded-2xl bg-gradient-to-bl from-aura-border-bright via-aura-border to-transparent w-full h-full">
                    <div className="bg-brand-surface/90 backdrop-blur-sm h-full w-full rounded-[15px] p-6 text-left border border-aura-border">
                      <Icon icon="solar:network-bold-duotone" className="text-xl text-aura-text-muted mb-3" />
                      <h3 className="text-sm font-medium tracking-tight text-aura-text">Load Distribution</h3>
                      <p className="mt-1 text-xs text-aura-text-muted font-normal leading-relaxed">
                        Traffic is dynamically routed. Edge nodes are deployed to minimize latency for incoming requests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center gap-8 md:gap-32 relative z-10 mt-[-1px]">
              <div className="w-[1px] h-32 bg-gradient-to-b from-aura-border to-transparent seq-line seq-line-v2" style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}></div>
              <div className="w-[1px] h-32 bg-gradient-to-b from-aura-border to-transparent seq-line seq-line-v2 hidden md:block" style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}></div>
            </div>

            {/* LEVEL 3 */}
            <div className="w-full relative z-20 mt-[-1px]">
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-aura-border seq-line-h seq-line-h2" style={{ transformOrigin: 'center', transform: 'scaleX(0)' }}></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 w-full max-w-5xl mx-auto px-4 md:px-0">
                {['Security Layers', 'Micro-services', 'Telemetry'].map((title, i) => (
                  <div key={title} className="w-full seq-node seq-l3 opacity-0" style={{ transform: 'translateY(20px)' }}>
                    <div className="p-[1px] rounded-xl bg-gradient-to-b from-aura-border to-transparent w-full h-full">
                      <div className="bg-brand-surface/90 h-full w-full rounded-[11px] p-5 text-left border border-aura-border/50 flex flex-col justify-between shadow-lg">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <Icon icon={`solar:${['shield-keyhole', 'widget-add', 'chart-square'][i]}-bold-duotone`} className="text-lg text-aura-text-muted" />
                            <span className="text-[9px] font-mono tracking-widest text-aura-text-muted px-2 py-0.5 rounded bg-aura-border/20 border border-aura-border">Active</span>
                          </div>
                          <h3 className="text-xs font-semibold tracking-wide text-aura-text-muted uppercase">{title}</h3>
                          <p className="mt-1 text-xs text-aura-text-muted/60 font-normal leading-relaxed">Automated system optimization logic.</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-aura-border">
                           <div className="h-1 w-full bg-aura-border/20 rounded-full overflow-hidden">
                             <div className="h-full bg-aura-text-muted/40 w-[75%]" style={{ width: i === 0 ? '99%' : '75%' }}></div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuraExpansion;
