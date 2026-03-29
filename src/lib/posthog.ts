import posthog from "posthog-js";

const POSTHOG_KEY = "phc_8z0ArUBbl50QGK6svSsXGDgNVlwnPNhpn5z7npPzPKE";
const POSTHOG_HOST = "https://eu.i.posthog.com";

export function initPostHog() {
  if (typeof window === "undefined") return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // SPA — трекаем вручную
    capture_pageleave: true,
    autocapture: true, // клики, инпуты, формы
    session_recording: {
      recordCrossOriginIframes: true,
    },
    enable_heatmaps: true,
  });
}

// SPA pageview — вызывать при каждом переходе
export function trackPageView(path?: string) {
  posthog.capture("$pageview", {
    $current_url: window.location.origin + (path || window.location.pathname),
  });
}

// Кастомные события
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  posthog.capture(event, properties);
}

// Идентификация при отправке формы
export function identifyUser(contact: string, properties?: Record<string, unknown>) {
  posthog.identify(contact, properties);
}

export { posthog };
