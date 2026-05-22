"use client";

import React, { useState, useRef, useEffect } from "react";
import { playSwitchSound, SwitchType } from "./audio";

interface CenterPlaygroundProps {
  activeSwitch: SwitchType;
  volume: number;
  pitch: number;
}

const TARGET_TEXT = "the quick brown fox jumps over the lazy dog. experience highly satisfying mechanical keyboard soundscapes right here in your browser. actuate your laptop keys and hear the dynamic clack of a premium switch.";

export function CenterPlayground({
  activeSwitch,
  volume,
  pitch,
}: CenterPlaygroundProps) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // WPM Tracking variables
  const startTimeRef = useRef<number | null>(null);

  // Focus the input immediately on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

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
    
    // Prevent typing beyond the target text length
    if (val.length > TARGET_TEXT.length) return;
    
    setText(val);

    // Calculate WPM dynamically using standard typing test rules
    if (val.length === 0) {
      startTimeRef.current = null;
      setWpm(0);
      return;
    }

    let correctStrokes = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === TARGET_TEXT[i]) {
        correctStrokes++;
      }
    }

    if (startTimeRef.current) {
      const minutesElapsed = (Date.now() - startTimeRef.current) / 60000;
      if (minutesElapsed > 0.01) {
        const calculatedWpm = Math.round((correctStrokes / 5) / minutesElapsed);
        setWpm(calculatedWpm > 250 ? 250 : calculatedWpm); // cap at 250 WPM
      } else {
        setWpm(Math.round((correctStrokes / 5) * 60)); // early estimate
      }
    }
  };

  // Reset the playground
  const handleReset = () => {
    setText("");
    setWpm(0);
    startTimeRef.current = null;
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
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
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-900/60">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            Live Typing Sandbox
          </h3>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
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

      {/* Glassmorphic Typing Test Area (Monkeytype style) */}
      <div className="flex-1 relative group">
        <div 
          className="w-full h-full min-h-[300px] lg:min-h-0 relative rounded-2xl glass-panel p-6 lg:p-10 overflow-hidden flex flex-col transition duration-300 focus-within:border-brand/40 focus-within:ring-1 focus-within:ring-brand/30 cursor-text group"
          onClick={() => textareaRef.current?.focus()}
        >
          {/* Hidden text area to capture mobile keyboard correctly and desktop events robustly */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 resize-none z-10 w-full h-full cursor-text"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
          
          <div className="flex-1 relative z-0 pointer-events-none font-mono text-xl lg:text-2xl leading-relaxed tracking-wide text-zinc-400/50 dark:text-zinc-600/50 select-none break-words whitespace-pre-wrap">
            {TARGET_TEXT.split('').map((char, index) => {
              let colorClass = "";
              if (index < text.length) {
                colorClass = text[index] === char 
                  ? "text-zinc-800 dark:text-zinc-200" 
                  : "text-red-500 bg-red-500/10 rounded-sm";
              }
              
              const isCurrent = index === text.length;

              return (
                <span key={index} className="relative inline-block">
                  {isCurrent && (
                    <span className="absolute left-0 top-0.5 bottom-0.5 w-[2px] bg-brand animate-pulse shadow-[0_0_8px_var(--color-brand)]" />
                  )}
                  <span className={`${colorClass} transition-colors duration-75`}>{char}</span>
                </span>
              );
            })}
            
            {/* Handle cursor at the very end of the text */}
            {text.length === TARGET_TEXT.length && (
              <span className="relative inline-block">
                <span className="absolute left-0 top-0.5 bottom-0.5 w-[2px] bg-brand animate-pulse shadow-[0_0_8px_var(--color-brand)]" />
              </span>
            )}
            
            {/* Overlay hint when unfocused, shown based on focus-within on the container */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-focus-within:opacity-0 transition-opacity duration-300 pointer-events-none">
              <span className="px-4 py-2 rounded-full glass-panel text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                Click here to focus
              </span>
            </div>
          </div>
        </div>

        {/* Small floating action indicators inside textarea */}
        <div className="absolute right-4 bottom-4 flex items-center space-x-2 z-20">
          {text.length > 0 && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800/80 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
            >
              Restart Test
            </button>
          )}
        </div>
      </div>

      {/* Typing Metrics Deck */}
      <div className="grid grid-cols-3 gap-4 font-mono">
        <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">Speed</span>
          <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mt-1">
            {wpm} <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">WPM</span>
          </span>
        </div>
        
        <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">Keys hit</span>
          <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mt-1">
            {text.length} <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">strokes</span>
          </span>
        </div>

        <div className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">Latency</span>
          <span className="text-2xl font-bold text-brand mt-1">
            &lt; 3<span className="text-xs font-normal">ms</span>
          </span>
        </div>
      </div>
    </div>
  );
}

