"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CommunityPack {
  name: string;
  creator: string;
  downloads: string;
  type: string;
  description: string;
  url: string;
}

export default function SoundPacksPage() {
  const [packName, setPackName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [packUrl, setPackUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const communityPacks: CommunityPack[] = [
    {
      name: "Holy Panda Tactiles",
      creator: "KeebEnthusiast99",
      downloads: "1,248 downloads",
      type: "Tactile (Heavy)",
      description: "Crisp, round tactile bump with a satisfying snappy return click.",
      url: "#"
    },
    {
      name: "MX Black Vintage Cream",
      creator: "StudioThock",
      downloads: "943 downloads",
      type: "Linear (Lubed)",
      description: "Deep, rich signature vintage thock. Highly recommended for code sprints.",
      url: "#"
    },
    {
      name: "Retro IBM Model M",
      creator: "VintageTypist",
      downloads: "2,014 downloads",
      type: "Buckling Spring",
      description: "Acoustically matched 1980s buckling spring clicky feedback.",
      url: "#"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!packName.trim() || !creatorName.trim() || !packUrl.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    // Simple URL check
    if (!packUrl.startsWith("http://") && !packUrl.startsWith("https://")) {
      setError("Please enter a valid pack URL (starting with https:// or http://).");
      return;
    }

    setIsSubmitting(true);

    // Simulate collecting the Creator Pack URL (e.g. saving to Firestore waitlist / database)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setPackName("");
      setCreatorName("");
      setPackUrl("");
      setDescription("");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full transition-colors duration-300 overflow-x-hidden flex flex-col px-6 py-12 md:px-12 lg:px-16">
      
      {/* Dynamic Ambient Blur Halos */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-[140px] pointer-events-none" />

      {/* Main Content */}
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
            Sound Packs
          </span>
        </div>

        {/* Header Block */}
        <div className="mb-14">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-sans">
            Creator Sound Packs
          </h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed max-w-2xl">
            Custom mechanics are built by the community. Discover pre-built acoustics or submit your own creator pack URLs to share your signature thocks, clicks, and clacks with the world.
          </p>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Community Gallery (Col-span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white font-sans flex items-center gap-2">
              <span>🎧</span> Community Gallery
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {communityPacks.map((pack, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-5 hover:border-brand/35 transition-all duration-300 bg-white/20 dark:bg-zinc-950/20 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{pack.name}</h4>
                      <span className="text-[9px] font-mono font-bold bg-brand/10 text-brand px-2 py-0.5 rounded border border-brand/20">
                        {pack.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-mono">By {pack.creator}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans pt-1">
                      {pack.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-900/50 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>{pack.downloads}</span>
                    <a href={pack.url} className="text-brand hover:underline font-bold uppercase tracking-wider">
                      Download Pack
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Submission Form (Col-span 1) */}
          <div className="rounded-3xl glass-panel border border-zinc-200/60 dark:border-zinc-800/60 p-6 bg-white/20 dark:bg-zinc-950/20 relative overflow-hidden space-y-5">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand" />
            
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white font-sans flex items-center gap-2">
                <span>⚡</span> Submit Your Sound Pack
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Host your sound pack WAV folder on Google Drive, Dropbox, or GitHub, and share the creator URL below.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-6 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center text-emerald-500 relative">
                  <span className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping duration-1000" />
                  <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm text-zinc-950 dark:text-white">Pack URL Collected!</h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Thank you! We have successfully queued your creator pack URL. Our curation team will review the WAV samples and add your pack to the global Kliky directory shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-brand text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-brand/90 transition select-none cursor-pointer"
                >
                  Submit Another Pack
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                {error && (
                  <div className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] px-3 py-2 rounded-xl text-center font-bold font-sans">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Creator Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. StudioThock"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 font-sans text-xs bg-zinc-50 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand/35 focus:border-brand transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Sound Pack Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gateron Ink Black V2"
                    value={packName}
                    onChange={(e) => setPackName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 font-sans text-xs bg-zinc-50 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand/35 focus:border-brand transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Creator Pack URL *
                  </label>
                  <input
                    type="text"
                    placeholder="https://drive.google.com/..."
                    value={packUrl}
                    onChange={(e) => setPackUrl(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 font-sans text-xs bg-zinc-50 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand/35 focus:border-brand transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Description / Switch Type
                  </label>
                  <textarea
                    placeholder="e.g. Heavily lubed linear switches with detailed sub-bass acoustics."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 font-sans text-xs bg-zinc-50 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand/35 focus:border-brand transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-center py-2.5 px-4 mt-2 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-brand/20 flex items-center justify-center cursor-pointer select-none font-sans"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    "Register Creator Pack"
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-900/40 text-center flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-600 gap-4 pb-8">
        <p>© 2026 Kliky App. Local, offline-first mechanical synthesis.</p>
        <Link href="/" className="hover:text-brand transition select-none cursor-pointer">
          Back to Home
        </Link>
      </footer>

    </div>
  );
}
