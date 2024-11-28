const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  // Entry point of your application
  entry: './server.js',  // Update this to your actual entry file

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),  // Directory for the output bundle
    filename: 'bundle.js',  // Output filename for the bundled file
  },

  // Add the target property outside the output section
  target: 'node',  // Tells Webpack that this is for a Node.js environment
  mode: 'development',  // Change to 'production' for production builds
  // Exclude node_modules from the bundling process
  externals: [webpackNodeExternals()],

  // Module rules to handle JavaScript files
  module: {
    rules: [
      {
        test: /\.js$/,  // For JavaScript files
        exclude: /node_modules/,  // Don't process files inside node_modules
        use: {
          loader: 'babel-loader',  // Use Babel for transpiling JavaScript
          options: {
            presets: ['@babel/preset-env'],  // Babel preset to transpile modern JS
          },
        },
      },
    ],
  },

  // Resolve extensions for modules
  resolve: {
    extensions: ['.js', '.json'],
  },

  // Optional: Add any necessary plugins here
  plugins: [],
};
