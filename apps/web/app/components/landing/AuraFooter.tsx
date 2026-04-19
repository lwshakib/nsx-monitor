import React from 'react';
import { Icon } from '@iconify/react';

const AuraFooter: React.FC = () => {
  return (
    <footer className="w-full flex flex-col">
      {/* CTA Section */}
      <section className="aura-section overflow-hidden py-32" id="cta">
        <div className="aura-container border-t border-aura-border py-24 flex flex-col items-center text-center">
          {/* Corner Decorative Markers */}
          <div className="absolute -top-[7.5px] -left-[7.5px] w-3.5 h-3.5 text-aura-border-bright z-50">
            <Icon icon="solar:add-linear" />
          </div>
          <div className="absolute -top-[7.5px] -right-[7.5px] w-3.5 h-3.5 text-aura-border-bright z-50">
            <Icon icon="solar:add-linear" />
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-surface/30 blur-[100px] rounded-full pointer-events-none opacity-50"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface border border-aura-border text-aura-text-muted text-[10px] font-mono uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-[0_0_20px_var(--accent-glow)]">
              <div className="w-1.5 h-1.5 rounded-full bg-aura-text animate-pulse shadow-[0_0_8px_var(--accent-glow)]"></div>
              <span>Kernel Ready</span>
            </div>

          <h2 className="text-4xl md:text-5xl font-normal text-aura-text tracking-tight mb-6 font-mono typewriter-text">
            &gt; init_workspace()
          </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-brand-bg bg-aura-text rounded-full transition-all duration-300 hover:scale-105 hover:bg-aura-text-muted shadow-[0_0_30px_var(--accent-glow)]">
                Deploy Node
                <Icon icon="solar:arrow-right-linear" className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="aura-section bg-brand-surface/5 py-20 border-t border-aura-border">
        <div className="aura-container border-aura-border pt-16 pb-12">
          {/* Corner Decorative Markers */}
          <div className="absolute -top-[7.5px] -left-[7.5px] w-3.5 h-3.5 text-aura-border-bright z-50">
            <Icon icon="solar:add-linear" />
          </div>
          <div className="absolute -top-[7.5px] -right-[7.5px] w-3.5 h-3.5 text-aura-border-bright z-50">
            <Icon icon="solar:add-linear" />
          </div>

          <div className="relative z-10 flex flex-col w-full px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12 pb-16 border-b border-aura-border w-full">
            <div className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col items-start gap-4">
               <div className="text-aura-text font-bold text-xl tracking-tighter flex items-center gap-2 mb-2">
                 <div className="w-8 h-8 bg-aura-text text-brand-bg rounded flex items-center justify-center font-mono">A</div>
                 AURA
               </div>
              <p className="text-sm text-aura-text-muted max-w-sm font-light leading-relaxed">
                A purely deterministic ecosystem designed for scale. Construct, monitor, and deploy with tactile precision across the global mesh network.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-balance">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-aura-text">Platform</h4>
              <nav className="flex flex-col gap-2.5 items-start">
                {['Engine', 'Studio', 'Research', 'Integrations'].map((item) => (
                  <a key={item} href="#" className="text-sm text-aura-text-muted hover:text-aura-text transition-colors">{item}</a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 text-balance">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-aura-text">Resources</h4>
              <nav className="flex flex-col gap-2.5 items-start">
                {['Documentation', 'API Guide', 'Changelog', 'Status'].map((item) => (
                  <a key={item} href="#" className="text-sm text-aura-text-muted hover:text-aura-text transition-colors">{item}</a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 text-balance">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-aura-text">Company</h4>
              <nav className="flex flex-col gap-2.5 items-start">
                {['About', 'Careers', 'Press', 'Legal'].map((item) => (
                  <a key={item} href="#" className="text-sm text-aura-text-muted hover:text-aura-text transition-colors">{item}</a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-mono text-aura-text-muted tracking-widest">
              © 2026 AURA TECHNOLOGIES. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-6 text-aura-text-muted">
              <a href="#" className="hover:text-aura-text transition-colors"><Icon icon="ri:twitter-x-fill" className="text-lg" /></a>
              <a href="#" className="hover:text-aura-text transition-colors"><Icon icon="ri:github-fill" className="text-lg" /></a>
              <a href="#" className="hover:text-aura-text transition-colors"><Icon icon="ri:discord-fill" className="text-lg" /></a>
            </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default AuraFooter;
