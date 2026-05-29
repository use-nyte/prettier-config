// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const loadPlugin = async (specifier) => {
  const plugin = await import(specifier);

  return plugin.default ?? plugin;
};

const plugins = await Promise.all([
  loadPlugin("prettier-plugin-organize-class-members"),
  loadPlugin("prettier-plugin-organize-imports"),
  loadPlugin("prettier-plugin-tailwindcss")
]);

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
  plugins: plugins,
  classSectionOrder: ["properties", "staticProperties", "constructor", "methods", "staticMethods"],
  classAccessibilityOrder: ["public", "protected", "private"],
  classGroupOrder: ["everythingElse", "gettersAndSetters"],
  classGroupSortOrder: "alphabetical"
};
