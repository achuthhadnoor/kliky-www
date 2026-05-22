/**
 * kliky — Web Audio API Procedural & Sampled Sound Engine
 * Synthesizes and plays mechanical keyboard sounds in real-time.
 * Features 100% offline procedural sounds alongside the official Kliky sample pack.
 */

let audioCtx: AudioContext | null = null;
const buffers: { [key: string]: AudioBuffer | null } = {
  click: null,
  space: null,
  enter: null,
};

// Asynchronously pre-loads and decodes the official WAV samples
async function loadOfficialSamples(ctx: AudioContext) {
  const samples = ["click", "space", "enter"];
  for (const name of samples) {
    if (buffers[name]) continue;
    try {
      const response = await fetch(`/sounds/${name}.wav`);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      // Decode audio data using modern promise-based API or fallback
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      buffers[name] = decoded;
    } catch (e) {
      console.warn(`Could not load official sound: ${name}.wav, using procedural fallback.`, e);
    }
  }
}

// Initialize Audio Context on user interaction (browser policy requirement)
export function initAudio() {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    // Start pre-loading official samples in the background immediately
    loadOfficialSamples(audioCtx);
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export type SwitchType = "default" | "blue" | "creamy" | "retro";

/**
 * Plays a mechanical key sound. Supports both sampled WAVs and synthesized nodes.
 * @param type The sound profile: 'default' (Official WAV Pack), 'blue' (Cherry Blue), 'creamy' (Linear Thock), 'retro' (Typewriter)
 * @param volume Volume factor (0 to 1)
 * @param pitch Pitch modifier (0.5 to 1.8)
 * @param key The actual character or key name pressed (to map space/enter sounds)
 */
export function playSwitchSound(type: SwitchType, volume = 0.5, pitch = 1.0, key = "") {
  try {
    const ctx = initAudio();
    if (!ctx) return;

    // Create primary master gain for volume control
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.45, ctx.currentTime); // keep max scaling reasonable
    masterGain.connect(ctx.destination);

    // --- 1. OFFICIAL SAMPLED WAV PACK ---
    if (type === "default") {
      let bufferToPlay = buffers.click;
      if (key === " ") {
        bufferToPlay = buffers.space || buffers.click;
      } else if (key === "Enter") {
        bufferToPlay = buffers.enter || buffers.click;
      }

      // If buffer is loaded, play it instantly
      if (bufferToPlay) {
        const source = ctx.createBufferSource();
        source.buffer = bufferToPlay;
        
        // Apply pitch adjustments
        source.playbackRate.setValueAtTime(pitch, ctx.currentTime);
        
        source.connect(masterGain);
        source.start(ctx.currentTime);
        return;
      }
      // If WAV buffer is not yet loaded, fall back to procedural Cherry Blue click
    }

    // --- 2. PROCEDURAL SOUND SYNTHESIS FALLBACKS/OPTIONS ---
    const bufferSize = ctx.sampleRate * 0.15; // 150ms buffer
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // A slightly modified profile for spacebar bottom-out when playing procedural sounds
    const spaceBarPitchMod = key === " " ? 0.75 : 1.0;
    const finalPitch = pitch * spaceBarPitchMod;

    if (type === "blue" || type === "default") {
      // --- CHERRY MX BLUE (CLICKY) ---
      // 1. High frequency mechanical metallic click
      const clickNoise = ctx.createBufferSource();
      clickNoise.buffer = noiseBuffer;

      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = "highpass";
      clickFilter.frequency.setValueAtTime(5800 * finalPitch, ctx.currentTime);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.75, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.007); // super fast decay

      clickNoise.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(masterGain);

      // 2. Plastic-on-plastic bottom-out clack
      const clackOsc = ctx.createOscillator();
      clackOsc.type = "triangle";
      clackOsc.frequency.setValueAtTime(290 * finalPitch, ctx.currentTime);
      clackOsc.frequency.exponentialRampToValueAtTime(140 * finalPitch, ctx.currentTime + 0.025);

      const clackGain = ctx.createGain();
      clackGain.gain.setValueAtTime(0.65, ctx.currentTime);
      clackGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.022);

      const clackFilter = ctx.createBiquadFilter();
      clackFilter.type = "bandpass";
      clackFilter.frequency.setValueAtTime(950 * finalPitch, ctx.currentTime);
      clackFilter.Q.setValueAtTime(2.2, ctx.currentTime);

      clackOsc.connect(clackFilter);
      clackFilter.connect(clackGain);
      clackGain.connect(masterGain);

      // Start nodes
      clickNoise.start(ctx.currentTime);
      clackOsc.start(ctx.currentTime);
      clackOsc.stop(ctx.currentTime + 0.045);

    } else if (type === "creamy") {
      // --- CREAMY LINEAR (THOCK) ---
      // Heavy, deep, bassy bottom-out with very muted mechanical noise
      
      // 1. Resonant deep bass "thock"
      const thockOsc = ctx.createOscillator();
      thockOsc.type = "sine";
      thockOsc.frequency.setValueAtTime(140 * finalPitch, ctx.currentTime);
      thockOsc.frequency.exponentialRampToValueAtTime(55 * finalPitch, ctx.currentTime + 0.045);

      const thockGain = ctx.createGain();
      thockGain.gain.setValueAtTime(1.1, ctx.currentTime);
      thockGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

      thockOsc.connect(thockGain);
      thockGain.connect(masterGain);

      // 2. Muffled top-housing dampening noise
      const dampNoise = ctx.createBufferSource();
      dampNoise.buffer = noiseBuffer;

      const dampFilter = ctx.createBiquadFilter();
      dampFilter.type = "lowpass";
      dampFilter.frequency.setValueAtTime(420 * finalPitch, ctx.currentTime);
      dampFilter.Q.setValueAtTime(4.2, ctx.currentTime); // resonance creates "creamy" sound

      const dampGain = ctx.createGain();
      dampGain.gain.setValueAtTime(0.55, ctx.currentTime);
      dampGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      dampNoise.connect(dampFilter);
      dampFilter.connect(dampGain);
      dampGain.connect(masterGain);

      // Start nodes
      thockOsc.start(ctx.currentTime);
      dampNoise.start(ctx.currentTime);
      thockOsc.stop(ctx.currentTime + 0.06);

    } else if (type === "retro") {
      // --- RETRO TYPEWRITER ---
      // Metallic lever clink with springy resonating tail

      // 1. Core metallic impact (Frequency Modulation)
      const carrier = ctx.createOscillator();
      carrier.type = "sine";
      carrier.frequency.setValueAtTime(750 * finalPitch, ctx.currentTime);

      const modulator = ctx.createOscillator();
      modulator.type = "triangle";
      modulator.frequency.setValueAtTime(1300 * finalPitch, ctx.currentTime);

      const modGain = ctx.createGain();
      modGain.gain.setValueAtTime(450, ctx.currentTime); // high modulation index

      const carrierGain = ctx.createGain();
      carrierGain.gain.setValueAtTime(0.7, ctx.currentTime);
      carrierGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      modulator.connect(modGain);
      modGain.connect(carrier.frequency);
      carrier.connect(carrierGain);
      carrierGain.connect(masterGain);

      // 2. Springs & mechanical frame reverb tail
      const reverbSource = ctx.createBufferSource();
      reverbSource.buffer = noiseBuffer;

      const reverbFilter = ctx.createBiquadFilter();
      reverbFilter.type = "bandpass";
      reverbFilter.frequency.setValueAtTime(1150 * finalPitch, ctx.currentTime);
      reverbFilter.Q.setValueAtTime(6.0, ctx.currentTime); // high resonance for "spring" ring

      const reverbGain = ctx.createGain();
      reverbGain.gain.setValueAtTime(0.38, ctx.currentTime);
      reverbGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11); // longer decay

      reverbSource.connect(reverbFilter);
      reverbFilter.connect(reverbGain);
      reverbGain.connect(masterGain);

      // Start nodes
      modulator.start(ctx.currentTime);
      carrier.start(ctx.currentTime);
      reverbSource.start(ctx.currentTime);

      modulator.stop(ctx.currentTime + 0.04);
      carrier.stop(ctx.currentTime + 0.04);
    }
  } catch (e) {
    console.error("Failed to play mechanical sound:", e);
  }
}
