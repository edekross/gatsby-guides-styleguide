const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/App.js",
  node: {
    fs: "empty",
  },
  resolve: {
    alias: {
      "~attachments": path.resolve(__dirname, "src/assets/attachments/"),
      "~images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /./,
        oneOf: [
          {
            resourceQuery: /attachment/,
            use: [
              {
                loader: "file-loader",
                options: {
                  esModule: false,
                  name: "[name].[ext]",
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.svg(\?.*)?$/,
        oneOf: [
          {
            resourceQuery: /svgr/,
            use: [
              {
                loader: "@svgr/webpack",
              },
              {
                loader: "svgo-loader",
                options: {
                  plugins: [
                    { removeTitle: true },
                    { removeDimensions: true },
                    { removeAttrs: { attrs: "data-name" } },
                  ],
                },
              },
            ],
          },
          {
            resourceQuery: /ext/,
            use: [
              {
                loader: "file-loader",
                options: {
                  esModule: false,
                },
              },
              {
                loader: "svgo-loader",
                options: {
                  plugins: [
                    { removeTitle: true },
                    { removeDimensions: true },
                    { removeAttrs: { attrs: "data-name" } },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.yaml$/,
        use: ["json-loader", "yaml-loader"],
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["emotion", "@babel/plugin-proposal-class-properties"],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          adapter: require("responsive-loader/sharp"),
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
          // {
          //   loader: "url-loader",
          //   options: {
          //     limit: 2048
          //   }
          // }
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      title: "Gatsby Guides Styleguide",
    }),
  ],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
