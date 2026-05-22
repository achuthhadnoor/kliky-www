"use client";

import React from "react";
import { ThemeSwitch } from "./theme-switch";
import Link from "next/link";

export function MobileFloatingNav() {
  const NavLinks = () => (
    <>
      <Link href="#features" className="text-xs font-bold font-sans text-zinc-600 dark:text-zinc-400 hover:text-brand transition">
        Features
      </Link>
      <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800" />
      <Link href="#pricing" className="text-xs font-bold font-sans text-zinc-600 dark:text-zinc-400 hover:text-brand transition">
        Pricing
      </Link>
      <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800" />
      <Link href="#faq" className="text-xs font-bold font-sans text-zinc-600 dark:text-zinc-400 hover:text-brand transition">
        FAQ
      </Link>
      <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800" />
      <Link href="/changelog" className="text-xs font-bold font-sans text-zinc-600 dark:text-zinc-400 hover:text-brand transition">
        Updates
      </Link>
    </>
  );

  return (
    <>
      {/* Desktop Top Right Menu */}
      <div className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-5 glass-panel border border-zinc-200/50 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-full px-6 py-3 shadow-xl shadow-zinc-900/5 dark:shadow-black/50">
        <NavLinks />
        <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Mobile Bottom Center Menu */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
        <div className="glass-panel border border-zinc-200/50 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-full px-4 py-3 flex items-center justify-around shadow-2xl shadow-zinc-900/10 dark:shadow-black/50">
          <NavLinks />
        </div>
      </div>
    </>
  );
}
