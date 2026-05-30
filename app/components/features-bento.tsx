"use client";

import React, { useState, useEffect, useRef } from "react";
import { playSwitchSound, SwitchType } from "./audio";

export function FeaturesBento() {
  // --- CARD 1: Latency Tester State ---
  const [latencyText, setLatencyText] = useState<string>("Click to test");
  const [isTestingLatency, setIsTestingLatency] = useState(false);
  const [latencyWaves, setLatencyWaves] = useState<number[]>([]);

  // --- CARD 2: Hyper Key State ---
  const [hyperKeyToggled, setHyperKeyToggled] = useState(false);

  // --- CARD 3: SQLite Analytics State ---
  const [keystrokeCount, setKeystrokeCount] = useState(24874);
  const [analyticsWaves, setAnalyticsWaves] = useState<number[]>([]);

  // --- CARD 4: Menubar Magic State ---
  const [lastKeyPressed, setLastKeyPressed] = useState("K");
  const [menubarOpen, setMenubarOpen] = useState(false);

  // --- CARD 5: Switch Blueprint State ---
  const [bluePrintSwitch, setBlueprintSwitch] = useState<SwitchType>("zenith");
  const [isSwitchPressed, setIsSwitchPressed] = useState(false);

  // --- CARD 6: 3D Acoustic Panning State ---
  const [activePanKey, setActivePanKey] = useState<string | null>(null);
  const [activePanVal, setActivePanVal] = useState<number>(0.0);

  // --- CARD 7: Scenario Planner State ---
  const [activeTab, setActiveTab] = useState<"code" | "meet" | "cafe">("code");

  useEffect(() => {
    // Generate initial client-side random metrics for graphs
    setLatencyWaves(Array.from({ length: 24 }, () => Math.random() * 20 + 5));
    setAnalyticsWaves(Array.from({ length: 8 }, () => Math.floor(Math.random() * 40) + 20));
  }, []);

  // Keyboard listener to update Menubar Magic status mock as the user types anywhere inside the bento section
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Avoid tracking if input or textarea is active
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        return;
      }
      
      const keyDisplay = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      setLastKeyPressed(keyDisplay.substring(0, 10));
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // --- CARD 1: Latency Trigger ---
  const triggerLatencyTest = () => {
    if (isTestingLatency) return;
    setIsTestingLatency(true);
    setLatencyText("Measuring...");
    playSwitchSound("zenith", 0.65, 1.1, "KeyA");

    setTimeout(() => {
      const generated = (1.2 + Math.random() * 1.5).toFixed(1);
      setLatencyText(`${generated} ms`);
      setIsTestingLatency(false);
      setLatencyWaves(Array.from({ length: 24 }, () => Math.random() * 30 + 10));
    }, 450);
  };

  // --- CARD 3: SQLite Analytics Incrementer ---
  const incrementSQLiteAnalytics = () => {
    setKeystrokeCount((prev) => prev + 1);
    playSwitchSound("obsidian", 0.6, 0.95, "Space");
    
    // Animate a random spike in daily chart
    setAnalyticsWaves((prev) => {
      const updated = [...prev];
      const randIdx = Math.floor(Math.random() * updated.length);
      updated[randIdx] = Math.min(80, updated[randIdx] + 8);
      return updated;
    });
  };

  // --- CARD 5: Switch Stem Clicker ---
  const triggerSwitchActuation = () => {
    setIsSwitchPressed(true);
    playSwitchSound(bluePrintSwitch, 0.75, 1.0, "Space");

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

  // --- CARD 6: 3D Acoustic Panning Trigger ---
  const triggerPanKey = (letter: string, code: string, panVal: number) => {
    setActivePanKey(letter);
    setActivePanVal(panVal);
    playSwitchSound(bluePrintSwitch, 0.75, 1.0, code);
    
    setTimeout(() => {
      setActivePanKey(null);
    }, 150);
  };

  return (
    <section id="features" className="relative w-full mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-900/60 flex flex-col items-center">
      
      {/* Dynamic Background Light Leaks */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-brand/3 blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 px-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
          Hardware &amp; Software Synthesis
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-4 font-sans">
          Engineered for mechanical purists.
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed">
          Discover why Kliky feels native, responsive, and completely seamless on your desk.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 md:px-6">

        {/* CARD 1: Low Latency Web Audio Synthesizer (Col-span 2) */}
        <div className="col-span-1 md:col-span-2 rounded-3xl glass-panel p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 z-10">
            <div>
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Acoustic Pipeline</span>
              <h3 className="text-lg md:text-xl font-bold text-zinc-800 dark:text-white font-sans mt-1.5">Web Audio Synthesizer Node</h3>
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

          {/* Audio Graph Node Diagram */}
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

        {/* CARD 2: Caps Lock to Hyper Key (Col-span 1) */}
        <div
          onClick={() => {
            setHyperKeyToggled(!hyperKeyToggled);
            playSwitchSound("sapphire", 0.75, hyperKeyToggled ? 0.9 : 1.1, "Space");
          }}
          className="col-span-1 rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300 cursor-pointer select-none"
        >
          <div>
            <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Hyper Key Mapper</span>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-3">Caps Lock Converter</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Convert your underused Caps Lock key into a massive global modifier combinator <span className="font-mono text-brand font-bold">(⌘+⌥+⌃+⇧)</span> to trigger custom hotkeys instantly.
            </p>
          </div>

          {/* Caps Lock Mechanical Keycap widget */}
          <div className="mt-8 flex flex-col items-center">
            <div className={`w-28 h-18 rounded-2xl border-2 flex flex-col justify-between p-3.5 transition-all duration-300 shadow-md ${
              hyperKeyToggled 
                ? "bg-brand/10 border-brand text-brand shadow-lg shadow-brand/10 translate-y-1" 
                : "bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500"
            }`}>
              <div className="flex justify-between items-start font-mono text-[9px] font-bold uppercase tracking-wider">
                <span>Caps Lock</span>
                <span className={`w-1.5 h-1.5 rounded-full ${hyperKeyToggled ? "bg-brand animate-pulse" : "bg-zinc-300 dark:bg-zinc-800"}`} />
              </div>
              <span className="font-mono font-bold text-xs">
                {hyperKeyToggled ? "HYPER (⌘⌥⌃⇧)" : "Standard Caps"}
              </span>
            </div>
            <p className="text-[9px] text-zinc-400 font-mono mt-3.5">
              Click the keycap above to toggle hyper mapping
            </p>
          </div>
        </div>

        {/* CARD 3: Private SQLite Analytics (Col-span 1) */}
        <div
          onClick={incrementSQLiteAnalytics}
          className="col-span-1 rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300 cursor-pointer select-none"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Keystroke Ledger</span>
              <span className="text-[10px] font-bold font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">SQLite DB</span>
            </div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-3">Offline Analytics Journal</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Kliky batches keystrokes locally and writes daily journals offline. 100% private with zero telemetry.
            </p>
          </div>

          {/* Interactive micro metric chart */}
          <div className="mt-6 flex flex-col items-center">
            <div className="w-full flex items-end justify-between gap-1.5 h-16 px-4 bg-zinc-100/30 dark:bg-zinc-900/10 border border-zinc-200/30 dark:border-zinc-800/30 rounded-xl p-2.5">
              {analyticsWaves.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div 
                    className="w-full bg-zinc-400/30 dark:bg-zinc-800 rounded-t transition-all duration-300 group-hover:bg-brand"
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between w-full font-mono text-[10px] text-zinc-400">
              <span>Keystrokes: <strong className="text-zinc-700 dark:text-zinc-200">{keystrokeCount.toLocaleString()}</strong></span>
              <span className="text-brand">Click to track →</span>
            </div>
          </div>
        </div>

        {/* CARD 4: Menubar Magic status (Col-span 1) */}
        <div
          onClick={() => {
            setMenubarOpen(!menubarOpen);
            playSwitchSound("zenith", 0.6, 1.0, "KeyM");
          }}
          className="col-span-1 rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300 cursor-pointer select-none"
        >
          <div>
            <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Menubar &amp; Tray</span>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-3">Menubar Magic</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Stay in the flow. Kliky displays the active key you pressed directly in your macOS status bar or Windows tray.
            </p>
          </div>

          {/* Interactive macOS status bar */}
          <div className="mt-8 w-full flex flex-col items-center">
            <div className="w-full max-w-[200px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 flex items-center justify-between font-mono text-[9px] text-zinc-500 shadow-sm relative">
              <span className="font-bold text-zinc-800 dark:text-zinc-200"> Kliky</span>
              <div className="flex gap-2 items-center text-zinc-700 dark:text-zinc-300">
                <span>🔊</span>
                <span className="px-1 bg-brand/10 border border-brand/20 text-brand rounded text-[8px] font-bold animate-bounce">
                  Key: {lastKeyPressed}
                </span>
              </div>
              
              {/* Floating dropdown mock */}
              {menubarOpen && (
                <div className="absolute top-10 left-0 right-0 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-xl z-20 animate-in fade-in slide-in-from-top-1">
                  <div className="p-1 border-b border-zinc-100 dark:border-zinc-900 flex justify-between font-bold text-[8px]">
                    <span>Enable Kliky</span>
                    <span className="text-emerald-500">On</span>
                  </div>
                  <div className="p-1 pt-2 font-bold text-[8px] text-zinc-400">
                    Switch: Zenith (Linear)
                  </div>
                </div>
              )}
            </div>
            <p className="text-[9px] text-zinc-400 font-mono mt-3.5">
              Type anywhere on this page to see Menubar update!
            </p>
          </div>
        </div>

        {/* CARD 5: Switch Cross-Section Blueprint (Col-span 1) */}
        <div
          onClick={triggerSwitchActuation}
          className="col-span-1 rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300 cursor-pointer select-none"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Anatomy Blueprint</span>

              {/* Stem selector */}
              <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-900 p-0.5 border border-zinc-200/40 dark:border-zinc-800/80">
                {(["zenith", "obsidian", "sapphire"] as const).map((sw) => (
                  <button
                    key={sw}
                    onClick={(e) => { e.stopPropagation(); setBlueprintSwitch(sw); }}
                    className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded cursor-pointer transition ${bluePrintSwitch === sw ? "bg-white dark:bg-zinc-800 text-brand shadow" : "text-zinc-400"}`}
                  >
                    {sw.charAt(0).toUpperCase() + sw.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-3">Switch Blueprint</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Click switch stem to compress spring and actuate acoustic playback instantly.
            </p>
          </div>

          {/* switch SVG blueprint */}
          <div className="mt-6 flex justify-center">
            <svg
              className={`w-32 h-32 transition-transform duration-100 ${isSwitchPressed ? "scale-y-90 origin-bottom" : ""}`}
              viewBox="0 0 100 100"
              fill="none"
            >
              <path d="M15 45L30 20H70L85 45V90H15V45Z" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="2" strokeLinejoin="round" />
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
              <circle cx="50" cy="85" r="3" className="fill-brand" />
              <path d="M22 85H78" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* CARD 6: Spatial 3D Audio (Col-span 1) */}
        <div
          className="col-span-1 rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300 select-none"
        >
          <div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Spatializer</span>
              <span className="text-[9px] font-bold font-mono text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Stereo Panning
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-3">Spatial 3D Audio</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Kliky dynamically pans switch acoustics across the stereo soundstage. Keys on the left sound left, keys on the right sound right.
            </p>
          </div>

          {/* Interactive panning keyboard row widget */}
          <div className="mt-5 p-4 rounded-xl bg-zinc-100/30 dark:bg-zinc-900/10 border border-zinc-200/30 dark:border-zinc-800/30 flex flex-col items-center justify-center space-y-3">
            {/* Row 1: Alphas (Left-to-Right Panning) */}
            <div className="flex gap-1.5 flex-wrap justify-center w-full">
              {([
                { char: "Q", code: "KeyQ", pan: -0.8 },
                { char: "E", code: "KeyE", pan: -0.6 },
                { char: "T", code: "KeyT", pan: -0.4 },
                { char: "U", code: "KeyU", pan: -0.2 },
                { char: "O", code: "KeyO", pan: 0.0 },
                { char: "P", code: "KeyP", pan: 0.1 },
              ] as const).map((k) => (
                <button
                  key={k.char}
                  onClick={() => triggerPanKey(k.char, k.code, k.pan)}
                  className={`w-9 h-9 rounded-lg border font-mono text-xs font-bold transition flex items-center justify-center cursor-pointer active:translate-y-0.5 shadow-sm ${
                    activePanKey === k.char
                      ? "bg-brand border-brand text-white shadow-md shadow-brand/10 scale-95"
                      : "bg-background border-border text-foreground hover:border-brand/40"
                  }`}
                >
                  {k.char}
                </button>
              ))}
            </div>

            {/* Row 2: Distinct Function Keys (Unique switch profiles!) */}
            <div className="flex gap-1.5 w-full justify-center">
              {([
                { char: "⌫ Backspace", code: "Backspace", pan: 0.5, style: "flex-1 text-[10px]" },
                { char: "␣ Space", code: "Space", pan: 0.0, style: "flex-2 text-[10px]" },
                { char: "↵ Enter", code: "Enter", pan: 0.6, style: "flex-1 text-[10px]" },
              ] as const).map((k) => (
                <button
                  key={k.char}
                  onClick={() => triggerPanKey(k.char, k.code, k.pan)}
                  className={`h-9 rounded-lg border font-sans font-bold transition flex items-center justify-center cursor-pointer active:translate-y-0.5 shadow-sm px-2 ${k.style} ${
                    activePanKey === k.char
                      ? "bg-brand border-brand text-white shadow-md shadow-brand/10 scale-95"
                      : "bg-background border-border text-foreground hover:border-brand/40"
                  }`}
                >
                  {k.char}
                </button>
              ))}
            </div>

            <div className="flex justify-between w-full font-mono text-[9px] text-zinc-400 pt-1">
              <span>Pan Level: <strong className="text-zinc-700 dark:text-zinc-200">{activePanKey ? `${activePanVal.toFixed(2)}` : "0.00"}</strong></span>
              <span className="text-brand">Click to test →</span>
            </div>
          </div>
        </div>

        {/* CARD 7: Daily Productivity Flow (Col-span 2) */}
        <div className="col-span-1 rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300 cursor-pointer select-none">
          <div>
            <div className="flex flex-col items-center justify-between gap-2">
              <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">Scenarios &amp; Flow</span>

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
              <div className="w-full flex items-start gap-4 animate-in fade-in slide-in-from-right-3 duration-300 font-sans">
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
              <div className="w-full flex items-start gap-4 animate-in fade-in slide-in-from-right-3 duration-300 font-sans">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00c8ff] mt-1.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-white font-mono">Clean Virtual Meetings</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-normal font-sans">
                    Never worry about annoying colleagues during calls. Enable hotkey-mute in a click, allowing you to quietly take notes in Zoom or Slack while keeping sounds local.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "cafe" && (
              <div className="w-full flex items-start gap-4 animate-in fade-in slide-in-from-right-3 duration-300 font-sans">
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

        {/* CARD 8: Battery & CPU efficiency (Col-span 1) */}
        <div className="col-span-1 rounded-3xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300">
          <div>
            <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">System Efficiency</span>
            <h3 className="text-lg font-bold text-zinc-800 dark:text-white font-sans mt-1.5">Battery &amp; Hardware Shield</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              No heavy web engines. Kliky runs in native desktop architecture, protecting laptop battery cells.
            </p>
          </div>

          {/* Tech Radial Meter Visual */}
          <div className="mt-6 flex items-center justify-center gap-6 select-none">
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

        {/* CARD 7: Native Typing Sandbox (Col-span 3) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl glass-panel p-6 md:p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group border border-zinc-200/50 dark:border-zinc-800/40 hover:border-brand/30 dark:hover:border-brand/20 transition-all duration-300">
          <div className="z-10 md:w-1/2 md:pr-8">
            <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
              Practice &amp; Track
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white font-sans mt-3">Native Typing Sandbox</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed font-sans">
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
              <div className="flex justify-between items-center mb-4 font-sans">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Speed</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Accuracy</span>
              </div>
              <div className="flex justify-between items-end mb-6 font-sans">
                <span className="text-3xl font-black text-brand font-sans leading-none">124<span className="text-sm font-normal text-zinc-500 ml-1">WPM</span></span>
                <span className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 leading-none">98%</span>
              </div>
              <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed whitespace-pre-wrap">
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold">between every two</span><span className="relative inline-block"><span className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand animate-pulse shadow-[0_0_8px_var(--color-brand)]" /></span> pines is a doorway to a new world
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
