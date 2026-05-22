"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGitHubReleases } from "../hooks/use-github-releases";
import { MarkdownRenderer } from "../components/markdown-renderer";

interface ChangelogBullet {
  type: "features" | "acoustics" | "performance";
  title: string;
  text: string;
}

interface ChangelogVersion {
  version: string;
  date: string;
  tagline: string;
  isLatest?: boolean;
  bullets: ChangelogBullet[];
}

const NoResultsBlock = ({ onReset }: { onReset: () => void }) => (
  <div className="text-center py-20 glass-panel border border-zinc-200/50 dark:border-zinc-800/40 rounded-3xl p-10 bg-white/10 dark:bg-zinc-950/10 mb-16">
    <svg className="w-12 h-12 text-zinc-400 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
    <h4 className="text-lg font-bold font-sans text-zinc-800 dark:text-zinc-200">No matching releases found</h4>
    <p className="text-xs text-zinc-400 font-sans mt-2">
      Try adjusting your query in the search bar or selecting a different changes tab.
    </p>
    <button
      onClick={onReset}
      className="mt-6 px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold tracking-wide transition-all shadow-md select-none cursor-pointer"
    >
      Reset Search &amp; Filters
    </button>
  </div>
);

export default function ChangelogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "features" | "acoustics" | "performance">("all");
  const { latestVersion, loading, releases } = useGitHubReleases();

  const isLive = !loading && releases.length > 0;
  const isFallback = !loading && releases.length === 0;

  // --- STATIC FALLBACK DATA ---
  const changelogEntries: ChangelogVersion[] = [
    {
      version: "v1.2.0",
      date: "May 2026",
      tagline: "The High-Fidelity & Bento Release",
      isLatest: true,
      bullets: [
        { type: "acoustics", title: "Creamy & 8-Bit Switch Profiles", text: "Integrated premium Velvet (Creamy) and Neon (8-bit) high-fidelity mechanical sound packs." },
        { type: "features", title: "Under-3.5ms Web Synthesis", text: "Engineered ultra-low-latency Web Audio API synthesizer node with spatial panner nodes." },
        { type: "features", title: "Bento Features Showcase Grid", text: "Designed fully modular interactive bento grid featuring live delay testers, key depressors, and click blueprints." },
        { type: "performance", title: "Theme System Integration", text: "Shifted color scheme to premium Amethyst Purple and integrated prefers-color-scheme system light/dark compatibility." }
      ]
    },
    {
      version: "v1.1.0",
      date: "March 2026",
      tagline: "Smart Mic & Custom Soundpacks",
      bullets: [
        { type: "acoustics", title: "Custom Sound Folder Support", text: "Enabled dragging and dropping custom WAV/MP3 packs directly into local settings directories." },
        { type: "features", title: "Smart Mic Call Dampener", text: "Built background mic listener that dampens typing clicks by 65% when voice speech is actively identified." },
        { type: "features", title: "Global Utility Hotkeys", text: "Created universal hotkeys (⌥⌘K / Alt+Win+K) to toggle the app's sound engine in the background." },
        { type: "performance", title: "Resource Efficiency", text: "Re-engineered native system loops to cap CPU below 1.2% and RAM footprint under 15MB." }
      ]
    },
    {
      version: "v1.0.0",
      date: "January 2026",
      tagline: "Initial Client Release",
      bullets: [
        { type: "features", title: "Universal OS Clients", text: "Released native, lightweight desktop utility wrappers for both macOS (Apple Silicon/Intel) and Windows (x64)." },
        { type: "acoustics", title: "Official Switch Packs", text: "Preloaded core acoustics with Zenith (crisp tactile), Obsidian (heavy deep thock), and Sapphire (clicky linear)." },
        { type: "features", title: "Spatial Acoustic Synthesizer", text: "Configured spatial audio stereo panning based on keyboard coordinates and active pitch/frequency modifiers." },
        { type: "performance", title: "Offline-First Privacy", text: "Established absolute offline capabilities to guarantee zero network typing logs." }
      ]
    }
  ];

  // --- FILTERING LOGIC ---
  const filteredLiveReleases = releases.filter((release) => {
    const searchLower = searchQuery.toLowerCase();
    const bodyLower = release.body.toLowerCase();

    // Naive semantic match for categories in raw markdown
    let matchesCategory = true;
    if (activeFilter === "features") {
      matchesCategory = bodyLower.includes("feature") || bodyLower.includes("add") || bodyLower.includes("new") || bodyLower.includes("ui");
    } else if (activeFilter === "acoustics") {
      matchesCategory = bodyLower.includes("sound") || bodyLower.includes("acoustic") || bodyLower.includes("audio") || bodyLower.includes("voice") || bodyLower.includes("mic") || bodyLower.includes("switch");
    } else if (activeFilter === "performance") {
      matchesCategory = bodyLower.includes("performance") || bodyLower.includes("fix") || bodyLower.includes("optimiz") || bodyLower.includes("latency") || bodyLower.includes("cpu");
    }

    const matchesSearch =
      searchQuery === "" ||
      release.name.toLowerCase().includes(searchLower) ||
      release.tag_name.toLowerCase().includes(searchLower) ||
      bodyLower.includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const filteredFallbackEntries = changelogEntries.map((entry) => {
    const matchingBullets = entry.bullets.filter((bullet) => {
      const matchesCategory = activeFilter === "all" || bullet.type === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        bullet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bullet.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bullet.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    return { ...entry, bullets: matchingBullets };
  }).filter((entry) => {
    const matchesHeaderSearch =
      searchQuery === "" ||
      entry.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return entry.bullets.length > 0 || matchesHeaderSearch;
  });

  return (
    <div className="relative min-h-screen w-full transition-colors duration-300 overflow-x-hidden flex flex-col px-6 py-12 md:px-12 lg:px-16">

      {/* Dynamic Glowing background ambient lighting halos */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      {/* Main Container Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col justify-start">

        {/* Navigation Header */}
        <div className="w-full flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-900/60 pb-6 mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-brand transition group select-none cursor-pointer"
          >
            <svg className="w-4 h-4 mr-1.5 transform transition-transform group-hover:-translate-x-1 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          <span className="text-[10px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/40">
            Kliky Releases
          </span>
        </div>

        {/* Header Block */}
        <div className="mb-14">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-sans">
            Changelog &amp; Releases
          </h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed max-w-2xl">
            Track the ongoing release architecture and historical updates of Kliky&apos;s tactile spatial audio synthesizers and mechanical desktop drivers.
          </p>
        </div>

        {/* Filter and Search Bar Block */}
        <div className="w-full glass-panel border border-zinc-200/50 dark:border-zinc-800/40 rounded-3xl p-5 md:p-6 mb-12 bg-white/20 dark:bg-zinc-950/20 flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between">

          {/* Category Tabs list */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Changes" },
              { id: "features", label: "Features" },
              { id: "acoustics", label: "Acoustics" },
              { id: "performance", label: "Performance" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all select-none cursor-pointer border ${activeFilter === tab.id
                    ? "bg-brand/10 border-brand/30 text-brand font-extrabold"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box Input */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 font-sans text-xs bg-zinc-50 dark:bg-zinc-900/40 text-zinc-950 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
            />
            <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
            </svg>
          </div>
        </div>

        {/* Live GitHub Release Alert Banner */}
        {isLive && (
          <div className="w-full mb-10 p-4 rounded-2xl glass-panel border border-brand/20 bg-brand/[0.02] flex items-center justify-between text-xs font-sans text-zinc-700 dark:text-zinc-300 relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand" />
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <span className="font-bold text-zinc-950 dark:text-white mr-1.5">Live GitHub Status:</span>
                Latest version <strong className="font-mono text-brand font-extrabold">{latestVersion}</strong> is live with direct binary downloads.
              </div>
            </div>
            <a
              href={releases[0].html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand hover:text-brand-hover shrink-0 underline ml-4 flex items-center gap-1 group select-none cursor-pointer hidden md:flex"
            >
              Release Notes
              <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-2 transform transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        )}

        {/* Timeline Grid Container */}
        {loading ? (
          <div className="relative pl-6 md:pl-10 border-l border-zinc-200 dark:border-zinc-900/60 ml-2 md:ml-4 flex flex-col gap-14 pb-16 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-900" />
                <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-6 md:p-8 bg-white/20 dark:bg-zinc-950/20 flex flex-col gap-5">
                  <div className="flex justify-between border-b border-zinc-200/40 dark:border-zinc-800/40 pb-4">
                    <div>
                      <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-2"></div>
                      <div className="h-3 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                    </div>
                    <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                    <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                    <div className="h-3 w-4/6 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isLive ? (
          filteredLiveReleases.length > 0 ? (
            <div className="relative pl-6 md:pl-10 border-l border-zinc-200 dark:border-zinc-900/60 ml-2 md:ml-4 flex flex-col gap-14 pb-16">
              {filteredLiveReleases.map((release, index) => {
                const isLatest = index === 0;
                const formattedDate = new Date(release.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

                return (
                  <div key={release.tag_name} className="relative select-none">
                    {/* Timeline node circle vector */}
                    <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 bg-white dark:bg-zinc-950 flex items-center justify-center transition-all ${isLatest
                        ? "border-brand shadow-md shadow-brand/20 scale-125"
                        : "border-zinc-300 dark:border-zinc-800"
                      }`}>
                      {isLatest && (
                        <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                      )}
                    </div>

                    {/* Main Version Card */}
                    <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-6 md:p-8 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all duration-300 bg-white/20 dark:bg-zinc-950/20 relative overflow-hidden flex flex-col gap-5">

                      {/* Card Header row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200/40 dark:border-zinc-800/40 pb-4 gap-3">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h2 className="text-xl md:text-2xl font-black font-mono tracking-tight text-zinc-950 dark:text-white">
                              {release.tag_name}
                            </h2>
                            {isLatest && (
                              <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40 px-2 py-0.5 rounded-md">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-bold font-sans text-zinc-500 dark:text-zinc-400 mt-1">
                            {release.name}
                          </p>
                        </div>

                        <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 px-2.5 py-0.5 rounded-md w-fit">
                          {formattedDate}
                        </span>
                      </div>

                      {/* Markdown Body */}
                      <div className="mt-2">
                        <MarkdownRenderer content={release.body} />
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <NoResultsBlock onReset={() => { setSearchQuery(""); setActiveFilter("all"); }} />
          )
        ) : isFallback ? (
          filteredFallbackEntries.length > 0 ? (
            <div className="relative pl-6 md:pl-10 border-l border-zinc-200 dark:border-zinc-900/60 ml-2 md:ml-4 flex flex-col gap-14 pb-16">
              {filteredFallbackEntries.map((entry) => (
                <div key={entry.version} className="relative select-none">
                  <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 bg-white dark:bg-zinc-950 flex items-center justify-center transition-all ${entry.isLatest ? "border-brand shadow-md shadow-brand/20 scale-125" : "border-zinc-300 dark:border-zinc-800"
                    }`}>
                    {entry.isLatest && <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />}
                  </div>
                  <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-6 md:p-8 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all duration-300 bg-white/20 dark:bg-zinc-950/20 flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-200/40 dark:border-zinc-800/40 pb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h2 className="text-xl md:text-2xl font-black font-mono tracking-tight text-zinc-950 dark:text-white">{entry.version}</h2>
                          {entry.isLatest && <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40 px-2 py-0.5 rounded-md">Current</span>}
                        </div>
                        <p className="text-[11px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">{entry.tagline}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 px-2.5 py-0.5 rounded-md w-fit">{entry.date}</span>
                    </div>
                    <div className="flex flex-col gap-5 mt-2">
                      {entry.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 mr-4 mt-0.5 select-none font-mono ${bullet.type === "features" ? "bg-brand/10 border-brand/20 text-brand" : bullet.type === "acoustics" ? "bg-indigo-100/50 dark:bg-indigo-950/30 border-indigo-200/30 dark:border-indigo-800/30 text-indigo-500" : "bg-emerald-100/50 dark:bg-emerald-950/30 border-emerald-200/30 dark:border-emerald-800/30 text-emerald-500"
                            }`}>{bullet.type}</span>
                          <div>
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-wide">{bullet.title}</h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-1 leading-relaxed">{bullet.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoResultsBlock onReset={() => { setSearchQuery(""); setActiveFilter("all"); }} />
          )
        ) : null}

      </main>

      {/* Decorative footer */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-900/40 text-center flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-600 gap-4 pb-8">
        <p>© 2026 Kliky App. Built with high-fidelity procedural Web Audio.</p>
        <Link href="/" className="hover:text-brand transition select-none cursor-pointer">
          Back to App &amp; Sandbox
        </Link>
      </footer>

    </div>
  );
}
