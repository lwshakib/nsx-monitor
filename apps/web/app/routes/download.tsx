import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import Nav from "../../components/landing/Nav"
import Footer from "../../components/landing/Footer"
import "../styles/landing.css"
import type { Route } from "./+types/download"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Download | NSX Monitor" },
    {
      name: "description",
      content:
        "Get the NSX Monitor desktop application for Windows, macOS, or Linux.",
    },
  ]
}

export default function Download() {
  const [os, setOs] = useState<"Windows" | "macOS" | "Linux" | "Unknown">(
    "Unknown"
  )

  useEffect(() => {
    // OS Detection
    const userAgent = window.navigator.userAgent
    if (userAgent.indexOf("Win") !== -1) setOs("Windows")
    else if (userAgent.indexOf("Mac") !== -1) setOs("macOS")
    else if (userAgent.indexOf("Linux") !== -1) setOs("Linux")

    // Animation Visibility Observer (Keeping it for other elements)
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    const targets = document.querySelectorAll(".fade-up, .scale-in")
    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  const osData = {
    Windows: {
      icon: "logos:microsoft-windows-icon",
      name: "Windows",
      ext: ".exe",
      desc: "Universal installer for Windows 10/11 x64 architecture.",
    },
    macOS: {
      icon: "catppuccin:macos",
      name: "macOS",
      ext: ".dmg",
      desc: "Native Apple Silicon and Intel support with universal binary.",
    },
    Linux: {
      icon: "logos:linux-tux",
      name: "Linux",
      ext: ".AppImage",
      desc: "Distro-agnostic AppImage for all major Linux distributions.",
    },
    Unknown: {
      icon: "solar:question-square-bold-duotone",
      name: "Other Platforms",
      ext: "",
      desc: "Select your platform manually below to get started.",
    },
  }

  const currentOs = osData[os]

  return (
    <div className="bg-brand-bg text-ui-text selection:bg-ui-text/20 selection:text-ui-text relative min-h-screen overflow-x-hidden antialiased transition-colors duration-500">
      <Nav />

      {/* Background Grid */}
      <div className="fixed top-0 -z-10 h-screen w-full">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]"></div>
      </div>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-40 pb-20 md:px-10">
        {/* Row 1: Detected OS */}
        <section className="mb-20 w-full">
          <div className="from-ui-border-bright rounded-[2.5rem] bg-gradient-to-b to-transparent p-[1px] shadow-2xl">
            <div className="bg-ui-bg-alt/80 border-ui-border flex flex-col items-center gap-12 rounded-[2.45rem] border p-10 backdrop-blur-xl md:flex-row md:p-16">
              <div className="bg-brand-surface border-ui-border flex h-32 w-32 items-center justify-center rounded-[2rem] border p-8 shadow-inner md:h-48 md:w-48">
                <Icon icon={currentOs.icon} className="text-[100px]" />
              </div>
              <div className="flex-1 text-center text-white md:text-left">
                <div className="bg-ui-text/10 border-ui-border text-ui-text-muted mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] tracking-widest">
                  {os === "Unknown"
                    ? "System Detection"
                    : "Recommended for your system"}
                </div>
                <h1 className="mb-6 text-4xl leading-tight font-normal tracking-tight text-white md:text-6xl">
                  Download for {currentOs.name}
                </h1>
                <p className="text-ui-text-muted mb-10 max-w-xl text-base font-light md:text-lg">
                  {currentOs.desc} Get the full desktop experience with native
                  performance.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <button className="bg-ui-text text-brand-bg flex w-full items-center justify-center gap-3 rounded-2xl px-10 py-5 text-base font-bold shadow-[0_0_40px_var(--accent-glow)] transition-all hover:opacity-90 active:scale-95 sm:w-auto">
                    <Icon
                      icon="solar:download-bold-duotone"
                      className="text-xl"
                    />
                    Download for{" "}
                    {currentOs.name === "Other Platforms"
                      ? "Desktop"
                      : currentOs.name}
                  </button>
                  <span className="text-ui-text-muted font-mono text-[10px] uppercase">
                    Stable Release
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-12 flex w-full items-center gap-6">
          <div className="bg-ui-border h-px flex-1"></div>
          <h2 className="text-ui-text-muted font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
            All Platforms
          </h2>
          <div className="bg-ui-border h-px flex-1"></div>
        </div>

        {/* Row 2: Three Cards */}
        <section className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {["Windows", "macOS", "Linux"].map((platform) => {
            const data = osData[platform as keyof typeof osData]
            return (
              <div
                key={platform}
                className="group from-ui-border hover:from-ui-border-bright hover:to-ui-text/5 rounded-[2rem] bg-gradient-to-br to-transparent p-[1px] transition-all duration-500"
              >
                <div className="bg-ui-bg-alt/90 border-ui-border group-hover:border-ui-border-bright flex h-full flex-col items-center rounded-[1.95rem] border p-8 text-center backdrop-blur-md transition-all">
                  <div className="bg-brand-surface border-ui-border mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg transition-transform duration-500 group-hover:scale-110">
                    <Icon icon={data.icon} className="text-3xl" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">
                    {data.name}
                  </h3>
                  <p className="text-ui-text-muted mb-8 flex-1 text-xs leading-relaxed font-light">
                    {data.desc}
                  </p>
                  <button className="bg-brand-surface border-ui-border text-ui-text hover:bg-ui-text hover:text-brand-bg flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-semibold transition-all duration-300">
                    Download for {data.name}
                  </button>
                </div>
              </div>
            )
          })}
        </section>

        <div className="border-ui-border bg-ui-bg-alt/40 mt-20 flex max-w-4xl flex-col items-center gap-8 rounded-[2rem] border p-8 text-left text-white backdrop-blur-sm md:flex-row">
          <div className="bg-ui-text/5 border-ui-border text-ui-text flex h-12 w-12 items-center justify-center rounded-xl border">
            <Icon icon="solar:info-square-bold-duotone" className="text-2xl" />
          </div>
          <div className="flex-1">
            <h4 className="mb-1 text-sm font-semibold tracking-wider text-white uppercase">
              Installation Note
            </h4>
            <p className="text-ui-text-muted text-[12px] leading-relaxed font-light">
              For Windows, you may encounter a "SmartScreen" warning as the
              installer is currently being signed. Click "More Info" and "Run
              Anyway" to proceed. On macOS, you might need to right-click and
              "Open" for the first launch.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
