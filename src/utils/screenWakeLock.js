// Screen Wake Lock API Utility
// Prevents device screen / phone from sleeping or applying screensaver while the wedding invitation is open
let wakeLock = null;

export async function requestScreenWakeLock() {
  if (typeof navigator !== "undefined" && "wakeLock" in navigator) {
    try {
      if (!wakeLock || wakeLock.released) {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
          wakeLock = null;
        });
      }
    } catch {
      // Browser may defer until first user gesture
    }
  }
}

export function releaseScreenWakeLock() {
  if (wakeLock) {
    try {
      wakeLock.release().catch(() => {});
    } catch {
      // Ignored
    }
    wakeLock = null;
  }
}

// Automatically re-request wake lock when user switches back to this tab
if (typeof document !== "undefined" && typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      requestScreenWakeLock();
    } else {
      releaseScreenWakeLock();
    }
  });

  // Also ensure wake lock activates on user touch/click gesture
  const gestureEvents = ["pointerdown", "touchstart", "click"];
  const handleUserGestureForWakeLock = () => {
    if (!wakeLock) {
      requestScreenWakeLock();
    }
  };
  gestureEvents.forEach((ev) => {
    window.addEventListener(ev, handleUserGestureForWakeLock, { passive: true });
  });
}
