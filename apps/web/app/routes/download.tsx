import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Nav from '../../components/landing/Nav';
import Footer from '../../components/landing/Footer';
import "../styles/landing.css";
import type { Route } from "./+types/download";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Download | NSX Monitor" },
    { name: "description", content: "Get the NSX Monitor desktop application for Windows, macOS, or Linux." },
  ];
}

export default function Download() {
    const [os, setOs] = useState<'Windows' | 'macOS' | 'Linux' | 'Unknown'>('Unknown');

    useEffect(() => {
        // OS Detection
        const userAgent = window.navigator.userAgent;
        if (userAgent.indexOf('Win') !== -1) setOs('Windows');
        else if (userAgent.indexOf('Mac') !== -1) setOs('macOS');
        else if (userAgent.indexOf('Linux') !== -1) setOs('Linux');

        // Animation Visibility Observer (Keeping it for other elements)
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        const targets = document.querySelectorAll('.fade-up, .scale-in');
        targets.forEach(target => observer.observe(target));

        return () => observer.disconnect();
    }, []);

    const osData = {
        Windows: {
            icon: "logos:microsoft-windows",
            name: "Windows",
            ext: ".exe",
            desc: "Universal installer for Windows 10/11 x64 architecture."
        },
        macOS: {
            icon: "logos:apple",
            name: "macOS",
            ext: ".dmg",
            desc: "Native Apple Silicon and Intel support with universal binary."
        },
        Linux: {
            icon: "logos:linux-tux",
            name: "Linux",
            ext: ".AppImage",
            desc: "Distro-agnostic AppImage for all major Linux distributions."
        },
        Unknown: {
            icon: "solar:question-square-bold-duotone",
            name: "Other Platforms",
            ext: "",
            desc: "Select your platform manually below to get started."
        }
    };

    const currentOs = osData[os];

    return (
        <div className="bg-brand-bg text-ui-text selection:bg-ui-text/20 selection:text-ui-text antialiased overflow-x-hidden min-h-screen relative transition-colors duration-500">
            <Nav />

            {/* Background Grid */}
            <div className="fixed top-0 w-full h-screen -z-10">
                <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none"></div>
            </div>

            <main className="relative z-10 pt-40 pb-20 px-6 md:px-10 max-w-6xl mx-auto flex flex-col items-center">
                
                {/* Row 1: Detected OS - REMOVED fade-up for immediate visibility */}
                <section className="w-full mb-20">
                    <div className="p-[1px] rounded-[2.5rem] bg-gradient-to-b from-ui-border-bright to-transparent shadow-2xl">
                        <div className="bg-ui-bg-alt/80 backdrop-blur-xl rounded-[2.45rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-ui-border">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-brand-surface border border-ui-border flex items-center justify-center p-8 shadow-inner">
                                <Icon icon={currentOs.icon} className="text-[100px]" />
                            </div>
                            <div className="flex-1 text-center md:text-left text-white">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ui-text/10 border border-ui-border text-ui-text-muted text-[10px] font-mono uppercase tracking-widest mb-6">
                                    {os === 'Unknown' ? 'System Detection' : 'Recommended for your system'}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-normal tracking-tight text-white mb-6 leading-tight">
                                    Download for {currentOs.name}
                                </h1>
                                <p className="text-ui-text-muted text-base md:text-lg mb-10 max-w-xl font-light">
                                    {currentOs.desc} Get the full desktop experience with native performance.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-ui-text text-brand-bg font-bold text-base hover:opacity-90 transition-all active:scale-95 shadow-[0_0_40px_var(--accent-glow)] flex items-center justify-center gap-3">
                                        <Icon icon="solar:download-bold-duotone" className="text-xl" />
                                        Download NSX_Monitor{currentOs.ext}
                                    </button>
                                    <span className="text-[10px] font-mono text-ui-text-muted uppercase">STABLE RELEASE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full flex items-center gap-6 mb-12">
                    <div className="h-px bg-ui-border flex-1"></div>
                    <h2 className="text-[10px] font-mono tracking-[0.3em] font-bold uppercase text-ui-text-muted">
                        All Platforms
                    </h2>
                    <div className="h-px bg-ui-border flex-1"></div>
                </div>

                {/* Row 2: Three Cards - REMOVED fade-up for immediate visibility */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {['Windows', 'macOS', 'Linux'].map((platform) => {
                        const data = osData[platform as keyof typeof osData];
                        return (
                            <div key={platform} className="group p-[1px] rounded-[2rem] bg-gradient-to-br from-ui-border to-transparent hover:from-ui-border-bright hover:to-ui-text/5 transition-all duration-500">
                                <div className="bg-ui-bg-alt/90 backdrop-blur-md rounded-[1.95rem] p-8 flex flex-col items-center text-center h-full border border-ui-border group-hover:border-ui-border-bright transition-all">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-ui-border flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                        <Icon icon={data.icon} className="text-3xl" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{data.name}</h3>
                                    <p className="text-xs text-ui-text-muted font-light leading-relaxed mb-8 flex-1">
                                        {data.desc}
                                    </p>
                                    <button className="w-full py-3.5 rounded-xl bg-brand-surface border border-ui-border text-ui-text text-sm font-semibold hover:bg-ui-text hover:text-brand-bg transition-all duration-300 flex items-center justify-center gap-2">
                                        Download {data.ext}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </section>

                <div className="mt-20 p-8 border border-ui-border rounded-[2rem] bg-ui-bg-alt/40 backdrop-blur-sm max-w-4xl text-left flex flex-col md:flex-row items-center gap-8 text-white">
                    <div className="w-12 h-12 rounded-xl bg-ui-text/5 border border-ui-border flex items-center justify-center text-ui-text">
                        <Icon icon="solar:info-square-bold-duotone" className="text-2xl" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white mb-1 uppercase tracking-wider">Installation Note</h4>
                        <p className="text-[12px] text-ui-text-muted font-light leading-relaxed">
                            For Windows, you may encounter a "SmartScreen" warning as the installer is currently being signed. Click "More Info" and "Run Anyway" to proceed. On macOS, you might need to right-click and "Open" for the first launch.
                        </p>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
