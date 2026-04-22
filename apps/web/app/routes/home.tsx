/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react"
import Nav from "../../components/landing/Nav"
import Hero from "../../components/landing/Hero"
import Expansion from "../../components/landing/Expansion"
import Capabilities from "../../components/landing/Capabilities"
import BentoGrid from "../../components/landing/BentoGrid"
import HorizontalScroll from "../../components/landing/HorizontalScroll"
import Convergence from "../../components/landing/Convergence"
import Deployments from "../../components/landing/Deployments"
import Footer from "../../components/landing/Footer"
import "../styles/landing.css"

export function meta() {
  return [
    { title: "NSX Monitor | Precision Network Telemetry" },
    {
      name: "description",
      content:
        "Real-time bandwidth monitoring, historical data tracking, and a sleek desktop widget for Windows.",
    },
  ]
}

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          // Once visible, we can stop observing it
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    // Select all elements with fade-up or scale-in
    const targets = document.querySelectorAll(".fade-up, .scale-in")
    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-brand-bg text-ui-text selection:bg-ui-text/20 selection:text-ui-text relative min-h-screen overflow-x-hidden antialiased transition-colors duration-500">
      <Nav />

      {/* Background (Fixed & Static Grid) */}
      <div
        className="fixed top-0 -z-10 h-screen w-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]"></div>
      </div>

      <div className="bg-gradient-mesh opacity-60"></div>

      {/* Global Persistence Layer (Vertical Lines & Data Streams) */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center select-none">
        <div className="border-ui-border/30 relative grid h-full w-full max-w-[1400px] grid-cols-4 border-x">
          <div className="border-ui-border/30 relative hidden h-full border-r md:block">
            <div className="via-ui-text/20 absolute top-0 right-0 h-32 w-[1px] animate-[dataStream_3s_linear_infinite] bg-gradient-to-b from-transparent to-transparent"></div>
          </div>
          <div className="border-ui-border/30 relative hidden h-full border-r md:block">
            <div className="via-ui-text/20 absolute top-[20%] right-0 h-32 w-[1px] animate-[dataStream_4s_linear_infinite_1s] bg-gradient-to-b from-transparent to-transparent"></div>
          </div>
          <div className="border-ui-border/30 relative hidden h-full border-r md:block">
            <div className="via-ui-text/20 absolute top-[60%] right-0 h-32 w-[1px] animate-[dataStream_2.5s_linear_infinite_0.5s] bg-gradient-to-b from-transparent to-transparent"></div>
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
  )
}
