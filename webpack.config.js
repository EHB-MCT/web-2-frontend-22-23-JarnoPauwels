const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        playlist: './src/playlist.js',
        login: './src/login.js'
      },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'docs'),
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'src/images',
            outputPath: 'dist/images',
      
          }
        },
      ],
    },
    mode: 'development'
}