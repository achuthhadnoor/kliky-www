"use client";

import React from "react";
import Image from "next/image";
import { useGitHubReleases } from "../hooks/use-github-releases";

export function LeftSidebar() {
  const { latestVersion, macUrl, winUrl } = useGitHubReleases();

  return (
    <div className="flex flex-col justify-between h-full py-2 space-y-8">
      {/* Branding & Logo */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          {/* Custom inline SVG mechanical switch logo */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-brand/20 border border-brand/30 shadow-md">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-xl object-contain p-1"
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-sans flex items-center">
              kliky<span className="text-brand">.</span>
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand/80 font-mono">
              Desktop Utility
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold leading-snug tracking-tight text-zinc-800 dark:text-zinc-100 font-sans">
          Bring the tactile joy of mechanical typing to your quiet laptop.
        </h2>

        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-sans">
          Kliky is a lightweight background application that plays highly satisfying mechanical key sounds instantly as you type on your physical laptop keyboard.
        </p>

        {/* Benefits bullets */}
        <ul className="space-y-3 pt-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <li className="flex items-start">
            <span className="text-brand mr-2">⚡</span> Works globally across all apps and browsers.
          </li>
          <li className="flex items-start">
            <span className="text-brand mr-2">🔋</span> Engineered in native APIs to protect battery life.
          </li>
        </ul>
      </div>

      {/* Download Action Section */}
      <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-900/60">
        {/* macOS button */}
        <a
          href={macUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-on-hover flex w-full items-center justify-center gap-3 rounded-2xl bg-brand py-3.5 text-xs font-bold text-white shadow-xl hover:shadow-brand/20 active:scale-95 transition cursor-pointer select-none"
        >
          {/* Apple Download Icon */}
          <svg
            className="w-4.5 h-4.5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.06 1.005 1.45 2.187 3.068 3.761 3.008 1.52-.06 2.09-.982 3.93-.982 1.829 0 2.362.982 3.93.948 1.606-.027 2.656-1.455 3.637-2.885 1.13-1.66 1.597-3.267 1.62-3.354-.047-.024-3.116-1.196-3.149-4.757-.03-2.96 2.429-4.38 2.54-4.444-1.39-2.03-3.535-2.264-4.288-2.315-1.92-.152-3.415 1.04-4.57 1.04zm2.464-4.59c1.03-1.24 1.72-2.96 1.53-4.68-1.48.06-3.27.99-4.33 2.23-1.03 1.22-1.76 2.97-1.53 4.65 1.65.12 3.32-.93 4.33-2.2z" />
          </svg>
          Download for macOS
        </a>

        {/* Windows button */}
        <a
          href={winUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-on-hover flex w-full items-center justify-center gap-3 rounded-2xl glass-panel py-3.5 text-xs font-bold text-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-95 transition bg-zinc-100/50 dark:bg-zinc-900/40 cursor-pointer select-none"
        >
          {/* Windows Download Icon */}
          <svg
            className="w-4.5 h-4.5 fill-current text-zinc-600 dark:text-zinc-300"
            viewBox="0 0 24 24"
          >
            <path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.101zM11.25 1.9L24 0v11.55H11.25V1.9zM11.25 12.45H24v11.55l-12.75-1.9v-9.65z" />
          </svg>
          Download for Windows
        </a>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 dark:text-zinc-500 px-1 pt-1 select-none">
          <span>{latestVersion} (Universal)</span>
          <span>•</span>
          <span className="text-zinc-500 dark:text-zinc-400">Free to Try</span>
        </div>
      </div>
    </div>
  );
}
