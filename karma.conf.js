const webpack = require("webpack");
module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    exclude: [],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    concurrency: Infinity,
    files: ["src/**/*.karma.ts"],
    preprocessors: {
      "src/**/*.karma.ts": ["webpack"]
    },
    webpack: {
      mode: "development",
      resolve: {
        extensions: [".js", ".json", ".ts"]
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: "babel-loader"
          },
          { test: /\.ts$/, use: "ts-loader" }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env.test": true
        })
      ]
    }
  });
};
