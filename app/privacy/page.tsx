"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
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
            Privacy Policy
          </span>
        </div>

        {/* Header Block */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-sans">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-3">
            Last Updated: May 30, 2026
          </p>
        </div>

        {/* Highlight Guarantee Box */}
        <div className="w-full mb-10 p-6 rounded-3xl glass-panel border border-brand/20 bg-brand/[0.02] relative overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand" />
          <h3 className="text-sm font-bold text-zinc-950 dark:text-white font-sans flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-brand shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Our Absolute Privacy Guarantee
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            Kliky is designed from the ground up to be **100% offline-first**. We believe your typing habits, text documents, passwords, and creative works are sacred. Kliky performs all real-time key capture, coordinate translation, and audio synthesis completely on your local computer. We **never** log, store, or transmit what you type to our servers.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 font-sans text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">1. Information We Collect</h2>
            <p>
              Because Kliky operates locally, the scope of data collected is extremely minimal and restricted only to what is necessary to run our service and validate purchases:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-zinc-900 dark:text-zinc-200">License Key Validation:</strong> When you purchase Kliky and input your license key, the app securely contacts our payment and licensing infrastructure (<a href="https://polar.sh" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold">Polar.sh</a>) to validate your active subscription or lifetime product.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-200">Basic Device Info:</strong> To prevent software misuse and enforce seat limits, our licensing portal associates your license key with an anonymous hash of your hardware profile (operating system platform and generic system metrics). No personally identifiable information (PII) is linked to this.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-zinc-200">Website Traffic:</strong> We collect aggregate, non-identifying analytics on our public landing page (such as page visits, download metrics, and browser configurations) to optimize web responsiveness.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">2. What We DO NOT Collect</h2>
            <p>
              To maintain absolute transparency, Kliky strictly excludes the collection of:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Any keystrokes, letters, symbols, words, or passwords typed on your keyboard.
              </li>
              <li>
                Any logs of applications running in parallel with Kliky.
              </li>
              <li>
                Any microphone, speech-to-text, or ambient acoustic logs.
              </li>
              <li>
                Any persistent network telemetry regarding your typing speeds or active typing habits.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">3. Third-Party Services</h2>
            <p>
              We process licensing and purchases using industry-grade secure partners:
            </p>
            <p>
              Our license verification, product delivery, and payments are managed securely by <strong className="text-zinc-950 dark:text-white">Polar.sh</strong>. You can review their comprehensive standards under the <a href="https://polar.sh/privacy" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold">Polar Privacy Policy</a>. Your billing data and credit card information never touch our databases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">4. Data Security</h2>
            <p>
              Your local application configuration (such as chosen sound profiles, custom latency limits, active volume levels, and validated license metadata) is stored securely on your machine using encrypted binary storage files.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">5. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to modify this policy as Kliky continues to evolve. However, our baseline commitment to **offline-first local key processing and zero keystroke logging** will remain absolute and permanent. Any revisions will be accompanied by an updated revision date at the top of this document.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-200/50 dark:border-zinc-900/60 pt-6">
            <h2 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white">Contact Us</h2>
            <p>
              For any questions regarding our strict privacy policies, secure license handling, or local system data storage, please feel free to reach out via our official website helpdesk at <a href="https://kliky.achuth.dev" className="text-brand hover:underline font-semibold">kliky.achuth.dev</a>.
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
