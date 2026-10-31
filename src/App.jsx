import { useState, useRef, useEffect, useCallback } from "react";
import Hero from "./components/Hero";
import CoupleSection from "./components/CoupleSection";
import EventsTimeline from "./components/EventsTimeline";
import VenueSection from "./components/VenueSection";
import Gallery from "./components/Gallery";
import RsvpForm from "./components/RsvpForm";
import PetalShower from "./components/PetalShower";
import MusicPlayer from "./components/MusicPlayer";
import InviteShareModal from "./components/InviteShareModal";
import { triggerTouchPetals } from "./utils/confetti";

export default function App() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isAutoScrollingRef = useRef(false);

  const AUTO_ADVANCE_DELAY = 12000; // 12 seconds per slide (in 10-15s range)
  const TOTAL_SLIDES = 6;

  // Global touch/pointer petals effect on every tap
  useEffect(() => {
    let lastTriggerTime = 0;

    const handlePointerDown = (e) => {
      const now = Date.now();
      // Throttle by 120ms to keep 60fps smooth scrolling
      if (now - lastTriggerTime < 120) return;
      lastTriggerTime = now;

      // Avoid triggering when interacting with form input fields
      const targetTag = e.target?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea" || targetTag === "select") {
        return;
      }

      triggerTouchPetals(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const scrollToSlide = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const height = container.clientHeight;
    container.scrollTo({
      top: index * height,
      behavior: "smooth",
    });
  };

  // Background Auto-Advance Timer (12s per slide, resets on manual scroll or back scroll)
  const startAutoAdvanceTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      // Do NOT auto-scroll away if user is actively filling out the RSVP form
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
        startAutoAdvanceTimer();
        return;
      }

      // Do NOT auto-scroll if a modal or popup is open
      if (isShareModalOpen) {
        startAutoAdvanceTimer();
        return;
      }

      const slideHeight = container.clientHeight;
      if (!slideHeight) return;

      const currentIndex = Math.round(container.scrollTop / slideHeight);
      const nextIndex = (currentIndex + 1) % TOTAL_SLIDES;

      isAutoScrollingRef.current = true;
      container.scrollTo({
        top: nextIndex * slideHeight,
        behavior: "smooth",
      });

      // Reset auto-scroll flag after smooth transition settles
      setTimeout(() => {
        isAutoScrollingRef.current = false;
        startAutoAdvanceTimer();
      }, 1000);
    }, AUTO_ADVANCE_DELAY);
  }, [isShareModalOpen]);

  // Set up invisible auto-advance listener and manual scroll reset
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start auto timer initially
    startAutoAdvanceTimer();

    const handleScroll = () => {
      // Ignore programmatic scrolls initiated by the timer
      if (isAutoScrollingRef.current) return;

      // If user scrolls manually (forward or back), reset and start countdown anew
      if (timerRef.current) clearTimeout(timerRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        startAutoAdvanceTimer();
      }, 250);
    };

    const handleUserGesture = () => {
      if (isAutoScrollingRef.current) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        startAutoAdvanceTimer();
      }, 250);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", handleUserGesture, { passive: true });
    container.addEventListener("touchstart", handleUserGesture, { passive: true });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleUserGesture);
      container.removeEventListener("touchstart", handleUserGesture);
    };
  }, [startAutoAdvanceTimer]);

  return (
    <div className="relative h-screen h-[100dvh] w-full overflow-hidden bg-[#200007] text-[#fbf6ee] font-serif antialiased selection:bg-[#d4af37] selection:text-[#38010d]">
      {/* Background Falling Petals (Always ON) */}
      <PetalShower />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Fullscreen Vertical Snap-Scroll Container */}
      <div ref={containerRef} className="snap-wrapper">
        {/* Slide 1: Welcome & Shubh Vivah Hero + Countdown (Fullscreen Borderless) */}
        <Hero onOpenShareModal={() => setIsShareModalOpen(true)} />

        {/* Slide 2: Couple & Family Lineage (Fullscreen Borderless) */}
        <CoupleSection />

        {/* Slide 3: Celebration Itinerary */}
        <EventsTimeline />

        {/* Slide 4: Venue & Navigation (Fullscreen Borderless) */}
        <VenueSection />

        {/* Slide 5: Glimpses Gallery */}
        <Gallery />

        {/* Slide 6: RSVP & Blessings & Auspicious Family Lineage (Fullscreen Borderless) */}
        <RsvpForm onScrollToTop={() => scrollToSlide(0)} />
      </div>

      {/* WhatsApp Invite Link Generator Modal */}
      <InviteShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
