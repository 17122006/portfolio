/** True when a config value is a non-empty string. */
export const isConfigured = (value) => typeof value === 'string' && value.trim() !== '';

/**
 * Only lets through http(s), mailto and same-site paths — so a typo (or a
 * `javascript:` URL pasted into a data file) can never become a live link.
 */
export function safeUrl(value) {
  if (!isConfigured(value)) return '';
  const url = value.trim();
  return /^(https?:\/\/|mailto:|\/|#)/i.test(url) ? url : '';
}

/** Props for an <a>: external links open in a new tab with safe rel attributes. */
export function linkProps(value) {
  const href = safeUrl(value);
  if (!href) return null;
  if (/^https?:\/\//i.test(href)) {
    return { href, target: '_blank', rel: 'noopener noreferrer' };
  }
  return { href };
}
