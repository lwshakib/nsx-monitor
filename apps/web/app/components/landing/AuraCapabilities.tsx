import React from 'react';
import { Icon } from '@iconify/react';

const AuraCapabilities: React.FC = () => {
  return (
    <section className="aura-section z-10 pt-32 pb-32 overflow-hidden" id="capabilities">
      <div className="aura-container border-t border-white/5 pt-20">
        {/* Corner Decorative Markers */}
        <div className="absolute -top-[7px] -left-[7px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -top-[7px] -right-[7px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="flex items-center gap-6 mb-20 px-6 md:px-10 fade-up">
          <h2 className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase text-white">
            Core Primitives
          </h2>
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-[9px] font-mono text-neutral-600 tracking-widest">
            SYS_CAPABILITIES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-10">
          {/* Card 1 */}
          <div className="relative group fade-up h-full" style={{ perspective: '1200px' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-3xl bg-neutral-900 border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(24px,-24px,-60px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                <div className="font-mono text-[9px] text-neutral-500 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                  Memory Alloc
                </div>
                <div className="h-1 w-full bg-neutral-800 rounded mt-3 overflow-hidden">
                  <div className="h-full bg-neutral-500 w-3/4"></div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-[#0a0a0a] border border-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(12px,-12px,-30px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">Buffer State</div>
                <div className="font-mono text-[10px] text-white mt-1">OPTIMIZED</div>
              </div>

              <div className="relative p-10 rounded-3xl bg-black border border-white/[0.05] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-white/20 group-hover:shadow-[-30px_30px_50px_rgba(0,0,0,0.8)] group-hover:bg-white/[0.04] z-10 h-full flex flex-col group-hover:[transform:translateZ(20px)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors"></div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Icon icon="solar:box-minimalistic-linear" className="text-2xl text-neutral-300 group-hover:text-white" />
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black/50">
                    MOD_01
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">Spatial Interfaces</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 flex-1">
                  Constructing multi-dimensional web planes. Moving beyond flat coordinate systems into true Z-axis awareness.
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-white animate-[shimmerLine_2s_linear_infinite]"></div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group fade-up h-full md:mt-12" style={{ perspective: '1200px', transitionDelay: '100ms' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-3xl bg-neutral-900 border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(24px,-24px,-60px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                <div className="font-mono text-[9px] text-neutral-500 uppercase flex items-center gap-2">Thread Count</div>
                <div className="flex items-end gap-1.5 mt-3 h-4">
                  <div className="h-2 w-1.5 bg-neutral-600 rounded-sm"></div>
                  <div className="h-4 w-1.5 bg-neutral-500 rounded-sm"></div>
                  <div className="h-3 w-1.5 bg-neutral-600 rounded-sm"></div>
                  <div className="h-2 w-1.5 bg-neutral-600 rounded-sm"></div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-[#0a0a0a] border border-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(12px,-12px,-30px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">Model Sync</div>
                <div className="font-mono text-[10px] text-emerald-400 mt-1">SYNCED</div>
              </div>

              <div className="relative p-10 rounded-3xl bg-black border border-white/[0.05] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-white/20 group-hover:shadow-[-30px_30px_50px_rgba(0,0,0,0.8)] group-hover:bg-white/[0.04] z-10 h-full flex flex-col group-hover:[transform:translateZ(20px)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Icon icon="solar:cpu-bolt-linear" className="text-2xl text-neutral-300 group-hover:text-white" />
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black/50 flex items-center gap-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    MOD_02
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight relative z-10">Neural Integration</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 flex-1 relative z-10">
                  Embedded deterministic models enabling predictive rendering and autonomous state resolution.
                </p>
                <div className="flex items-center gap-1 mt-auto relative z-10">
                  <div className="h-3 w-1 bg-white/20 group-hover:bg-white anim-bar-1"></div>
                  <div className="h-4 w-1 bg-white/20 group-hover:bg-white anim-bar-2"></div>
                  <div className="h-2 w-1 bg-white/20 group-hover:bg-white anim-bar-3"></div>
                  <div className="h-5 w-1 bg-white/20 group-hover:bg-white anim-bar-4"></div>
                  <div className="h-3 w-1 bg-white/20 group-hover:bg-white anim-bar-5"></div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase ml-2">Processing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group fade-up h-full md:mt-24" style={{ perspective: '1200px', transitionDelay: '200ms' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-3xl bg-neutral-900 border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(24px,-24px,-60px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                <div className="font-mono text-[9px] text-neutral-500 uppercase flex items-center gap-2">Hardware Accel</div>
                <div className="font-mono text-[10px] text-white mt-2">ENABLED</div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-[#0a0a0a] border border-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(12px,-12px,-30px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">Latency Target</div>
                <div className="font-mono text-[10px] text-emerald-400 mt-1">&lt;1.2MS</div>
              </div>

              <div className="relative p-10 rounded-3xl bg-black border border-white/[0.05] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-white/20 group-hover:shadow-[-30px_30px_50px_rgba(0,0,0,0.8)] group-hover:bg-white/[0.04] z-10 h-full flex flex-col group-hover:[transform:translateZ(20px)]">
                <div className="absolute inset-0 bg-grid-small opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity"></div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Icon icon="solar:code-scan-linear" className="text-2xl text-neutral-300 group-hover:text-white" />
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black/50">
                    MOD_03
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight relative z-10">Low-Level Arch</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 flex-1 relative z-10">
                  Compiling direct to browser APIs. Stripping abstractions to deliver bare-metal performance for graphic pipelines.
                </p>
                <div className="font-mono text-[10px] text-neutral-500 flex flex-col gap-1 relative z-10 mt-auto">
                  <span className="group-hover:text-white transition-colors">&gt; compile_shaders()</span>
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity delay-75">&gt; init_webgl_ctx()</span>
                  <span className="opacity-25 group-hover:opacity-100 transition-opacity delay-150">&gt; OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuraCapabilities;
