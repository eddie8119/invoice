import { I18n, Scope, TranslateOptions } from 'i18n-js';

import { Language } from '@/constants/i18n';
import accounting from '@/locales/accounting';
import button from '@/locales/button';
import label from '@/locales/label';
import placeholder from '@/locales/placeholder';
import sign from '@/locales/sign';
import tab from '@/locales/tab';
import title from '@/locales/title';

type Translation = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Record<Language, Translation> = {
  [Language.EN]: {
    ...placeholder[Language.EN],
    ...label[Language.EN],
    ...button[Language.EN],
    ...sign[Language.EN],
    ...title[Language.EN],
    ...accounting[Language.EN],
    ...tab[Language.EN],
  },
  [Language.ZH_TW]: {
    ...placeholder[Language.ZH_TW],
    ...label[Language.ZH_TW],
    ...button[Language.ZH_TW],
    ...sign[Language.ZH_TW],
    ...title[Language.ZH_TW],
    ...accounting[Language.ZH_TW],
    ...tab[Language.ZH_TW],
  },
};

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Language.ZH_TW;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

export const t = (scope: Scope, options?: TranslateOptions) => {
  return i18n.t(scope, { ...options });
};

export default i18n;
