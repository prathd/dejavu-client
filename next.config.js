/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */

const path = require("path");

const { config } = require("dotenv");
const withPlugins = require("next-compose-plugins");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

config();

const serverUrl = process.env.SERVER_URL || "http://localhost:4000";

module.exports = withPlugins(
  [
    [require("@zeit/next-css")],
    [require("@zeit/next-sass")],
    [require("next-fonts")],
    [
      require("next-react-svg")({
        include: path.resolve(__dirname, "public/images/icons"),
        webpack(config, options) {
          if (!options.isServer) {
            config.resolve.alias["@sentry/node"] = "@sentry/browser";
          }

          if (process.env.ANALYZE === "true") {
            config.plugins.push(
              new BundleAnalyzerPlugin({
                analyzerPort: "auto",
                reportFilename: options.isServer
                  ? "../analyze/server.html"
                  : "./analyze/client.html",
              })
            );
          }

          config.resolve.plugins = [...config.resolve.plugins, new TsconfigPathsPlugin()];

          return config;
        },
      }),
    ],
  ],
  {
    target: "serverless",
    env: {
      SERVER_URL: serverUrl,
      IS_PRODUCTION: process.env.NODE_ENV === "production",
      HEROKU_SLUG_COMMIT: process.env.HEROKU_SLUG_COMMIT,
      SENTRY_DSN: process.env.SENTRY_DSN,
      HEAP_ID: process.env.HEAP_ID,
    },
  }
);
