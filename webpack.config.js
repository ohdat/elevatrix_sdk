const path = require('path')

const resolve = (dir) => {
  return path.join(process.cwd(), dir)
}

module.exports = {
  mode: 'production',
  entry: resolve('src/index.ts'),
  output: {
    path: resolve('dist'),
    filename: 'index.umd.js',
    library: 'Elevatrix',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "babel-loader",
        exclude: ["/node_modules/"],
      },
    ]
  }
}
