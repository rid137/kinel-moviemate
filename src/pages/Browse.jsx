// =============================================================================
// src/pages/Browse.jsx
// =============================================================================
// WEEK 3 (first static list) → Week 4 (search form) → Week 5 (real API) →
//         Week 6 (context) → Week 7 (responsive grid) → Week 8 (CSS Modules)
//
// This is the most important teaching file in the project.
// Students watch it grow week by week — each class adds a new layer.
//
// Week 3: Renders MOCK_MOVIES as a static list — focus on props and .map()
// Week 4: Add MovieSearch with a controlled input and useState for the query
// Week 5: Replace mock data with useMovies() — real API, loading/error states
// Week 6: Read watchlist from WatchlistContext instead of a local array
// Week 7: Apply the responsive Tailwind grid and Tailwind styling polish
//
// ─── EMOJIS USED IN THIS FILE ────────────────────────────────────────────────
// 🔥 Fire — shown in the default heading when no search is active
//    Mac: Cmd+Ctrl+Space → search "fire" | Win: Win+. → search "fire"
//    Copy: 🔥
//
// 🎭 Performing Arts — shown when a search returns no results
//    Mac: Cmd+Ctrl+Space → search "theater" | Win: Win+. → search "theater"
//    Copy: 🎭
// =============================================================================

import { useState } from "react";
import MovieCard    from "@/components/movies/MovieCard";
import MovieSearch  from "@/components/movies/MovieSearch";
import Spinner      from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import useMovies    from "@/hooks/useMovies";

function Browse() {

  // ─────────────────────────────────────────────────────────────────────────
  // LIFTED STATE (Week 4 → Week 6 — Handling Events & Lifting State)
  //
  // 'query' lives here in Browse because:
  //   • MovieSearch needs to write it (via the onSearch callback)
  //   • useMovies needs to read it (to decide what to fetch)
  //
  // Unidirectional data flow:
  //   state lives in Browse → passed DOWN to MovieSearch as onSearch prop
  //   MovieSearch fires the callback → Browse updates state → re-render
  // ─────────────────────────────────────────────────────────────────────────
  const [query, setQuery] = useState("");

  // Week 5 — custom hook handles all fetching, loading, and error state
  const { movies, genres, loading, error } = useMovies(query);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* Page header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">
          {/*
            Ternary conditional rendering (Week 4):
            🔥 Fire emoji — see emoji guide at top of file
          */}
          {query ? `Search results for "${query}"` : "🔥 Trending This Week"}
        </h1>
        <p className="text-gray-400">
          {query
            ? "Showing results from the TMDB database."
            : "The most popular movies right now."}
        </p>
      </div>

      {/* Search bar — controlled form introduced in Week 4 */}
      <div className="mb-8">
        <MovieSearch onSearch={setQuery} isLoading={loading} />
      </div>

      {/*
        ═══════════════════════════════════════════════════════════════════════
        THREE-STATE RENDERING PATTERN (Week 5 — Fetching Data From APIs)
        Every data-fetching UI must handle all three possible states:
          1. loading → show a spinner
          2. error   → show an error message with a retry option
          3. success → show the actual data
        Never leave any of these states unhandled.
        ═══════════════════════════════════════════════════════════════════════
      */}
      {loading && <Spinner message="Loading movies..." />}

      {error && !loading && (
        <ErrorMessage
          message={error}
          onRetry={() => setQuery("")}
        />
      )}

      {/* Success state — render the movie grid */}
      {!loading && !error && (
        <>
          <p className="text-gray-500 text-sm mb-6">
            {movies.length} {movies.length === 1 ? "movie" : "movies"} found
          </p>

          {/* Empty state — shown when a search returns no results */}
          {movies.length === 0 ? (
            <div className="text-center py-20">
              {/* 🎭 Performing Arts emoji — see emoji guide at top of file */}
              <span className="text-6xl">🎭</span>
              <p className="text-gray-400 mt-4">
                No movies found for "{query}". Try a different title.
              </p>
            </div>
          ) : (
            /*
              Responsive grid (Week 7 & 8 — Tailwind + Responsive Components):
              1 column on mobile → 2 on sm → 3 on md → 4 on lg.
              The sm:/md:/lg: prefixes are Tailwind's responsive breakpoints.
            */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/*
                .map() over movies to render a MovieCard for each one (Week 1).
                'key' uses movie.id — a stable, unique value from the API.
                Never use the array index as a key when the list can reorder.
              */}
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  genres={genres}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Browse;
