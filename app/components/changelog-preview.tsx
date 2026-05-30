"use client";

import React from "react";
import Link from "next/link";
import { useGitHubReleases } from "../hooks/use-github-releases";
import { MarkdownRenderer } from "./markdown-renderer";

export function ChangelogPreview() {
  const { latestVersion, loading, releases, macUrl, winUrl } = useGitHubReleases();

  const isLive = !loading && releases.length > 0;
  const isFallback = !loading && releases.length === 0;

  // Extract latest release info if live
  const latest = isLive ? releases[0] : null;
  const liveDate = latest ? new Date(latest.published_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "";
  const liveTitle = latest ? latest.name : "";
  const liveBody = latest ? latest.body : "";

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
        
        {loading && (
          <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-6 md:p-8 bg-white/20 dark:bg-zinc-950/20 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch animate-pulse">
            <div className="flex md:flex-col justify-between md:justify-start items-center md:items-start shrink-0 border-b md:border-b-0 md:border-r border-zinc-200/40 dark:border-zinc-800/40 pb-5 md:pb-0 md:pr-10 w-full md:w-40">
              <div>
                <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-2"></div>
                <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
              </div>
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-md md:mt-12"></div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-3"></div>
                <div className="h-3 w-full max-w-sm bg-zinc-200 dark:bg-zinc-800 rounded-md mb-8"></div>
                <div className="space-y-4">
                  <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                  <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                  <div className="h-3 w-4/6 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLive && latest && (
          <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-6 md:p-8 hover:border-brand/35 transition-all duration-300 shadow-md hover:shadow-brand/5 bg-white/20 dark:bg-zinc-950/20 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
            
            {/* Left Block: Version Node */}
            <div className="flex md:flex-col justify-between md:justify-start items-center md:items-start shrink-0 border-b md:border-b-0 md:border-r border-zinc-200/60 dark:border-zinc-800/60 pb-5 md:pb-0 md:pr-10 w-full md:w-40">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono tracking-tight text-zinc-950 dark:text-white">{latestVersion}</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-[10px] font-bold font-mono text-brand uppercase tracking-wider mt-1">
                  Live Release
                </p>
              </div>
              
              <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 md:mt-12 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 px-2 py-0.5 rounded">
                {liveDate}
              </span>
            </div>

            {/* Right Block: Content Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white font-sans tracking-wide">
                  {liveTitle}
                </h4>
                
                {/* Max height constraints to keep preview concise */}
                <div className="mt-5 max-h-48 overflow-hidden relative">
                  <MarkdownRenderer content={liveBody} />
                  {/* Fade out bottom to indicate more content */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 dark:from-zinc-950/80 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200/30 dark:border-zinc-800/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 w-full sm:w-auto">
                  <a href={macUrl} className="flex-1 sm:flex-none text-center text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg hover:border-brand/50 transition-colors text-zinc-600 dark:text-zinc-300">
                    macOS
                  </a>
                  <a href={winUrl} className="flex-1 sm:flex-none text-center text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg hover:border-brand/50 transition-colors text-zinc-600 dark:text-zinc-300">
                    Windows
                  </a>
                </div>
                
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
        )}

        {isFallback && (
          <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-6 md:p-8 hover:border-brand/35 transition-all duration-300 shadow-md hover:shadow-brand/5 bg-white/20 dark:bg-zinc-950/20 flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
            
            {/* Left Block: Version Node */}
            <div className="flex md:flex-col justify-between md:justify-start items-center md:items-start shrink-0 border-b md:border-b-0 md:border-r border-zinc-200/60 dark:border-zinc-800/60 pb-5 md:pb-0 md:pr-10 w-full md:w-40">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono tracking-tight text-zinc-950 dark:text-white">v1.3.0</span>
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
                  The Monkeytype Typing &amp; Premium Acoustics Release
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-1">
                  Major updates targeting spatial synthesizer layers, mechanical thock accents, and client visual redesigns.
                </p>

                <ul className="mt-5 space-y-3.5">
                  {[
                    {
                      title: "Monkeytype Playground",
                      text: "Integrated a professional 3-mode typing engine (Time, Words, Quotes) with smooth caret animations and live metrics panels."
                    },
                    {
                      title: "Spatial Stereo Panning",
                      text: "Added dedicated multi-axis pan coordinates for spatial keys and distinct mechanical audio clips for Space, Enter, and Backspace."
                    },
                    {
                      title: "Modern Red Brand Accent",
                      text: "Redesigned app-wide settings panels, custom volume sliders, double-confirmation factory resets, and private diagnostic feeds using Kliky Red (#ef4444)."
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
        )}

      </div>

    </section>
  );
}
