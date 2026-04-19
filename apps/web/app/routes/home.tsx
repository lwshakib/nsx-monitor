import type { Route } from "./+types/home";
import React, { useEffect } from "react";
import AuraNav from "../components/landing/AuraNav";
import AuraHero from "../components/landing/AuraHero";
import AuraExpansion from "../components/landing/AuraExpansion";
import AuraCapabilities from "../components/landing/AuraCapabilities";
import AuraBentoGrid from "../components/landing/AuraBentoGrid";
import AuraHorizontalScroll from "../components/landing/AuraHorizontalScroll";
import AuraConvergence from "../components/landing/AuraConvergence";
import AuraDeployments from "../components/landing/AuraDeployments";
import AuraFooter from "../components/landing/AuraFooter";
import "../styles/landing.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aura | Spatial Intelligence" },
    { name: "description", content: "A dimensional telemetry engine for complex architecture." },
  ];
}

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, we can stop observing it
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Select all elements with fade-up or scale-in
    const targets = document.querySelectorAll('.fade-up, .scale-in');
    targets.forEach(target => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#000] text-[#ededed] selection:bg-white/20 selection:text-white antialiased overflow-x-hidden min-h-screen relative">
      <AuraNav />
      
      {/* Background (Fixed & Static Grid) */}
      <div className="fixed top-0 w-full h-screen -z-10" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
        <div className="absolute inset-0 bg-grid opacity-[0.12]"></div>
      </div>

      <div className="bg-gradient-mesh opacity-60"></div>
      
      {/* Global Persistence Layer (Vertical Lines & Data Streams) */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center select-none">
        <div className="w-full max-w-[1400px] h-full border-x border-white/5 grid grid-cols-4 relative">
          <div className="border-r border-white/5 h-full hidden md:block relative">
            <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-[dataStream_3s_linear_infinite]"></div>
          </div>
          <div className="border-r border-white/5 h-full hidden md:block relative">
            <div className="absolute top-[20%] right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-[dataStream_4s_linear_infinite_1s]"></div>
          </div>
          <div className="border-r border-white/5 h-full hidden md:block relative">
            <div className="absolute top-[60%] right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-[dataStream_2.5s_linear_infinite_0.5s]"></div>
          </div>
        </div>
      </div>

      {/* Landing Sections */}
      <div className="relative z-10">
        <AuraHero />
        <AuraExpansion />
        <AuraCapabilities />
        <AuraBentoGrid />
        <AuraHorizontalScroll />
        <AuraConvergence />
        <AuraDeployments />
        <AuraFooter />
      </div>
    </div>
  );
}
