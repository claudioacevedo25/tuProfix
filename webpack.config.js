module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react']
              }
            }
          }, 
          {
            test: /\.css$/,
            use: [
              // style-loader
              { loader: 'style-loader' },
              // css-loader
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              // // sass-loader
              // { loader: 'sass-loader' }
            ]
          }
          
          
        ]
      },
    target: "node"
}