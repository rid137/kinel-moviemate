// =============================================================================
// src/pages/Dashboard.jsx
// =============================================================================
// WEEK 10 — Protected Routes & Navigation Guards
//
// Only reachable by authenticated users — ProtectedRoute in App.jsx
// redirects anyone who is not logged in back to /login.
//
// Shows how two independent contexts (auth + watchlist) can both be
// consumed in the same component without any prop drilling.
//
// ─── EMOJIS USED IN THIS FILE ────────────────────────────────────────────────
// 👋 Waving Hand — welcome greeting
//    Mac: Cmd+Ctrl+Space → search "wave" | Win: Win+. → search "wave"
//    Copy: 👋
//
// 📋 Clipboard — "Movies Saved" stat icon
//    Mac: Cmd+Ctrl+Space → search "clipboard" | Win: Win+. → search "clipboard"
//    Copy: 📋
//
// 👤 Bust in Silhouette — "Account Type" stat icon
//    Mac: Cmd+Ctrl+Space → search "bust" | Win: Win+. → search "person"
//    Copy: 👤
//
// ✅ Check Mark Button — "Status" stat icon
//    Mac: Cmd+Ctrl+Space → search "check" | Win: Win+. → search "check"
//    Copy: ✅
// =============================================================================

import { Link } from "react-router-dom";
import { useAuth }      from "@/context/AuthContext";
import Button           from "@/components/ui/Button";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">

      {/* Welcome header */}
      <div className="bg-gradient-to-r from-brand-700 to-brand-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold">
          {/* 👋 Waving Hand emoji — see emoji guide at top of file */}
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-brand-50 mt-2">
          Manage your watchlist and movie preferences here.
        </p>

        {/*
          Role-based conditional rendering (Week 10):
          Admin accounts see a badge — regular users do not.
        */}
        {user?.role === "admin" && (
          <span className="inline-block mt-3 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
            Admin Account
          </span>
        )}
      </div>

      {/* Stats — rendered from an array using .map() (Week 1) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          // 📋 Clipboard emoji — see emoji guide at top of file
          { label: "Movies Saved", value: watchlist.length, icon: "📋" },
          // 👤 Bust in Silhouette emoji — see emoji guide at top of file
          { label: "Account Type", value: user?.role,       icon: "👤" },
          // ✅ Check Mark Button emoji — see emoji guide at top of file
          { label: "Status",       value: "Active",         icon: "✅" },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 rounded-xl p-5 text-center">
            <span className="text-3xl">{stat.icon}</span>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Watchlist preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Watchlist</h2>
          <Link to="/watchlist">
            <Button variant="ghost" size="sm">View All →</Button>
          </Link>
        </div>

        
      </div>

      {/* Account actions */}
      <div className="border-t border-gray-800 pt-6">
        <Button variant="danger" size="sm" onClick={logout}>
          Sign Out
        </Button>
      </div>
    </main>
  );
}

export default Dashboard;
