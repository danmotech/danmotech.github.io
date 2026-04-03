import en from "./locales/en.json";
import zh from "./locales/zh.json";
import de from "./locales/de.json";
import es from "./locales/es.json";
import ar from "./locales/ar.json";

export type Locale = "en" | "zh" | "de" | "es" | "ar";

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>;
};

export type TranslationKeys = DeepString<typeof en>;

const translations: Record<Locale, TranslationKeys> = { en, zh, de, es, ar };

export default translations;
