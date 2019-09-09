const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
module.exports = (_env, _argv) => ({
  resolve: {
    extensions: [".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({ template: path.join(__dirname, "src/index.html") })
  ]
});
