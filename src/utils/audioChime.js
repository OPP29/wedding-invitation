// Authentic Bronze Temple Bell Audio Player & Synthesizer Fallback
let bellAudio = null;
let audioContext = null;
let hasChimedSuccessfully = false;

function getBellAudio() {
  if (!bellAudio && typeof window !== "undefined") {
    bellAudio = new Audio(`${import.meta.env.BASE_URL}temple-bell.mp3`);
    bellAudio.preload = "auto";
    bellAudio.volume = 1.0;
  }
  return bellAudio;
}

export function isBellChimed() {
  return hasChimedSuccessfully;
}

export function playSacredBellChime() {
  try {
    const audio = getBellAudio();
    if (audio) {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasChimedSuccessfully = true;
          })
          .catch((err) => {
            console.warn("Autoplay policy deferred audio until user interaction:", err.message);
            // Attempt Web Audio API synthesizer
            playSynthesizedBell();
          });
      }
      return audio;
    }
  } catch (err) {
    console.warn("Real bell playback error, using synthesizer:", err);
    playSynthesizedBell();
  }
}

function playSynthesizedBell() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioContext) {
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        hasChimedSuccessfully = true;
        renderBellPartials(audioContext);
      }).catch(() => {});
      return;
    }
    hasChimedSuccessfully = true;
    renderBellPartials(audioContext);
  } catch (e) {
    console.warn("Synthesizer error:", e);
  }
}

function renderBellPartials(ctx) {
  const now = ctx.currentTime;
  const partials = [
    { freq: 528, gain: 0.95, decay: 3.5 },
    { freq: 440, gain: 0.65, decay: 3.2 },
    { freq: 1056, gain: 0.75, decay: 2.6 },
    { freq: 2420, gain: 0.40, decay: 0.9 },
  ];

  partials.forEach(({ freq, gain, decay }) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(gain, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + decay + 0.1);
  });
}
