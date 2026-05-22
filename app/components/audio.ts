/**
 * kliky — High-Fidelity Web Audio API Sound Engine
 * Replicates the native Tauri Rust background engine with 3D spatial panning,
 * organic keyboard variety, speed-sensitive acoustic scaling, and official sound packs.
 */

export type SwitchType = "zenith" | "obsidian" | "sapphire" | "velvet" | "neon";

let audioCtx: AudioContext | null = null;

// PCM Decoded Audio Buffers Cache
const buffers: {
  soundSprite: AudioBuffer | null;
  creamy: { [key: string]: AudioBuffer };
  eightBit: { [key: string]: AudioBuffer };
} = {
  soundSprite: null,
  creamy: {},
  eightBit: {},
};

let isLoading = false;
let isLoaded = false;

// ---------------------------------------------------------------------------
// Native Kliky Key Mappings & Panning Coordinates
// ---------------------------------------------------------------------------

const DEFAULT_CONFIG: { [key: string]: [number, number] } = {
  "1": [1754, 184],
  "2": [10135, 199],
  "3": [10562, 185],
  "4": [10966, 189],
  "5": [11329, 199],
  "6": [11706, 196],
  "7": [12094, 180],
  "8": [12467, 184],
  "9": [12863, 190],
  "10": [13248, 195],
  "11": [13633, 170],
  "12": [13988, 186],
  "13": [14372, 180],
  "14": [14748, 212],
  "15": [16940, 179],
  "16": [17316, 199],
  "17": [17700, 172],
  "18": [18054, 187],
  "19": [18400, 184],
  "20": [18761, 176],
  "21": [19116, 188],
  "22": [19495, 186],
  "23": [19876, 174],
  "24": [20238, 170],
  "25": [20605, 158],
  "26": [20976, 164],
  "27": [21348, 158],
  "28": [28558, 161],
  "29": [35733, 190],
  "30": [24330, 196],
  "31": [24700, 202],
  "32": [25071, 194],
  "33": [25444, 206],
  "34": [25803, 188],
  "35": [26159, 185],
  "36": [26534, 168],
  "37": [26928, 190],
  "38": [27347, 180],
  "39": [27733, 183],
  "40": [28157, 176],
  "41": [9749, 195],
  "42": [29603, 226],
  "43": [21707, 182],
  "44": [30046, 175],
  "45": [30385, 177],
  "46": [30761, 189],
  "47": [31123, 191],
  "48": [31475, 196],
  "49": [31891, 169],
  "50": [32333, 175],
  "51": [33011, 186],
  "52": [33438, 172],
  "53": [33828, 178],
  "54": [34215, 180],
  "55": [7583, 193],
  "56": [36465, 214],
  "57": [36804, 240],
  "58": [23925, 207],
  "59": [2222, 186],
  "60": [2617, 180],
  "61": [3028, 189],
  "62": [3385, 223],
  "63": [3792, 193],
  "64": [4136, 212],
  "65": [4540, 188],
  "66": [4903, 193],
  "67": [5296, 193],
  "68": [5666, 183],
  "69": [6818, 167],
  "70": [7187, 183],
  "71": [15156, 180],
  "72": [15526, 204],
  "73": [15893, 157],
  "74": [13988, 186],
  "75": [22116, 179],
  "76": [22513, 173],
  "77": [22862, 158],
  "78": [14748, 212],
  "79": [39220, 169],
  "80": [39589, 179],
  "81": [39954, 183],
  "82": [34215, 180],
  "83": [34704, 159],
  "87": [6054, 180],
  "88": [6425, 182],
  "3612": [28558, 161],
  "3613": [38821, 188],
  "3637": [7187, 183],
  "3639": [6818, 167],
  "3640": [37730, 184],
  "3653": [7583, 193],
  "3655": [15526, 204],
  "3657": [15893, 157],
  "3663": [22513, 173],
  "3665": [22862, 158],
  "3666": [15156, 180],
  "3667": [22116, 179],
  "3675": [36115, 205],
  "3676": [38116, 184],
  "3677": [38821, 188],
  "57416": [34704, 159],
  "57419": [39220, 169],
  "57421": [39954, 183],
  "57424": [39589, 179],
  "60999": [15526, 204],
  "61000": [34704, 159],
  "61001": [15893, 157],
  "61003": [39220, 169],
  "61005": [39954, 183],
  "61007": [22513, 173],
  "61008": [39589, 179],
  "61009": [22862, 158],
  "61010": [15156, 180],
  "61011": [22116, 179]
};

// Maps standard browser KeyboardEvent.code strings to DIK numeric key_id strings
function browserKeyCodeToKeyId(code: string): string {
  switch (code) {
    case "Escape": return "1";
    case "Digit1": return "2"; case "Digit2": return "3"; case "Digit3": return "4"; case "Digit4": return "5";
    case "Digit5": return "6"; case "Digit6": return "7"; case "Digit7": return "8"; case "Digit8": return "9";
    case "Digit9": return "10"; case "Digit0": return "11";
    case "Minus": return "12"; case "Equal": return "13"; case "Backspace": return "14";
    case "Tab": return "15";
    case "KeyQ": return "16"; case "KeyW": return "17"; case "KeyE": return "18"; case "KeyR": return "19";
    case "KeyT": return "20"; case "KeyY": return "21"; case "KeyU": return "22"; case "KeyI": return "23";
    case "KeyO": return "24"; case "KeyP": return "25";
    case "BracketLeft": return "26"; case "BracketRight": return "27"; case "Enter": return "28";
    case "ControlLeft": return "29";
    case "KeyA": return "30"; case "KeyS": return "31"; case "KeyD": return "32"; case "KeyF": return "33";
    case "KeyG": return "35"; case "KeyH": return "36"; case "KeyJ": return "37"; case "KeyK": return "38";
    case "KeyL": return "39"; case "Semicolon": return "39"; case "Quote": return "40"; case "Backquote": return "41";
    case "ShiftLeft": return "42"; case "Backslash": return "43";
    case "KeyZ": return "44"; case "KeyX": return "45"; case "KeyC": return "46"; case "KeyV": return "47";
    case "KeyB": return "48"; case "KeyN": return "49"; case "KeyM": return "50";
    case "Comma": return "51"; case "Period": return "52"; case "Slash": return "53"; case "ShiftRight": return "54";
    case "AltLeft": return "56"; case "Space": return "57"; case "CapsLock": return "58";
    case "ControlRight": return "29"; case "AltRight": return "184";
    case "ArrowUp": return "57416"; case "ArrowDown": return "57424";
    case "ArrowLeft": return "57419"; case "ArrowRight": return "57421";
    default: return "30"; // Fallback to 'A'
  }
}

// Spatial panning mapping matching get_key_pan on Rust backend
function getKeyPan(keyId: string): number {
  switch (keyId) {
    case "1": return -0.95; // Esc
    case "2": return -0.9; case "3": return -0.8; case "4": return -0.7; case "5": return -0.6;
    case "6": return -0.5; case "7": return -0.4; case "8": return -0.3; case "9": return -0.2;
    case "10": return -0.1; case "11": return 0.0;
    case "12": return 0.1; case "13": return 0.2; case "14": return 0.5; // Backspace
    case "15": return -0.85; // Tab
    case "16": return -0.8; case "17": return -0.7; case "18": return -0.6; case "19": return -0.5;
    case "20": return -0.4; case "21": return -0.3; case "22": return -0.2; case "23": return -0.1;
    case "24": return 0.0; case "25": return 0.1; case "26": return 0.2; case "27": return 0.3;
    case "28": return 0.6; // Enter
    case "29": return -0.95; // Ctrl
    case "30": return -0.75; case "31": return -0.65; case "32": return -0.55; case "33": return -0.45;
    case "34": return -0.35; case "35": return -0.25; case "36": return -0.15; case "37": return -0.05;
    case "38": return 0.05; case "39": return 0.15; case "40": return 0.25; case "41": return 0.35;
    case "42": return -0.9; // Left Shift
    case "44": return -0.7; case "45": return -0.6; case "46": return -0.5; case "47": return -0.4;
    case "48": return -0.3; case "49": return -0.2; case "50": return -0.1;
    case "51": return 0.0; case "52": return 0.1; case "53": return 0.2; case "54": return 0.5; // Right Shift
    case "56": return -0.8; // Alt
    case "57": return 0.0; // Space
    case "184": return 0.2; // AltGr
    case "57416": return 0.7; // Up
    case "57424": return 0.7; // Down
    case "57419": return 0.6; // Left
    case "57421": return 0.8; // Right
    default: return 0.0;
  }
}

// Alpha key_ids for Organic typing variety
const ALPHA_IDS = [
  "16", "17", "18", "19", "20", "21", "22", "23", "24", "25",
  "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
  "44", "45", "46", "47", "48", "49", "50"
];

function isAlpha(id: string): boolean {
  return ALPHA_IDS.includes(id);
}

// ---------------------------------------------------------------------------
// Background Loader & Decoder
// ---------------------------------------------------------------------------

async function loadOfficialSamples(ctx: AudioContext) {
  if (isLoaded || isLoading) return;
  isLoading = true;

  try {
    // 1. Fetch & decode OGG mechanical sound sprite sheet
    const spriteRes = await fetch("/sounds/sound.ogg");
    if (!spriteRes.ok) throw new Error("HTTP error fetching sound.ogg");
    const spriteArrBuf = await spriteRes.arrayBuffer();
    buffers.soundSprite = await ctx.decodeAudioData(spriteArrBuf);

    // 2. Fetch & decode 8bit (Neon) pack WAVs
    for (let i = 1; i <= 2; i++) {
      const name = `${i}.wav`;
      const res = await fetch(`/sounds/packs/8bit/${name}`);
      if (res.ok) {
        const arr = await res.arrayBuffer();
        buffers.eightBit[name] = await ctx.decodeAudioData(arr);
      }
    }

    // 3. Fetch & decode Creamy (Velvet) pack WAVs
    for (let i = 1; i <= 7; i++) {
      const name = `banana-l-${i}.wav`;
      const res = await fetch(`/sounds/packs/creamy/${name}`);
      if (res.ok) {
        const arr = await res.arrayBuffer();
        buffers.creamy[name] = await ctx.decodeAudioData(arr);
      }
    }

    isLoaded = true;
    console.log("Kliky High-Fidelity Audio Packs pre-loaded successfully.");
  } catch (e) {
    console.warn("Could not pre-load official mechanical samples. Procedural engine fallback active.", e);
  } finally {
    isLoading = false;
  }
}

// Initialize Audio Context on user interaction (browser security policy)
export function initAudio() {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    loadOfficialSamples(audioCtx);
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Speed-based scaling state trackers
let lastPressTime = 0;
let currentSpeedFactor = 1.0;

function getSpeedModifiers() {
  const now = Date.now();
  const duration = now - lastPressTime;
  lastPressTime = now;

  let boost = 0;
  if (duration < 100) {
    boost = 0.5;
  } else if (duration > 500) {
    boost = 0;
  } else {
    boost = (500 - duration) / 400 * 0.5;
  }

  // Smoothly decay current speed factor
  currentSpeedFactor = currentSpeedFactor * 0.7 + (1.0 + boost) * 0.3;

  // Add organic variance + velocity boost
  const pitchVar = (0.98 + Math.random() * 0.04) * (1 + boost * 0.1);
  const volVar = (0.95 + Math.random() * 0.1) * currentSpeedFactor;

  return { pitchVar, volVar };
}

// ---------------------------------------------------------------------------
// Sound Player Pipeline Dispatcher
// ---------------------------------------------------------------------------

export function playSwitchSound(type: SwitchType, volume = 0.5, pitch = 1.0, keyboardEventCode = "") {
  try {
    const ctx = initAudio();
    if (!ctx) return;

    // Resolve key code mappings
    let keyId = browserKeyCodeToKeyId(keyboardEventCode);

    // Apply organic typing variety: pick random alpha sound if key is alpha
    if (isAlpha(keyId)) {
      const randomIndex = Math.floor(Math.random() * ALPHA_IDS.length);
      keyId = ALPHA_IDS[randomIndex];
    }

    // Get speed-sensitive dynamic volume/pitch updates
    const { pitchVar, volVar } = getSpeedModifiers();
    const finalVolume = volume * volVar * 0.45; // safe master headroom
    const finalPitch = pitch * pitchVar;

    const panValue = getKeyPan(keyId);

    // Master node audio graph
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(finalVolume, ctx.currentTime);

    // Stereo Panner implementation
    let pannerNode: AudioNode = masterGain;
    if (ctx.createStereoPanner) {
      try {
        const panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(panValue, ctx.currentTime);
        panner.connect(ctx.destination);
        pannerNode = panner;
        masterGain.connect(panner);
      } catch {
        masterGain.connect(ctx.destination);
      }
    } else {
      masterGain.connect(ctx.destination);
    }

    // --- CASE A: BUILT-IN SPRITE ENGINE (Zenith, Obsidian, Sapphire) ---
    if (isLoaded && buffers.soundSprite) {
      if (type === "zenith" || type === "obsidian" || type === "sapphire") {
        const config = DEFAULT_CONFIG[keyId] || DEFAULT_CONFIG["30"];
        const startOffset = config[0] / 1000; // ms -> seconds
        const duration = config[1] / 1000; // ms -> seconds

        if (type === "sapphire") {
          // Sharp clicky, speed 1.6x
          const source1 = ctx.createBufferSource();
          source1.buffer = buffers.soundSprite;
          source1.playbackRate.setValueAtTime(finalPitch * 1.6, ctx.currentTime);
          source1.connect(pannerNode);
          source1.start(ctx.currentTime, startOffset, duration);

          // Secondary delayed click at 0.8x playback rate, 15ms delay
          const source2 = ctx.createBufferSource();
          source2.buffer = buffers.soundSprite;
          source2.playbackRate.setValueAtTime(finalPitch * 0.8, ctx.currentTime);
          
          const secondGain = ctx.createGain();
          secondGain.gain.setValueAtTime(0.5, ctx.currentTime);
          
          source2.connect(secondGain);
          secondGain.connect(pannerNode);
          
          source2.start(ctx.currentTime + 0.015, startOffset, duration);
          return;
        }

        if (type === "obsidian") {
          // Crisp tactile, pitched down 0.65x, amplified 1.5x
          const source = ctx.createBufferSource();
          source.buffer = buffers.soundSprite;
          source.playbackRate.setValueAtTime(finalPitch * 0.65, ctx.currentTime);

          const obsidianGain = ctx.createGain();
          obsidianGain.gain.setValueAtTime(1.5, ctx.currentTime);

          source.connect(obsidianGain);
          obsidianGain.connect(pannerNode);
          source.start(ctx.currentTime, startOffset, duration);
          return;
        }

        // Zenith: default standard clacks
        const source = ctx.createBufferSource();
        source.buffer = buffers.soundSprite;
        source.playbackRate.setValueAtTime(finalPitch, ctx.currentTime);
        source.connect(pannerNode);
        source.start(ctx.currentTime, startOffset, duration);
        return;
      }
    }

    // --- CASE B: EXTERNAL WAV PACK ENGINE (Velvet, Neon) ---
    if (isLoaded) {
      if (type === "velvet") {
        // Banana Split lubed linear switches
        const modifiers = ["29", "42", "54", "56", "184", "57419", "57421", "1", "59"];
        const arrows = ["57416", "57424", "57419", "57421"];

        let wavName = "";
        let pitchMod = 1.0;
        let volMod = 1.0;

        if (keyId === "57") {
          wavName = "banana-l-2.wav"; pitchMod = 0.85; volMod = 1.2;
        } else if (keyId === "28" || keyId === "14") {
          wavName = "banana-l-4.wav"; pitchMod = 0.95; volMod = 1.1;
        } else if (modifiers.includes(keyId)) {
          wavName = "banana-l-1.wav"; pitchMod = 1.0; volMod = 0.7;
        } else if (arrows.includes(keyId)) {
          wavName = "banana-l-3.wav"; pitchMod = 1.05; volMod = 0.9;
        } else {
          const alphaSamples = [1, 3, 5, 6, 7];
          const keyNum = parseInt(keyId, 10) || 30;
          const sampleNum = alphaSamples[keyNum % alphaSamples.length];
          wavName = `banana-l-${sampleNum}.wav`;
        }

        const buffer = buffers.creamy[wavName];
        if (buffer) {
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.playbackRate.setValueAtTime(finalPitch * pitchMod, ctx.currentTime);

          const packGain = ctx.createGain();
          packGain.gain.setValueAtTime(volMod, ctx.currentTime);

          source.connect(packGain);
          packGain.connect(pannerNode);
          source.start(ctx.currentTime);
          return;
        }
      }

      if (type === "neon") {
        // 8bit chiptune
        const modifiers = ["29", "42", "54", "56", "184", "57419", "57421", "1", "59"];

        let wavName = "";
        let pitchMod = 1.0;
        let volMod = 1.0;

        if (keyId === "57") {
          wavName = "2.wav"; pitchMod = 0.7; volMod = 1.3;
        } else if (modifiers.includes(keyId)) {
          wavName = "1.wav"; pitchMod = 1.0; volMod = 0.6;
        } else {
          const keyNum = parseInt(keyId, 10) || 30;
          const sampleNum = keyNum % 2 === 0 ? 2 : 1;
          wavName = `${sampleNum}.wav`;
        }

        const buffer = buffers.eightBit[wavName];
        if (buffer) {
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.playbackRate.setValueAtTime(finalPitch * pitchMod, ctx.currentTime);

          const packGain = ctx.createGain();
          packGain.gain.setValueAtTime(volMod, ctx.currentTime);

          source.connect(packGain);
          packGain.connect(pannerNode);
          source.start(ctx.currentTime);
          return;
        }
      }
    }

    // --- CASE C: DYNAMIC PROCEDURAL fallback (Cherry Blue, Linear, Typewriter) ---
    playProceduralFallback(ctx, pannerNode, type, finalPitch, keyboardEventCode);

  } catch (e) {
    console.error("Failed to play mechanical keyboard sound:", e);
  }
}

// ---------------------------------------------------------------------------
// Streamlined Procedural Synthesizer Fallbacks
// ---------------------------------------------------------------------------

function playProceduralFallback(
  ctx: AudioContext,
  pannerNode: AudioNode,
  type: SwitchType,
  pitch: number,
  code: string
) {
  const bufferSize = ctx.sampleRate * 0.12; // 120ms sound buffer
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const isSpace = code === "Space";
  const spaceBarPitchMod = isSpace ? 0.75 : 1.0;
  const finalPitch = pitch * spaceBarPitchMod;

  // Synthesize custom clicks based on profile selection fallback
  if (type === "zenith" || type === "sapphire") {
    // 1. High frequency click transient
    const clickNoise = ctx.createBufferSource();
    clickNoise.buffer = noiseBuffer;

    const clickFilter = ctx.createBiquadFilter();
    clickFilter.type = "highpass";
    clickFilter.frequency.setValueAtTime(5800 * finalPitch, ctx.currentTime);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.7, ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.007);

    clickNoise.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(pannerNode);

    // 2. Plastic-on-plastic housing hit
    const clackOsc = ctx.createOscillator();
    clackOsc.type = "triangle";
    clackOsc.frequency.setValueAtTime(290 * finalPitch, ctx.currentTime);
    clackOsc.frequency.exponentialRampToValueAtTime(140 * finalPitch, ctx.currentTime + 0.025);

    const clackGain = ctx.createGain();
    clackGain.gain.setValueAtTime(0.6, ctx.currentTime);
    clackGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.022);

    const clackFilter = ctx.createBiquadFilter();
    clackFilter.type = "bandpass";
    clackFilter.frequency.setValueAtTime(950 * finalPitch, ctx.currentTime);
    clackFilter.Q.setValueAtTime(2.2, ctx.currentTime);

    clackOsc.connect(clackFilter);
    clackFilter.connect(clackGain);
    clackGain.connect(pannerNode);

    clickNoise.start(ctx.currentTime);
    clackOsc.start(ctx.currentTime);
    clackOsc.stop(ctx.currentTime + 0.04);

  } else if (type === "obsidian" || type === "velvet") {
    // Heavy deep linear thock
    const thockOsc = ctx.createOscillator();
    thockOsc.type = "sine";
    thockOsc.frequency.setValueAtTime(130 * finalPitch, ctx.currentTime);
    thockOsc.frequency.exponentialRampToValueAtTime(50 * finalPitch, ctx.currentTime + 0.045);

    const thockGain = ctx.createGain();
    thockGain.gain.setValueAtTime(1.0, ctx.currentTime);
    thockGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

    thockOsc.connect(thockGain);
    thockGain.connect(pannerNode);

    const dampNoise = ctx.createBufferSource();
    dampNoise.buffer = noiseBuffer;

    const dampFilter = ctx.createBiquadFilter();
    dampFilter.type = "lowpass";
    dampFilter.frequency.setValueAtTime(390 * finalPitch, ctx.currentTime);
    dampFilter.Q.setValueAtTime(3.8, ctx.currentTime);

    const dampGain = ctx.createGain();
    dampGain.gain.setValueAtTime(0.5, ctx.currentTime);
    dampGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    dampNoise.connect(dampFilter);
    dampFilter.connect(dampGain);
    dampGain.connect(pannerNode);

    thockOsc.start(ctx.currentTime);
    dampNoise.start(ctx.currentTime);
    thockOsc.stop(ctx.currentTime + 0.05);

  } else if (type === "neon") {
    // Retro FM 8-bit click
    const carrier = ctx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.setValueAtTime(700 * finalPitch, ctx.currentTime);

    const modulator = ctx.createOscillator();
    modulator.type = "triangle";
    modulator.frequency.setValueAtTime(1200 * finalPitch, ctx.currentTime);

    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(400, ctx.currentTime);

    const carrierGain = ctx.createGain();
    carrierGain.gain.setValueAtTime(0.65, ctx.currentTime);
    carrierGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(carrierGain);
    carrierGain.connect(pannerNode);

    const reverbSource = ctx.createBufferSource();
    reverbSource.buffer = noiseBuffer;

    const reverbFilter = ctx.createBiquadFilter();
    reverbFilter.type = "bandpass";
    reverbFilter.frequency.setValueAtTime(1100 * finalPitch, ctx.currentTime);
    reverbFilter.Q.setValueAtTime(5.5, ctx.currentTime);

    const reverbGain = ctx.createGain();
    reverbGain.gain.setValueAtTime(0.35, ctx.currentTime);
    reverbGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    reverbSource.connect(reverbFilter);
    reverbFilter.connect(reverbGain);
    reverbGain.connect(pannerNode);

    modulator.start(ctx.currentTime);
    carrier.start(ctx.currentTime);
    reverbSource.start(ctx.currentTime);

    modulator.stop(ctx.currentTime + 0.04);
    carrier.stop(ctx.currentTime + 0.04);
  }
}
