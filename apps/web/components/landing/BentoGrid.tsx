import React from "react"
import { Icon } from "@iconify/react"

const BentoGrid: React.FC = () => {
  return (
    <section className="ui-section z-10 overflow-hidden py-32" id="topology">
      <div className="ui-container border-ui-border border-t pt-20">
        {/* Corner Decorative Markers */}
        <div className="text-ui-border-bright absolute -top-[7px] -left-[7px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute -top-[7px] -right-[7px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="fade-up mb-16 flex flex-col items-start px-6 md:px-10">
          <h2 className="text-ui-text mb-4 text-3xl font-normal tracking-tight md:text-5xl">
            Network Intelligence
          </h2>
          <p className="text-ui-text-muted max-w-xl text-sm leading-relaxed font-light md:text-base">
            Precise mapping of your machine's network environment. Real-time
            speeds, zero-latency reporting.
          </p>
        </div>

        <div className="fade-up grid auto-rows-[300px] grid-cols-1 gap-4 px-6 md:grid-cols-4 md:px-10">
          {/* Main Graph Box */}
          <div className="bg-ui-bg border-ui-border group hover:border-ui-border-bright relative col-span-1 row-span-2 overflow-hidden rounded-[2.5rem] border p-8 transition-all duration-500 md:col-span-2">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05] transition-opacity group-hover:opacity-[0.15]"></div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="bg-brand-surface border-ui-border inline-flex items-center gap-2 rounded border px-3 py-1.5">
                  <div className="bg-ui-text h-1.5 w-1.5 animate-pulse rounded-full"></div>
                  <span className="text-ui-text font-mono text-[10px] tracking-widest">
                    Live Feed
                  </span>
                </div>
                <Icon
                  icon="solar:chart-square-linear"
                  className="text-ui-text-muted group-hover:text-ui-text text-xl transition-colors"
                />
              </div>

              {/* Animated Chart Center */}
              <div className="absolute top-1/2 left-1/2 flex h-32 w-full max-w-[250px] -translate-x-1/2 -translate-y-1/2 items-end justify-between gap-1">
                <div className="bg-ui-border-bright border-ui-border anim-bar-1 relative w-full overflow-hidden border">
                  <div className="bg-ui-text absolute inset-x-0 top-0 h-[1px] shadow-[0_0_10px_var(--ui-text)]"></div>
                </div>
                <div className="bg-ui-border-bright border-ui-border anim-bar-2 relative w-full overflow-hidden border">
                  <div className="bg-ui-text absolute inset-x-0 top-0 h-[1px] shadow-[0_0_10px_var(--ui-text)]"></div>
                </div>
                <div className="bg-ui-text border-ui-text anim-bar-3 relative w-full overflow-hidden border shadow-[0_0_20px_var(--accent-glow)]"></div>
                <div className="bg-ui-border-bright border-ui-border anim-bar-4 relative w-full overflow-hidden border">
                  <div className="bg-ui-text absolute inset-x-0 top-0 h-[1px] shadow-[0_0_10px_var(--ui-text)]"></div>
                </div>
                <div className="bg-ui-border-bright border-ui-border anim-bar-5 relative w-full overflow-hidden border">
                  <div className="bg-ui-text absolute inset-x-0 top-0 h-[1px] shadow-[0_0_10px_var(--ui-text)]"></div>
                </div>
                <div className="bg-ui-border-bright border-ui-border anim-bar-1 relative w-full overflow-hidden border">
                  <div className="bg-ui-text absolute inset-x-0 top-0 h-[1px] shadow-[0_0_10px_var(--ui-text)]"></div>
                </div>
                <div className="bg-ui-border-bright border-ui-border anim-bar-2 relative w-full overflow-hidden border">
                  <div className="bg-ui-text absolute inset-x-0 top-0 h-[1px] shadow-[0_0_10px_var(--ui-text)]"></div>
                </div>
              </div>

              <div className="">
                <h3 className="text-ui-text mb-2 text-xl font-semibold tracking-tight transition-transform group-hover:translate-x-1">
                  Real-time Throughput
                </h3>
                <div className="border-ui-border flex gap-8 border-t pt-4">
                  <div>
                    <div className="text-ui-text-muted mb-1 text-right font-mono text-[10px]">
                      Download
                    </div>
                    <div className="text-ui-text font-mono text-sm">
                      42.5 MB/s
                    </div>
                  </div>
                  <div>
                    <div className="text-ui-text-muted mb-1 text-right font-mono text-[10px]">
                      Upload
                    </div>
                    <div className="text-ui-text font-mono text-sm">
                      8.2 MB/s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tray Integration Box */}
          <div className="bg-ui-bg border-ui-border group hover:border-ui-border-bright relative col-span-1 row-span-2 flex flex-col justify-between overflow-hidden rounded-[2.5rem] border p-8 transition-all duration-500 md:col-span-1">
            <div className="flex items-start justify-between">
              <Icon
                icon="solar:layers-minimalistic-linear"
                className="text-ui-text-muted group-hover:text-ui-text text-xl transition-colors"
              />
              <div className="text-ui-text-muted font-mono text-[10px]">
                Z-Axis
              </div>
            </div>

            {/* Floating 3D Layers */}
            <div className="relative my-auto flex h-40 w-full flex-col items-center justify-center">
              <div className="border-ui-border-bright bg-ui-bg-alt/80 layer-float-1 text-ui-text/50 absolute flex h-24 w-24 items-center justify-center border font-mono text-[10px] backdrop-blur-md transition-colors">
                L3
              </div>
              <div className="border-ui-border bg-brand-surface layer-float-2 text-ui-text/30 absolute mt-8 flex h-24 w-24 items-center justify-center border font-mono text-[10px] transition-colors">
                L2
              </div>
              <div className="border-ui-border bg-brand-surface/50 layer-float-3 text-ui-text/10 absolute mt-16 flex h-24 w-24 items-center justify-center border font-mono text-[10px] transition-colors">
                L1
              </div>
            </div>

            <div className="">
              <h3 className="text-ui-text mb-2 text-lg font-semibold tracking-tight">
                Tray Integration
              </h3>
              <div className="border-ui-border space-y-1.5 border-t pt-4">
                <div className="text-ui-text-muted flex justify-between font-mono text-[10px]">
                  <span>Tray Interface</span>
                  <span className="text-ui-text">Ready</span>
                </div>
                <div className="text-ui-text-muted flex justify-between font-mono text-[10px]">
                  <span>Floating Widget</span>
                  <span className="text-ui-text">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Square 1: Uptime */}
          <div className="bg-ui-bg border-ui-border group hover:border-ui-border-bright relative col-span-1 row-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] border p-6 transition-all duration-500">
            <div className="flex items-start justify-between">
              <Icon
                icon="solar:shield-check-linear"
                className="text-ui-text-muted group-hover:text-ui-text text-xl transition-colors"
              />
              <div className="bg-ui-text h-2 w-2 animate-pulse rounded-full shadow-[0_0_10px_var(--ui-text)]"></div>
            </div>
            <div>
              <div className="text-ui-text mb-1 font-mono text-3xl font-semibold tracking-tighter">
                99.99<span className="text-lg">%</span>
              </div>
              <h3 className="text-ui-text-muted font-mono text-xs">
                Uptime Integrity
              </h3>
            </div>
          </div>

          {/* Square 2: Signal */}
          <div className="bg-ui-bg border-ui-border group hover:border-ui-border-bright relative col-span-1 row-span-1 flex flex-col justify-between overflow-hidden rounded-[2rem] border p-6 transition-all duration-500">
            <div className="flex items-start justify-between">
              <Icon
                icon="solar:radar-linear"
                className="text-ui-text-muted group-hover:text-ui-text text-xl transition-colors"
              />
            </div>
            <div className="border-ui-border relative mb-2 h-12 w-full overflow-hidden border-b">
              <svg
                className="path-line absolute bottom-0 h-full w-[200%]"
                preserveAspectRatio="none"
                viewBox="0 0 100 20"
              >
                <path
                  d="M0,10 Q5,20 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-ui-text/30"
                ></path>
              </svg>
            </div>
            <h3 className="text-ui-text-muted font-mono text-xs">
              Signal Noise
            </h3>
          </div>

          {/* Wide Bottom Box */}
          <div className="bg-ui-bg border-ui-border group hover:border-ui-border-bright relative col-span-1 row-span-1 flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[2rem] border p-8 transition-all duration-500 md:col-span-4 md:flex-row">
            <div className="from-ui-border group-hover:from-ui-border-bright pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l to-transparent transition-colors"></div>
            <div className="relative z-10 max-w-lg text-left">
              <h3 className="text-ui-text mb-2 text-xl font-semibold tracking-tight">
                Low Impact Design
              </h3>
              <p className="text-ui-text-muted text-sm font-light">
                Optimized C++ and Electron bindings ensure NSX Monitor stays
                silent in the background with minimal CPU usage on your PC.
              </p>
            </div>
            <div className="relative z-10 flex w-full justify-between gap-12 md:w-auto md:justify-end">
              <div>
                <div className="text-ui-text font-mono text-3xl font-semibold tracking-tighter">
                  1s
                </div>
                <div className="text-ui-text-muted mt-1 font-mono text-[10px]">
                  Resolution
                </div>
              </div>
              <div className="">
                <div className="text-ui-text font-mono text-3xl font-semibold tracking-tighter">
                  12<span className="text-ui-text-muted text-lg">MB</span>
                </div>
                <div className="text-ui-text-muted mt-1 font-mono text-[10px]">
                  Footprint
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
