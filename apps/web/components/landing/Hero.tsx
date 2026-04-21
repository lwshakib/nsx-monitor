import React, { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import { Link } from "react-router"
import gsap from "gsap"

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const text = "Real-time Network Telemetry for Your Workspace."
    if (titleRef.current) {
      titleRef.current.innerHTML = text
        .split(" ")
        .map(
          (w) =>
            `<span class="inline-block overflow-hidden pb-1"><span class="t-word inline-block translate-y-full opacity-0 text-ui-text">${w}</span></span>`
        )
        .join(" ")
    }

    const tl = gsap.timeline({ delay: 0.5 })
    tl.to(".t-word", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    }).to(
      [subtitleRef.current, actionsRef.current],
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
  }, [])

  return (
    <section
      className="ui-section relative flex h-[700px] w-full flex-col overflow-hidden md:h-[85vh]"
      id="hero"
    >
      <div className="ui-container bg-ui-bg relative flex flex-1 flex-col items-center justify-center">
        {/* Background Gradients (Minimal) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-ui-text/5 absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[120px]"></div>
          <div className="bg-grid absolute inset-0 opacity-[0.05]"></div>
        </div>

        {/* Corner Decorative Markers */}
        <div className="text-ui-border-bright absolute top-6 left-6 z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute top-6 right-6 z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute bottom-6 left-6 z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute right-6 bottom-6 z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>

        {/* Content */}
        <main className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
          <div className="text-ui-text-muted border-ui-border bg-brand-surface/50 group mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest shadow-sm backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </span>
            System Online
          </div>

          <h1
            ref={titleRef}
            className="text-ui-text mb-6 max-w-4xl text-4xl leading-[1.05] font-normal tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          ></h1>

          <p
            ref={subtitleRef}
            className="text-ui-text-muted mb-10 max-w-2xl text-sm leading-relaxed opacity-0 md:text-base"
          >
            A high-performance desktop application for real-time bandwidth
            monitoring, historical usage tracking, and intelligent network
            diagnostics across all Windows interfaces.
          </p>

          <div
            ref={actionsRef}
            className="flex w-full flex-col items-center gap-4 opacity-0 sm:w-auto sm:flex-row"
          >
            <Link
              to="/download"
              className="bg-ui-text text-brand-bg flex w-full items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold shadow-[0_0_30px_var(--accent-glow)] transition-all hover:opacity-90 active:scale-95 sm:w-auto"
            >
              <Icon icon="solar:download-bold-duotone" className="text-xl" />
              Download for Windows
            </Link>
            <a
              href="https://github.com/lwshakib/nsx-monitor"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-surface text-ui-text hover:bg-ui-border-bright border-ui-border flex w-full items-center justify-center gap-2.5 rounded-xl border px-8 py-4 text-sm font-normal shadow-sm backdrop-blur-md transition-all sm:w-auto"
            >
              <Icon icon="ri:github-fill" className="text-xl" />
              View Source
            </a>
          </div>
        </main>

        {/* Bottom Fade */}
        <div className="from-ui-bg pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t to-transparent"></div>
      </div>
    </section>
  )
}

export default Hero
