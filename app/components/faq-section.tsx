"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "How does Kliky capture keystrokes globally? Does it log my typing?",
      answer: "Kliky operates strictly offline and respects your privacy. On the desktop client, it utilizes secure native system APIs (such as CGEventTap on macOS and low-level keyboard hooks on Windows) solely to detect keypress events and calculate spatial sound coordinates. It never reads or records character inputs, does not create text logs, and makes zero network requests. The entire utility is audit-ready and open-source on GitHub."
    },
    {
      question: "What is the local SQLite database used for? Is my analytics data private?",
      answer: "Kliky includes a local SQLite database that records daily batches of keystroke milestones. This allows you to track typing speed (WPM) and daily keystroke counts completely offline. All data is kept 100% offline in your local configurations folder. Absolutely zero analytical telemetry is collected, uploaded, or shared with external servers."
    },
    {
      question: "What is the 'Hyper Key' and how does the Caps Lock converter work?",
      answer: "The 'Hyper Key' is a powerful keyboard hack that binds the complex four-modifier shortcut combination (Command + Option + Control + Shift) onto a single key, typically the underused Caps Lock. In Kliky, enabling this allows you to trigger global system macros, toggle sound profiles, and control Kliky features instantly from the home row without ever worrying about keyboard shortcut conflicts in other applications."
    },
    {
      question: "How does the background auto-updater work?",
      answer: "Kliky integrates Tauri's native build updater framework. Five seconds after starting up, Kliky silently checks our secure GitHub releases endpoint in the background. If a new version is available, it brings up a native pop-up prompting you to download and install the update in a single click, automatically restarting the app to apply changes."
    },
    {
      question: "Will Kliky drain my laptop's battery?",
      answer: "No. Unlike bulky Electron-based applications, Kliky is engineered natively in Rust to communicate directly with your operating system's audio drivers. It consumes less than 1.2% CPU and under 15MB of RAM, making its battery footprint practically unnoticeable even during intense, continuous typing sessions."
    },
    {
      question: "Why can't I hear any typing audio in the web sandbox?",
      answer: "Modern web browsers enforce strict security policies that prevent audio from playing automatically before you interact with the page. Simply click anywhere inside the text area sandbox, tap 'Test Latency' on the low-latency card, or actuate the switch stem on the switch blueprint to initialize the Web Audio context."
    },
    {
      question: "Can I load my own custom mechanical switch sounds?",
      answer: "Yes! While Kliky comes with 5 official pre-loaded sound profiles (Zenith, Obsidian, Sapphire, Velvet, Neon), the desktop application allows you to drag-and-drop custom WAV or MP3 audio packs into your local settings directory to create your own signature acoustics."
    },
    {
      question: "Is Kliky compatible with my operating system?",
      answer: "Yes, Kliky supports both macOS and Windows. We provide universal natively compiled binaries optimized for both Apple Silicon (M1/M2/M3) and Intel Macs, as well as 64-bit packages for Windows 10 and 11."
    },
    {
      question: "Does Kliky support Bluetooth headphones? What about audio latency?",
      answer: "Yes, Kliky works with all audio devices including Bluetooth headphones, speakers, and wired monitors. However, standard Bluetooth protocols introduce inherent wireless lag (typically 100-200ms). For the ultimate tactile synchronization, we recommend using wired headphones or enabling your headset's low-latency gaming mode. On the desktop client, you can also adjust the latency offset slider to micro-tune response timing."
    },
    {
      question: "Can I assign different switch sounds to specific keys (like the Spacebar)?",
      answer: "Absolutely! The Kliky desktop application features an advanced Acoustic Mapper. By default, keys are balanced dynamically, but you can assign specific profiles or custom WAV files to specific key groups. For instance, you can configure a deep, thocky 'Zenith' switch on your Spacebar, Enter, and Backspace keys while keeping crisp 'Velvet' clickies on standard letters."
    },
    {
      question: "Can I use Kliky alongside physical hardware mechanical keyboards?",
      answer: "Yes! Kliky is a perfect companion for mechanical keyboard enthusiasts and membrane typists alike. If you are using a loud clicky switch keyboard, Kliky can add subtle sub-bass thocks or high-frequency chimes. If you use a silent board or a standard laptop keyboard (like Apple's Magic Keyboard), Kliky instantly elevates your typing to a premium mechanical experience."
    },
    {
      question: "How do I configure Kliky to run automatically when my computer boots?",
      answer: "In the Kliky Desktop Client settings, simply toggle the 'Launch on Startup' option. On macOS, this registers Kliky as a lightweight Login Item in System Settings, and on Windows, it configures a minimal Startup Shortcut. Since it uses negligible background resources, it will sit quietly in your system tray, active only when you are typing."
    }
  ];

  return (
    <section id="faq" className="relative w-full mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-900/60 flex flex-col items-center">
      
      {/* Decorative ambient lighting halo (GPU accelerated) */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-brand/3 blur-[120px] pointer-events-none" />

      {/* FAQ Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 px-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand font-mono px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
          Got Questions?
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-4 font-sans">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-3 leading-relaxed">
          Everything you need to know about the acoustics, performance, and security of Kliky.
        </p>
      </div>

      {/* Accordion List Container */}
      <div className="w-full max-w-3xl px-4 md:px-6 flex flex-col gap-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`rounded-2xl glass-panel border transition-all duration-300 ${
                isOpen 
                  ? "border-brand/40 bg-brand/5 shadow-lg shadow-brand/5" 
                  : "border-zinc-200/50 dark:border-zinc-800/40 hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:bg-zinc-100/10 dark:hover:bg-zinc-900/10"
              }`}
            >
              {/* Accordion Trigger Header Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left p-5 cursor-pointer font-sans select-none focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 leading-snug group-hover:text-brand transition-colors">
                  {item.question}
                </span>
                
                {/* Arrow indicator with smooth dynamic rotations */}
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/60 transition-transform duration-300 ${isOpen ? "rotate-180 border-brand/30 text-brand bg-brand/10" : "text-zinc-400"}`}>
                  <svg 
                    className="w-3.5 h-3.5 fill-none stroke-current stroke-2" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {/* Accordion Expandable Answer Box */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[500px] opacity-100 border-t border-zinc-200/30 dark:border-zinc-800/30" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 font-sans font-normal">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
