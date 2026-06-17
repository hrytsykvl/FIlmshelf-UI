import { Injectable, signal, WritableSignal } from '@angular/core';
import { TRANSLATIONS } from '../constants/translations';

export type AppLanguage = 'en-US' | 'uk-UA';

const LANGUAGE_KEY = 'appLanguage';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language: WritableSignal<AppLanguage>;

  constructor() {
    const stored = localStorage.getItem(LANGUAGE_KEY) as AppLanguage | null;
    this.language = signal<AppLanguage>(stored ?? 'en-US');
  }

  toggleLanguage(): void {
    const next: AppLanguage = this.language() === 'en-US' ? 'uk-UA' : 'en-US';
    this.language.set(next);
    localStorage.setItem(LANGUAGE_KEY, next);
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const lang = this.language();
    let text = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS['en-US']?.[key] ?? key;
    if (params) {
      text = Object.entries(params).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, String(v)),
        text
      );
    }
    return text;
  }
}
