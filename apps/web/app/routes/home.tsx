import type { Route } from "./+types/home";
import React, { useEffect } from "react"; 
import Nav from "../../components/landing/Nav";
import Hero from "../../components/landing/Hero";
import Expansion from "../../components/landing/Expansion";
import Capabilities from "../../components/landing/Capabilities";
import BentoGrid from "../../components/landing/BentoGrid";
import HorizontalScroll from "../../components/landing/HorizontalScroll";
import Convergence from "../../components/landing/Convergence";
import Deployments from "../../components/landing/Deployments";
import Footer from "../../components/landing/Footer";
import "../styles/landing.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NSX Monitor | Precision Network Telemetry" },
    { name: "description", content: "Real-time bandwidth monitoring, historical data tracking, and a sleek desktop widget for Windows." },
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
    <div className="bg-brand-bg text-ui-text selection:bg-ui-text/20 selection:text-ui-text antialiased overflow-x-hidden min-h-screen relative transition-colors duration-500">
      <Nav />
      
      {/* Background (Fixed & Static Grid) */}
      <div className="fixed top-0 w-full h-screen -z-10" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
        <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none"></div>
      </div>

      <div className="bg-gradient-mesh opacity-60"></div>
      
      {/* Global Persistence Layer (Vertical Lines & Data Streams) */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center select-none">
        <div className="w-full max-w-[1400px] h-full border-x border-ui-border/30 grid grid-cols-4 relative">
          <div className="border-r border-ui-border/30 h-full hidden md:block relative">
            <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-ui-text/20 to-transparent animate-[dataStream_3s_linear_infinite]"></div>
          </div>
          <div className="border-r border-ui-border/30 h-full hidden md:block relative">
            <div className="absolute top-[20%] right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-ui-text/20 to-transparent animate-[dataStream_4s_linear_infinite_1s]"></div>
          </div>
          <div className="border-r border-ui-border/30 h-full hidden md:block relative">
            <div className="absolute top-[60%] right-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-ui-text/20 to-transparent animate-[dataStream_2.5s_linear_infinite_0.5s]"></div>
          </div>
        </div>
      </div>

      {/* Landing Sections */}
      <div className="relative z-10">
        <Hero />
        <Expansion />
        <Capabilities />
        <BentoGrid />
        <HorizontalScroll />
        <Convergence />
        <Deployments />
        <Footer />
      </div>
    </div>
  );
}
