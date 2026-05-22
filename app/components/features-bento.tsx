"use client";

import React, { useState, useEffect } from "react";
import { playSwitchSound, SwitchType } from "./audio";

export function FeaturesBento() {
  // Card 1 state: Latency Tester
  const [latencyText, setLatencyText] = useState<string>("Click to test");
  const [isTestingLatency, setIsTestingLatency] = useState(false);
  const [latencyWaves, setLatencyWaves] = useState<number[]>(
    Array(24).fill(10)
  );

  // Card 2 state: OS Hotkeys Selector
  const [activeOS, setActiveOS] = useState<"mac" | "win">("mac");
  const [isKeysPressed, setIsKeysPressed] = useState(false);

  // Card 4 state: Smart Mic Dampening
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micAmplitude, setMicAmplitude] = useState<number[]>(
    Array(30).fill(2)
  );

  useEffect(() => {
    // Generate random waves only on the client
    setLatencyWaves(Array.from({ length: 24 }, () => Math.random() * 20 + 5));
  }, []);

  // Card 5 state: Switch Blueprint Type
  const [bluePrintSwitch, setBlueprintSwitch] = useState<SwitchType>("zenith");
  const [isSwitchPressed, setIsSwitchPressed] = useState(false);

  // Card 6 state: Productivity Tabs
  const [activeTab, setActiveTab] = useState<"code" | "meet" | "cafe">("code");

  // Update mic waveforms when voice simulation is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    if (isSpeaking) {
      interval = setInterval(() => {
        setMicAmplitude(Array.from({ length: 30 }, () => Math.random() * 28 + 6));
      }, 100);
    } else {
      // Async state update to prevent direct synchronous cascade in render phase
      timer = setTimeout(() => {
        setMicAmplitude(Array.from({ length: 30 }, () => Math.random() * 6 + 2));
      }, 0);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timer) clearTimeout(timer);
    };
  }, [isSpeaking]);


  // Test Latency trigger
  const triggerLatencyTest = () => {
    if (isTestingLatency) return;
    setIsTestingLatency(true);
    setLatencyText("Measuring...");
    
    // Play sound immediately
    playSwitchSound("zenith", 0.65, 1.1, "KeyA");

    setTimeout(() => {
      const generated = (1.5 + Math.random() * 1.8).toFixed(1);
      setLatencyText(`${generated} ms`);
      setIsTestingLatency(false);
    }, 450);
  };

  // Click Switch Blueprint trigger
  const triggerSwitchActuation = () => {
    setIsSwitchPressed(true);
    playSwitchSound(bluePrintSwitch, 0.7, 1.0, "Space");
    
    setTimeout(() => {
      setIsSwitchPressed(false);
    }, 150);
  };

  const switchDetails = {
    zenith: { name: "Zenith", desc: "Smooth Linear", color: "#a855f7" },
    obsidian: { name: "Obsidian", desc: "Crisp Tactile", color: "#2e3138" },
    sapphire: { name: "Sapphire", desc: "Sharp Clicky", color: "#00c8ff" },
    velvet: { name: "Velvet", desc: "Creamy Linear", color: "#e5a93b" },
    neon: { name: "Neon", desc: "Retro 8-bit", color: "#ab47bc" },
  };

  return (
    <section id="features" className="relative w-full mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-900/60 flex flex-col items-center">
      {/* Decorative ambient background radial light leaks (GPU accelerated) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-brand/3 blur-[140px] pointer-events-none" />

      {/* Header Container */}
      <div className="text-center max-w-2xl mx-auto mb-16 px-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
          Hardware & Software Synthesis
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-4 font-sans">
          Engineered for mechanical purists.
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed">
          Discover why Kliky feels native, responsive, and completely seamless on your desk.
        </p>
      </div>

      {/* Bento 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 md:px-6">
        
        {/* CARD 1: Ultra-Low Latency Sound Engine (Col-span 2) */}
        <div className="col-span-1 md:col-span-2 rounded-2xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 z-10">
            <div>
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Acoustic Pipeline</span>
              <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-1.5">Web Audio Synthesizer Node</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-md leading-relaxed">
                By bypassing standard browser latency bottlenecks, Kliky achieves close-to-metal rendering using specialized spatial audio graphs.
              </p>
            </div>
            
            {/* Interactive Latency Meter Gauge */}
            <div className="flex flex-col items-center justify-center bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800/80 rounded-2xl p-4 w-full md:w-44 shrink-0 text-center select-none shadow-md">
              <span className="text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Delay Transient</span>
              <span className={`text-2xl font-black font-sans mt-1.5 transition ${isTestingLatency ? "text-brand animate-pulse" : "text-zinc-900 dark:text-white"}`}>
                {latencyText}
              </span>
              <button
                onClick={triggerLatencyTest}
                disabled={isTestingLatency}
                className="mt-3 w-full py-1.5 px-3 bg-brand/10 hover:bg-brand text-brand hover:text-white font-mono font-bold text-[10px] rounded-lg border border-brand/20 hover:border-transparent transition-all active:scale-95 cursor-pointer"
              >
                {isTestingLatency ? "Testing..." : "Test Latency"}
              </button>
            </div>
          </div>

          {/* Simulated Audio Graph Node Diagram */}
          <div className="mt-8 pt-4 border-t border-zinc-200/60 dark:border-zinc-900/50 flex flex-wrap items-center gap-2 z-10 font-mono text-[9px] text-zinc-400 dark:text-zinc-500">
            <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/80 font-bold text-zinc-600 dark:text-zinc-300">KeyboardEvent</span>
            <span>➔</span>
            <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/80">StereoPannerNode</span>
            <span>➔</span>
            <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/80">DynamicGainNode</span>
            <span>➔</span>
            <span className="px-2 py-1 rounded bg-brand/10 dark:bg-brand/10 border border-brand/20 text-brand font-bold">AudioContext (Out)</span>
          </div>

          {/* Wave visualizer lines in background */}
          <div className="absolute right-4 bottom-0 flex items-end gap-1.5 h-16 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
            {latencyWaves.map((h, i) => (
              <span 
                key={i} 
                className="w-1.5 bg-brand rounded-t transition-all duration-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* CARD 2: Global OS Shortcuts (Col-span 1) */}
        <div 
          onMouseEnter={() => setIsKeysPressed(true)}
          onMouseLeave={() => setIsKeysPressed(false)}
          className="col-span-1 rounded-2xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">OS Integration</span>
              
              {/* OS Selector Tabs */}
              <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-900 p-0.5 border border-zinc-200/40 dark:border-zinc-800/80">
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveOS("mac"); }}
                  className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded cursor-pointer transition ${activeOS === "mac" ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                >
                  macOS
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveOS("win"); }}
                  className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded cursor-pointer transition ${activeOS === "win" ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                >
                  Windows
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-3">Universal Shortcuts</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Activate, mute, or adjust audio packs instantly across your system with built-in keyboards overlays.
            </p>
          </div>

          {/* Custom Interactive Keycap Layout */}
          <div className="mt-8 flex justify-center gap-3">
            {activeOS === "mac" ? (
              <>
                {/* Option cap */}
                <div className={`w-14 h-14 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/60 flex flex-col justify-between p-2 font-mono text-[9px] font-bold text-zinc-400 dark:text-zinc-500 shadow-md transition-all duration-200 ${isKeysPressed ? "translate-y-1 bg-brand/10 border-brand/30 shadow-inner text-brand" : ""}`}>
                  <span>option</span>
                  <span className="text-right text-xs">⌥</span>
                </div>
                {/* Command cap */}
                <div className={`w-14 h-14 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/60 flex flex-col justify-between p-2 font-mono text-[9px] font-bold text-zinc-400 dark:text-zinc-500 shadow-md transition-all duration-200 ${isKeysPressed ? "translate-y-1 bg-brand/10 border-brand/30 shadow-inner text-brand" : ""}`}>
                  <span>command</span>
                  <span className="text-right text-xs">⌘</span>
                </div>
              </>
            ) : (
              <>
                {/* Alt cap */}
                <div className={`w-14 h-14 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/60 flex flex-col justify-between p-2 font-mono text-[9px] font-bold text-zinc-400 dark:text-zinc-500 shadow-md transition-all duration-200 ${isKeysPressed ? "translate-y-1 bg-brand/10 border-brand/30 shadow-inner text-brand" : ""}`}>
                  <span>alt</span>
                  <span className="text-right text-xs">Alt</span>
                </div>
                {/* Windows cap */}
                <div className={`w-14 h-14 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/60 flex flex-col justify-between p-2 font-mono text-[9px] font-bold text-zinc-400 dark:text-zinc-500 shadow-md transition-all duration-200 ${isKeysPressed ? "translate-y-1 bg-brand/10 border-brand/30 shadow-inner text-brand" : ""}`}>
                  <span>windows</span>
                  <span className="text-right text-xs">⊞</span>
                </div>
              </>
            )}
            
            {/* K cap */}
            <div className={`w-14 h-14 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/60 flex flex-col justify-between p-2 font-mono text-[9px] font-bold text-zinc-400 dark:text-zinc-500 shadow-md transition-all duration-200 ${isKeysPressed ? "translate-y-1 bg-brand/10 border-brand/30 shadow-inner text-brand" : ""}`}>
              <span>mute</span>
              <span className="text-right text-sm">K</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Battery & CPU Shield (Col-span 1) */}
        <div className="col-span-1 rounded-2xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300">
          <div>
            <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">System Efficiency</span>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-1.5">Battery & Hardware Shield</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              No heavy web engines. Kliky runs in native desktop architecture, protecting laptop battery cells.
            </p>
          </div>

          {/* Tech Radial Meter Visual */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="relative w-20 h-20 flex items-center justify-center select-none shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-200 dark:text-zinc-800/60 stroke-current"
                  strokeWidth="3.2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand stroke-current transition-all duration-500"
                  strokeDasharray="92, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xs font-black text-zinc-800 dark:text-white font-mono">1.2%</span>
                <span className="text-[7px] text-zinc-400 uppercase tracking-wider font-mono">CPU Draw</span>
              </div>
            </div>
            
            <div className="space-y-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                <span>Memory &lt; 15MB RAM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93b]" />
                <span>Zero Latency Hooks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff]" />
                <span>Sandbox Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: Smart Microphone Auto-Dampening (Col-span 2) */}
        <div className="col-span-1 md:col-span-2 rounded-2xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 z-10">
            <div>
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Smart Filters</span>
              <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-1.5">Microphone Voice Auto-Dampener</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-md leading-relaxed">
                Perfect for virtual meetings. Kliky automatically measures background mic decibels and suppresses mechanical clacks when active speech is recognized.
              </p>
            </div>

            {/* Smart Microphone Dampening Tester */}
            <div className="flex flex-col items-center justify-center bg-zinc-100/50 dark:bg-zinc-900/60 border border-zinc-200/40 dark:border-zinc-800/80 rounded-2xl p-4 w-full md:w-44 shrink-0 text-center select-none shadow-md">
              <div className="flex items-center gap-1.5">
                {/* pulsing red dot */}
                <span className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-red-500 animate-ping" : "bg-zinc-400"}`} />
                <span className="text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Voice Broadcast</span>
              </div>
              <span className={`text-xs font-bold font-sans mt-2 block transition ${isSpeaking ? "text-brand" : "text-zinc-500 dark:text-zinc-400"}`}>
                {isSpeaking ? "SPEECH DETECTED" : "SILENT CALM"}
              </span>
              <button
                onClick={() => setIsSpeaking(!isSpeaking)}
                className="mt-3.5 w-full py-1.5 px-3 bg-brand/10 hover:bg-brand text-brand hover:text-white font-mono font-bold text-[10px] rounded-lg border border-brand/20 hover:border-transparent transition-all active:scale-95 cursor-pointer"
              >
                {isSpeaking ? "Mute Microphone" : "Simulate Speech"}
              </button>
            </div>
          </div>

          {/* Interactive Live Amplitude Waveform */}
          <div className="mt-8 flex items-center justify-between h-8 relative bg-zinc-100/20 dark:bg-zinc-900/10 border border-zinc-200/20 dark:border-zinc-800/20 rounded-xl p-3 select-none overflow-hidden">
            <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 absolute left-2 top-1 font-bold">MIC AUDIO</span>
            
            <div className="flex items-end gap-1 w-full justify-center h-full pt-2">
              {micAmplitude.map((amp, i) => (
                <span 
                  key={i}
                  className={`w-1 rounded-t transition-all duration-300 ${isSpeaking ? "bg-brand" : "bg-zinc-300 dark:bg-zinc-800"}`}
                  style={{ height: `${amp}px` }}
                />
              ))}
            </div>
            
            <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 absolute right-2 top-1 font-bold">
              {isSpeaking ? "MUTING CLICKS (65%)" : "FULL ACOUSTICS (100%)"}
            </span>
          </div>
        </div>

        {/* CARD 5: Switch Cross-Section Blueprint (Col-span 1) */}
        <div 
          onClick={triggerSwitchActuation}
          className="col-span-1 rounded-2xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300 cursor-pointer select-none"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Anatomy Blueprint</span>
              
              {/* stem type switcher */}
              <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-900 p-0.5 border border-zinc-200/40 dark:border-zinc-800/80">
                <button
                  onClick={(e) => { e.stopPropagation(); setBlueprintSwitch("zenith"); }}
                  className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded cursor-pointer transition ${bluePrintSwitch === "zenith" ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                >
                  Zenith
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setBlueprintSwitch("obsidian"); }}
                  className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded cursor-pointer transition ${bluePrintSwitch === "obsidian" ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                >
                  Obsidian
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setBlueprintSwitch("sapphire"); }}
                  className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded cursor-pointer transition ${bluePrintSwitch === "sapphire" ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                >
                  Sapphire
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-3">Switch Blueprint</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Click switch stem to compress spring and actuate acoustic playback instantly.
            </p>
          </div>

          {/* Interactive Mechanical Switch SVG Blueprint */}
          <div className="mt-6 flex justify-center">
            <svg 
              className={`w-32 h-32 transition-transform duration-100 ${isSwitchPressed ? "scale-y-90 origin-bottom" : ""}`} 
              viewBox="0 0 100 100" 
              fill="none"
            >
              {/* Upper housing outline */}
              <path d="M15 45L30 20H70L85 45V90H15V45Z" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="2" strokeLinejoin="round" />
              
              {/* Switch Stem with dynamic theme color */}
              <rect 
                x="40" 
                y={isSwitchPressed ? "22" : "12"} 
                width="20" 
                height="30" 
                rx="3" 
                fill={switchDetails[bluePrintSwitch].color} 
                className="transition-all duration-100 shadow border border-black/10" 
              />
              <rect 
                x="32" 
                y={isSwitchPressed ? "32" : "22"} 
                width="36" 
                height="12" 
                rx="2" 
                fill={switchDetails[bluePrintSwitch].color} 
                className="transition-all duration-100 shadow border border-black/10" 
              />
              
              {/* Compression Spring inside housing */}
              <path 
                d={isSwitchPressed 
                  ? "M50 44 C45 44 45 48 50 48 C55 48 55 52 50 52 C45 52 45 56 50 56 C55 56 55 60 50 60 C45 60 45 64 50 64 C55 64 55 68 50 68 C45 68 45 72 50 72 L50 82" 
                  : "M50 34 C45 34 45 40 50 40 C55 40 55 46 50 46 C45 46 45 52 50 52 C55 52 55 58 50 58 C45 58 45 64 50 64 C55 64 55 70 50 70 C45 70 45 76 50 76 L50 82"
                } 
                className="stroke-zinc-400 dark:stroke-zinc-700 transition-all duration-100" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Lower contacts outline */}
              <circle cx="50" cy="85" r="3" className="fill-brand" />
              <path d="M22 85H78" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* CARD 6: Built for Everyday Productivity (Col-span 2) */}
        <div className="col-span-1 md:col-span-2 rounded-2xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Scenarios & Flow</span>
              
              {/* Scenario Tab Buttons */}
              <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-900 p-0.5 border border-zinc-200/40 dark:border-zinc-800/80">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-2.5 py-1 text-[9px] font-mono font-bold rounded cursor-pointer transition ${activeTab === "code" ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                >
                  Developer Flow
                </button>
                <button
                  onClick={() => setActiveTab("meet")}
                  className={`px-2.5 py-1 text-[9px] font-mono font-bold rounded cursor-pointer transition ${activeTab === "meet" ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                >
                  Virtual Meetings
                </button>
                <button
                  onClick={() => setActiveTab("cafe")}
                  className={`px-2.5 py-1 text-[9px] font-mono font-bold rounded cursor-pointer transition ${activeTab === "cafe" ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                >
                  Quiet Spaces
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-3">Created for Daily Routines</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Kliky integrates gracefully into standard work processes, matching whatever environment you step into.
            </p>
          </div>

          {/* Interactive tab content deck */}
          <div className="mt-6 min-h-[100px] flex items-center justify-center rounded-xl bg-zinc-100/30 dark:bg-zinc-900/20 border border-zinc-200/30 dark:border-zinc-800/30 p-4 relative overflow-hidden transition-all duration-300">
            {activeTab === "code" && (
              <div className="w-full flex items-start gap-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-brand mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-white font-mono">The Flow State Generator</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-normal font-sans">
                    Accelerate your programming cadence. The crisp Zenith sound profile triggers high focus intervals, allowing keyboard strokes to reinforce concentration like coding on high-end hardware.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "meet" && (
              <div className="w-full flex items-start gap-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-white font-mono">Clean Virtual Meetings</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-normal font-sans">
                    Never worry about annoying colleagues during calls. Enable auto-dampening mode or hotkey-mute in a click, allowing you to quietly take notes in Zoom or Slack while keeping sounds local.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "cafe" && (
              <div className="w-full flex items-start gap-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e5a93b] mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-white font-mono">Quiet Shared Workstations</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-normal font-sans">
                    Perfect for coffee houses, lobbies, or student study rooms. Swap to Velvet’s buttery profile and scale down volume sliders to keep acoustic details faint, satisfying, and completely private.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CARD 7: Native Typing Sandbox (Col-span 3) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl glass-panel p-6 md:p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300">
          <div className="z-10 md:w-1/2 md:pr-8">
            <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
              Practice & Track
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white font-sans mt-3">Native Typing Sandbox</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
              Test your mechanical switches in real-time with our built-in typing playground. Features WPM tracking, accuracy metrics, and a beautiful collection of nature quotes right from your system tray.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs font-mono font-bold">
              <span className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/80 text-brand">Live WPM Tracking</span>
              <span className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-300">Curated Quotes</span>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0 z-10 w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-sm rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/60 p-5 shadow-lg relative overflow-hidden">
              {/* Animated Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand" />
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Speed</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Accuracy</span>
              </div>
              <div className="flex justify-between items-end mb-6">
                <span className="text-3xl font-black text-brand font-sans leading-none">124<span className="text-sm font-normal text-zinc-500 ml-1">WPM</span></span>
                <span className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 leading-none">98%</span>
              </div>
              <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed whitespace-pre-wrap">
                <span className="text-zinc-800 dark:text-zinc-200">between every two</span><span className="relative inline-block"><span className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand animate-pulse shadow-[0_0_8px_var(--color-brand)]" /></span> pines is a doorway to a new world
              </div>
            </div>
          </div>

          {/* Ambient background glow for card 7 */}
          <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-brand/5 blur-[100px] pointer-events-none group-hover:bg-brand/10 transition-all duration-500" />
        </div>

      </div>
    </section>
  );
}
