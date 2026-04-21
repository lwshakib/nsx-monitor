import React from "react"
import { Icon } from "@iconify/react"
import Logo from "../Logo"
import { Link } from "react-router"

const Footer: React.FC = () => {
  return (
    <footer className="flex w-full flex-col">
      {/* CTA Section */}
      <section className="ui-section overflow-hidden py-32" id="cta">
        <div className="ui-container border-ui-border flex flex-col items-center border-t py-24 text-center">
          {/* Corner Decorative Markers */}
          <div className="text-ui-border-bright absolute -top-[7.5px] -left-[7.5px] z-50 h-3.5 w-3.5">
            <Icon icon="solar:add-linear" />
          </div>
          <div className="text-ui-border-bright absolute -top-[7.5px] -right-[7.5px] z-50 h-3.5 w-3.5">
            <Icon icon="solar:add-linear" />
          </div>

          <div className="bg-brand-surface/30 pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full opacity-50 blur-[100px]"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-brand-surface border-ui-border text-ui-text-muted mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] shadow-[0_0_20px_var(--accent-glow)] backdrop-blur-md">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_var(--accent-glow)]"></div>
              <span>Ready for Download</span>
            </div>

            <h2 className="text-ui-text typewriter-text mb-6 font-mono text-4xl font-normal tracking-tight md:text-5xl">
              &gt; get_nsx_monitor()
            </h2>

            <div className="flex flex-col items-center gap-4 text-white sm:flex-row">
              <Link
                to="/download"
                className="group text-brand-bg bg-ui-text hover:bg-ui-text-muted relative inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold tracking-widest uppercase shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300 hover:scale-105 sm:w-auto"
              >
                Download Now
                <Icon
                  icon="solar:download-bold-duotone"
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="ui-section bg-brand-surface/5 border-ui-border border-t py-20">
        <div className="ui-container border-ui-border pt-16 pb-12">
          {/* Corner Decorative Markers */}
          <div className="text-ui-border-bright absolute -top-[7.5px] -left-[7.5px] z-50 h-3.5 w-3.5">
            <Icon icon="solar:add-linear" />
          </div>
          <div className="text-ui-border-bright absolute -top-[7.5px] -right-[7.5px] z-50 h-3.5 w-3.5">
            <Icon icon="solar:add-linear" />
          </div>

          <div className="relative z-10 flex w-full flex-col px-6 md:px-10">
            <div className="border-ui-border grid w-full grid-cols-2 gap-x-8 gap-y-12 border-b pb-16 md:grid-cols-6">
              <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-3">
                <Logo className="mb-2" />
                <p className="text-ui-text-muted max-w-sm text-sm leading-relaxed font-light">
                  A high-fidelity network telemetry engine designed for
                  precision monitoring. Track, analyze, and optimize your
                  bandwidth with tactile desktop tools.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-balance md:col-span-1 md:items-start">
                <h4 className="text-ui-text-muted/50 font-mono text-[10px] tracking-widest">
                  Platform
                </h4>
                <nav className="flex flex-col items-start gap-3">
                  {["Engine", "Studio", "Research", "Integrations"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-ui-text-muted hover:text-ui-text text-sm transition-colors"
                      >
                        {item}
                      </a>
                    )
                  )}
                </nav>
              </div>

              <div className="flex flex-col gap-4 text-balance md:col-span-1 md:items-start">
                <h4 className="text-ui-text-muted/50 font-mono text-[10px] tracking-widest">
                  Resources
                </h4>
                <nav className="flex flex-col items-start gap-3">
                  {["Documentation", "API Guide", "Changelog", "Status"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-ui-text-muted hover:text-ui-text text-sm transition-colors"
                      >
                        {item}
                      </a>
                    )
                  )}
                </nav>
              </div>

              <div className="flex flex-col gap-4 text-balance md:col-span-1 md:items-start">
                <h4 className="text-ui-text-muted/50 font-mono text-[10px] tracking-widest">
                  Company
                </h4>
                <nav className="flex flex-col items-start gap-3">
                  {["About", "Careers", "Press", "Legal"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-ui-text-muted hover:text-ui-text text-sm transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
              <div className="text-ui-text-muted font-mono text-[10px] tracking-widest text-balance">
                © 2026 NSX Monitor. Professional Network Telemetry.
              </div>
              <div className="text-ui-text-muted flex gap-6">
                <a href="#" className="hover:text-ui-text transition-colors">
                  <Icon icon="ri:twitter-x-fill" className="text-lg" />
                </a>
                <a href="#" className="hover:text-ui-text transition-colors">
                  <Icon icon="ri:github-fill" className="text-lg" />
                </a>
                <a href="#" className="hover:text-ui-text transition-colors">
                  <Icon icon="ri:discord-fill" className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
