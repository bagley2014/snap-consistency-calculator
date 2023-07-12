module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
		{
			files: ['**/*.{js,cjs,mjs,jsx}'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
			env: {
				node: true,
			},
		},
	],
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ caughtErrorsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
		],
		'no-duplicate-imports': ['error', { includeExports: true }],
	},
}
