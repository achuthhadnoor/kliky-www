"use client";

import React from "react";
import Link from "next/link";

export default function TermsPage() {
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
            Terms of Service
          </span>
        </div>

        {/* Header Block */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-sans">
            Terms of Service
          </h1>
          <p className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-3">
            Last Updated: May 30, 2026
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10 font-sans text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">1. Agreement to Terms</h2>
            <p>
              By downloading, installing, or purchasing the Kliky desktop application or utilizing our online typing sandbox web layers, you agree to be bound by these Terms of Service. If you do not agree to all terms, please delete all local binaries and cease using Kliky.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">2. License Grants & Limitations</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-zinc-900 dark:text-zinc-200">Personal License:</strong> Upon valid purchase, you are granted a non-exclusive, non-transferable, revocable seat license to run Kliky on a personal desktop machine for personal, recreational typing sound enhancement.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-200">Seat Bounds:</strong> Standard purchases are subject to active seat limits specified at checkout. You may not share, rent, or distribute license validation keys to unauthorized users.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-200">Restrictions:</strong> You agree not to reverse-engineer, decompile, modify, extract packaged audio switch packs (.wav assets), or republish the compiled software binaries.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">3. System Access Permissions</h2>
            <p>
              Kliky operates by listening to global hardware inputs (keyboard keystrokes) to trigger audio playback coordinates in real-time. On macOS, this requires registering Kliky under <strong className="text-zinc-950 dark:text-white">System Settings &gt; Privacy &amp; Security &gt; Accessibility</strong>.
            </p>
            <p>
              You understand and agree that granting accessibility permissions is necessary for standard application functions, and that Kliky uses this access **exclusively** to synthesize audio triggers offline on your hardware, as detailed in our Privacy Policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">4. No Warranties</h2>
            <p>
              Kliky is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied.
            </p>
            <p>
              While we engineer our core playback engine to target ultra-low latency constraints (sub-3.5ms delay levels), we are not responsible for latency offsets, background process overlaps, audio output dropouts, or keyboard buffer blocks caused by third-party hardware drivers or operating system resource constraints.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">5. Term Termination</h2>
            <p>
              We reserve the right to terminate your license and revoke validation access via our secure customer portal if you are found to violate seat usage parameters, engage in binary reverse-engineering, or perform unauthorized code distribution.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-200/50 dark:border-zinc-900/60 pt-6">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">Got Questions?</h2>
            <p>
              If you have any questions or feedback regarding our licensing models, terms, or permission requirements, please contact us at <a href="https://kliky.achuth.dev" className="text-brand hover:underline font-semibold">kliky.achuth.dev</a>.
            </p>
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
