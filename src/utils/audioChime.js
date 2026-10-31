// Sacred Temple Bell & Auspicious Chime Generator using Web Audio API
// Produces a serene, resonant golden brass temple bell chime with zero network latency

let audioCtx = null;

export function playSacredBellChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Harmonic bell frequencies (Fundamental: 528Hz, Overtones: 1056Hz, 1584Hz, 2112Hz)
    const partials = [
      { freq: 528, gain: 0.35, decay: 2.8 },
      { freq: 1056, gain: 0.22, decay: 2.2 },
      { freq: 1584, gain: 0.12, decay: 1.6 },
      { freq: 2112, gain: 0.06, decay: 1.0 },
    ];

    partials.forEach(({ freq, gain: initGain, decay }) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Fast strike attack, long serene exponential decay
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(initGain, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (err) {
    console.log("Audio chime error:", err);
  }
}
