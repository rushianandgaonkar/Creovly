export const CONSENT_STORAGE_KEY = 'creovly-consent';

export type ConsentChoice = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Removes Google Analytics client-side cookies (_ga, _ga_*, _gid, _gat) when consent is revoked or denied.
 * Note: Only script-accessible cookies in document.cookie can be purged.
 * Cookies with the HttpOnly flag (such as Cloudflare infrastructure cookies) cannot be read or deleted by JavaScript.
 */
export function purgeAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;

  const cookies = document.cookie ? document.cookie.split(';') : [];
  if (cookies.length === 0) return;

  const hostname = (typeof window !== 'undefined' && window.location?.hostname) ? window.location.hostname : '';
  const hostParts = hostname ? hostname.split('.') : [];
  const domains: string[] = ['']; // Empty string targets host-only cookies (no domain attribute)

  if (hostname) {
    domains.push(hostname);
    domains.push(`.${hostname}`);
  }
  if (hostParts.length > 2) {
    domains.push(`.${hostParts.slice(-2).join('.')}`);
  }

  for (const cookieStr of cookies) {
    const trimmed = cookieStr.trim();
    if (!trimmed) continue;
    const eqIdx = trimmed.indexOf('=');
    const name = (eqIdx > -1 ? trimmed.slice(0, eqIdx) : trimmed).trim();

    if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
      for (const domain of domains) {
        const domainAttr = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttr}; SameSite=Lax`;
      }
    }
  }
}

/**
 * Updates consent in localStorage, notifies Google Consent Mode v2 via gtag,
 * and purges analytics cookies if choice is 'denied'.
 */
export function setConsentChoice(choice: ConsentChoice): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    }
  } catch (_) {
    // Ignore private browsing storage restrictions / QuotaExceededError
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('consent', 'update', {
        analytics_storage: choice,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    } catch (_) {
      // Ignore gtag invocation errors
    }
  }

  if (choice === 'denied') {
    purgeAnalyticsCookies();
  }
}

/**
 * Reads stored consent choice, or returns 'unset' if not chosen yet.
 */
export function getConsentChoice(): ConsentChoice | 'unset' {
  if (typeof window === 'undefined') return 'unset';
  try {
    if (typeof localStorage !== 'undefined') {
      const val = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (val === 'granted' || val === 'denied') return val;
    }
  } catch (_) {
    // Ignore storage errors
  }
  return 'unset';
}
