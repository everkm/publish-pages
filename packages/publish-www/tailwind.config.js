const predefined_list = (process.env["TW_CONTENT_LIST"] || "")
  .split(":")
  .filter((v) => v.length);

let content_list = [
  "./public/index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx,html}",
];

if (predefined_list.length) {
  content_list = predefined_list;
}
// console.log('tailwind content list', content_list)
// console.log('env', process.env)

module.exports = {
  mode: "jit",
  content: content_list,
  darkMode: "media", // or 'media' or 'class'
  theme: {
    // colors: {
    //   blue: colors.blue,
    // },
    extend: {},
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    // require('@tailwindcss/line-clamp'),
  ],
};
