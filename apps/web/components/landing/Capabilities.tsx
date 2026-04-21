import React from "react"
import { Icon } from "@iconify/react"

const Capabilities: React.FC = () => {
  return (
    <section
      className="ui-section z-10 overflow-hidden pt-32 pb-32"
      id="capabilities"
    >
      <div className="ui-container border-ui-border border-t pt-20">
        {/* Corner Decorative Markers */}
        <div className="text-ui-border-bright absolute -top-[7px] -left-[7px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute -top-[7px] -right-[7px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="fade-up mb-20 flex items-center gap-6 px-6 md:px-10">
          <h2 className="text-ui-text font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
            Core Primitives
          </h2>
          <div className="bg-ui-border h-px flex-1"></div>
          <span className="text-ui-text-muted font-mono text-[9px] tracking-widest uppercase">
            System Capabilities
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-3 md:px-10">
          {/* Card 1 */}
          <div
            className="group fade-up relative h-full"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative h-full w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-ui-bg border-ui-border group-hover:border-ui-border-bright group-hover:bg-brand-surface relative z-10 flex h-full flex-col overflow-hidden rounded-3xl border p-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="bg-ui-border-bright group-hover:bg-ui-border pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full blur-[50px] transition-colors"></div>
                <div className="mb-8 flex items-start justify-between">
                  <div className="bg-ui-bg border-ui-border flex h-12 w-12 items-center justify-center rounded-xl border shadow-inner transition-transform duration-500 group-hover:scale-110">
                    <Icon
                      icon="solar:box-minimalistic-linear"
                      className="text-ui-text-muted group-hover:text-ui-text text-2xl"
                    />
                  </div>
                  <div className="text-ui-text-muted border-ui-border bg-brand-surface rounded border px-2 py-1 font-mono text-[9px]">
                    Module 01
                  </div>
                </div>
                <h3 className="text-ui-text mb-3 text-xl font-semibold tracking-tight">
                  Live Monitoring
                </h3>
                <p className="text-ui-text-muted mb-8 flex-1 text-sm leading-relaxed font-light">
                  High-fidelity tracking of Rx and Tx bytes across all network
                  interfaces with sub-second accuracy and real-time
                  visualization.
                </p>
                <div className="mt-auto flex items-center gap-2">
                  <div className="bg-ui-border relative h-[2px] flex-1 overflow-hidden">
                    <div className="bg-ui-text absolute top-0 left-0 h-full w-1/3 animate-[shimmerLine_2s_linear_infinite]"></div>
                  </div>
                  <span className="text-ui-text-muted font-mono text-[10px] uppercase">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="group fade-up relative h-full md:mt-12"
            style={{ perspective: "1200px", transitionDelay: "100ms" }}
          >
            <div
              className="relative h-full w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-ui-bg border-ui-border group-hover:border-ui-border-bright group-hover:bg-brand-surface relative z-10 flex h-full flex-col overflow-hidden rounded-3xl border p-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-glow),transparent_50%)]"></div>
                <div className="relative z-10 mb-8 flex items-start justify-between">
                  <div className="bg-ui-bg border-ui-border flex h-12 w-12 items-center justify-center rounded-xl border shadow-inner transition-transform duration-500 group-hover:scale-110">
                    <Icon
                      icon="solar:cpu-bolt-linear"
                      className="text-ui-text-muted group-hover:text-ui-text text-2xl"
                    />
                  </div>
                  <div className="text-ui-text-muted border-ui-border bg-brand-surface flex items-center gap-1 rounded border px-2 py-1 font-mono text-[9px]">
                    <div className="bg-ui-text h-1 w-1 animate-pulse rounded-full"></div>
                    Module 02
                  </div>
                </div>
                <h3 className="text-ui-text relative z-10 mb-3 text-xl font-semibold tracking-tight">
                  Historical Insights
                </h3>
                <p className="text-ui-text-muted relative z-10 mb-8 flex-1 text-sm leading-relaxed font-light">
                  Comprehensive data persistence that logs your bandwidth usage
                  over days, weeks, and months for deep analysis.
                </p>
                <div className="relative z-10 mt-auto flex items-center gap-1">
                  <div className="bg-ui-border-bright group-hover:bg-ui-text anim-bar-1 h-3 w-1 transition-colors"></div>
                  <div className="bg-ui-border-bright group-hover:bg-ui-text anim-bar-2 h-4 w-1 transition-colors"></div>
                  <div className="bg-ui-border-bright group-hover:bg-ui-text anim-bar-3 h-2 w-1 transition-colors"></div>
                  <div className="bg-ui-border-bright group-hover:bg-ui-text anim-bar-4 h-5 w-1 transition-colors"></div>
                  <div className="bg-ui-border-bright group-hover:bg-ui-text anim-bar-5 h-3 w-1 transition-colors"></div>
                  <span className="text-ui-text-muted ml-2 font-mono text-[10px] uppercase">
                    Processing
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="group fade-up relative h-full md:mt-24"
            style={{ perspective: "1200px", transitionDelay: "200ms" }}
          >
            <div
              className="relative h-full w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-ui-bg border-ui-border group-hover:border-ui-border-bright group-hover:bg-brand-surface relative z-10 flex h-full flex-col overflow-hidden rounded-3xl border p-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="bg-grid-small pointer-events-none absolute inset-0 opacity-10 transition-opacity group-hover:opacity-30"></div>
                <div className="relative z-10 mb-8 flex items-start justify-between">
                  <div className="bg-ui-bg border-ui-border flex h-12 w-12 items-center justify-center rounded-xl border shadow-inner transition-transform duration-500 group-hover:scale-110">
                    <Icon
                      icon="solar:widget-2-linear"
                      className="text-ui-text-muted group-hover:text-ui-text text-2xl"
                    />
                  </div>
                  <div className="text-ui-text-muted border-ui-border bg-brand-surface rounded border px-2 py-1 font-mono text-[9px]">
                    Module 03
                  </div>
                </div>
                <h3 className="text-ui-text relative z-10 mb-3 text-xl font-semibold tracking-tight">
                  Minimal Footprint
                </h3>
                <p className="text-ui-text-muted relative z-10 mb-8 flex-1 text-sm leading-relaxed font-light">
                  A lightweight desktop widget and system tray integration
                  designed to monitor your network without interrupting your
                  workflow.
                </p>
                <div className="text-ui-text-muted relative z-10 mt-auto flex flex-col gap-1 font-mono text-[10px]">
                  <span>Native hardware sync</span>
                  <span className="opacity-50">Background service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Capabilities
