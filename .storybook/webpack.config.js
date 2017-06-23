const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loaders: ['raw-loader'],
        include: path.resolve(__dirname, '../'),
      }, {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loaders: ['url-loader'],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
};
