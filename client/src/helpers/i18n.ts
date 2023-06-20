import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ruI18n } from "../translation/ru";
import { enI18n } from "../translation/en";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enI18n },
        ru: { translation: ruI18n },
    },
    lng: localStorage.getItem("lang") || "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
