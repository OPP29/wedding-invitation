// Sacred Temple Bell & Auspicious Chime Generator using Web Audio API
// Produces a loud, serene, resonant brass temple bell chime (घंटा / शंख ध्वनि)

let audioCtx = null;

export async function playSacredBellChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx || audioCtx.state === "closed") {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Resonant brass temple bell harmonics with loud, crystal-clear projection
    const partials = [
      { freq: 528, gain: 0.85, decay: 3.2 },  // Auspicious 528 Hz (Sacred Chime)
      { freq: 440, gain: 0.55, decay: 3.0 },  // Deep brass body resonance
      { freq: 1056, gain: 0.65, decay: 2.4 }, // 1st overtone
      { freq: 1584, gain: 0.40, decay: 1.8 }, // 2nd overtone
      { freq: 2420, gain: 0.30, decay: 0.8 }, // Crisp strike transient (Ting clapper)
    ];

    partials.forEach(({ freq, gain: initGain, decay }) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Instant strike attack, long reverberant exponential decay
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(initGain, now + 0.012);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });
  } catch (err) {
    console.log("Audio chime error:", err);
  }
}
