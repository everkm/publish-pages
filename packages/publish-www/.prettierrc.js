module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: false,
  arrowParens: 'always',
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
}
