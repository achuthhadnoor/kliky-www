"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SetupInstructionsPage() {
  const [copied, setCopied] = useState(false);
  const command = "xattr -cr /Applications/kliky.app";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full transition-colors duration-300 overflow-x-hidden flex flex-col px-6 py-12 md:px-12 lg:px-16">
      
      {/* Dynamic Ambient Blur Halos */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-[140px] pointer-events-none" />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-3xl mx-auto flex-1 flex flex-col justify-start">
        
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
            Setup Guide
          </span>
        </div>

        {/* Header Block */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-sans">
            How to Open &amp; Run Kliky on macOS
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed max-w-2xl">
            Because Kliky is distributed as an independent, lightweight utility directly to users (outside the Apple Mac App Store), macOS Gatekeeper will require a quick security bypass to run. Follow these simple steps to activate your client.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-12 font-sans">

          {/* STEP 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xs font-black font-mono text-brand select-none">
                01
              </span>
              <h2 className="text-lg font-bold text-zinc-950 dark:text-white">Install Kliky</h2>
            </div>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-10">
              Download the `.dmg` installer for macOS. Double-click to open it, then drag the <strong className="text-zinc-950 dark:text-white">kliky.app</strong> icon directly into your machine's <strong className="text-zinc-950 dark:text-white">Applications</strong> folder.
            </p>
          </section>

          {/* STEP 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xs font-black font-mono text-brand select-none">
                02
              </span>
              <h2 className="text-lg font-bold text-zinc-950 dark:text-white">Bypass Gatekeeper Warning</h2>
            </div>
            
            <div className="pl-10 space-y-4 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                When opening Kliky for the first time, macOS may display a dialog stating: 
                <br />
                <code className="inline-block mt-2 font-mono text-[11px] bg-red-500/10 border border-red-500/20 text-red-500 px-2 py-1 rounded">
                  &quot;kliky&quot; is damaged and can&apos;t be opened.
                </code>
                &nbsp;or&nbsp;
                <code className="inline-block mt-2 font-mono text-[11px] bg-red-500/10 border border-red-500/20 text-red-500 px-2 py-1 rounded">
                  &quot;kliky&quot; cannot be opened because Apple cannot check it...
                </code>
              </p>
              
              <p className="font-semibold text-zinc-950 dark:text-white">
                Choose one of the two quick methods below to bypass this quarantine flag:
              </p>

              {/* Grid of options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                
                {/* Method A: Terminal */}
                <div className="p-5 rounded-2xl glass-panel border border-zinc-200/60 dark:border-zinc-800/60 bg-white/10 dark:bg-zinc-950/10 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-brand font-mono">Method A: Quick Terminal Paste (Recommended)</h4>
                  <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Open your macOS Terminal utility (press <kbd className="font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1 py-0.5 rounded text-[9px] shadow-xs">⌘Space</kbd> type &quot;Terminal&quot;) and paste this exact command to remove the quarantine tag:
                  </p>
                  <div className="relative mt-2">
                    <pre className="font-mono text-[10px] bg-zinc-950 text-zinc-200 p-3.5 pr-12 rounded-xl overflow-x-auto border border-zinc-800">
                      {command}
                    </pre>
                    <button
                      onClick={handleCopy}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-sans text-[10px] font-bold transition-all border border-zinc-700 cursor-pointer shadow-sm select-none"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Method B: System Settings */}
                <div className="p-5 rounded-2xl glass-panel border border-zinc-200/60 dark:border-zinc-800/60 bg-white/10 dark:bg-zinc-950/10 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">Method B: Manual Security Bypass</h4>
                  <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    <li>Right-click (or Control-click) <strong className="text-zinc-800 dark:text-zinc-200">kliky.app</strong> in your Applications directory.</li>
                    <li>Select <strong className="text-zinc-800 dark:text-zinc-200">Open</strong> from the dropdown menu.</li>
                    <li>Click <strong className="text-brand font-bold">Open</strong> in the macOS popup notification.</li>
                    <li>Alternatively, navigate to <strong className="text-zinc-800 dark:text-zinc-200">System Settings &gt; Privacy &amp; Security</strong>, scroll to the bottom, and select <strong className="text-brand font-bold">Open Anyway</strong>.</li>
                  </ol>
                </div>

              </div>
            </div>
          </section>

          {/* STEP 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xs font-black font-mono text-brand select-none">
                03
              </span>
              <h2 className="text-lg font-bold text-zinc-950 dark:text-white">Enable Input Accessibility Access</h2>
            </div>
            <div className="pl-10 space-y-4 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                To dynamically synthesize acoustic clicks whenever you type (no matter what application is active in the background), Kliky operates using a lightweight local keystroke listener. 
              </p>
              <p>
                Upon launching Kliky, a system prompt will guide you to enable accessibility access:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-zinc-500 dark:text-zinc-400">
                <li>Click <strong className="text-zinc-800 dark:text-zinc-200">Open System Settings</strong> inside the popup dialog.</li>
                <li>You will be directed to <strong className="text-zinc-800 dark:text-zinc-200">Privacy &amp; Security &gt; Accessibility</strong>.</li>
                <li>Find <strong className="text-zinc-800 dark:text-zinc-200">kliky</strong> in the list and toggle the switch to the <strong className="text-emerald-500 font-bold">ON</strong> position (you may need to authenticate with Touch ID or your passcode).</li>
                <li>Restart Kliky to apply settings. Enjoy the premium mechanical tactile soundscape!</li>
              </ol>
            </div>
          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-3xl mx-auto mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-900/40 text-center flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-600 gap-4 pb-8">
        <p>© 2026 Kliky App. Local, offline-first mechanical synthesis.</p>
        <Link href="/" className="hover:text-brand transition select-none cursor-pointer">
          Back to Home
        </Link>
      </footer>

    </div>
  );
}
