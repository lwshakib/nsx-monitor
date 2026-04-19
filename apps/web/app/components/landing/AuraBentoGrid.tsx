import React from 'react';
import { Icon } from '@iconify/react';

const AuraBentoGrid: React.FC = () => {
  return (
    <section className="aura-section z-10 py-32 overflow-hidden" id="topology">
      <div className="aura-container border-t border-white/5 pt-20">
        {/* Corner Decorative Markers */}
        <div className="absolute -top-[7px] -left-[7px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -top-[7px] -right-[7px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="flex flex-col items-start mb-16 px-6 md:px-10 fade-up">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight mb-4 text-white">
            Architecture Topology
          </h2>
          <p className="text-sm md:text-base text-neutral-500 max-w-xl font-light leading-relaxed">
            A precise mapping of interconnected systems operating synchronously.
            Zero latency, total observability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] px-6 md:px-10 fade-up">
          {/* Main Graph Box */}
          <div className="col-span-1 md:col-span-2 row-span-2 p-8 rounded-[2.5rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none group-hover:opacity-[0.15] transition-opacity"></div>
            <div className="h-full flex flex-col justify-between relative z-10">
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest">Live Feed</span>
                </div>
                <Icon icon="solar:chart-square-linear" className="text-neutral-500 text-xl group-hover:text-white transition-colors" />
              </div>

              {/* Animated Chart Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[250px] h-32 flex items-end justify-between gap-1">
                <div className="w-full bg-white/5 border border-white/10 relative overflow-hidden anim-bar-1">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-white shadow-[0_0_10px_#fff]"></div>
                </div>
                <div className="w-full bg-white/5 border border-white/10 relative overflow-hidden anim-bar-2">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-white shadow-[0_0_10px_#fff]"></div>
                </div>
                <div className="w-full bg-white border border-white relative overflow-hidden anim-bar-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
                <div className="w-full bg-white/10 border border-white/20 relative overflow-hidden anim-bar-4">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-white shadow-[0_0_10px_#fff]"></div>
                </div>
                <div className="w-full bg-white/5 border border-white/10 relative overflow-hidden anim-bar-5">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-white shadow-[0_0_10px_#fff]"></div>
                </div>
                <div className="w-full bg-white/5 border border-white/10 relative overflow-hidden anim-bar-1">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-white shadow-[0_0_10px_#fff]"></div>
                </div>
                <div className="w-full bg-white/10 border border-white/20 relative overflow-hidden anim-bar-2">
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-white shadow-[0_0_10px_#fff]"></div>
                </div>
              </div>

              <div className="">
                <h3 className="text-xl font-semibold mb-2 tracking-tight text-white group-hover:translate-x-1 transition-transform">
                  Data Telemetry
                </h3>
                <div className="flex gap-8 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-[10px] text-neutral-500 font-mono mb-1">THROUGHPUT</div>
                    <div className="text-sm font-mono text-white">840.2 TB/s</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 font-mono mb-1">LATENCY</div>
                    <div className="text-sm font-mono text-white">3.4 ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Stack Box */}
          <div className="col-span-1 md:col-span-1 row-span-2 p-8 rounded-[2.5rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:layers-minimalistic-linear" className="text-neutral-500 text-xl group-hover:text-white transition-colors" />
              <div className="text-[10px] font-mono text-neutral-500">Z-AXIS</div>
            </div>

            {/* Floating 3D Layers */}
            <div className="relative w-full h-40 flex flex-col items-center justify-center my-auto">
              <div className="w-24 h-24 border border-white/20 bg-black/80 backdrop-blur-md absolute layer-float-1 flex items-center justify-center text-[10px] font-mono text-white/50">L3</div>
              <div className="w-24 h-24 border border-white/10 bg-white/5 absolute layer-float-2 mt-8 flex items-center justify-center text-[10px] font-mono text-white/30">L2</div>
              <div className="w-24 h-24 border border-white/5 bg-white/[0.02] absolute layer-float-3 mt-16 flex items-center justify-center text-[10px] font-mono text-white/10">L1</div>
            </div>

            <div className="">
              <h3 className="text-lg font-semibold mb-2 tracking-tight text-white">Deep Stack</h3>
              <div className="space-y-1.5 pt-4 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>DOM_LAYER</span>
                  <span className="text-white">OK</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>WEBGL_CTX</span>
                  <span className="text-white">OK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Small Square 1 */}
          <div className="col-span-1 row-span-1 p-6 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:shield-check-linear" className="text-neutral-500 text-xl group-hover:text-white transition-colors" />
              <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_#fff]"></div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white tracking-tighter mb-1 font-mono">
                99.99<span className="text-lg">%</span>
              </div>
              <h3 className="text-xs font-mono text-neutral-500 uppercase">Uptime Integrity</h3>
            </div>
          </div>

          {/* Small Square 2 */}
          <div className="col-span-1 row-span-1 p-6 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Icon icon="solar:radar-linear" className="text-neutral-500 text-xl group-hover:text-white transition-colors" />
            </div>
            <div className="relative w-full h-12 border-b border-white/10 mb-2 overflow-hidden">
              <svg className="absolute bottom-0 w-[200%] h-full path-line" preserveAspectRatio="none" viewBox="0 0 100 20">
                <path d="M0,10 Q5,20 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"></path>
              </svg>
            </div>
            <h3 className="text-xs font-mono text-neutral-500 uppercase">Signal Noise</h3>
          </div>

          {/* Wide Bottom Box */}
          <div className="col-span-1 md:col-span-4 row-span-1 p-8 rounded-[2rem] bg-[#050505] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none group-hover:from-white/10 transition-colors"></div>
            <div className="relative z-10 max-w-lg text-left">
              <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">Global Infrastructure</h3>
              <p className="text-sm text-neutral-400 font-light">
                Distributed state synchronization ensuring sub-millisecond data availability across all active nodes.
              </p>
            </div>
            <div className="flex gap-12 relative z-10 w-full md:w-auto justify-between md:justify-end">
              <div>
                <div className="text-3xl font-semibold text-white tracking-tighter font-mono">24</div>
                <div className="text-[10px] text-neutral-500 font-mono uppercase mt-1">Regions</div>
              </div>
              <div className="">
                <div className="text-3xl font-semibold text-white tracking-tighter font-mono">
                  400<span className="text-lg text-neutral-500">ms</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono uppercase mt-1">Replication</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuraBentoGrid;
