"use client";

import React, { useState, useEffect } from "react";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"lifetime" | "monthly">("lifetime");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
    setEmail("");
    setValidationError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Close modal on ESC keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setValidationError("Please enter your email address.");
      return;
    }
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);

    // Simulate database registration call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="pricing" className="relative w-full mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-900/60 flex flex-col items-center">

      {/* Decorative ambient lighting halo (GPU accelerated) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      {/* Pricing Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 px-4 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
          Speculative Pricing
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-4 font-sans">
          Simple, Transparent Plans
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed">
          Kliky comes with a 7-day free trial. Download and try it out, and purchase a lifetime license to keep the clicks going forever.
        </p>
      </div>

      {/* Speculative Interactive Toggle */}
      <div className="relative z-10 mb-14 flex flex-col items-center">


        {/* Dynamic Saving tag */}
        {billingCycle === "lifetime" && (
          <span className=" -bottom-7 text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-500 bg-emerald-100/50 dark:bg-emerald-950/30 border border-emerald-200/40 dark:border-emerald-800/40 px-2 py-0.5 rounded-full animate-bounce">
            Save over 60% compared to monthly
          </span>
        )}
      </div>

      {/* Two-Column Center Grid */}
      <div className="relative z-10 w-full max-w-4xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

        {/* CARD 1: Core (Free Forever) */}
        <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 p-8 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-500/5 relative overflow-hidden bg-white/20 dark:bg-zinc-950/20">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 font-sans">
                  Kliky Core
                </h3>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                  Offline Satisfying Acoustics
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 font-mono px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/60">
                7-Day Free Trial
              </span>
            </div>

            <div className="flex items-baseline mb-6 font-sans">
              <span className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">$3.99</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2 font-mono">One-Time Payment</span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-6">
              Start with a 7-day free trial. Perfect for general writers, software developers, and keyboard collectors wanting satisfying click-clacks.
            </p>

            <ul className="space-y-3.5 mb-8">
              {[
                "5 Premium sound packs pre-loaded",
                "Load custom packs (drag-and-drop WAV)",
                "Local SQLite Analytics Journaling",
                "Menubar Magic & status key display",
                "Seamless Tauri background auto-updater",
                "Universal macOS and Windows clients",
                "100% private and fully open-source"
              ].map((feature, i) => (
                <li key={i} className="flex items-start text-xs font-sans text-zinc-700 dark:text-zinc-300">
                  <svg className="w-4 h-4 text-emerald-500 mr-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="https://github.com/achuthhadnoor/kliky-www/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-3 px-4 rounded-xl border border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer select-none font-sans"
          >
            Start Free Trial
          </a>
        </div>

        {/* CARD 2: Creator Pro (speculative roadmap coming soon) */}
        <div className="rounded-3xl glass-panel border-2 border-brand/30 dark:border-brand/40 p-8 flex flex-col justify-between hover:border-brand transition-all duration-300 shadow-xl shadow-brand/5 relative overflow-hidden bg-brand/[0.03] dark:bg-brand/[0.01]">
          <div className="absolute top-0 right-0 transform translate-x-12 translate-y-4 rotate-45 bg-brand text-white text-[9px] font-bold font-mono tracking-widest uppercase py-1 px-12 shadow-sm z-20 select-none">
            coming soon
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white font-sans">
                  Creator Pro
                </h3>
                <p className="text-[11px] text-brand font-sans mt-0.5 font-bold uppercase tracking-wider">
                  Coming Soon
                </p>
              </div>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand font-mono px-2 py-0.5 rounded-md bg-brand/10 border border-brand/20 mr-12 relative z-10">
                Speculative
              </span>
            </div>

            <div className="flex items-baseline mb-6 font-sans">
              <span className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white transition-all duration-300">
                {billingCycle === "lifetime" ? "$15" : "$2.99"}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2 font-mono">
                {billingCycle === "lifetime" ? "One-Time Payment" : "/ month"}
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-6">
              Tailored for streamers and creators. Purchasing Creator Pro provides a secure <strong>License Key</strong> (powered by Polar.sh) to unlock premium spatial audio features directly inside the Kliky desktop app.
            </p>

            <ul className="space-y-3.5 mb-8">
              {[
                "Acoustic Keymap Pro Mapper (bind sounds per-key)",
                "Streamer OBS reactive screen keycap overlay",
                "Studio Library access (50+ high-fidelity profiles)",
                "Secure cloud backups & custom package sync",
                "Pro latency suite (Native ASIO/WASAPI driver stack)"
              ].map((feature, i) => (
                <li key={i} className="flex items-start text-xs font-sans text-zinc-800 dark:text-zinc-200 font-medium">
                  <svg className="w-4 h-4 text-brand mr-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={handleOpenModal}
              className="w-full text-center py-3.5 px-4 rounded-xl bg-brand text-white text-xs font-extrabold tracking-wider transition-all shadow-md hover:shadow-brand/25 active:scale-[0.98] cursor-pointer select-none font-sans"
            >
              Get Creator Pro Beta
            </button>
          </div>
        </div>

      </div>

      {/* TACTILE EMAIL WAITLIST MODAL OVERLAY */}
      {isModalOpen && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md transition-all duration-300"
        >
          {/* Modal Container Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel max-w-md w-full rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Ambient Lights */}
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-brand/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-red-500/5 blur-2xl pointer-events-none" />

            {/* Close Cross Trigger */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50 dark:bg-zinc-900 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all select-none cursor-pointer focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Dynamic Modal Content Screen */}
            {!isSubmitted ? (
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5">
                  <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                </div>

                <h4 className="text-xl font-bold font-sans text-zinc-950 dark:text-white">
                  Join Creator Pro Waitlist
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-2 leading-relaxed">
                  Be the absolute first to know when the Creator Pro features launch. Early waitlist members will secure lifetime grandfathered discounts and pre-release access.
                </p>

                <form onSubmit={handleSubmitWaitlist} className="mt-6 flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-email" className="text-[10px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      id="waitlist-email"
                      type="text"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={handleEmailChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-xs bg-zinc-50 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand/35 transition-all ${validationError
                        ? "border-red-500/50 dark:border-red-500/40"
                        : "border-zinc-200/60 dark:border-zinc-800/60 focus:border-brand"
                        }`}
                    />
                    {validationError && (
                      <span className="text-[10px] font-medium font-sans text-red-500 mt-1 flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        {validationError}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-center py-3 px-4 mt-2 rounded-xl bg-brand text-white text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-brand/20 flex items-center justify-center cursor-pointer select-none font-sans"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      "Confirm Waitlist Entry"
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="relative z-10 text-center py-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center text-emerald-500 mb-5 relative">
                  {/* Glowing success ring */}
                  <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping duration-1000" />
                  <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h4 className="text-xl font-bold font-sans text-zinc-950 dark:text-white">
                  You are registered! 🚀
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed max-w-sm">
                  We&apos;ve successfully registered <strong className="text-zinc-800 dark:text-zinc-200">{email}</strong> to our Creator Pro roadmap waitlist. You will receive grandfathered lifetime access deals and launch details as soon as our public beta begins!
                </p>

                <button
                  onClick={handleCloseModal}
                  className="mt-8 px-6 py-2.5 rounded-xl border border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer select-none font-sans"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
