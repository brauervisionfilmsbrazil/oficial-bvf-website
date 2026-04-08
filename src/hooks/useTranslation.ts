import { useLanguage } from '@/contexts/LanguageContext';
import ptTranslations from '@/locales/pt.json';
import enTranslations from '@/locales/en.json';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

const translations = {
  pt: ptTranslations,
  en: enTranslations,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, language };
};
