import "server-only";
import LANGS from "./langs";

const dictionaries = LANGS.reduce((acc, lang) => {
  acc[lang.value] = () =>
    import(`./${lang.value}.json`).then((module) => module.default);
  return acc;
}, {} as any);

// @ts-ignore
export const getDictionary = async (locale: any) => dictionaries[locale]();
