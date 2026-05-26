"use client";

import React, { useState, useEffect } from "react";
import { playSwitchSound, SwitchType } from "./audio";

interface Step {
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
}

const ONBOARDING_STEPS: Step[] = [
  {
    title: "1. Welcome to Kliky",
    tagline: "The Symphony of Your Keystrokes",
    description: "Experience typing in a whole new dimension. Kliky runs quietly in your system tray, listening to global physical keystrokes and translating them into satisfying mechanical keyboard acoustics.",
    bulletPoints: [
      "Low latency (<3ms response time)",
      "Protects battery life (native Rust hooks)",
      "Zero background logging or data capture"
    ]
  },
  {
    title: "2. Secure OS Permissions",
    tagline: "100% Local Global Hooking",
    description: "To play satisfying sounds when typing outside the app, Kliky requests native system permissions. On macOS, this registers a secure CGEventTap inside Accessibility & Input Monitoring. On Windows, it binds a low-level thread keyboard hook.",
    bulletPoints: [
      "No keystrokes are recorded or sent to the cloud",
      "Secured inside the sandbox with local permissions",
      "Fully auditable, open-source codebase"
    ]
  },
  {
    title: "3. Hyper Key & Shortcuts",
    tagline: "Supercharge Your Home Row",
    description: "Turn your Caps Lock key into a high-productivity Hyper Key combinator (Cmd+Option+Ctrl+Shift). Tap it to mute Kliky globally, adjust volume presets, or run background macros instantly without moving your hands.",
    bulletPoints: [
      "Caps Lock to Hyper Key mapping in a click",
      "Universal shortcut recorder in settings",
      "Conflict-free global keyboard actions"
    ]
  },
  {
    title: "4. Acoustic Switch Selection",
    tagline: "Find Your Signature Sound",
    description: "Choose from 5 beautiful, premium built-in sound packs, or drag-and-drop your own WAV sound files. Tweak global volume and pitch variables to micro-tune the mechanics to your liking.",
    bulletPoints: [
      "Zenith (Smooth Linear) & Velvet (Creamy Linear)",
      "Obsidian (Crisp Tactile) & Sapphire (Sharp Clicky)",
      "Neon (Retro 8-bit chiptune synthesis)"
    ]
  },
  {
    title: "5. Auto-Launch & Autostart",
    tagline: "Stay in the Flow Automatically",
    description: "Configure Kliky to launch automatically on OS startup. On macOS, it registers as a lightweight Accessory Login Item, and on Windows as a startup task. It sleeps in the system tray until your first click.",
    bulletPoints: [
      "Zero resource footprint when inactive (<15MB RAM)",
      "Runs hidden without distracting docks or taskbars",
      "Autostarts silently in the background"
    ]
  },
  {
    title: "6. Lifetime Polar.sh Licensing",
    tagline: "Unlock the Full Mechanical Suite",
    description: "Start with a risk-free 7-day trial. Easily validate your lifetime license key powered by Polar.sh. A single validation key unlocks all official sound packs and priority support permanently.",
    bulletPoints: [
      "100% private validation API",
      "Saves license state securely in a local store",
      "Simple, transparent one-time activation"
    ]
  },
  {
    title: "7. Tray Magic Initiated",
    tagline: "You Are Ready to Roll",
    description: "onboarding is complete! Kliky will now retract into your macOS menubar or Windows notification area. Simply type anywhere to hear the rhythmic mechanics of mechanical keyboard switches.",
    bulletPoints: [
      "Show active key pressed directly in the menubar",
      "Quick right-click settings toggle",
      "Check updates instantly in the tray"
    ]
  }
];

export function OnboardingCarousel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Custom mock states for interactive slides
  const [isMuted, setIsMuted] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [hyperKeyActive, setHyperKeyActive] = useState(true);
  const [activeSoundPack, setActiveSoundPack] = useState<SwitchType>("zenith");
  const [isAutostart, setIsAutostart] = useState(true);
  const [licenseKey, setLicenseKey] = useState("");
  const [licenseValidated, setLicenseValidated] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState("K");

  const changeStep = (index: number) => {
    if (isAnimating || index < 0 || index >= ONBOARDING_STEPS.length) return;
    setIsAnimating(true);
    playSwitchSound("zenith", 0.5, 1.0 + (index * 0.05), "Space");
    setCurrentStep(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleKeyPress = (key: string) => {
    setLastKeyPressed(key);
    playSwitchSound(activeSoundPack, 0.6, 1.0, `Key${key}`);
  };

  return (
    <section id="onboarding" className="relative w-full mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-900/60 flex flex-col items-center">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 px-4 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
          Desktop Walkthrough
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-4 font-sans">
          The 7-Step Setup Guide
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed">
          Walk through the actual native onboarding experience designed to make mechanical acoustics second nature to your setup.
        </p>
      </div>

      {/* Slide Container Card */}
      <div className="relative z-10 w-full max-w-5xl px-4 md:px-6">
        <div className="rounded-3xl glass-panel border border-zinc-200/50 dark:border-zinc-800/40 bg-white/20 dark:bg-zinc-950/20 shadow-xl overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[500px]">
          
          {/* LEFT PANEL: Interactive Screen Mockup */}
          <div className="lg:w-1/2 bg-zinc-50/60 dark:bg-zinc-900/30 border-b lg:border-b-0 lg:border-r border-zinc-200/50 dark:border-zinc-800/40 p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden select-none">
            
            {/* Subtle background coordinate grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* SCREEN 1: Welcome Screen Mock */}
            {currentStep === 0 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-6">
                  <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 0L21 21M19.5 6l-15 10.5m15-10.5L3 21" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white font-sans">kliky.</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-sans max-w-[280px]">
                  Change the way you type with satisfying keyboard sounds at every press, tap, and click.
                </p>
                <button 
                  onClick={() => changeStep(1)} 
                  className="mt-6 px-5 py-2 rounded-xl bg-brand text-white text-xs font-bold tracking-wide shadow-md hover:shadow-brand/20 active:scale-98 transition cursor-pointer"
                >
                  Start Setup Guide
                </button>
              </div>
            )}

            {/* SCREEN 2: Secure OS Permissions Mock */}
            {currentStep === 1 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-4">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">System Authorizations</span>
                  <span className={`w-2 h-2 rounded-full ${hasPermission ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-sans">Input Monitoring Access</h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed font-sans">
                  On macOS, Kliky uses standard event taps. Access must be toggled on inside System Settings &gt; Privacy &amp; Security &gt; Input Monitoring.
                </p>
                
                {/* Visual Settings Switch Toggle */}
                <div className="mt-5 flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/60 font-sans text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-600 dark:text-zinc-300">⌥</div>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">Kliky Desktop</span>
                  </div>
                  <button 
                    onClick={() => {
                      setHasPermission(!hasPermission);
                      playSwitchSound("zenith", 0.6, 1.0, "KeyP");
                    }}
                    className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${hasPermission ? "bg-emerald-500 justify-end" : "bg-zinc-300 dark:bg-zinc-800 justify-start"}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
                
                <p className="text-[10px] text-zinc-400 font-mono mt-4 text-center">
                  {hasPermission ? "✨ Permission granted. Let's type!" : "Click toggle above to simulate permission grant"}
                </p>
              </div>
            )}

            {/* SCREEN 3: Hyper Key & Shortcuts Mock */}
            {currentStep === 2 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-4 font-mono text-[10px] text-zinc-400">
                  <span>Shortcut Recorder</span>
                  <span>Hyper Key</span>
                </div>
                
                {/* Hyper Key toggle row */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 mb-4">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-sans">Enable Caps Lock Hyper Key</span>
                  <button 
                    onClick={() => {
                      setHyperKeyActive(!hyperKeyActive);
                      playSwitchSound("zenith", 0.6, 1.1, "Space");
                    }}
                    className={`w-8 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${hyperKeyActive ? "bg-brand justify-end" : "bg-zinc-300 dark:bg-zinc-800 justify-start"}`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                  </button>
                </div>

                {/* Simulated Shortcut Binding fields */}
                <div className="space-y-3 font-mono text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Mute Engine:</span>
                    <button 
                      onClick={() => {
                        setIsMuted(!isMuted);
                        playSwitchSound("sapphire", 0.7, 1.2, "KeyK");
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 hover:border-brand/40 dark:border-zinc-800 dark:hover:border-brand/35 text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                      <span>{hyperKeyActive ? "Hyper +" : ""} K</span>
                      <span className="text-[9px] font-normal text-zinc-400">({isMuted ? "Muted" : "Active"})</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Settings Pane:</span>
                    <span className="px-2.5 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/30 text-zinc-400">
                      {hyperKeyActive ? "Hyper +" : "⌘⌥"} S
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 4: Acoustic Switch Selection Mock */}
            {currentStep === 3 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-3">Sound Profiles</span>
                
                {/* 5 sound profile rows picker */}
                <div className="grid grid-cols-1 gap-2.5 font-sans">
                  {([
                    { id: "zenith", name: "Zenith", desc: "Smooth Linear", color: "bg-blue-500" },
                    { id: "velvet", name: "Velvet", desc: "Creamy Linear (Lubed)", color: "bg-red-500" },
                    { id: "neon", name: "Neon", desc: "Retro 8-bit Synthesizer", color: "bg-pink-500" },
                    { id: "obsidian", name: "Obsidian", desc: "Crisp Tactile Thock", color: "bg-zinc-700" },
                    { id: "sapphire", name: "Sapphire", desc: "Sharp Mechanical Click", color: "bg-cyan-500" }
                  ] as const).map((pack) => (
                    <button
                      key={pack.id}
                      onClick={() => {
                        setActiveSoundPack(pack.id);
                        playSwitchSound(pack.id, 0.75, 1.0, "Space");
                      }}
                      className={`flex items-center justify-between p-1.5 rounded-xl border transition cursor-pointer select-none ${activeSoundPack === pack.id
                        ? "bg-brand/10 border-brand/40 dark:bg-white/10 dark:border-white/20"
                        : "bg-zinc-50 dark:bg-zinc-900 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7.5 h-7.5 rounded-lg ${pack.color} flex items-center justify-center text-white text-xs`}>
                          🔊
                        </div>
                        <div className="text-left leading-tight">
                          <p className="font-bold text-xs text-zinc-800 dark:text-white">{pack.name}</p>
                          <p className="text-[9px] text-zinc-400 font-mono">{pack.desc}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono pr-2">
                        {activeSoundPack === pack.id ? "Playing" : "Preview"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SCREEN 5: Auto-Launch & Autostart Mock */}
            {currentStep === 4 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-5 font-mono text-[10px] text-zinc-400">
                  <span>Lifecycle Manager</span>
                  <span>Daemon Startup</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/60 font-sans text-xs mb-6">
                  <div className="space-y-0.5">
                    <p className="font-bold text-zinc-800 dark:text-zinc-100">Launch at Startup</p>
                    <p className="text-[10px] text-zinc-400 leading-none">Silently starts when logging in</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAutostart(!isAutostart);
                      playSwitchSound("zenith", 0.6, 1.0, "KeyA");
                    }}
                    className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${isAutostart ? "bg-brand justify-end" : "bg-zinc-300 dark:bg-zinc-800 justify-start"}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </button>
                </div>

                <div className="text-center font-mono text-[10px] text-zinc-400">
                  {isAutostart ? "✅ Autostart enabled (Accessory Daemon)" : "⚠️ Setup manual launch via Menubar"}
                </div>
              </div>
            )}

            {/* SCREEN 6: Lifetime Licensing Mock */}
            {currentStep === 5 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900 mb-4 font-mono text-[10px] text-zinc-400">
                  <span>License Portal</span>
                  <span>Polar.sh secure</span>
                </div>
                
                <h4 className="text-xs font-bold text-zinc-800 dark:text-white font-sans">Activate License Key</h4>
                <p className="text-[10px] text-zinc-400 font-sans mt-1 leading-normal">
                  Enter your Polar license key below to bind your software copy globally.
                </p>

                <div className="mt-4 space-y-3 font-sans">
                  <input 
                    type="text" 
                    placeholder="KLIKY-XXXX-XXXX-XXXX"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    disabled={licenseValidated}
                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs rounded-xl font-mono focus:outline-none focus:border-brand text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:ring-1 focus:ring-brand/40"
                  />
                  <button 
                    onClick={() => {
                      if (!licenseKey.trim()) return;
                      setLicenseValidated(true);
                      playSwitchSound("sapphire", 0.7, 1.1, "Enter");
                    }}
                    disabled={licenseValidated || !licenseKey.trim()}
                    className="w-full py-2.5 rounded-xl bg-brand text-white text-xs font-bold tracking-wider shadow-sm hover:shadow-brand/20 active:scale-98 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {licenseValidated ? "✓ License Validated!" : "Activate License"}
                  </button>
                </div>

                {licenseValidated && (
                  <p className="text-[10px] font-mono text-emerald-500 text-center mt-3 animate-pulse">
                    ✨ Pro Swappable Sound Profiles Unlocked!
                  </p>
                )}
              </div>
            )}

            {/* SCREEN 7: Tray Magic Initiated */}
            {currentStep === 6 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
                
                {/* Simulated Mac Menubar Mock */}
                <div className="w-full max-w-[280px] bg-zinc-100 dark:bg-zinc-900 rounded-lg p-2 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between mb-6 font-mono text-[10px] text-zinc-400 select-none">
                  <div className="flex gap-2">
                    <span></span>
                    <span className="font-bold text-zinc-600 dark:text-zinc-200">Kliky</span>
                  </div>
                  <div className="flex gap-2 items-center text-zinc-700 dark:text-zinc-200 font-bold">
                    <span>🔊 50%</span>
                    <span className="px-1.5 py-0.5 rounded bg-brand/10 border border-brand/20 text-brand text-[9px]">
                      Key: {lastKeyPressed}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-sans">Setup Complete! 🚀</h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 font-sans max-w-[260px] leading-relaxed">
                  Click the keycap buttons below to hear mechanical feedback spatialization in action.
                </p>

                {/* Play key caps grid */}
                <div className="mt-5 flex gap-2 justify-center">
                  {["A", "S", "D", "F", "J", "K"].map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleKeyPress(letter)}
                      className="w-10 h-10 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:border-brand active:translate-y-0.5 shadow transition-all cursor-pointer"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT PANEL: Slide Explanations */}
          <div className="lg:w-1/2 p-6 md:p-8 md:lg:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Step indicator */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-200/60 dark:border-zinc-900/60">
                <span className="text-[10px] font-bold font-mono text-brand uppercase tracking-widest">
                  Step {currentStep + 1} of 7
                </span>
                <div className="flex gap-1">
                  {ONBOARDING_STEPS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => changeStep(idx)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition ${currentStep === idx ? "bg-brand w-4" : "bg-zinc-300 dark:bg-zinc-800"}`}
                      aria-label={`Go to step ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Step content */}
              <div className="space-y-3.5 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl md:text-2xl font-black text-zinc-950 dark:text-white font-sans tracking-tight leading-none">
                  {ONBOARDING_STEPS[currentStep].title}
                </h3>
                <p className="text-xs font-bold text-brand font-mono uppercase tracking-wider">
                  {ONBOARDING_STEPS[currentStep].tagline}
                </p>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  {ONBOARDING_STEPS[currentStep].description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2 pt-2">
                  {ONBOARDING_STEPS[currentStep].bulletPoints.map((bullet, idx) => (
                    <li key={idx} className="flex items-start text-xs font-sans text-zinc-800 dark:text-zinc-300">
                      <span className="text-brand mr-2.5 select-none shrink-0 font-mono">⚡</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Slider Actions Footer */}
            <div className="flex items-center justify-between pt-8 border-t border-zinc-200/60 dark:border-zinc-900/60 mt-8">
              <button
                onClick={() => changeStep(currentStep - 1)}
                disabled={currentStep === 0}
                className="px-4 py-2 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Back
              </button>
              
              {currentStep < ONBOARDING_STEPS.length - 1 ? (
                <button
                  onClick={() => changeStep(currentStep + 1)}
                  className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-bold tracking-wider shadow-md hover:shadow-brand/20 active:scale-95 transition cursor-pointer"
                >
                  Continue →
                </button>
              ) : (
                <a
                  href="#pricing"
                  className="px-5 py-2.5 rounded-xl bg-brand text-white text-xs font-black tracking-wider shadow-md hover:shadow-brand/20 active:scale-95 transition cursor-pointer select-none text-center"
                >
                  Download Kliky Beta Now
                </a>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
