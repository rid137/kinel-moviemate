// =============================================================================
// src/pages/Home.jsx
// =============================================================================
// WEEK 2 — Introduction to React & JSX
//
// The landing page. Built in Week 2 as the very first React page students see.
// Intentionally simple — pure JSX, no state, no API calls.
//
// Teaching progression:
//   Week 2: Write this together in class — focus on JSX syntax and className
//   Week 9: Buttons use useNavigate() for routing
//
// ─── EMOJIS USED IN THIS FILE ────────────────────────────────────────────────
// 🎬 Film Clapperboard — hero icon
//    Mac: Cmd+Ctrl+Space → search "clapper" | Win: Win+. → search "clapper"
//    Copy: 🎬
//
// 🔥 Fire — "Trending Now" feature icon
//    Mac: Cmd+Ctrl+Space → search "fire"  | Win: Win+. → search "fire"
//    Copy: 🔥
//
// 🔍 Magnifying Glass — "Smart Search" feature icon
//    Mac: Cmd+Ctrl+Space → search "magnifying" | Win: Win+. → search "search"
//    Copy: 🔍
//
// 📋 Clipboard — "Your Watchlist" feature icon
//    Mac: Cmd+Ctrl+Space → search "clipboard" | Win: Win+. → search "clipboard"
//    Copy: 📋
// =============================================================================

import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 gap-8">

      {/* 🎬 Film Clapperboard — hero icon. See emoji guide at top of file. */}
      <span className="text-8xl">🎬</span>

      {/* Headline */}
      <div className="max-w-2xl space-y-4">
        <h1 className="text-5xl font-bold leading-tight">
          Your personal{" "}
          <span className="text-brand-500">movie companion</span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Discover trending films, search by title, save movies to your
          watchlist, and never forget what to watch next.
        </p>
      </div>

      {/* Call to action buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="primary" size="lg" onClick={() => navigate("/browse")}>
          Browse Movies
        </Button>
        <Button variant="ghost" size="lg" onClick={() => navigate("/watchlist")}>
          My Watchlist
        </Button>
      </div>

      {/*
        Feature highlights — rendered from an array using .map() (Week 1).
        This is the most common React rendering pattern: data → JSX.
        Each item needs a unique 'key' prop so React can track the list.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-3xl w-full">
        {[
          // 🔥 Fire emoji — see emoji guide at top of file
          { icon: "🔥", title: "Trending Now",   desc: "See what everyone is watching this week" },
          // 🔍 Magnifying Glass emoji — see emoji guide at top of file
          { icon: "🔍", title: "Smart Search",   desc: "Find any movie from our massive database" },
          // 📋 Clipboard emoji — see emoji guide at top of file
          { icon: "📋", title: "Your Watchlist", desc: "Save movies and track what you want to watch" },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-gray-900 rounded-xl p-6 text-left hover:bg-gray-800 transition-colors"
          >
            <span className="text-3xl">{feature.icon}</span>
            <h3 className="font-semibold mt-3 mb-1">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
