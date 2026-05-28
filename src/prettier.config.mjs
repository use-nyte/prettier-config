/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  experimentalTernaries: false,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: false,
  plugins: [
    "prettier-plugin-organize-class-members",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss"
  ],
  classSectionOrder: ["properties", "staticProperties", "constructor", "methods", "staticMethods"],
  classAccessibilityOrder: ["public", "protected", "private"],
  classGroupOrder: ["everythingElse", "gettersAndSetters"],
  classGroupSortOrder: "alphabetical"
};
