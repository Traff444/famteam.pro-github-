import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initPostHog } from "./lib/posthog.ts";
import "./styles/typography.css";
import "./index.css";

initPostHog();

// GitHub Pages SPA: restore path from 404.html redirect
const params = new URLSearchParams(window.location.search);
const redirectPath = params.get("p");
if (redirectPath) {
  window.history.replaceState(null, "", decodeURIComponent(redirectPath));
}

createRoot(document.getElementById("root")!).render(<App />);
