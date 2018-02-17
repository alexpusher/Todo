let webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: ['babel-polyfill' , "./app/main.js"],
  output: {
    path: __dirname,
    filename: "app.js"
  },
  resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.common.js'
        }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
	  {
		test: /\.vue$/,
		use: [
		    {loader: 'vue-loader'},
	   ]
      }
    ]
  },
}
