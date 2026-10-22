export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}

/** Smoothly scrolls to a section by id, updates the URL hash and moves focus for keyboard/screen-reader users. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  try {
    window.history.replaceState(null, '', `#${id}`);
  } catch {
    /* ignore (e.g. sandboxed iframes) */
  }
  el.focus({ preventScroll: true });
  return true;
}
