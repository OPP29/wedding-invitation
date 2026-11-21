// Global Background Music Controller (Singleton)
// Ensures background music (Bin Tere Kya Jeena) plays only when tab is active
// Automatically stops when tab is closed, minimized, switched, or app closed
let musicAudio = null;
let isPlaying = false;
let wasPlayingBeforeHidden = false;
const listeners = new Set();

const TARGET_VOLUME = 0.5; // 50% volume requested

export function getMusicAudio() {
  if (!musicAudio && typeof window !== "undefined") {
    musicAudio = new Audio(`${import.meta.env.BASE_URL}music.mp3`);
    musicAudio.loop = true;
    musicAudio.preload = "auto";
    musicAudio.volume = TARGET_VOLUME;

    musicAudio.addEventListener("play", () => {
      isPlaying = true;
      notifyListeners();
    });

    musicAudio.addEventListener("pause", () => {
      isPlaying = false;
      notifyListeners();
    });

    musicAudio.addEventListener("playing", () => {
      isPlaying = true;
      notifyListeners();
    });
  }
  return musicAudio;
}

export function isMusicPlaying() {
  return isPlaying;
}

export function playBackgroundMusic() {
  try {
    const audio = getMusicAudio();
    if (!audio) return;

    audio.volume = TARGET_VOLUME;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          notifyListeners();
        })
        .catch((err) => {
          console.log("Direct music playback deferred by browser:", err.message);
        });
    }
    return playPromise;
  } catch (err) {
    console.log("Music play error:", err);
  }
}

export function pauseBackgroundMusic() {
  try {
    const audio = getMusicAudio();
    if (audio) {
      audio.pause();
      isPlaying = false;
      notifyListeners();
    }
  } catch (err) {
    console.log("Music pause error:", err);
  }
}

export function toggleBackgroundMusic() {
  const audio = getMusicAudio();
  if (!audio) return;

  if (audio.paused) {
    playBackgroundMusic();
  } else {
    pauseBackgroundMusic();
  }
}

export function subscribeMusicState(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners() {
  listeners.forEach((callback) => {
    try {
      callback(isPlaying);
    } catch (e) {
      console.warn("Listener error:", e);
    }
  });
}

// Automatically manage tab visibility, minimize, tab-switch, and close events
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    const audio = getMusicAudio();
    if (!audio) return;

    if (document.hidden || document.visibilityState === "hidden") {
      // Tab is inactive, minimized, or screen locked: stop audio immediately
      if (isPlaying) {
        wasPlayingBeforeHidden = true;
        pauseBackgroundMusic();
      }
    } else if (document.visibilityState === "visible") {
      // Tab is currently active: automatically resume if it was playing before
      if (wasPlayingBeforeHidden) {
        wasPlayingBeforeHidden = false;
        playBackgroundMusic();
      }
    }
  });

  // When app/tab is closed or navigated away: stop immediately
  window.addEventListener("pagehide", () => {
    pauseBackgroundMusic();
  });
  window.addEventListener("beforeunload", () => {
    pauseBackgroundMusic();
  });
}
