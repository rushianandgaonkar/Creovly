export const CONSENT_STORAGE_KEY = 'creovly-consent';

export type ConsentChoice = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Removes Google Analytics cookies (_ga, _ga_*, _gid, _gat) when consent is revoked or denied.
 */
export function purgeAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;

  const cookies = document.cookie ? document.cookie.split(';') : [];
  if (cookies.length === 0) return;

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const hostParts = hostname ? hostname.split('.') : [];
  const domains: string[] = ['', hostname];

  if (hostname) {
    domains.push(`.${hostname}`);
  }
  if (hostParts.length > 2) {
    domains.push(`.${hostParts.slice(-2).join('.')}`);
  }

  for (const cookieStr of cookies) {
    const eqIdx = cookieStr.indexOf('=');
    const name = (eqIdx > -1 ? cookieStr.slice(0, eqIdx) : cookieStr).trim();

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
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch (_) {
    // Ignore private browsing storage restrictions
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: choice,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
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
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === 'granted' || val === 'denied') return val;
  } catch (_) {
    // Ignore storage errors
  }
  return 'unset';
}

