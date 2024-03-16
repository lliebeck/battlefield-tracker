export const i18n = {
  defaultLocale: "en-us",
  locales: ["en-us", "de-de"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
