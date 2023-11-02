const path = require("path");

module.exports = {
  plugins: [
    require("postcss-import")({
      resolve(id, basedir) {
        if (/^@/.test(id)) return path.resolve("./src", id.slice(2));

        return path.resolve(basedir, id);
      },
    }),
    require("postcss-simple-vars")(),
    require("postcss-mixins")(),
    require("tailwindcss/nesting")(),
    require("tailwindcss")(),
    require("autoprefixer")(),
  ],
};
