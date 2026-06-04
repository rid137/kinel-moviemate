// =============================================================================
// src/context/AuthContext.jsx
// =============================================================================
// WEEK 10 — Protected Routes & Navigation Guards
//
// Manages authentication state across the entire app.
// Any component can check "is the user logged in?" without prop drilling.
//
// Note: this uses a SIMULATED login — no real backend.
// We store a fake user object in state to teach the auth pattern.
// In a real app you would call an API, receive a JWT token, and store that.
// =============================================================================

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = logged out, object = logged in user
  const [user, setUser] = useState(null);

    // ─────────────────────────────────────────────────────────────────────────
    // Simulated login — accepts any email/password for teaching purposes.
    // Returns a result object so the Login page can show errors without
    // needing to throw exceptions.
    // ─────────────────────────────────────────────────────────────────────────
    const login = (email, password) => {
        if (!email || !password) {
            return { success: false, error: "Email and password are required." };
        }

        // Build a fake user object that mirrors what a real API would return
        const fakeUser = {
            id: 1,
            name: email.split("@")[0], // use the part before "@" as the display name ===> for example ["eli", "gmail.com"]
            email,
            role: email.includes("admin") ? "admin" : "user", // demonstrates role-based access
        };

        setUser(fakeUser);
        return { success: true };
    };

    // Logging out is simply resetting user back to null
    const logout = () => setUser(null);

    const value = {
        user,
        isAuthenticated: user !== null, // derived boolean — no separate state needed
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an <AuthProvider>");
    }
    return context;
}
