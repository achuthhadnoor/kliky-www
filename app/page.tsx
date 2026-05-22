"use client";

import React, { useState } from "react";
import { LeftSidebar } from "./components/left-sidebar";
import { CenterPlayground } from "./components/center-playground";
import { RightSidebar } from "./components/right-sidebar";
import { Toolbar } from "./components/toolbar";
import { FeaturesBento } from "./components/features-bento";
import { SwitchType } from "./components/audio";

export default function Home() {
  const [activeSwitch, setActiveSwitch] = useState<SwitchType>("zenith");
  const [volume, setVolume] = useState<number>(0.5);
  const [pitch, setPitch] = useState<number>(1.0);

  return (
    <div className="relative min-h-screen w-full transition-colors duration-300 overflow-x-hidden flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
      {/* Sleek, premium glowing background radial light leaks (GPU accelerated) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        
        {/* 3-Column Responsive Split Grid (Hero Section) */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT SIDEBAR: Branding, Info, CTA */}
          <div className="col-span-12 lg:col-span-3 flex flex-col justify-between">
            <LeftSidebar />
          </div>

          {/* CENTER PLAYGROUND: Core Interactive Sandbox with Mobile Toolbar */}
          <div className="col-span-12 lg:col-span-6 border-y lg:border-y-0 lg:border-x border-zinc-200 dark:border-zinc-900/60 py-8 lg:py-0 lg:px-10 flex flex-col justify-between space-y-6">
            {/* Horizontal Toolbar: Displayed ONLY in mobile/tablet viewports */}
            <div className="block lg:hidden">
              <Toolbar
                activeSwitch={activeSwitch}
                setActiveSwitch={setActiveSwitch}
                volume={volume}
                setVolume={setVolume}
                pitch={pitch}
                setPitch={setPitch}
              />
            </div>

            <div className="flex-1">
              <CenterPlayground
                activeSwitch={activeSwitch}
                volume={volume}
                pitch={pitch}
              />
            </div>
          </div>

          {/* RIGHT SIDEBAR: Desktop view only */}
          <div className="hidden lg:flex col-span-12 lg:col-span-3 flex flex-col justify-between">
            <RightSidebar
              activeSwitch={activeSwitch}
              setActiveSwitch={setActiveSwitch}
              volume={volume}
              setVolume={setVolume}
              pitch={pitch}
              setPitch={setPitch}
            />
          </div>

        </div>

        {/* Bento Grid Feature Section */}
        <FeaturesBento />

      </main>

      {/* Decorative Brand Tagline at bottom footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto mt-24 pt-6 border-t border-zinc-200 dark:border-zinc-900/40 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-600 gap-4">
        <p>© 2026 Kliky App. Built with high-fidelity procedural Web Audio.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-brand transition">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-brand transition">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-brand transition">GitHub</a>
        </div>
      </footer>
    </div>
  );
}



