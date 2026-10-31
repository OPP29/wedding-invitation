import { useState, useRef, useEffect } from "react";
import Hero from "./components/Hero";
import CoupleSection from "./components/CoupleSection";
import EventsTimeline from "./components/EventsTimeline";
import VenueSection from "./components/VenueSection";
import Gallery from "./components/Gallery";
import RsvpForm from "./components/RsvpForm";
import PetalShower from "./components/PetalShower";
import MusicPlayer from "./components/MusicPlayer";
import InviteShareModal from "./components/InviteShareModal";
import SlideNavDots from "./components/SlideNavDots";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const containerRef = useRef(null);

  const totalSlides = 6;
  const slideLabels = [
    "शुभ विवाह (Welcome)",
    "वर-वधू एवं कुल (Families)",
    "उत्सव कार्यक्रम (Events)",
    "विवाह स्थल (Venue)",
    "चित्र वीथिका (Gallery)",
    "उपस्थिति (RSVP)",
  ];

  // Track active slide on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const height = container.clientHeight;
      const index = Math.round(scrollPos / height);
      if (index >= 0 && index < totalSlides) {
        setCurrentSlide(index);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSlide = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const height = container.clientHeight;
    container.scrollTo({
      top: index * height,
      behavior: "smooth",
    });
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen h-[100dvh] w-full overflow-hidden bg-[#200007] text-[#fbf6ee] font-serif antialiased selection:bg-[#d4af37] selection:text-[#38010d]">
      {/* Background Falling Petals (Always ON, no toggle) */}
      <PetalShower />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Vertical Slide Navigation Dots (Right edge) */}
      <SlideNavDots
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={scrollToSlide}
        slideLabels={slideLabels}
      />

      {/* Fullscreen Vertical Snap-Scroll Container */}
      <div ref={containerRef} className="snap-wrapper">
        {/* Slide 1: Welcome & Shubh Vivah Hero + Countdown */}
        <Hero
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onNext={() => scrollToSlide(1)}
        />

        {/* Slide 2: Couple & Family Lineage */}
        <CoupleSection onNext={() => scrollToSlide(2)} />

        {/* Slide 3: Celebration Itinerary */}
        <EventsTimeline onNext={() => scrollToSlide(3)} />

        {/* Slide 4: Venue & Navigation */}
        <VenueSection onNext={() => scrollToSlide(4)} />

        {/* Slide 5: Glimpses Gallery */}
        <Gallery onNext={() => scrollToSlide(5)} />

        {/* Slide 6: RSVP & Blessings & Auspicious Family Lineage */}
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
