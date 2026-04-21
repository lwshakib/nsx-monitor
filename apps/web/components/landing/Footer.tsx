import React from 'react';
import { Icon } from '@iconify/react';
import Logo from '../Logo';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col">
      {/* CTA Section */}
      <section className="ui-section overflow-hidden py-32" id="cta">
        <div className="ui-container border-t border-ui-border py-24 flex flex-col items-center text-center">
          {/* Corner Decorative Markers */}
          <div className="absolute -top-[7.5px] -left-[7.5px] w-3.5 h-3.5 text-ui-border-bright z-50">
            <Icon icon="solar:add-linear" />
          </div>
          <div className="absolute -top-[7.5px] -right-[7.5px] w-3.5 h-3.5 text-ui-border-bright z-50">
            <Icon icon="solar:add-linear" />
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-surface/30 blur-[100px] rounded-full pointer-events-none opacity-50"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface border border-ui-border text-ui-text-muted text-[10px] font-mono tracking-[0.2em] mb-8 backdrop-blur-md shadow-[0_0_20px_var(--accent-glow)]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_var(--accent-glow)]"></div>
              <span>Ready for Download</span>
            </div>

          <h2 className="text-4xl md:text-5xl font-normal text-ui-text tracking-tight mb-6 font-mono typewriter-text">
            &gt; get_nsx_monitor()
          </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-white">
              <Link to="/download" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-brand-bg bg-ui-text rounded-full transition-all duration-300 hover:scale-105 hover:bg-ui-text-muted shadow-[0_0_30px_var(--accent-glow)]">
                Download Now
                <Icon icon="solar:download-bold-duotone" className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="ui-section bg-brand-surface/5 py-20 border-t border-ui-border">
        <div className="ui-container border-ui-border pt-16 pb-12">
          {/* Corner Decorative Markers */}
          <div className="absolute -top-[7.5px] -left-[7.5px] w-3.5 h-3.5 text-ui-border-bright z-50">
            <Icon icon="solar:add-linear" />
          </div>
          <div className="absolute -top-[7.5px] -right-[7.5px] w-3.5 h-3.5 text-ui-border-bright z-50">
            <Icon icon="solar:add-linear" />
          </div>

          <div className="relative z-10 flex flex-col w-full px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12 pb-16 border-b border-ui-border w-full">
              <div className="col-span-2 md:col-span-3 flex flex-col items-start gap-4">
                 <Logo className="mb-2" />
              <p className="text-sm text-ui-text-muted max-w-sm font-light leading-relaxed">
                A high-fidelity network telemetry engine designed for precision monitoring. Track, analyze, and optimize your bandwidth with tactile desktop tools.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-balance md:col-span-1 md:items-start">
              <h4 className="text-[10px] font-mono tracking-widest text-ui-text-muted/50">Platform</h4>
              <nav className="flex flex-col gap-3 items-start">
                {['Engine', 'Studio', 'Research', 'Integrations'].map((item) => (
                  <a key={item} href="#" className="text-sm text-ui-text-muted hover:text-ui-text transition-colors">{item}</a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 text-balance md:col-span-1 md:items-start">
              <h4 className="text-[10px] font-mono tracking-widest text-ui-text-muted/50">Resources</h4>
              <nav className="flex flex-col gap-3 items-start">
                {['Documentation', 'API Guide', 'Changelog', 'Status'].map((item) => (
                  <a key={item} href="#" className="text-sm text-ui-text-muted hover:text-ui-text transition-colors">{item}</a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 text-balance md:col-span-1 md:items-start">
              <h4 className="text-[10px] font-mono tracking-widest text-ui-text-muted/50">Company</h4>
              <nav className="flex flex-col gap-3 items-start">
                {['About', 'Careers', 'Press', 'Legal'].map((item) => (
                  <a key={item} href="#" className="text-sm text-ui-text-muted hover:text-ui-text transition-colors">{item}</a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-mono text-ui-text-muted tracking-widest text-balance">
              © 2026 NSX Monitor. Professional Network Telemetry.
            </div>
            <div className="flex gap-6 text-ui-text-muted">
              <a href="#" className="hover:text-ui-text transition-colors"><Icon icon="ri:twitter-x-fill" className="text-lg" /></a>
              <a href="#" className="hover:text-ui-text transition-colors"><Icon icon="ri:github-fill" className="text-lg" /></a>
              <a href="#" className="hover:text-ui-text transition-colors"><Icon icon="ri:discord-fill" className="text-lg" /></a>
            </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
