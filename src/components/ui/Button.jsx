// =============================================================================
// src/components/ui/Button.jsx
// =============================================================================
// WEEK 3 (Components & Props) — extended in Week 7 (Reusable UI Patterns)
//
// The Button component is the classic example of a reusable UI component.
// One component covers every button variant in the app.
//
// Week 3: Introduce this as the props lesson — show how default props and
//         the children prop work in practice.
// Week 7: Return to it to explain the variant pattern — how one component
//         handles all visual styles through a single 'variant' prop.
// =============================================================================

import clsx from "clsx"; // clsx applies class names conditionally — taught Week 7

// Props are destructured directly in the function signature.
// Default values (= "primary") ensure the component never breaks
// when an optional prop is not passed by the parent.
function Button({
  children,            // JSX placed between <Button>...</Button> tags
  variant  = "primary",// "primary" | "secondary" | "ghost" | "danger"
  size     = "md",     // "sm" | "md" | "lg"
  onClick,             // click handler passed from the parent
  disabled = false,    // disables interaction when true
  type     = "button", // HTML button type: "button" | "submit" | "reset"
  className = "",      // allow extra classes to be added from outside
}) {

  // ─────────────────────────────────────────────────────────────────────────
  // The Variant Pattern (Week 7 — Reusable UI Patterns):
  // All styling logic lives here. The parent just passes variant="danger"
  // and this component decides what that looks like.
  // An object lookup is cleaner than a long if/else chain.
  // ─────────────────────────────────────────────────────────────────────────
  const variantClasses = {
    primary:   "bg-brand-500 hover:bg-brand-600 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-gray-100",
    ghost:     "bg-transparent hover:bg-gray-800 text-gray-300 border border-gray-700",
    danger:    "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      // clsx merges class names and applies them conditionally (Week 7)
      className={clsx(
        // Base classes on every button regardless of variant
        "inline-flex items-center justify-center font-semibold rounded-lg",
        "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Dynamic classes driven by props
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {/* The children prop renders whatever is placed between the tags */}
      {children}
    </button>
  );
}

export default Button;

// ─────────────────────────────────────────────────────────────────────────────
// USAGE EXAMPLES (show in class during Week 3 and Week 7):
//
// <Button>Click Me</Button>
// <Button variant="danger" onClick={handleDelete}>Delete</Button>
// <Button variant="ghost" size="sm" disabled>Loading...</Button>
// <Button type="submit" size="lg">Sign In</Button>
// ─────────────────────────────────────────────────────────────────────────────
