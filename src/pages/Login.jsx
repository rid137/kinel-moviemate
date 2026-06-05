// =============================================================================
// src/pages/Login.jsx
// =============================================================================
// WEEK 4 (controlled form pattern) → Week 10 (auth + redirect after login)
//
// Week 4: Controlled form with multiple inputs using ONE handleChange function,
//         form validation with inline error messages, e.preventDefault().
//
// Week 10: After a successful login, navigate back to wherever the user was
//          trying to go — stored in location.state by ProtectedRoute.
//
// ─── EMOJIS USED IN THIS FILE ────────────────────────────────────────────────
// 🎬 Film Clapperboard — logo icon in the login card
//    Mac: Cmd+Ctrl+Space → search "clapper" | Win: Win+. → search "clapper"
//    Copy: 🎬
// =============================================================================

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // ─────────────────────────────────────────────────────────────────────────
  // CONTROLLED FORM WITH MULTIPLE INPUTS (Week 4 — Handling Events & Forms)
  //
  // One state object manages all fields.
  // One handleChange function handles all inputs using computed property key:
  //   [e.target.name] reads the 'name' attribute of whichever input fired,
  //   then updates only that field while keeping the rest unchanged via spread.
  // ─────────────────────────────────────────────────────────────────────────
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // always prevent browser page reload on submit
    setError("");
    setIsSubmitting(true);

    const result = login(form.email, form.password);

    if (!result.success) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    // ─────────────────────────────────────────────────────────────────────
    // REDIRECT AFTER LOGIN (Week 10 — Protected Routes)
    //
    // ProtectedRoute stores the intended URL in location.state.from
    // before redirecting to /login. After login we send the user back.
    // ─────────────────────────────────────────────────────────────────────
    const destination = location.state?.from?.pathname || "/dashboard";
    navigate(destination, { replace: true });

    // navigate("/dashboard");
  };

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl p-8 shadow-xl space-y-6">

          <div className="text-center">
            {/* 🎬 Film Clapperboard emoji — see emoji guide at top of file */}
            <span className="text-5xl">🎬</span>
            <h1 className="text-2xl font-bold mt-3">Sign in to MovieMate</h1>
            <p className="text-gray-400 text-sm mt-1">
              Use any email and password — this is a demo login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2
                           focus:ring-brand-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2
                           focus:ring-brand-500 transition-all"
              />
            </div>

            {/* Conditional error message — only rendered when error is non-empty */}
            {error && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/browse" className="text-brand-500 hover:underline">
              Browse as guest
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
