import config from "@repo/eslint-config/node"

// /** @type {import("eslint").Linter.Config} */
export default [
    {
          ignores: [
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/generated/**',
    '**/*.d.ts'
  ]
    },
    ...config
];