import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages `react` related packages come first.
            [
              "^next",
              "^react",
              "^@mui",
              "recharts",
              "^@tanstack",
              "^@dnd-kit",
              "quill",
              "^prettier",
              "dayjs",
            ],
            ["eslint", "path", "url"],
            // Internal packages.
            [
              "^@/app",
              "^@/pages",
              "^@/widgets",
              "^@/features",
              "^@/entities",
              "^@/shared",
              // Side effect imports.
              "^\\u0000",
              // Parent imports. Put `..` last.
              "^\\.\\.(?!/?$)",
              "^\\.\\./?$",
              // Other relative imports. Put same-folder imports and `.` last.
              "^\\./(?=.*/)(?!/?$)",
              "^\\.(?!/?$)",
              "^\\./?$",
              // Style imports.
              "^.+\\.?(css)$",
            ],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
