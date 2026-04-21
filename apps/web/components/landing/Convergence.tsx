import React from "react"
import { Icon } from "@iconify/react"

const Convergence: React.FC = () => {
  return (
    <section
      className="ui-section flex min-h-screen flex-col overflow-hidden select-none"
      id="convergence"
    >
      <div className="ui-container border-ui-border flex min-h-[900px] flex-col items-center justify-center border-t py-32">
        {/* Corner Decorative Markers */}
        <div className="text-ui-border-bright absolute -top-[7.5px] -left-[7.5px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute -top-[7.5px] -right-[7.5px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-glow),transparent_50%)]"></div>

        <div className="relative z-20 mb-20 flex max-w-2xl flex-col items-center px-6 text-center">
          <div className="border-ui-border bg-brand-surface mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-[0_0_20px_var(--accent-glow)] backdrop-blur-md">
            <span className="bg-ui-text h-1.5 w-1.5 animate-pulse rounded-full"></span>
            <span className="text-ui-text-muted font-mono text-[10px] tracking-widest">
              Unified System
            </span>
          </div>

          <h2 className="text-ui-text mb-6 text-4xl font-normal tracking-tight md:text-5xl">
            Data Convergence
          </h2>

          <p className="text-ui-text-muted mx-auto max-w-md text-sm leading-relaxed font-light">
            The NSX Monitor engine pulls fragmented network insights into a
            singular cognitive core. Experience the power of total network
            transparency on your desktop.
          </p>
        </div>

        <div className="relative z-10 flex h-[640px] max-h-[94vw] w-[640px] max-w-[94vw] scale-[0.72] items-center justify-center md:scale-100">
          <div className="bg-ui-text-muted/5 pointer-events-none absolute h-[300px] w-[300px] rounded-full opacity-80 blur-[60px]"></div>

          <div
            className="border-ui-border pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-solid"
            style={{
              animation:
                "radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite",
              animationDelay: "0s",
            }}
          ></div>
          <div
            className="border-ui-border pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-solid"
            style={{
              animation:
                "radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite",
              animationDelay: "1.33s",
            }}
          ></div>
          <div
            className="border-ui-border pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-solid"
            style={{
              animation:
                "radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite",
              animationDelay: "2.66s",
            }}
          ></div>

          <div
            className="pointer-events-none absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "core-pulse-anim 2s ease-in-out infinite" }}
          >
            <div className="bg-ui-text absolute inset-0 animate-pulse rounded-full opacity-20 blur-xl"></div>
            <div className="bg-ui-text text-brand-bg before:border-ui-border-bright relative flex h-20 w-20 items-center justify-center rounded-full shadow-[0_0_60px_var(--accent-glow),inset_0_0_20px_rgba(0,0,0,0.1)] before:absolute before:-inset-4 before:animate-[spin_6s_linear_infinite] before:rounded-full before:border before:border-dashed before:content-['']">
              <Icon
                icon="solar:bolt-bold-duotone"
                className="animate-pulse text-3xl"
              />
            </div>
          </div>

          {/* 1. Code Block */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 flex w-32 flex-col gap-1.5 rounded-xl border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "-240px",
                "--ty": "-240px",
                "--rot": "15deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "0.2s",
              } as React.CSSProperties
            }
          >
            <div className="bg-ui-text-muted/20 h-1.5 w-1/2 rounded"></div>
            <div className="bg-ui-text-muted/40 h-1.5 w-3/4 rounded"></div>
            <div className="bg-ui-text-muted/20 h-1.5 w-2/3 rounded"></div>
          </div>

          {/* 2. Database */}
          <div
            className="bg-brand-surface/50 border-ui-border text-ui-text-muted absolute top-1/2 left-1/2 z-20 rounded-xl border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "260px",
                "--ty": "-180px",
                "--rot": "-20deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "0.6s",
              } as React.CSSProperties
            }
          >
            <Icon icon="solar:database-linear" className="text-xl" />
          </div>

          {/* 3. Custom Toggle */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 rounded-xl border p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "-180px",
                "--ty": "260px",
                "--rot": "30deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "1.0s",
              } as React.CSSProperties
            }
          >
            <div className="bg-ui-text-muted/20 relative h-4 w-8 rounded-full">
              <div className="bg-ui-text absolute top-[2px] right-1 h-3 w-3 rounded-full shadow-[0_0_10px_var(--accent-glow)]"></div>
            </div>
          </div>

          {/* 4. Metric */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 flex items-center gap-2 rounded-xl border px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "220px",
                "--ty": "220px",
                "--rot": "-10deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "1.4s",
              } as React.CSSProperties
            }
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
            <span className="text-ui-text font-mono text-xs">99.9%</span>
          </div>

          {/* 5. Bar Chart */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 flex h-12 w-16 items-end gap-1.5 rounded-xl border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "-320px",
                "--ty": "20px",
                "--rot": "25deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "1.8s",
              } as React.CSSProperties
            }
          >
            <div className="bg-ui-border-bright h-1/3 w-2 rounded-t"></div>
            <div className="bg-ui-text-muted/40 h-2/3 w-2 rounded-t"></div>
            <div className="bg-ui-text-muted/60 h-1/2 w-2 rounded-t"></div>
            <div className="bg-ui-text h-full w-2 rounded-t shadow-[0_0_8px_var(--accent-glow)] transition-colors"></div>
          </div>

          {/* 6. Settings */}
          <div
            className="bg-brand-surface/50 border-ui-border text-ui-text-muted absolute top-1/2 left-1/2 z-20 rounded-xl border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "300px",
                "--ty": "60px",
                "--rot": "-25deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "2.2s",
              } as React.CSSProperties
            }
          >
            <Icon icon="solar:settings-linear" className="text-xl" />
          </div>

          {/* 7. User Profile Placeholder */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 flex items-center gap-2 rounded-xl border p-2 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "-80px",
                "--ty": "-300px",
                "--rot": "40deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "2.6s",
              } as React.CSSProperties
            }
          >
            <div className="from-ui-text-muted/20 to-ui-text-muted/5 border-ui-border h-6 w-6 rounded-full border bg-gradient-to-tr"></div>
            <div className="bg-ui-text-muted/20 h-1.5 w-8 rounded"></div>
          </div>

          {/* 8. Security Shield */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 rounded-xl border p-3 text-emerald-400 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "100px",
                "--ty": "-280px",
                "--rot": "-15deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "3.0s",
              } as React.CSSProperties
            }
          >
            <Icon icon="solar:shield-check-linear" className="text-xl" />
          </div>

          {/* 9. Custom Slider */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 w-24 rounded-xl border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "-120px",
                "--ty": "320px",
                "--rot": "20deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "3.4s",
              } as React.CSSProperties
            }
          >
            <div className="bg-ui-text-muted/10 relative h-1 w-full rounded-full">
              <div className="bg-ui-text absolute top-1/2 left-1/3 h-2.5 w-2.5 -translate-y-1/2 rounded-full shadow-[0_0_8px_var(--accent-glow)]"></div>
            </div>
          </div>

          {/* 10. CPU Node */}
          <div
            className="bg-brand-surface/50 border-ui-border text-ui-text-muted absolute top-1/2 left-1/2 z-20 rounded-xl border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "160px",
                "--ty": "300px",
                "--rot": "-35deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "3.8s",
              } as React.CSSProperties
            }
          >
            <Icon icon="solar:cpu-bolt-linear" className="text-xl" />
          </div>

          {/* 11. Line Graph */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 w-20 rounded-xl border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "-340px",
                "--ty": "-120px",
                "--rot": "10deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "4.2s",
              } as React.CSSProperties
            }
          >
            <svg viewBox="0 0 100 20" className="h-4 w-full overflow-visible">
              <path
                d="M0,10 Q15,20 25,10 T50,10 T75,5 T100,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-ui-text-muted/60"
              ></path>
            </svg>
          </div>

          {/* 12. Code Block 2 */}
          <div
            className="bg-brand-surface/50 border-ui-border absolute top-1/2 left-1/2 z-20 flex w-24 flex-col gap-1.5 rounded-xl border p-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
            style={
              {
                "--tx": "340px",
                "--ty": "-80px",
                "--rot": "-5deg",
                animation:
                  "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both",
                animationDelay: "4.6s",
              } as React.CSSProperties
            }
          >
            <div className="h-1.5 w-full rounded bg-emerald-400/40"></div>
            <div className="bg-ui-text-muted/20 h-1.5 w-2/3 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Convergence
