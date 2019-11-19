const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const { WebpackCh5ArchiverPlugin, WebpackCh5DeployPlugin } = require("ch5-utilities-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.example$/,
        use: ["example-loader"],
        include: path.resolve(__dirname, "./")
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/appui', to: 'appui' }
    ]),
    new WebpackCh5ArchiverPlugin(),
    new WebpackCh5DeployPlugin()
  ]
};
