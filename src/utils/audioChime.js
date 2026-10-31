// Real Temple Bell Audio Player
// Plays an authentic recording of a 15cm bronze temple bell with clear resonance

let bellAudioInstance = null;

export function playSacredBellChime() {
  try {
    const audioUrl = `${import.meta.env.BASE_URL}temple-bell.mp3`;

    // Create and trigger audio
    const audio = new Audio(audioUrl);
    audio.volume = 1.0;
    bellAudioInstance = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Real bell audio autoplay restricted, attempting synthesized bell:", err);
        playSynthesizedBell();
      });
    }
    return audio;
  } catch (err) {
    console.log("Real bell play error, falling back to synthesis:", err);
    playSynthesizedBell();
  }
}

// Resonant fallback synthesizer if audio element is blocked
function playSynthesizedBell() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") ctx.resume();

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
  } catch (e) {
    console.log("Synthesizer error:", e);
  }
}
