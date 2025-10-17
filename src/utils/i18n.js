import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../../public/locale/en/translation.json";
import translationAR from "../../public/locale/ar/translation.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ar: {
        translation: translationAR,
      },
    },
    //fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage"],
      caches: ["cookie"],
    },
  });

export default i18n;
