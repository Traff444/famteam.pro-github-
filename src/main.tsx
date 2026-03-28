import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/typography.css";
import "./index.css";

// GitHub Pages SPA: restore path from 404.html redirect
const params = new URLSearchParams(window.location.search);
const redirectPath = params.get("p");
if (redirectPath) {
  window.history.replaceState(null, "", decodeURIComponent(redirectPath));
}

createRoot(document.getElementById("root")!).render(<App />);
