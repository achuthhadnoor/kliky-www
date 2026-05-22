"use client";

import React from "react";

export function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  // Split content by newlines to process headers, bullets, and paragraphs
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Skip GitHub's default boilerplate changelog compare links
        if (trimmed.toLowerCase().includes("**full changelog**:")) return null;
        if (trimmed.toLowerCase().includes("full changelog:")) return null;

        // Render bullet lists cleanly
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          const text = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start text-xs font-sans text-zinc-700 dark:text-zinc-300">
              <span className="w-4 h-4 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-[8px] text-brand mr-3 mt-0.5 shrink-0 select-none">
                ✦
              </span>
              <p dangerouslySetInnerHTML={{ __html: parseInline(text) }} />
            </div>
          );
        }

        // Render Markdown Headers (## or ###)
        if (trimmed.startsWith("#")) {
          const level = trimmed.match(/^#+/)?.[0].length || 2;
          const text = trimmed.replace(/^#+\s/, "");
          if (level <= 2) {
            return (
              <h3 key={idx} className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-wide mt-3 mb-1">
                {text}
              </h3>
            );
          }
          return (
            <h4 key={idx} className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 font-sans tracking-wide mt-2">
              {text}
            </h4>
          );
        }

        // Render standard paragraph text
        return (
          <p 
            key={idx} 
            className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: parseInline(trimmed) }} 
          />
        );
      })}
    </div>
  );
}

// Lightweight Regex helper for inline bold, code, and links formatting
function parseInline(text: string) {
  let parsed = text;
  
  // Strong/Bold: **text**
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-950 dark:text-zinc-100 font-semibold">$1</strong>');
  
  // Inline Code: `text`
  parsed = parsed.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 mx-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 text-brand font-mono text-[10px] tracking-wide">$1</code>');
  
  // Hyperlinks: [text](url)
  parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-brand hover:text-brand-hover hover:underline transition-colors">$1</a>');

  // GitHub User mentions: @username
  parsed = parsed.replace(/(^|\s)@([a-zA-Z0-9_-]+)(\s|$)/g, '$1<a href="https://github.com/$2" target="_blank" rel="noopener noreferrer" class="text-indigo-500 dark:text-indigo-400 font-medium hover:underline transition-colors">@$2</a>$3');

  // GitHub PR/Issue references: #42
  parsed = parsed.replace(/(^|\s)#(\d+)(\s|$)/g, '$1<a href="https://github.com/achuthhadnoor/kliky/pull/$2" target="_blank" rel="noopener noreferrer" class="text-brand font-medium hover:underline transition-colors">#$2</a>$3');

  return parsed;
}
