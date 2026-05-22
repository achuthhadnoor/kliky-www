"use client";

import React, { useState, useRef, useEffect } from "react";
import { playSwitchSound, SwitchType } from "./audio";

interface CenterPlaygroundProps {
  activeSwitch: SwitchType;
  volume: number;
  pitch: number;
}

export function CenterPlayground({
  activeSwitch,
  volume,
  pitch,
}: CenterPlaygroundProps) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // WPM Tracking variables
  const startTimeRef = useRef<number | null>(null);
  const wordCountRef = useRef<number>(0);

  // Trigger sound and animations on key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Play native mechanical click sound using the physical key code (e.g. "KeyQ", "Space")
    playSwitchSound(activeSwitch, volume, pitch, e.code);

    // Audio frequency animation state
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 150);

    // Initialize WPM start time on first key stroke
    if (!startTimeRef.current && text.length === 0) {
      startTimeRef.current = Date.now();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);

    // Calculate WPM dynamically
    if (val.length === 0) {
      startTimeRef.current = null;
      setWpm(0);
      return;
    }

    const words = val.trim().split(/\s+/).filter(Boolean);
    wordCountRef.current = words.length;

    if (startTimeRef.current) {
      const minutesElapsed = (Date.now() - startTimeRef.current) / 60000;
      if (minutesElapsed > 0.01) {
        const calculatedWpm = Math.round(wordCountRef.current / minutesElapsed);
        setWpm(calculatedWpm > 250 ? 250 : calculatedWpm); // cap at 250 WPM
      } else {
        setWpm(Math.round(wordCountRef.current * 20)); // early estimate
      }
    }
  };

  // Reset the playground
  const handleReset = () => {
    setText("");
    setWpm(0);
    startTimeRef.current = null;
    wordCountRef.current = 0;
  };

  const activeSwitchLabel = {
    zenith: "Zenith (Smooth Linear)",
    obsidian: "Obsidian (Crisp Tactile)",
    sapphire: "Sapphire (Sharp Clicky)",
    velvet: "Velvet (Creamy Linear)",
    neon: "Neon (Retro 8-bit)",
  }[activeSwitch];

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Sandbox Header with Dynamic Sound Wave Visualizer */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-900/60">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            Live Typing Sandbox
          </h3>
          <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
            Active Profile: <span className="text-brand font-semibold">{activeSwitchLabel}</span>
          </p>
        </div>

        {/* CSS Sound Equalizer that reacts dynamically to typing */}
        <div className="flex items-end h-6 space-x-0.5">
          <span className={`sound-bar sound-bar-1 ${isTyping ? "sound-bar-animate" : ""}`} />
          <span className={`sound-bar sound-bar-2 ${isTyping ? "sound-bar-animate" : ""}`} />
          <span className={`sound-bar sound-bar-3 ${isTyping ? "sound-bar-animate" : ""}`} />
          <span className={`sound-bar sound-bar-4 ${isTyping ? "sound-bar-animate" : ""}`} />
          <span className={`sound-bar sound-bar-5 ${isTyping ? "sound-bar-animate" : ""}`} />
        </div>
      </div>

      {/* Glassmorphic Text Input Box */}
      <div className="flex-1 relative group">
        <textarea
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Start typing right here to experience Kliky... Actuate your laptop keys and hear the dynamic clack!"
          className="w-full h-full min-h-[300px] lg:min-h-0 resize-none rounded-2xl glass-panel p-6 outline-none text-zinc-100 placeholder-zinc-600 font-mono text-base leading-relaxed tracking-wide transition duration-300 focus:border-brand/40 focus:ring-1 focus:ring-brand/30 selection:bg-brand/20"
        />

        {/* Small floating action indicators inside textarea */}
        <div className="absolute right-4 bottom-4 flex items-center space-x-2">
          {text.length > 0 && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 hover:text-white transition cursor-pointer"
            >
              Clear Sandbox
            </button>
          )}
        </div>
      </div>

      {/* Typing Metrics Deck */}
      <div className="grid grid-cols-3 gap-4 font-mono">
        <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Speed</span>
          <span className="text-2xl font-bold text-zinc-100 mt-1">
            {wpm} <span className="text-xs text-zinc-500 font-normal">WPM</span>
          </span>
        </div>
        
        <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Keys hit</span>
          <span className="text-2xl font-bold text-zinc-100 mt-1">
            {text.length} <span className="text-xs text-zinc-500 font-normal">strokes</span>
          </span>
        </div>

        <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Latency</span>
          <span className="text-2xl font-bold text-brand mt-1">
            &lt; 3<span className="text-xs font-normal">ms</span>
          </span>
        </div>
      </div>
    </div>
  );
}
