"use client";

import React from "react";
import { SwitchType } from "./audio";

interface RightSidebarProps {
  activeSwitch: SwitchType;
  setActiveSwitch: (type: SwitchType) => void;
  volume: number;
  setVolume: (val: number) => void;
  pitch: number;
  setPitch: (val: number) => void;
}

export function RightSidebar({
  activeSwitch,
  setActiveSwitch,
  volume,
  setVolume,
  pitch,
  setPitch,
}: RightSidebarProps) {
  return (
    <div className="flex flex-col justify-between h-full py-2 space-y-8">
      {/* 1. SWITCH SELECTOR PROFILE TILES */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-400 font-mono">
            Switch Sound Profiles
          </h3>
          <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
            Select a tile to change the sound profile.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* Tile 1: Zenith */}
          <button
            onClick={() => setActiveSwitch("zenith")}
            className={`glow-on-hover w-full flex items-center justify-between text-left p-4 rounded-xl glass-panel transition relative ${
              activeSwitch === "zenith"
                ? "border-brand/60 bg-brand/10 shadow-lg shadow-brand/5"
                : "hover:border-zinc-800/80"
            }`}
          >
            <div>
              <p className="text-xs font-bold font-sans text-white">Zenith</p>
              <p className="text-[10px] font-mono text-zinc-400 mt-1">Smooth Linear • Default</p>
            </div>
            <div
              className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                activeSwitch === "zenith" ? "bg-brand border-brand" : "border-zinc-700"
              }`}
            >
              {activeSwitch === "zenith" && <div className="w-1 h-1 bg-white rounded-full" />}
            </div>
            {/* stem color preview block */}
            <div className="absolute right-12 top-4 w-4 h-4 rounded bg-brand opacity-80 border border-black/40" />
          </button>

          {/* Tile 2: Obsidian */}
          <button
            onClick={() => setActiveSwitch("obsidian")}
            className={`glow-on-hover w-full flex items-center justify-between text-left p-4 rounded-xl glass-panel transition relative ${
              activeSwitch === "obsidian"
                ? "border-brand/60 bg-brand/10 shadow-lg shadow-brand/5"
                : "hover:border-zinc-800/80"
            }`}
          >
            <div>
              <p className="text-xs font-bold font-sans text-white">Obsidian</p>
              <p className="text-[10px] font-mono text-zinc-400 mt-1">Crisp Tactile • Heavy Thock</p>
            </div>
            <div
              className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                activeSwitch === "obsidian" ? "bg-brand border-brand" : "border-zinc-700"
              }`}
            >
              {activeSwitch === "obsidian" && <div className="w-1 h-1 bg-white rounded-full" />}
            </div>
            {/* stem color preview block */}
            <div className="absolute right-12 top-4 w-4 h-4 rounded bg-[#2e3138] opacity-90 border border-zinc-700" />
          </button>

          {/* Tile 3: Sapphire */}
          <button
            onClick={() => setActiveSwitch("sapphire")}
            className={`glow-on-hover w-full flex items-center justify-between text-left p-4 rounded-xl glass-panel transition relative ${
              activeSwitch === "sapphire"
                ? "border-brand/60 bg-brand/10 shadow-lg shadow-brand/5"
                : "hover:border-zinc-800/80"
            }`}
          >
            <div>
              <p className="text-xs font-bold font-sans text-white">Sapphire</p>
              <p className="text-[10px] font-mono text-zinc-400 mt-1">Sharp Clicky • Double Snap</p>
            </div>
            <div
              className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                activeSwitch === "sapphire" ? "bg-brand border-brand" : "border-zinc-700"
              }`}
            >
              {activeSwitch === "sapphire" && <div className="w-1 h-1 bg-white rounded-full" />}
            </div>
            {/* stem color preview block */}
            <div className="absolute right-12 top-4 w-4 h-4 rounded bg-[#00c8ff] opacity-80 border border-black/40" />
          </button>

          {/* Tile 4: Velvet */}
          <button
            onClick={() => setActiveSwitch("velvet")}
            className={`glow-on-hover w-full flex items-center justify-between text-left p-4 rounded-xl glass-panel transition relative ${
              activeSwitch === "velvet"
                ? "border-brand/60 bg-brand/10 shadow-lg shadow-brand/5"
                : "hover:border-zinc-800/80"
            }`}
          >
            <div>
              <p className="text-xs font-bold font-sans text-white">Velvet</p>
              <p className="text-[10px] font-mono text-zinc-400 mt-1">Banana Split • Creamy Linear</p>
            </div>
            <div
              className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                activeSwitch === "velvet" ? "bg-brand border-brand" : "border-zinc-700"
              }`}
            >
              {activeSwitch === "velvet" && <div className="w-1 h-1 bg-white rounded-full" />}
            </div>
            {/* stem color preview block */}
            <div className="absolute right-12 top-4 w-4 h-4 rounded bg-[#e5a93b] opacity-80 border border-black/40" />
          </button>

          {/* Tile 5: Neon */}
          <button
            onClick={() => setActiveSwitch("neon")}
            className={`glow-on-hover w-full flex items-center justify-between text-left p-4 rounded-xl glass-panel transition relative ${
              activeSwitch === "neon"
                ? "border-brand/60 bg-brand/10 shadow-lg shadow-brand/5"
                : "hover:border-zinc-800/80"
            }`}
          >
            <div>
              <p className="text-xs font-bold font-sans text-white">Neon</p>
              <p className="text-[10px] font-mono text-zinc-400 mt-1">Retro Chiptune • 8-bit Classic</p>
            </div>
            <div
              className={`w-3 h-3 rounded-full flex items-center justify-center border ${
                activeSwitch === "neon" ? "bg-brand border-brand" : "border-zinc-700"
              }`}
            >
              {activeSwitch === "neon" && <div className="w-1 h-1 bg-white rounded-full" />}
            </div>
            {/* stem color preview block */}
            <div className="absolute right-12 top-4 w-4 h-4 rounded bg-[#ab47bc] opacity-80 border border-black/40" />
          </button>
        </div>
      </div>

      {/* 2. AUDIO CUSTOMIZER SLIDERS */}
      <div className="glass-panel p-4 rounded-xl space-y-4">
        <h4 className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 font-mono">
          Acoustic Synthesizer Control
        </h4>
        
        {/* Volume Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>Volume</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand"
          />
        </div>

        {/* Pitch Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>Pitch Tuning</span>
            <span>{pitch.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.8"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand"
          />
        </div>
      </div>

      {/* 3. TECHNICAL PREVIEW INFO TILES */}
      <div className="space-y-3 pt-6 border-t border-zinc-900">
        <h4 className="text-[10px] font-bold tracking-wider uppercase text-zinc-500 font-mono">
          Technical Details
        </h4>
        
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400">
          <div className="glass-panel rounded-lg p-2.5">
            <span className="text-zinc-500 font-bold block">Latency</span>
            <span className="text-white font-bold block mt-0.5">&lt; 3.5ms</span>
          </div>
          <div className="glass-panel rounded-lg p-2.5">
            <span className="text-zinc-500 font-bold block">CPU Draw</span>
            <span className="text-white font-bold block mt-0.5">&lt; 1.2% Max</span>
          </div>
        </div>
        
        <div className="glass-panel rounded-lg p-3 text-[10px] font-mono text-zinc-400">
          <span className="text-brand font-bold block">Global Shortcuts</span>
          <span className="text-zinc-500 leading-normal block mt-1">
            Toggle, mute, or swap sound profiles globally with ⌥+⌘+K (macOS) or Alt+Win+K (Windows).
          </span>
        </div>
      </div>
    </div>
  );
}
