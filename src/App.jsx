import { useState, useRef } from "react";
import Hero from "./components/Hero";
import CoupleSection from "./components/CoupleSection";
import EventsTimeline from "./components/EventsTimeline";
import VenueSection from "./components/VenueSection";
import Gallery from "./components/Gallery";
import RsvpForm from "./components/RsvpForm";
import PetalShower from "./components/PetalShower";
import MusicPlayer from "./components/MusicPlayer";
import InviteShareModal from "./components/InviteShareModal";

export default function App() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const containerRef = useRef(null);

  const scrollToSlide = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const height = container.clientHeight;
    container.scrollTo({
      top: index * height,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-screen h-[100dvh] w-full overflow-hidden bg-[#200007] text-[#fbf6ee] font-serif antialiased selection:bg-[#d4af37] selection:text-[#38010d]">
      {/* Background Falling Petals (Always ON, no toggle) */}
      <PetalShower />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Fullscreen Vertical Snap-Scroll Container (No side scrollbar, no dots, pure fullscreen) */}
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
