module.exports = {


	entry: {
		javascript: "./src/app/app.js",
		html: "./src/index.html",
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
				test: /\.html$/,
  				loader: "file?name=[name].[ext]",
			},
			{
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
		],
	},
}