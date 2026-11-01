'use client';

import React from 'react';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import {
  getLocaleFromPath,
  translatePath,
  defaultLocale,
  type Locale,
} from '@/config/i18n';
import { getMessages, type Messages } from '@/messages';

export function useI18n() {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPath(pathname);
  const t = getMessages(locale);

  const translateHref = (href: string): string => {
    if (
      !href ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      return href;
    }
    return translatePath(href, locale);
  };

  return {
    locale,
    t,
    translateHref,
    isDefaultLocale: locale === defaultLocale,
  };
}

export interface LocalizedLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  children?: React.ReactNode;
  className?: string;
  locale?: Locale;
}

export const LocalizedLink = React.forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, locale: propLocale, ...props }, ref) => {
    const pathname = usePathname() || '/';
    const activeLocale = propLocale || getLocaleFromPath(pathname);

    let targetHref = href;
    if (typeof href === 'string') {
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
      ) {
        targetHref = href;
      } else {
        targetHref = translatePath(href, activeLocale);
      }
    }

    return <Link ref={ref} href={targetHref} {...props} />;
  }
);

LocalizedLink.displayName = 'LocalizedLink';

export { getMessages, type Messages };

