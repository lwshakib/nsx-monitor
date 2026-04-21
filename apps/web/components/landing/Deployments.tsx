import React from 'react';
import { Icon } from '@iconify/react';

const Deployments: React.FC = () => {
  const deployments = [
    {
      title: "Quantum Ledger",
      category: "Fintech System",
      image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/468eeec1-e10c-4305-ad63-50cff0e023dc/1600w.png"
    },
    {
      title: "Synthetix Core",
      category: "AI Platform",
      image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/823f2b22-afcd-4c1d-b3f6-c025e505e98c/1600w.jpg"
    }
  ];

  return (
    <section className="ui-section overflow-hidden group py-40" id="deployments">
      <div className="ui-container border-t border-ui-border pt-20">
        {/* Corner Decorative Markers */}
        <div className="absolute -top-[7.5px] -left-[7.5px] w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="absolute -top-[7.5px] -right-[7.5px] w-3.5 h-3.5 text-ui-border-bright z-50">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="flex flex-col items-center justify-center fade-up relative z-10 px-6 md:px-10">
          <div className="relative w-full overflow-hidden mb-24 flex items-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
            <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
              <h2 className="text-[10vw] font-bold uppercase tracking-tighter text-ui-text mx-8">DEPLOYMENTS</h2>
              <h2 className="text-[10vw] font-bold uppercase tracking-tighter text-transparent mx-8 stroke-ui-text" style={{ WebkitTextStroke: '1px var(--ui-text)' }}>DEPLOYMENTS</h2>
              <h2 className="text-[10vw] font-bold uppercase tracking-tighter text-ui-text mx-8">DEPLOYMENTS</h2>
              <h2 className="text-[10vw] font-bold uppercase tracking-tighter text-transparent mx-8 stroke-ui-text" style={{ WebkitTextStroke: '1px var(--ui-text)' }}>DEPLOYMENTS</h2>
            </div>
          </div>

          <div className="w-full -mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {deployments.map((deployment, idx) => (
            <a key={deployment.title} href="#" className={`group/proj block relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-ui-border hover:border-ui-border-bright transition-all duration-500 shadow-2xl bg-ui-bg-alt p-2 ${idx === 1 ? 'md:mt-24' : ''}`}>
              <div className="absolute top-6 right-6 z-20 bg-brand-surface/80 backdrop-blur-md border border-ui-border text-ui-text font-mono text-[10px] px-3 py-1 rounded-full opacity-0 group-hover/proj:opacity-100 translate-y-2 group-hover/proj:translate-y-0 transition-all duration-300 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ui-text animate-pulse"></div>
                LIVE
              </div>
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-brand-surface">
                <img src={deployment.image} alt={deployment.title} className="w-full h-full object-cover filter grayscale opacity-40 group-hover/proj:opacity-80 group-hover/proj:scale-105 transition-all duration-700 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover/proj:translate-y-0 transition-transform duration-500 text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ui-text-muted mb-2 block opacity-0 group-hover/proj:opacity-100 transition-opacity duration-500">
                      {deployment.category}
                    </span>
                    <h3 className="text-3xl font-semibold tracking-tight text-ui-text">
                      {deployment.title}
                    </h3>
                  </div>
                </div>
              </div>
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deployments;
