"use client";

import React, { useState, useRef, useEffect } from "react";
import { SwitchType } from "./audio";

interface ToolbarProps {
  activeSwitch: SwitchType;
  setActiveSwitch: (type: SwitchType) => void;
  volume: number;
  setVolume: (val: number) => void;
  pitch: number;
  setPitch: (val: number) => void;
}

export function Toolbar({
  activeSwitch,
  setActiveSwitch,
  volume,
  setVolume,
  pitch,
  setPitch,
}: ToolbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Close dropdown and info popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setIsInfoOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const switches: { id: SwitchType; name: string; desc: string; color: string }[] = [
    { id: "zenith", name: "Zenith", desc: "Smooth Linear", color: "#a855f7" },
    { id: "obsidian", name: "Obsidian", desc: "Crisp Tactile", color: "#2e3138" },
    { id: "sapphire", name: "Sapphire", desc: "Sharp Clicky", color: "#00c8ff" },
    { id: "velvet", name: "Velvet", desc: "Creamy Linear", color: "#e5a93b" },
    { id: "neon", name: "Neon", desc: "Retro Chiptune", color: "#ab47bc" },
  ];

  const activeProfile = switches.find((s) => s.id === activeSwitch) || switches[0];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3.5 rounded-2xl glass-panel w-full transition-all duration-300">
      
      {/* LEFT: Switch Dropdown Selector */}
      <div className="relative flex-1 md:flex-initial" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="glow-on-hover w-full md:w-60 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-zinc-100/50 hover:bg-zinc-200/60 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 text-left cursor-pointer transition select-none"
        >
          <div className="flex items-center gap-2.5">
            {/* stem color preview block */}
            <div 
              className="w-3.5 h-3.5 rounded border border-black/20 shrink-0" 
              style={{ backgroundColor: activeProfile.color }}
            />
            <div>
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 block leading-none">Sound Profile</span>
              <span className="text-xs font-bold text-zinc-800 dark:text-white mt-0.5 block leading-none">{activeProfile.name}</span>
            </div>
          </div>
          {/* Chevron Icon */}
          <svg 
            className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Card */}
        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-full md:w-64 rounded-xl glass-panel bg-background/95 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {switches.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSwitch(item.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-left p-2.5 rounded-lg transition hover:bg-brand/10 dark:hover:bg-brand/10 group cursor-pointer ${
                    activeSwitch === item.id 
                      ? "bg-brand/10 border border-brand/20" 
                      : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-3 h-3 rounded border border-black/10 shrink-0" 
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-white group-hover:text-brand transition">{item.name}</p>
                      <p className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                  {activeSwitch === item.id && (
                    <span className="text-[10px] text-brand font-bold font-mono">ACTIVE</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CENTER & RIGHT: Sliders and Tech Info */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 md:justify-end">
        
        {/* Volume Slider */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-100/30 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/40 flex-1 sm:max-w-[160px]">
          {/* Speaker Icon */}
          <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          <div className="flex-1">
            <div className="flex justify-between text-[9px] font-mono text-zinc-400 dark:text-zinc-500 leading-none mb-1">
              <span>VOL</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand"
            />
          </div>
        </div>

        {/* Pitch Slider */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-100/30 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/40 flex-1 sm:max-w-[160px]">
          {/* Tune Icon */}
          <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <div className="flex-1">
            <div className="flex justify-between text-[9px] font-mono text-zinc-400 dark:text-zinc-500 leading-none mb-1">
              <span>PITCH</span>
              <span>{pitch.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.8"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand"
            />
          </div>
        </div>

        {/* Info Icon & Popover */}
        <div className="relative shrink-0 flex justify-center" ref={infoRef}>
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border cursor-pointer transition ${
              isInfoOpen
                ? "border-brand bg-brand/10 text-brand"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
            aria-label="Technical Info"
          >
            <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.084 1.085l-.261.262M12 18.75h.007v.008H12v-.008zM12 3a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
          </button>

          {/* Technical Popover */}
          {isInfoOpen && (
            <div className="absolute right-0 bottom-12 sm:bottom-auto sm:top-12 mt-2 w-72 rounded-xl glass-panel bg-background/95 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-4 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-top-2 duration-200">
              <h4 className="text-[10px] font-bold tracking-wider uppercase text-zinc-500 font-mono">
                Technical Synthesis
              </h4>
              
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                <div className="glass-panel rounded-lg p-2 bg-zinc-100/50 dark:bg-zinc-900/30">
                  <span className="text-zinc-400 dark:text-zinc-500 font-bold block">Latency</span>
                  <span className="text-zinc-800 dark:text-white font-bold block mt-0.5">&lt; 3.5ms</span>
                </div>
                <div className="glass-panel rounded-lg p-2 bg-zinc-100/50 dark:bg-zinc-900/30">
                  <span className="text-zinc-400 dark:text-zinc-500 font-bold block">CPU Draw</span>
                  <span className="text-zinc-800 dark:text-white font-bold block mt-0.5">&lt; 1.2%</span>
                </div>
              </div>
              
              <div className="glass-panel rounded-lg p-2.5 text-[9px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100/50 dark:bg-zinc-900/30 leading-normal">
                <span className="text-brand font-bold block mb-0.5">Global Shortcuts</span>
                Toggle, mute, or swap sound profiles globally with ⌥+⌘+K (macOS) or Alt+Win+K (Windows).
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
