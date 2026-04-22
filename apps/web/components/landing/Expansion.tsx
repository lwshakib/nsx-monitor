import React, { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Expansion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroBadgeRef = useRef<HTMLDivElement>(null)
  const heroDescRef = useRef<HTMLParagraphElement>(null)
  const targetRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // 1. Masked Reveal Logic for Hero Text
    if (targetRef.current) {
      const text = targetRef.current.innerText
      targetRef.current.innerHTML = ""

      const words = text.trim().split(/\s+/)
      words.forEach((word) => {
        const outerSpan = document.createElement("span")
        outerSpan.className = "mask-word"
        const innerSpan = document.createElement("span")
        innerSpan.className = "mask-word-inner"
        innerSpan.textContent = word
        outerSpan.appendChild(innerSpan)
        targetRef.current?.appendChild(outerSpan)
      })
    }

    // Hero Animation Timeline
    const heroTl = gsap.timeline({ delay: 0.2 })
    heroTl
      .to(heroBadgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        ".mask-word-inner",
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.04,
          ease: "power4.out",
        },
        "-=0.4"
      )
      .to(
        heroDescRef.current,
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      )

    // 2. Progressive Grid Expansion Logic via Scroll
    const expandTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
      },
    })

    expandTl
      .to(".seq-l1", { opacity: 1, y: 0, duration: 1 })
      .to(".seq-line-v1", { scaleY: 1, duration: 1.5, ease: "none" })
      .to(
        ".seq-line-h1",
        { scaleX: 1, duration: 1, ease: "power1.inOut" },
        "-=0.5"
      )
      .to(".seq-l2", { opacity: 1, y: 0, duration: 1, stagger: 0.2 }, "-=0.2")
      .to(".seq-line-v2", {
        scaleY: 1,
        duration: 1.5,
        ease: "none",
        stagger: 0.1,
      })
      .to(
        ".seq-line-h2",
        { scaleX: 1, duration: 1, ease: "power1.inOut" },
        "-=0.5"
      )
      .to(
        ".seq-l3",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
        },
        "-=0.2"
      )

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      className="ui-section flex w-full flex-col items-center overflow-hidden"
      id="features"
    >
      <div className="ui-container border-ui-border flex min-h-screen flex-col border-t">
        {/* Corner Decorative Markers */}
        <div className="text-ui-border-bright absolute -top-[7px] -left-[7px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute -top-[7px] -right-[7px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>

        {/* Hero Section */}
        <header className="relative z-10 flex w-full flex-col items-center overflow-hidden px-6 pt-32 pb-24 text-center md:px-12">
          <div
            ref={heroBadgeRef}
            className="border-ui-border bg-brand-surface text-ui-text-muted mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] tracking-widest opacity-0 shadow-[0_0_20px_var(--accent-glow)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            Performance Scalability
          </div>

          <h1
            ref={targetRef}
            className="text-ui-text w-full max-w-[1100px] text-4xl leading-[1.06] font-normal tracking-tight text-balance break-words whitespace-normal md:text-6xl lg:text-7xl"
          >
            Telemetry that scales with your infrastructure.
          </h1>

          <p
            ref={heroDescRef}
            className="text-ui-text-muted mt-8 max-w-2xl text-sm leading-relaxed font-light opacity-0 md:text-base"
          >
            From a single interface to complex mesh networks. NSX Monitor
            captures every packet, maps every connection, and preserves your
            network history with absolute precision on your desktop.
          </p>
        </header>

        {/* Expansion Area */}
        <div
          ref={containerRef}
          className="border-ui-border bg-ui-bg-alt relative z-10 mx-4 mb-32 overflow-hidden rounded-[2.5rem] border p-6 shadow-2xl transition-colors duration-500 md:mx-10 md:p-16"
          id="expansion-container"
        >
          <div className="relative flex min-h-[1200px] w-full flex-col items-center py-10">
            {/* LEVEL 1: Primary Core */}
            <div
              className="seq-node seq-l1 z-20 w-full max-w-sm opacity-0"
              style={{ transform: "translateY(20px)" }}
            >
              <div className="from-ui-border-bright via-ui-border w-full rounded-2xl bg-gradient-to-b to-transparent p-[1px]">
                <div className="bg-brand-surface/90 border-ui-border/50 flex h-full w-full flex-col items-center rounded-[15px] border p-6 text-center backdrop-blur-md">
                  <div className="bg-brand-surface border-ui-border text-ui-text mb-4 flex h-12 w-12 items-center justify-center rounded-xl border shadow-[0_0_15px_var(--accent-glow)]">
                    <Icon
                      icon="solar:globus-bold-duotone"
                      className="text-2xl"
                    />
                  </div>
                  <h3 className="text-ui-text text-lg font-medium tracking-tight">
                    Network Engine
                  </h3>
                  <p className="text-ui-text-muted mt-2 text-xs leading-relaxed font-normal">
                    Low-level packet inspection and throughput calculation for
                    all active interfaces.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="from-ui-border-bright seq-line seq-line-v1 z-10 h-32 w-[1px] bg-gradient-to-b to-transparent"
              style={{ transformOrigin: "top", transform: "scaleY(0)" }}
            ></div>

            {/* LEVEL 2 */}
            <div className="relative z-20 mt-[-1px] w-full">
              <div
                className="bg-ui-border seq-line-h seq-line-h1 absolute top-0 right-1/4 left-1/4 h-[1px]"
                style={{ transformOrigin: "center", transform: "scaleX(0)" }}
              ></div>
              <div className="flex flex-col justify-center gap-8 pt-8 text-balance md:flex-row md:gap-32">
                <div
                  className="seq-node seq-l2 w-full max-w-sm opacity-0"
                  style={{ transform: "translateY(20px)" }}
                >
                  <div className="from-ui-border-bright via-ui-border h-full w-full rounded-2xl bg-gradient-to-br to-transparent p-[1px]">
                    <div className="bg-brand-surface/90 border-ui-border h-full w-full rounded-[15px] border p-6 text-left backdrop-blur-sm">
                      <Icon
                        icon="solar:history-bold-duotone"
                        className="text-ui-text-muted mb-3 text-xl"
                      />
                      <h3 className="text-ui-text text-sm font-medium tracking-tight">
                        Historical Data
                      </h3>
                      <p className="text-ui-text-muted mt-1 text-xs leading-relaxed font-normal">
                        Persistent local storage logs hourly and daily bandwidth
                        metrics for retrospective analysis.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="seq-node seq-l2 w-full max-w-sm opacity-0"
                  style={{ transform: "translateY(20px)" }}
                >
                  <div className="from-ui-border-bright via-ui-border h-full w-full rounded-2xl bg-gradient-to-bl to-transparent p-[1px]">
                    <div className="bg-brand-surface/90 border-ui-border h-full w-full rounded-[15px] border p-6 text-left backdrop-blur-sm">
                      <Icon
                        icon="solar:graph-bold-duotone"
                        className="text-ui-text-muted mb-3 text-xl"
                      />
                      <h3 className="text-ui-text text-sm font-medium tracking-tight">
                        Traffic Analysis
                      </h3>
                      <p className="text-ui-text-muted mt-1 text-xs leading-relaxed font-normal">
                        Real-time Rx/Tx byte tracking with visual charting for
                        desktop performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-[-1px] flex w-full justify-center gap-8 md:gap-32">
              <div
                className="from-ui-border seq-line seq-line-v2 h-32 w-[1px] bg-gradient-to-b to-transparent"
                style={{ transformOrigin: "top", transform: "scaleY(0)" }}
              ></div>
              <div
                className="from-ui-border seq-line seq-line-v2 hidden h-32 w-[1px] bg-gradient-to-b to-transparent md:block"
                style={{ transformOrigin: "top", transform: "scaleY(0)" }}
              ></div>
            </div>

            {/* LEVEL 3 */}
            <div className="relative z-20 mt-[-1px] w-full">
              <div
                className="bg-ui-border seq-line-h seq-line-h2 absolute top-0 right-[10%] left-[10%] h-[1px]"
                style={{ transformOrigin: "center", transform: "scaleX(0)" }}
              ></div>
              <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 pt-8 md:grid-cols-3 md:px-0">
                {["Interface Sync", "Widget API", "Deep Packet"].map(
                  (title, i) => (
                    <div
                      key={title}
                      className="seq-node seq-l3 w-full opacity-0"
                      style={{ transform: "translateY(20px)" }}
                    >
                      <div className="from-ui-border h-full w-full rounded-xl bg-gradient-to-b to-transparent p-[1px]">
                        <div className="bg-brand-surface/90 border-ui-border/50 flex h-full w-full flex-col justify-between rounded-[11px] border p-5 text-left shadow-lg">
                          <div>
                            <div className="mb-3 flex items-center justify-between">
                              <Icon
                                icon={`solar:${["refresh", "widget-add", "chart-square"][i]}-bold-duotone`}
                                className="text-ui-text-muted text-lg"
                              />
                              <span className="text-ui-text-muted bg-ui-border/20 border-ui-border rounded border px-2 py-0.5 font-mono text-[9px] tracking-widest">
                                Active
                              </span>
                            </div>
                            <h3 className="text-ui-text-muted text-xs font-semibold tracking-wide">
                              {title}
                            </h3>
                            <p className="text-ui-text-muted/60 mt-1 text-xs leading-relaxed font-normal">
                              Native hardware communication layer.
                            </p>
                          </div>
                          <div className="border-ui-border mt-4 border-t pt-4">
                            <div className="bg-ui-border/20 h-1 w-full overflow-hidden rounded-full">
                              <div
                                className="bg-ui-text-muted/40 h-full w-[75%]"
                                style={{ width: i === 0 ? "99%" : "75%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="from-brand-bg pointer-events-none absolute bottom-0 left-0 z-30 h-32 w-full bg-gradient-to-t to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Expansion
