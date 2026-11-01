import { messagesEn, type Messages } from './en';
import { messagesEs } from './es';
import { messagesJa } from './ja';
import { messagesFr } from './fr';
import { messagesDe } from './de';
import { messagesPt } from './pt';
import { messagesKo } from './ko';
import { messagesIt } from './it';
import type { Locale } from '@/config/i18n';

export const dictionaries: Record<Locale, Messages> = {
  en: messagesEn,
  es: messagesEs,
  ja: messagesJa,
  fr: messagesFr,
  de: messagesDe,
  pt: messagesPt,
  ko: messagesKo,
  it: messagesIt,
};

export function getMessages(locale?: string | null): Messages {
  if (locale && locale in dictionaries) {
    return dictionaries[locale as Locale];
  }
  return messagesEn;
}

export type { Messages };
export default getMessages;

