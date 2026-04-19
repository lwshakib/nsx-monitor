import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AuraHorizontalScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !progressRef.current) return;

    const track = trackRef.current;
    
    // Calculate total horizontal scroll distance
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth);
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
        const scrollAmount = getScrollAmount();
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${Math.abs(scrollAmount)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.width = `${self.progress * 100}%`;
              }
            }
          }
        });

        tl.to(track, {
          x: scrollAmount,
          ease: "none"
        });
    });

    // Mobile logic (no horizontal pin, just regular scroll)
    mm.add("(max-width: 767px)", () => {
       gsap.to(progressRef.current, {
          width: "100%",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
          }
       });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const cards = [
    {
      id: "01",
      title: "Deterministic Rendering",
      description: "Frame-perfect fidelity mapped directly to execution cycles. Every pixel shift is calculated and predictable.",
      icon: "m12 19 7-7 3 3-7 7-3-3z",
      iconPath2: "m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z",
      iconPath3: "m2 2 7.586 7.586",
      configName: "Shader Config",
      configValue: "STRICT_MODE"
    },
    {
      id: "02",
      title: "Input Arbitration",
      description: "Coalescing multi-modal inputs into a single authoritative event stream with zero-delay processing.",
      icon: "M14 4.1 12 6",
      iconPath2: "m5.1 8-2.9-.8",
      iconPath3: "m6 12-1.9 2",
      iconPath4: "M7.2 2.2 8 5.1",
      iconPath5: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
      configName: "Polling Rate",
      configValue: "1000 HZ"
    },
    {
      id: "03",
      title: "Mesh Synchronization",
      description: "CRDT-based state reconciliation ensuring all connected endpoints reflect truth instantaneously.",
      configName: "Topology",
      configValue: "PEER_2_PEER"
    },
    {
        id: "04",
        title: "Memory Allocation",
        description: "Dynamic heap management and memory pooling ensuring zero garbage collection pauses during peak loads.",
        configName: "Buffer Size",
        configValue: "2048 MB"
    },
    {
        id: "05",
        title: "Global Propagation",
        description: "Instantaneous state broadcast to edge nodes worldwide using hyper-optimized binary protocols.",
        configName: "Target Latency",
        configValue: "~12 MS"
    }
  ];

  return (
    <section ref={sectionRef} className="aura-section h-screen relative" id="h-scroll-section">
      <div className="sticky h-screen top-0 items-center aura-container border-y border-white/5 flex flex-col justify-center overflow-hidden">
        {/* Corner Decorative Markers */}
        <div className="absolute -top-[7.5px] -left-[7.5px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -top-[7.5px] -right-[7.5px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -bottom-[7.5px] -left-[7.5px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -bottom-[7.5px] -right-[7.5px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="absolute top-12 left-6 md:left-10 z-20 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-white/15"></div>
          <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-white uppercase">
            Engine Mechanics
          </span>
        </div>

        <div className="absolute bottom-12 left-6 md:left-10 z-20 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-white w-0 transition-all duration-100 ease-out" id="h-scroll-progress"></div>
        </div>

        <div ref={trackRef} className="flex will-change-transform pr-[20vw] pl-[10vw] gap-8 items-center" style={{ width: 'max-content' }} id="h-scroll-track">
          {cards.map((card, idx) => (
            <div key={card.id} className="schema-card schema-card-enhanced w-[85vw] md:w-[450px] aspect-square rounded-[2rem] p-10 flex flex-col relative overflow-hidden flex-shrink-0 group transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none"></div>

              <span className="text-6xl font-light text-white/[0.05] absolute top-6 right-8 tracking-tighter font-mono group-hover:text-white/[0.3] transition-colors duration-500">
                {card.id}
              </span>

              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-auto mt-2 relative z-10">
                {/* SVG icons simplified for the sake of the card structure */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    {idx === 0 && <><path d="m12 19 7-7 3 3-7 7-3-3z"></path><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="m2 2 7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></>}
                    {idx === 1 && <><path d="M14 4.1 12 6"></path><path d="m5.1 8-2.9-.8"></path><path d="m6 12-1.9 2"></path><path d="M7.2 2.2 8 5.1"></path><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"></path></>}
                    {idx === 2 && <><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path><path d="M12 12V8"></path></>}
                    {idx === 3 && <><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path></>}
                    {idx === 4 && <><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></>}
                </svg>
              </div>

              <div className="relative z-10 mt-auto text-left">
                <h3 className="text-2xl font-semibold mb-4 tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">
                  {card.description}
                </p>
                <div className="p-4 bg-black border border-white/[0.08] rounded-lg flex justify-between items-center group-hover:border-white/15 transition-colors">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    {card.configName}
                  </span>
                  <span className="text-[10px] font-mono text-white">
                    {card.configValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuraHorizontalScroll;
