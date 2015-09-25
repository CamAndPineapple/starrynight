module.exports = {


  entry: {
    javascript: "./src/app/app.js",
  },

  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"],
      },
      {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
    ],
  },
}