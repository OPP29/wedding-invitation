// Authentic Bronze Temple Bell Audio Player & Synthesizer Fallback
let bellAudio = null;
let audioContext = null;
let hasChimedSuccessfully = false;
let isUnlockArmed = false;

function getBellAudio() {
  if (!bellAudio && typeof window !== "undefined") {
    bellAudio = new Audio(`${import.meta.env.BASE_URL}temple-bell.mp3`);
    bellAudio.preload = "auto";
    bellAudio.volume = 1.0;
    bellAudio.addEventListener("playing", () => {
      hasChimedSuccessfully = true;
    });
  }
  return bellAudio;
}

export function isBellChimed() {
  return hasChimedSuccessfully;
}

export function armFirstGestureUnlock(onChimedCallback) {
  if (typeof window === "undefined" || isUnlockArmed) return;
  isUnlockArmed = true;

  const events = ["pointerdown", "touchstart", "click", "keydown", "scroll"];
  const unlockAndPlay = () => {
    if (!hasChimedSuccessfully) {
      playSacredBellChime();
      if (onChimedCallback) onChimedCallback();
    }
    events.forEach((ev) => window.removeEventListener(ev, unlockAndPlay, { capture: true }));
    isUnlockArmed = false;
  };

  events.forEach((ev) => {
    window.addEventListener(ev, unlockAndPlay, { capture: true, once: true, passive: true });
  });
}

export function playSacredBellChime(onSuccess) {
  try {
    const audio = getBellAudio();
    if (audio) {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasChimedSuccessfully = true;
            if (onSuccess) onSuccess();
          })
          .catch((err) => {
            console.warn("Autoplay policy deferred audio until user interaction:", err.message);
            hasChimedSuccessfully = false;
            // Arm first touch/scroll gesture to ring the bell as soon as user touches screen
            armFirstGestureUnlock(onSuccess);
          });
      }
      return audio;
    }
  } catch (err) {
    console.warn("Real bell playback error:", err);
    hasChimedSuccessfully = false;
    armFirstGestureUnlock(onSuccess);
  }
}
