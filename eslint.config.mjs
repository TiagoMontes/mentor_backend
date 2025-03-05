import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/", "node_modules/"] // 🚀 Ignora arquivos transpilados e pacotes
  },
  { languageOptions: { globals: globals.node } }, // 📌 Corrige `process is not defined`
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      "semi": ["error", "never"], // ❌ Sem ponto e vírgula
      "quotes": ["error", "double"], // ⚡ Aspas duplas
      "indent": ["error", 2], // 🏗️ Indentação de 2 espaços
      "@typescript-eslint/no-unused-vars": "warn",
      "no-undef": "off"
    }
  }
]
