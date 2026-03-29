import posthog from "posthog-js";

const POSTHOG_KEY = "phx_GK31muADQ9kt2sQvARPN1T8lOgfPlurfxTt5X3c4D6W6PSa";
const POSTHOG_HOST = "https://us.i.posthog.com";

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
