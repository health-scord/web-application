const config = require("config");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const loaders = require("./loaders");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

////////////////////////////////////////////////////////////////////////////////
// per-environment plugins
const environmentPlugins = (() => {
  if (process.env.NODE_ENV === "production") {
    return [
      new CompressionPlugin({
        algorithm: "gzip",
        test: /\.(js|html|css)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ];
  }

  switch (process.env.NODE_ENV) {
    case "development":
      return [
        // Hot reloading is set up in webpack-dev-server.js
      ];

    default:
      return [];
  }
})();

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [
      "./src/client.tsx",
    ],
  },

  devServer: {
    hot: false,
  },

  performance: {
    assetFilter(filename) {
      // Don't size test uncompressed javascript - we just care about the .js.gz files
      return !/\.(js|map)$/.test(filename);
    },
  },

  // https://github.com/TypeStrong/ts-loader#transpileonly-boolean-defaultfalseO
  stats: {
    warningsFilter: /export .* was not found in/,
  },

  plugins: [
    // Define global letiables in the client to instrument behavior.
    new webpack.DefinePlugin({
      // Flag to detect non-production
      __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      __TEST__: "false",
      "process.env.BROWSER": "true",
      "process.env.SERVER_URL": JSON.stringify(process.env.SERVER_URL),
      "process.env.USE_FAKE_DATA": JSON.stringify(process.env.USE_FAKE_DATA),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.TRACKING_ID": JSON.stringify(process.env.TRACKING_ID),
      "process.env.MIXPANEL_SECRET": JSON.stringify(process.env.MIXPANEL_SECRET),
      "process.env.SENTRY": JSON.stringify(process.env.SENTRY),
      "process.env.GTM": JSON.stringify(process.env.GTM),
    }),

    // Process index.html and insert script and stylesheet tags for us.
    new HtmlWebpackPlugin({
      template: "./entry/index.html",
      inject: "body",
    }),

    // Don't proceed in generating code if there are errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Extract embedded css into a file
    // new ExtractTextPlugin(
    //   config.get("minify") ? "[name].[chunkhash].css" : "[name].css"
    // ),

    // Show a nice progress bar on the console.
    new ProgressBarPlugin({
      clear: false,
    }),

    // new webpack.debug.ProfilingPlugin({
    //   outputPath: "client-build.json"
    // }),

    // new HappyPack({
    //   id: "ts",
    //   threads: process.env.CI ? 1 : Math.max(1, os.cpus().length / 2 - 1),
    //   loaders: [
    //     {
    //       path: "ts-loader",
    //       query: { happyPackMode: true, configFile: "tsconfig.client.json" },
    //     },
    //   ],
    // }),
    new ForkTsCheckerWebpackPlugin({
      // https://github.com/Realytics/fork-ts-checker-webpack-plugin#options
      useTypescriptIncrementalApi: true,
    }),

    // new webpack.ProvidePlugin({
    //   WaveSurfer: "wavesurfer.js",
    // }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename:
      //   process.env.NODE_ENV === "development"
      //     ? "[name].[chunkhash].css"
      //     : "[name].css",
      // chunkFilename:
      //   process.env.NODE_ENV === "development"
      //     ? "[name].[chunkhash].css"
      //     : "[name].css",
      filename:
        process.env.NODE_ENV === "development" ? "[name].css" : "[name].css",
      chunkFilename:
        process.env.NODE_ENV === "development" ? "[name].css" : "[name].css",
    }),

    // new CopyPlugin([
    //   { from: "./entry/img/", to: "./img/" },
    //   { from: "./entry/favicon.ico", to: "./favicon.ico" },
    //   { from: "./entry/", to: "./public/" },
    // ]),

    // new IconFontPlugin(),

    ...(process.env.ANALYZE
      ? [new (require("webpack-bundle-analyzer")).BundleAnalyzerPlugin()]
      : []),
  ].concat(environmentPlugins),

  // node: {
  //   fs: "empty",
  // },

  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename:
      process.env.NODE_ENV === "development"
        ? "client.[chunkhash].js"
        : "client.js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, "../modules"), "node_modules"],
    alias: {
      "@material-ui/core": "@material-ui/core/es",
    },
  },

  module: {
    rules: [
      {
        // Transpile non-IE compatible node modules.
        test: /\.jsx?$/,
        // Whitelist the modules inside the () in this regex:
        include: /node_modules\/(@material-ui)\//,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      loaders.clientSideTypeScript,
      loaders.graphql,
      loaders.scss,
      loaders.css,
    ].concat(loaders.allImagesAndFontsArray),
  },
  devServer: {
    publicPath: "/",
    // contentBase: "/public",
    port: 2020,
    hot: false,
    historyApiFallback: true,
    stats: "errors-only",
    // disableHostCheck: config.get("devServer.disableHostCheck"),
    proxy: {
      "/api/*": process.env.SERVER_URL,
    },
  },
};
