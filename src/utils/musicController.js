// Global Background Music Controller (Singleton)
// Ensures background music (Bin Tere Kya Jeena) is triggered directly within trusted user gestures
let musicAudio = null;
let isPlaying = false;
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
