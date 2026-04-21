import React from 'react';
import { Icon } from '@iconify/react';

const Capabilities: React.FC = () => {
  return (
    <section className="ui-section z-10 pt-32 pb-32 overflow-hidden" id="capabilities">
      <div className="ui-container border-t border-white/5 pt-20">
        {/* Corner Decorative Markers */}
        <div className="absolute -top-[7px] -left-[7px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -top-[7px] -right-[7px] w-3.5 h-3.5 text-white/20 z-50">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="flex items-center gap-6 mb-20 px-6 md:px-10 fade-up">
          <h2 className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase text-ui-text">
            Core Primitives
          </h2>
          <div className="h-px bg-ui-border flex-1"></div>
          <span className="text-[9px] font-mono text-ui-text-muted tracking-widest">
            SYS_CAPABILITIES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-10">
          {/* Card 1 */}
          <div className="relative group fade-up h-full" style={{ perspective: '1200px' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative p-10 rounded-3xl bg-ui-bg border border-ui-border overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-ui-border-bright group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:bg-brand-surface z-10 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ui-border-bright rounded-full blur-[50px] pointer-events-none group-hover:bg-ui-border transition-colors"></div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-ui-bg border border-ui-border flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Icon icon="solar:box-minimalistic-linear" className="text-2xl text-ui-text-muted group-hover:text-ui-text" />
                  </div>
                  <div className="text-[9px] font-mono text-ui-text-muted border border-ui-border px-2 py-1 rounded bg-brand-surface">
                    MOD_01
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-ui-text mb-3 tracking-tight">Live Monitoring</h3>
                <p className="text-sm text-ui-text-muted font-light leading-relaxed mb-8 flex-1">
                  High-fidelity tracking of Rx and Tx bytes across all network interfaces with sub-second accuracy and real-time visualization.
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="flex-1 h-[2px] bg-ui-border relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-ui-text animate-[shimmerLine_2s_linear_infinite]"></div>
                  </div>
                  <span className="text-[10px] font-mono text-ui-text-muted uppercase">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group fade-up h-full md:mt-12" style={{ perspective: '1200px', transitionDelay: '100ms' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative p-10 rounded-3xl bg-ui-bg border border-ui-border overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-ui-border-bright group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:bg-brand-surface z-10 h-full flex flex-col">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-glow),transparent_50%)]"></div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-ui-bg border border-ui-border flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Icon icon="solar:cpu-bolt-linear" className="text-2xl text-ui-text-muted group-hover:text-ui-text" />
                  </div>
                  <div className="text-[9px] font-mono text-ui-text-muted border border-ui-border px-2 py-1 rounded bg-brand-surface flex items-center gap-1">
                    <div className="w-1 h-1 bg-ui-text rounded-full animate-pulse"></div>
                    MOD_02
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-ui-text mb-3 tracking-tight relative z-10">Historical Insights</h3>
                <p className="text-sm text-ui-text-muted font-light leading-relaxed mb-8 flex-1 relative z-10">
                  Comprehensive data persistence that logs your bandwidth usage over days, weeks, and months for deep analysis.
                </p>
                <div className="flex items-center gap-1 mt-auto relative z-10">
                  <div className="h-3 w-1 bg-ui-border-bright group-hover:bg-ui-text anim-bar-1 transition-colors"></div>
                  <div className="h-4 w-1 bg-ui-border-bright group-hover:bg-ui-text anim-bar-2 transition-colors"></div>
                  <div className="h-2 w-1 bg-ui-border-bright group-hover:bg-ui-text anim-bar-3 transition-colors"></div>
                  <div className="h-5 w-1 bg-ui-border-bright group-hover:bg-ui-text anim-bar-4 transition-colors"></div>
                  <div className="h-3 w-1 bg-ui-border-bright group-hover:bg-ui-text anim-bar-5 transition-colors"></div>
                  <span className="text-[10px] font-mono text-ui-text-muted uppercase ml-2">Processing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group fade-up h-full md:mt-24" style={{ perspective: '1200px', transitionDelay: '200ms' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative p-10 rounded-3xl bg-ui-bg border border-ui-border overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-ui-border-bright group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] group-hover:bg-brand-surface z-10 h-full flex flex-col">
                <div className="absolute inset-0 bg-grid-small opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity"></div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-ui-bg border border-ui-border flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Icon icon="solar:widget-2-linear" className="text-2xl text-ui-text-muted group-hover:text-ui-text" />
                  </div>
                  <div className="text-[9px] font-mono text-ui-text-muted border border-ui-border px-2 py-1 rounded bg-brand-surface">
                    MOD_03
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-ui-text mb-3 tracking-tight relative z-10">Minimal Footprint</h3>
                <p className="text-sm text-ui-text-muted font-light leading-relaxed mb-8 flex-1 relative z-10">
                  A lightweight desktop widget and system tray integration designed to monitor your network without interrupting your workflow.
                </p>
                <div className="font-mono text-[10px] text-ui-text-muted flex flex-col gap-1 relative z-10 mt-auto">
                  <span>Native hardware sync</span>
                  <span className="opacity-50">Background service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
