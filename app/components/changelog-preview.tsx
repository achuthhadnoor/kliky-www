"use client";

import React from "react";
import Link from "next/link";

export function ChangelogPreview() {
  return (
    <section id="changelog-preview" className="relative w-full mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-900/60 flex flex-col items-center">
      
      {/* Ambient background blur halo */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand/5 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 px-4 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
          What&apos;s New?
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-4 font-sans">
          Latest Product Updates
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed">
          Follow the rapid evolution of Kliky&apos;s native sound synthesis systems, keyboard drivers, and mechanical spatial audio layers.
        </p>
      </div>

      {/* Preview Card */}
      <div className="relative z-10 w-full max-w-3xl px-4 md:px-6">
        <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-6 md:p-8 hover:border-brand/35 transition-all duration-300 shadow-md hover:shadow-brand/5 bg-white/20 dark:bg-zinc-950/20 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
          
          {/* Left Block: Version Node */}
          <div className="flex md:flex-col justify-between md:justify-start items-center md:items-start shrink-0 border-b md:border-b-0 md:border-r border-zinc-200/60 dark:border-zinc-800/60 pb-5 md:pb-0 md:pr-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-mono tracking-tight text-zinc-950 dark:text-white">v1.2.0</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[10px] font-bold font-mono text-brand uppercase tracking-wider mt-1">
                Latest Release
              </p>
            </div>
            
            <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 md:mt-12 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 px-2 py-0.5 rounded">
              May 2026
            </span>
          </div>

          {/* Right Block: Content Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-zinc-950 dark:text-white font-sans tracking-wide">
                The High-Fidelity &amp; Bento Release
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-1">
                Major upgrades targeting spatial synthesizer layers and modular interactive features lists.
              </p>

              <ul className="mt-5 space-y-3.5">
                {[
                  {
                    title: "Acoustics Update",
                    text: "Integrated premium Velvet (Creamy) and Neon (8-bit) high-fidelity switch sound profiles."
                  },
                  {
                    title: "Synthesizer Engine",
                    text: "Engineered low-latency browser audio node achieving under 3.5ms delay bounds."
                  },
                  {
                    title: "Bento Features Showcase",
                    text: "Designed fully modular interactive bento grid featuring live delay testers and switch anatomy vectors."
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs font-sans text-zinc-700 dark:text-zinc-300">
                    <span className="w-5 h-5 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-[9px] font-bold font-mono text-brand mr-3 mt-0.5 shrink-0 select-none">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="text-zinc-950 dark:text-zinc-200 font-semibold mr-1">{item.title}:</strong>
                      {item.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200/30 dark:border-zinc-800/30 flex justify-end">
              <Link 
                href="/changelog" 
                className="inline-flex items-center text-xs font-bold text-brand hover:text-brand-hover tracking-wide transition-all group select-none cursor-pointer"
              >
                View Full Product Changelog
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
