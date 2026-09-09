import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

// Browsers can restore the previous scroll position on reload — that
// means a reload could land mid-page instead of at the top, under the
// navbar/logo. Overriding this so every reload starts at the top,
// consistently, regardless of where the tab was scrolled to before.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// The boot splash is static HTML (see index.html) so it's visible before
// any JS runs. Fade it out once React has actually mounted and painted —
// not on a fixed timer, so it never outstays a fast load or cuts off a
// slow one.
requestAnimationFrame(() => {
  const loader = document.getElementById("app-loader");
  if (!loader) return;
  loader.style.opacity = "0";
  window.setTimeout(() => loader.remove(), 450);
});
