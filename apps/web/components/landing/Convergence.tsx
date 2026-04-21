import React from 'react';
import { Icon } from '@iconify/react';

const Convergence: React.FC = () => {
  return (
    <section className="ui-section overflow-hidden flex flex-col min-h-screen select-none" id="convergence">
      <div className="ui-container border-t border-ui-border py-32 flex flex-col items-center justify-center min-h-[900px]">
        {/* Corner Decorative Markers */}
        <div className="absolute -top-[7.5px] -left-[7.5px] w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -top-[7.5px] -right-[7.5px] w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-glow),transparent_50%)] pointer-events-none"></div>
        
        <div className="relative z-20 flex flex-col items-center text-center px-6 mb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-ui-border bg-brand-surface backdrop-blur-md mb-8 shadow-[0_0_20px_var(--accent-glow)]">
            <span className="h-1.5 w-1.5 rounded-full bg-ui-text animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-ui-text-muted">
              Unified System
            </span>
          </div>

          <h2 className="md:text-5xl text-4xl font-normal text-ui-text tracking-tight mb-6">
            Data Convergence
          </h2>

        <p className="max-w-md mx-auto text-sm text-ui-text-muted font-light leading-relaxed">
          The NSX Monitor engine pulls fragmented network insights into a singular cognitive core.
          Experience the power of total network transparency on your desktop.
        </p>
      </div>

      <div className="relative z-10 w-[640px] h-[640px] max-w-[94vw] max-h-[94vw] flex items-center justify-center scale-[0.72] md:scale-100">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-ui-text-muted/5 blur-[60px] opacity-80 pointer-events-none"></div>

        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border-ui-border border-solid rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ animation: 'radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite', animationDelay: '0s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border-ui-border border-solid rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ animation: 'radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite', animationDelay: '1.33s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border-ui-border border-solid rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ animation: 'radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite', animationDelay: '2.66s' }}></div>

        <div className="absolute top-1/2 left-1/2 z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ animation: 'core-pulse-anim 2s ease-in-out infinite' }}>
          <div className="absolute inset-0 rounded-full bg-ui-text opacity-20 blur-xl animate-pulse"></div>
          <div className="relative w-20 h-20 bg-ui-text text-brand-bg rounded-full flex items-center justify-center shadow-[0_0_60px_var(--accent-glow),inset_0_0_20px_rgba(0,0,0,0.1)] before:content-[''] before:absolute before:-inset-4 before:border before:border-dashed before:border-ui-border-bright before:rounded-full before:animate-[spin_6s_linear_infinite]">
            <Icon icon="solar:bolt-bold-duotone" className="text-3xl animate-pulse" />
          </div>
        </div>

        {/* 1. Code Block */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex flex-col gap-1.5 w-32 z-20" 
             style={{ '--tx': '-240px', '--ty': '-240px', '--rot': '15deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '0.2s' } as React.CSSProperties}>
          <div className="h-1.5 w-1/2 bg-ui-text-muted/20 rounded"></div>
          <div className="h-1.5 w-3/4 bg-ui-text-muted/40 rounded"></div>
          <div className="h-1.5 w-2/3 bg-ui-text-muted/20 rounded"></div>
        </div>

        {/* 2. Database */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] z-20 text-ui-text-muted" 
             style={{ '--tx': '260px', '--ty': '-180px', '--rot': '-20deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '0.6s' } as React.CSSProperties}>
          <Icon icon="solar:database-linear" className="text-xl" />
        </div>

        {/* 3. Custom Toggle */}
        <div className="absolute top-1/2 left-1/2 p-2.5 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] z-20" 
             style={{ '--tx': '-180px', '--ty': '260px', '--rot': '30deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '1.0s' } as React.CSSProperties}>
          <div className="w-8 h-4 bg-ui-text-muted/20 rounded-full relative">
            <div className="absolute right-1 top-[2px] w-3 h-3 bg-ui-text rounded-full shadow-[0_0_10px_var(--accent-glow)]"></div>
          </div>
        </div>

        {/* 4. Metric */}
        <div className="absolute top-1/2 left-1/2 px-4 py-2 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center gap-2 z-20" 
             style={{ '--tx': '220px', '--ty': '220px', '--rot': '-10deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '1.4s' } as React.CSSProperties}>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
          <span className="text-xs font-mono text-ui-text">99.9%</span>
        </div>

        {/* 5. Bar Chart */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-end gap-1.5 h-12 w-16 z-20" 
             style={{ '--tx': '-320px', '--ty': '20px', '--rot': '25deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '1.8s' } as React.CSSProperties}>
          <div className="w-2 bg-ui-border-bright rounded-t h-1/3"></div>
          <div className="w-2 bg-ui-text-muted/40 rounded-t h-2/3"></div>
          <div className="w-2 bg-ui-text-muted/60 rounded-t h-1/2"></div>
          <div className="w-2 bg-ui-text rounded-t h-full shadow-[0_0_8px_var(--accent-glow)] transition-colors"></div>
        </div>

        {/* 6. Settings */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] z-20 text-ui-text-muted" 
             style={{ '--tx': '300px', '--ty': '60px', '--rot': '-25deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '2.2s' } as React.CSSProperties}>
          <Icon icon="solar:settings-linear" className="text-xl" />
        </div>

        {/* 7. User Profile Placeholder */}
        <div className="absolute top-1/2 left-1/2 p-2 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center gap-2 z-20" 
             style={{ '--tx': '-80px', '--ty': '-300px', '--rot': '40deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '2.6s' } as React.CSSProperties}>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-ui-text-muted/20 to-ui-text-muted/5 border border-ui-border"></div>
          <div className="h-1.5 w-8 bg-ui-text-muted/20 rounded"></div>
        </div>

        {/* 8. Security Shield */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] z-20 text-emerald-400" 
             style={{ '--tx': '100px', '--ty': '-280px', '--rot': '-15deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '3.0s' } as React.CSSProperties}>
          <Icon icon="solar:shield-check-linear" className="text-xl" />
        </div>

        {/* 9. Custom Slider */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] w-24 z-20" 
             style={{ '--tx': '-120px', '--ty': '320px', '--rot': '20deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '3.4s' } as React.CSSProperties}>
          <div className="w-full h-1 bg-ui-text-muted/10 rounded-full relative">
            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-ui-text rounded-full shadow-[0_0_8px_var(--accent-glow)]"></div>
          </div>
        </div>

        {/* 10. CPU Node */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] z-20 text-ui-text-muted" 
             style={{ '--tx': '160px', '--ty': '300px', '--rot': '-35deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '3.8s' } as React.CSSProperties}>
          <Icon icon="solar:cpu-bolt-linear" className="text-xl" />
        </div>

        {/* 11. Line Graph */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] w-20 z-20" 
             style={{ '--tx': '-340px', '--ty': '-120px', '--rot': '10deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '4.2s' } as React.CSSProperties}>
          <svg viewBox="0 0 100 20" className="w-full h-4 overflow-visible">
            <path d="M0,10 Q15,20 25,10 T50,10 T75,5 T100,10" fill="none" stroke="currentColor" strokeWidth="2" className="text-ui-text-muted/60"></path>
          </svg>
        </div>

        {/* 12. Code Block 2 */}
        <div className="absolute top-1/2 left-1/2 p-3 bg-brand-surface/50 border border-ui-border rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex flex-col gap-1.5 w-24 z-20" 
             style={{ '--tx': '340px', '--ty': '-80px', '--rot': '-5deg', animation: 'gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both', animationDelay: '4.6s' } as React.CSSProperties}>
          <div className="h-1.5 w-full bg-emerald-400/40 rounded"></div>
          <div className="h-1.5 w-2/3 bg-ui-text-muted/20 rounded"></div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Convergence;
