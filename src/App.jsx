import { useState } from "react";
import Navbar from "./components/Navbar";
import PersonalizedBanner from "./components/PersonalizedBanner";
import Hero from "./components/Hero";
import CoupleSection from "./components/CoupleSection";
import EventsTimeline from "./components/EventsTimeline";
import Gallery from "./components/Gallery";
import RsvpForm from "./components/RsvpForm";
import Footer from "./components/Footer";
import PetalShower from "./components/PetalShower";
import MusicPlayer from "./components/MusicPlayer";
import InviteShareModal from "./components/InviteShareModal";

export default function App() {
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#200007] text-[#fbf6ee] font-serif antialiased selection:bg-[#d4af37] selection:text-[#38010d] overflow-x-hidden">
      {/* Personalized Royal Greeting Header */}
      <PersonalizedBanner onOpenShareModal={() => setIsShareModalOpen(true)} />

      {/* Royal Navigation */}
      <Navbar />

      {/* Traditional Marigold & Rose Petals Shower */}
      <PetalShower
        enabled={petalsEnabled}
        onToggle={() => setPetalsEnabled(!petalsEnabled)}
      />

      {/* Royal Shehnai / Sitar Instrumental Player */}
      <MusicPlayer />

      {/* Compact Main Sections */}
      <main>
        {/* 1. Hero with integrated Countdown */}
        <Hero />

        {/* 2. Couple & Family Lineage */}
        <CoupleSection />

        {/* 3. Celebration Itinerary & Venue */}
        <EventsTimeline />

        {/* 4. Glimpses Gallery */}
        <Gallery />

        {/* 5. RSVP & Blessings Wall */}
        <RsvpForm />
      </main>

      {/* Royal Auspicious Footer */}
      <Footer />

      {/* WhatsApp Invite Link Generator Modal */}
      <InviteShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
