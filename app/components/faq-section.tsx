"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: "privacy" | "customization" | "troubleshooting";
}

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "privacy", label: "Privacy & Trust" },
  { id: "customization", label: "Customization" },
  { id: "troubleshooting", label: "Troubleshooting" }
] as const;

type CategoryId = typeof CATEGORIES[number]["id"];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleFAQ = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const handleCategoryChange = (category: CategoryId) => {
    setActiveCategory(category);
    setOpenQuestion(null); // Close any open accordion to keep transitions clean
  };

  const faqs: FAQItem[] = [
    {
      category: "privacy",
      question: "How does Kliky capture keystrokes globally? Does it log my typing?",
      answer: "Kliky operates strictly offline and respects your privacy. On the desktop client, it utilizes secure native system APIs (such as CGEventTap on macOS and low-level keyboard hooks on Windows) solely to detect keypress events and calculate spatial sound coordinates. It never reads or records character inputs, does not create text logs, and makes zero network requests. The entire utility runs locally on your machine with absolutely no tracking."
    },
    {
      category: "privacy",
      question: "What is the local SQLite database used for? Is my analytics data private?",
      answer: "Kliky includes a local SQLite database that records daily batches of keystroke milestones. This allows you to track typing speed (WPM) and daily keystroke counts completely offline. All data is kept 100% offline in your local configurations folder. Absolutely zero analytical telemetry is collected, uploaded, or shared with external servers."
    },
    {
      category: "customization",
      question: "What is the 'Hyper Key' and how does the Caps Lock converter work?",
      answer: "The 'Hyper Key' is a powerful keyboard hack that binds the complex four-modifier shortcut combination (Command + Option + Control + Shift) onto a single key, typically the underused Caps Lock. In Kliky, enabling this allows you to trigger global system macros, toggle sound profiles, and control Kliky features instantly from the home row without ever worrying about keyboard shortcut conflicts in other applications."
    },
    {
      category: "troubleshooting",
      question: "How does the background auto-updater work?",
      answer: "Kliky integrates native build updater frameworks. Five seconds after starting up, Kliky silently checks our secure update endpoint in the background. If a new version is available, it brings up a native pop-up prompting you to download and install the update in a single click, automatically restarting the app to apply changes."
    },
    {
      category: "troubleshooting",
      question: "Will Kliky drain my laptop's battery?",
      answer: "No. Unlike bulky desktop applications, Kliky is engineered natively to communicate directly with your operating system's audio drivers. It consumes less than 1.2% CPU and under 15MB of RAM, making its battery footprint practically unnoticeable even during intense, continuous typing sessions."
    },
    {
      category: "troubleshooting",
      question: "Why can't I hear any typing audio in the web sandbox?",
      answer: "Modern web browsers enforce strict security policies that prevent audio from playing automatically before you interact with the page. Simply click anywhere inside the text area sandbox, tap 'Test Latency' on the low-latency card, or actuate the switch stem on the switch blueprint to initialize the Web Audio context."
    },
    {
      category: "customization",
      question: "Can I load my own custom mechanical switch sounds?",
      answer: "Yes! While Kliky comes with 5 official pre-loaded sound profiles (Zenith, Obsidian, Sapphire, Velvet, Neon), the desktop application allows you to drag-and-drop custom WAV or MP3 audio packs into your local settings directory to create your own signature acoustics. You can discover community profiles or submit your own creator pack URLs at our Sound Packs Gallery page at /packs."
    },
    {
      category: "troubleshooting",
      question: "Is Kliky compatible with my operating system?",
      answer: "Yes, Kliky supports both macOS and Windows. We provide universal natively compiled binaries optimized for both Apple Silicon (M1/M2/M3) and Intel Macs, as well as 64-bit packages for Windows 10 and 11."
    },
    {
      category: "troubleshooting",
      question: "Why does macOS say Kliky is 'damaged' or cannot be verified?",
      answer: "Since Kliky is compiled and distributed directly to typing enthusiasts (independent of the expensive Mac App Store), macOS Gatekeeper flags it as an unsigned application. You can easily clear this warning in under 5 seconds by running a terminal command ('xattr -cr /Applications/kliky.app') or right-clicking to open it manually. Read our step-by-step instructions on our dedicated Setup Guide page at /setup."
    },
    {
      category: "troubleshooting",
      question: "Does Kliky support Bluetooth headphones? What about audio latency?",
      answer: "Yes, Kliky works with all audio devices including Bluetooth headphones, speakers, and wired monitors. However, standard Bluetooth protocols introduce inherent wireless lag (typically 100-200ms). For the ultimate tactile synchronization, we recommend using wired headphones or enabling your headset's low-latency gaming mode. On the desktop client, you can also adjust the latency offset slider to micro-tune response timing."
    },
    {
      category: "customization",
      question: "Can I assign different switch sounds to specific keys (like the Spacebar)?",
      answer: "Absolutely! The Kliky desktop application features an advanced Acoustic Mapper. By default, keys are balanced dynamically, but you can assign specific profiles or custom WAV files to specific key groups. For instance, you can configure a deep, thocky 'Zenith' switch on your Spacebar, Enter, and Backspace keys while keeping crisp 'Velvet' clickies on standard letters."
    },
    {
      category: "customization",
      question: "Can I use Kliky alongside physical hardware mechanical keyboards?",
      answer: "Yes! Kliky is a perfect companion for mechanical keyboard enthusiasts and membrane typists alike. If you are using a loud clicky switch keyboard, Kliky can add subtle sub-bass thocks or high-frequency chimes. If you use a silent board or a standard laptop keyboard (like Apple's Magic Keyboard), Kliky instantly elevates your typing to a premium mechanical experience."
    },
    {
      category: "customization",
      question: "How do I configure Kliky to run automatically when my computer boots?",
      answer: "In the Kliky Desktop Client settings, simply toggle the 'Launch on Startup' option. On macOS, this registers Kliky as a lightweight Login Item in System Settings, and on Windows, it configures a minimal Startup Shortcut. Since it uses negligible background resources, it will sit quietly in your system tray, active only when you are typing."
    }
  ];

  const filteredFaqs = faqs.filter(
    (faq) => activeCategory === "all" || faq.category === activeCategory
  );

  return (
    <section id="faq" className="relative w-full mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-900/60 flex flex-col items-center">
      
      {/* Decorative ambient lighting halo (GPU accelerated) */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-brand/3 blur-[120px] pointer-events-none" />

      {/* FAQ Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 px-4">
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

      {/* Category Selection Tabs Bar */}
      <div className="w-full max-w-3xl px-4 md:px-6 mb-8 flex flex-wrap gap-2 justify-center select-none">
        {CATEGORIES.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleCategoryChange(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all select-none cursor-pointer border ${
              activeCategory === tab.id
                ? "bg-brand/10 border-brand/30 text-brand font-extrabold"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List Container */}
      <div className="w-full max-w-3xl px-4 md:px-6 flex flex-col gap-4 min-h-[300px]">
        {filteredFaqs.map((item, index) => {
          const isOpen = openQuestion === item.question;
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
                onClick={() => toggleFAQ(item.question)}
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
