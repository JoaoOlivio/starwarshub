module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "next/core-web-vitals",
    ],
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Regras para resolver os problemas mencionados
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "warn",
  
      // Regras adicionais úteis para projetos TypeScript
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
  
      // Outras regras que você pode querer ajustar
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
    },
  }
  
  