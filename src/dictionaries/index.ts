import 'server-only'

const dictionaries = {
    ka: () => import('./ka.json').then((module) => module.default),
    en: () => import('./en.json').then((module) => module.default),
}

// @ts-ignore
export const getDictionary = async (locale: any) => dictionaries[locale]()