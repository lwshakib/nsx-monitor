import React from "react"
import { Icon } from "@iconify/react"

const Deployments: React.FC = () => {
  const deployments = [
    {
      title: "Network Analytics",
      category: "Traffic Engine",
      image: "/laptop_app_demo.png",
    },
    {
      title: "Process Insights",
      category: "System Monitor",
      image:
        "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/823f2b22-afcd-4c1d-b3f6-c025e505e98c/1600w.jpg",
    },
  ]

  return (
    <section
      className="ui-section group overflow-hidden py-40"
      id="deployments"
    >
      <div className="ui-container border-ui-border border-t pt-20">
        {/* Corner Decorative Markers */}
        <div className="text-ui-border-bright absolute -top-[7.5px] -left-[7.5px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>
        <div className="text-ui-border-bright absolute -top-[7.5px] -right-[7.5px] z-50 h-3.5 w-3.5">
          <Icon icon="solar:add-linear" />
        </div>

        <div className="fade-up relative z-10 flex flex-col items-center justify-center px-6 md:px-10">
          <div className="relative mb-24 flex w-full items-center overflow-hidden opacity-20 transition-opacity duration-1000 select-none group-hover:opacity-40">
            <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap">
              <h2 className="text-ui-text mx-8 text-[10vw] font-bold tracking-tighter">
                Engine Deployment
              </h2>
              <h2
                className="stroke-ui-text mx-8 text-[10vw] font-bold tracking-tighter text-transparent"
                style={{ WebkitTextStroke: "1px var(--ui-text)" }}
              >
                Engine Deployment
              </h2>
              <h2 className="text-ui-text mx-8 text-[10vw] font-bold tracking-tighter">
                Engine Deployment
              </h2>
              <h2
                className="stroke-ui-text mx-8 text-[10vw] font-bold tracking-tighter text-transparent"
                style={{ WebkitTextStroke: "1px var(--ui-text)" }}
              >
                Engine Deployment
              </h2>
            </div>
          </div>

          <div className="relative z-10 -mt-32 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            {deployments.map((deployment, idx) => (
              <a
                key={deployment.title}
                href="#"
                className={`group/proj border-ui-border hover:border-ui-border-bright bg-ui-bg-alt relative block aspect-[4/3] overflow-hidden rounded-[2rem] border p-2 shadow-2xl transition-all duration-500 ${idx === 1 ? "md:mt-24" : ""}`}
              >
                <div className="bg-brand-surface/80 border-ui-border text-ui-text absolute top-6 right-6 z-20 flex translate-y-2 items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] opacity-0 backdrop-blur-md transition-all duration-300 group-hover/proj:translate-y-0 group-hover/proj:opacity-100">
                  <div className="bg-ui-text h-1.5 w-1.5 animate-pulse rounded-full"></div>
                  Live
                </div>
                <div className="bg-brand-surface relative h-full w-full overflow-hidden rounded-[1.5rem]">
                  <img
                    src={deployment.image}
                    alt={deployment.title}
                    className="h-full w-full object-cover opacity-40 mix-blend-luminosity grayscale filter transition-all duration-700 group-hover/proj:scale-105 group-hover/proj:opacity-80"
                  />
                  <div className="from-brand-bg via-brand-bg/40 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-8">
                    <div className="translate-y-4 text-left transition-transform duration-500 group-hover/proj:translate-y-0">
                      <span className="text-ui-text-muted mb-2 block font-mono text-[10px] font-bold tracking-widest uppercase opacity-0 transition-opacity duration-500 group-hover/proj:opacity-100">
                        {deployment.category}
                      </span>
                      <h3 className="text-ui-text text-3xl font-semibold tracking-tight">
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
  )
}

export default Deployments
