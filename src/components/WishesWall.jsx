import { useState, useEffect } from "react";
import { MessageSquareHeart, Heart, Send, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { triggerCelebration } from "./PetalShower";

export default function WishesWall() {
  const [wishes, setWishes] = useState([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("monika_ritesh_wishes");
    if (stored) {
      try {
        setWishes(JSON.parse(stored));
      } catch {
        setWishes(weddingData.initialWishes);
      }
    } else {
      setWishes(weddingData.initialWishes);
    }
  }, []);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;

    setIsSubmitting(true);
    const newEntry = {
      id: `wish-${Date.now()}`,
      name: newAuthor.trim(),
      relation: newRelation.trim() || "शुभचिंतक (Well-wisher)",
      message: newMessage.trim(),
      time: "अभी-अभी (Just now)",
      hearts: 1,
    };

    const updated = [newEntry, ...wishes];
    setWishes(updated);
    localStorage.setItem("monika_ritesh_wishes", JSON.stringify(updated));

    setNewAuthor("");
    setNewRelation("");
    setNewMessage("");
    setIsSubmitting(false);

    triggerCelebration();
  };

  const handleHeartWish = (id) => {
    const updated = wishes.map((w) =>
      w.id === id ? { ...w, hearts: (w.hearts || 0) + 1 } : w
    );
    setWishes(updated);
    localStorage.setItem("monika_ritesh_wishes", JSON.stringify(updated));
  };

  return (
    <section id="wishes" className="py-24 px-4 bg-royal-maroon relative overflow-hidden border-b-2 border-amber-500/30">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-xs font-serif font-bold uppercase tracking-widest mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5 text-amber-400" />
            <span>डिजिटल शुभाशीर्वाद पट्टिका</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-gradient-text mb-4">
            स्नेहिल आशीर्वाद एवं मंगल कामनाएं
          </h2>
          <p className="font-serif text-amber-100/80 text-base">
            वर-वधू मोनिका एवं रितेश को अपने पावन वचनों से आशीर्वाद देकर उनके नवजीवन को मंगलमय बनाएं।
          </p>
        </div>

        {/* Input Form Card */}
        <div className="max-w-2xl mx-auto mb-14 rounded-3xl p-6 sm:p-8 royal-card border-2 border-amber-400/60 shadow-2xl font-serif">
          <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>वर-वधू के लिए अपनी मंगलकामना लिखें</span>
          </h3>

          <form onSubmit={handleAddWish} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="आपका शुभ नाम (Your Name) *"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-100 placeholder-amber-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="संबंध (जैसे: चाचाजी, बुआजी, सहेली, मित्र)"
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-100 placeholder-amber-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <textarea
                required
                rows="3"
                placeholder="ईश्वर आपको सदा सुखी, स्वस्थ और समृद्ध रखे..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-100 placeholder-amber-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif text-xs font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105"
            >
              <Send className="w-3.5 h-3.5" />
              <span>आशीर्वाद प्रेषित करें एवं पुष्प वर्षा करें</span>
            </button>
          </form>
        </div>

        {/* Wishes Wall Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-serif">
          {wishes.map((w) => (
            <div
              key={w.id}
              className="rounded-2xl p-6 royal-card border-2 border-amber-500/40 shadow-xl flex flex-col justify-between hover:border-amber-300 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-bold text-amber-200 text-base">
                      {w.name}
                    </h4>
                    <span className="text-xs text-amber-400/90 font-medium">
                      {w.relation}
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-300/50">
                    {w.time}
                  </span>
                </div>

                <p className="italic text-amber-100/90 text-sm leading-relaxed">
                  &ldquo;{w.message}&rdquo;
                </p>
              </div>

              {/* Heart Button */}
              <div className="mt-5 pt-3 border-t border-amber-500/20 flex items-center justify-between">
                <button
                  onClick={() => handleHeartWish(w.id)}
                  className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold group transition-colors"
                >
                  <Heart className="w-4 h-4 fill-amber-400/40 group-hover:fill-amber-400 transition-colors" />
                  <span>{w.hearts || 0}</span>
                </button>
                <span className="text-[10px] text-amber-400/60 uppercase">शुभाशीर्वाद</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
