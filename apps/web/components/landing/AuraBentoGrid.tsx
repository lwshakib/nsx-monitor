import React from 'react';
import { Icon } from '@iconify/react';

const AuraBentoGrid: React.FC = () => {
  return (
    <section className="aura-section z-10 py-32 overflow-hidden" id="topology">
      <div className="aura-container border-t border-aura-border pt-20">
        {/* Corner Decorative Markers */}
        <div className="absolute -top-[7px] -left-[7px] w-3.5 h-3.5 text-aura-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -top-[7px] -right-[7px] w-3.5 h-3.5 text-aura-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="flex flex-col items-start mb-16 px-6 md:px-10 fade-up">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight mb-4 text-aura-text">
            Network Intelligence
          </h2>
          <p className="text-sm md:text-base text-aura-text-muted max-w-xl font-light leading-relaxed">
            Precise mapping of your machine's network environment. 
            Real-time speeds, zero-latency reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] px-6 md:px-10 fade-up">
          {/* Main Graph Box */}
          <div className="col-span-1 md:col-span-2 row-span-2 p-8 rounded-[2.5rem] bg-aura-bg border border-aura-border relative overflow-hidden group hover:border-aura-border-bright transition-all duration-500">
            <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none group-hover:opacity-[0.15] transition-opacity"></div>
            <div className="h-full flex flex-col justify-between relative z-10">
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-brand-surface border border-aura-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-aura-text animate-pulse"></div>
                  <span className="text-[10px] font-mono text-aura-text uppercase tracking-widest">Live Feed</span>
                </div>
                <Icon icon="solar:chart-square-linear" className="text-aura-text-muted text-xl group-hover:text-aura-text transition-colors" />
              </div>

              {/* Animated Chart Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[250px] h-32 flex items-end justify-between gap-1">
                <div className="w-full bg-aura-border-bright border border-aura-border relative overflow-hidden anim-bar-1">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-aura-text shadow-[0_0_10px_var(--aura-text)]"></div>
                </div>
                <div className="w-full bg-aura-border-bright border border-aura-border relative overflow-hidden anim-bar-2">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-aura-text shadow-[0_0_10px_var(--aura-text)]"></div>
                </div>
                <div className="w-full bg-aura-text border border-aura-text relative overflow-hidden anim-bar-3 shadow-[0_0_20px_var(--accent-glow)]"></div>
                <div className="w-full bg-aura-border-bright border border-aura-border relative overflow-hidden anim-bar-4">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-aura-text shadow-[0_0_10px_var(--aura-text)]"></div>
                </div>
                <div className="w-full bg-aura-border-bright border border-aura-border relative overflow-hidden anim-bar-5">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-aura-text shadow-[0_0_10px_var(--aura-text)]"></div>
                </div>
                <div className="w-full bg-aura-border-bright border border-aura-border relative overflow-hidden anim-bar-1">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-aura-text shadow-[0_0_10px_var(--aura-text)]"></div>
                </div>
                <div className="w-full bg-aura-border-bright border border-aura-border relative overflow-hidden anim-bar-2">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-aura-text shadow-[0_0_10px_var(--aura-text)]"></div>
                </div>
              </div>

              <div className="">
                <h3 className="text-xl font-semibold mb-2 tracking-tight text-aura-text group-hover:translate-x-1 transition-transform">
                  Real-time Throughput
                </h3>
                <div className="flex gap-8 pt-4 border-t border-aura-border">
                  <div>
                    <div className="text-[10px] text-aura-text-muted font-mono mb-1 uppercase text-right">DOWNLOAD</div>
                    <div className="text-sm font-mono text-aura-text">42.5 MB/s</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-aura-text-muted font-mono mb-1 uppercase text-right">UPLOAD</div>
                    <div className="text-sm font-mono text-aura-text">8.2 MB/s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Stack Box */}
          <div className="col-span-1 md:col-span-1 row-span-2 p-8 rounded-[2.5rem] bg-aura-bg border border-aura-border relative overflow-hidden group hover:border-aura-border-bright transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:layers-minimalistic-linear" className="text-aura-text-muted text-xl group-hover:text-aura-text transition-colors" />
              <div className="text-[10px] font-mono text-aura-text-muted">Z-AXIS</div>
            </div>

            {/* Floating 3D Layers */}
            <div className="relative w-full h-40 flex flex-col items-center justify-center my-auto">
              <div className="w-24 h-24 border border-aura-border-bright bg-aura-bg-alt/80 backdrop-blur-md absolute layer-float-1 flex items-center justify-center text-[10px] font-mono text-aura-text/50 transition-colors">L3</div>
              <div className="w-24 h-24 border border-aura-border bg-brand-surface absolute layer-float-2 mt-8 flex items-center justify-center text-[10px] font-mono text-aura-text/30 transition-colors">L2</div>
              <div className="w-24 h-24 border border-aura-border bg-brand-surface/50 absolute layer-float-3 mt-16 flex items-center justify-center text-[10px] font-mono text-aura-text/10 transition-colors">L1</div>
            </div>

            <div className="">
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-aura-text">Tray Integration</h3>
              <div className="space-y-1.5 pt-4 border-t border-aura-border">
                <div className="flex justify-between text-[10px] font-mono text-aura-text-muted">
                  <span>MIN_TRAY_UI</span>
                  <span className="text-aura-text">READY</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-aura-text-muted">
                  <span>FLOAT_WIDGET</span>
                  <span className="text-aura-text">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Small Square 1 */}
          <div className="col-span-1 row-span-1 p-6 rounded-[2rem] bg-aura-bg border border-aura-border relative overflow-hidden group hover:border-aura-border-bright transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:shield-check-linear" className="text-aura-text-muted text-xl group-hover:text-aura-text transition-colors" />
              <div className="w-2 h-2 rounded-full bg-aura-text animate-pulse shadow-[0_0_10px_var(--aura-text)]"></div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-aura-text tracking-tighter mb-1 font-mono">
                99.99<span className="text-lg">%</span>
              </div>
              <h3 className="text-xs font-mono text-aura-text-muted uppercase">Uptime Integrity</h3>
            </div>
          </div>

          {/* Small Square 2 */}
          <div className="col-span-1 row-span-1 p-6 rounded-[2rem] bg-aura-bg border border-aura-border relative overflow-hidden group hover:border-aura-border-bright transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:radar-linear" className="text-aura-text-muted text-xl group-hover:text-aura-text transition-colors" />
            </div>
            <div className="relative w-full h-12 border-b border-aura-border mb-2 overflow-hidden">
              <svg className="absolute bottom-0 w-[200%] h-full path-line" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0,10 Q5,20 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10" fill="none" stroke="currentColor" strokeWidth="1" className="text-aura-text/30"></path>
              </svg>
            </div>
            <h3 className="text-xs font-mono text-aura-text-muted uppercase">Signal Noise</h3>
          </div>

          {/* Wide Bottom Box */}
          <div className="col-span-1 md:col-span-4 row-span-1 p-8 rounded-[2rem] bg-aura-bg border border-aura-border relative overflow-hidden group hover:border-aura-border-bright transition-all duration-500 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aura-border to-transparent pointer-events-none group-hover:from-aura-border-bright transition-colors"></div>
            <div className="relative z-10 max-w-lg text-left">
              <h3 className="text-xl font-semibold text-aura-text mb-2 tracking-tight">Low Impact Design</h3>
              <p className="text-sm text-aura-text-muted font-light">
                Optimized C++ and Electron bindings ensure NSX Monitor stays silent in the background with minimal CPU usage.
              </p>
            </div>
            <div className="flex gap-12 relative z-10 w-full md:w-auto justify-between md:justify-end">
              <div>
                <div className="text-3xl font-semibold text-aura-text tracking-tighter font-mono">1s</div>
                <div className="text-[10px] text-aura-text-muted font-mono uppercase mt-1">Resolution</div>
              </div>
              <div className="">
                <div className="text-3xl font-semibold text-aura-text tracking-tighter font-mono">
                  12<span className="text-lg text-aura-text-muted">MB</span>
                </div>
                <div className="text-[10px] text-aura-text-muted font-mono uppercase mt-1">Footprint</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuraBentoGrid;
