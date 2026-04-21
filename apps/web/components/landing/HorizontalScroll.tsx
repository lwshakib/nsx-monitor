import React, { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HorizontalScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !progressRef.current) return

    const track = trackRef.current

    // Calculate total horizontal scroll distance
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth
      return -(trackWidth - window.innerWidth)
    }

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const scrollAmount = getScrollAmount()

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
              progressRef.current.style.width = `${self.progress * 100}%`
            }
          },
        },
      })

      tl.to(track, {
        x: scrollAmount,
        ease: "none",
      })
    })

    // Mobile logic (no horizontal pin, just regular scroll)
    mm.add("(max-width: 767px)", () => {
      gsap.to(progressRef.current, {
        width: "100%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      })
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const cards = [
    {
      id: "01",
      title: "Real-time Telemetry",
      description:
        "Low-level packet inspection engine that monitors bandwidth throughput at the interface layer with zero overhead.",
      icon: "m12 19 7-7 3 3-7 7-3-3z",
      iconPath2: "m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z",
      iconPath3: "m2 2 7.586 7.586",
      configName: "Scan Frequency",
      configValue: "Native / 1ms",
    },
    {
      id: "02",
      title: "Packet Arbitration",
      description:
        "Intelligent sorting of TCP/UDP streams to identify process-specific bandwidth consumption on your Windows machine.",
      icon: "M14 4.1 12 6",
      iconPath2: "m5.1 8-2.9-.8",
      iconPath3: "m6 12-1.9 2",
      iconPath4: "M7.2 2.2 8 5.1",
      iconPath5:
        "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
      configName: "DPI Engine",
      configValue: "NSX_CORE_v2",
    },
    {
      id: "03",
      title: "Interface Sync",
      description:
        "Native synchronization with Ethernet, Wi-Fi, and Virtual adapters ensuring 1:1 reporting accuracy.",
      configName: "Adapter Type",
      configValue: "Auto-detect",
    },
    {
      id: "04",
      title: "Memory Profiling",
      description:
        "Lightweight memory footprint that keeps NSX Monitor running in the background without affecting system performance.",
      configName: "Ram Usage",
      configValue: "< 45 MB",
    },
    {
      id: "05",
      title: "Global Propagation",
      description:
        "Sync your telemetry data across multiple devices for unified network monitoring and historical audit trails.",
      configName: "Sync Latency",
      configValue: "~12 MS",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="ui-section relative h-screen"
      id="engine"
    >
      <div className="ui-container border-ui-border sticky top-0 flex h-screen flex-col items-start justify-center overflow-hidden border-y">
        {/* Corner Decorative Markers */}
        <div className="text-ui-border-bright absolute -top-[7.5px] -left-[7.5px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute -top-[7.5px] -right-[7.5px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute -bottom-[7.5px] -left-[7.5px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute -right-[7.5px] -bottom-[7.5px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="absolute top-12 left-6 z-20 flex items-center gap-4 md:left-10">
          <div className="bg-ui-border-bright h-[1px] w-12"></div>
          <span className="text-ui-text font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
            Engine Mechanics
          </span>
        </div>

        <div className="bg-ui-border/20 absolute bottom-12 left-6 z-20 h-1 w-48 overflow-hidden rounded-full md:left-10">
          <div
            ref={progressRef}
            className="bg-ui-text h-full w-0 transition-all duration-100 ease-out"
            id="h-scroll-progress"
          ></div>
        </div>

        <div
          ref={trackRef}
          className="flex items-center gap-8 pr-[20vw] pl-[10vw] will-change-transform"
          style={{ width: "max-content" }}
          id="h-scroll-track"
        >
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className="schema-card schema-card-enhanced group bg-ui-bg border-ui-border relative flex aspect-square w-[85vw] flex-shrink-0 flex-col overflow-hidden rounded-[2rem] border p-10 shadow-2xl transition-all duration-500 md:w-[450px]"
            >
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]"></div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-glow),transparent_70%)]"></div>

              <span className="text-ui-text absolute top-6 right-8 font-mono text-6xl font-light tracking-tighter opacity-10 transition-all duration-500 group-hover:opacity-30">
                {card.id}
              </span>

              <div className="bg-brand-surface border-ui-border relative z-10 mt-2 mb-auto flex h-12 w-12 items-center justify-center rounded-xl border shadow-lg transition-all group-hover:shadow-[0_0_20px_var(--accent-glow)]">
                {/* SVG icons simplified for the sake of the card structure */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ui-text"
                >
                  {idx === 0 && (
                    <>
                      <path d="m12 19 7-7 3 3-7 7-3-3z"></path>
                      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="m2 2 7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <path d="M14 4.1 12 6"></path>
                      <path d="m5.1 8-2.9-.8"></path>
                      <path d="m6 12-1.9 2"></path>
                      <path d="M7.2 2.2 8 5.1"></path>
                      <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"></path>
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <rect x="16" y="16" width="6" height="6" rx="1"></rect>
                      <rect x="2" y="16" width="6" height="6" rx="1"></rect>
                      <rect x="9" y="2" width="6" height="6" rx="1"></rect>
                      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
                      <path d="M12 12V8"></path>
                    </>
                  )}
                  {idx === 3 && (
                    <>
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
                      <path d="M3 12a9 3 0 0 0 18 0"></path>
                    </>
                  )}
                  {idx === 4 && (
                    <>
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </>
                  )}
                </svg>
              </div>

              <div className="relative z-10 mt-auto text-left">
                <h3 className="text-ui-text mb-4 text-2xl font-semibold tracking-tight transition-transform group-hover:translate-x-1">
                  {card.title}
                </h3>
                <p className="text-ui-text-muted mb-8 text-sm leading-relaxed font-light">
                  {card.description}
                </p>
                <div className="bg-brand-surface border-ui-border group-hover:border-ui-border-bright flex items-center justify-between rounded-lg border p-4 transition-all">
                  <span className="text-ui-text-muted font-mono text-[10px]">
                    {card.configName}
                  </span>
                  <span className="text-ui-text font-mono text-[10px]">
                    {card.configValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HorizontalScroll
