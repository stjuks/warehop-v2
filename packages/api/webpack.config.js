const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.node'], //resolve all the modules other than index.ts
        plugins: [new TsconfigPathsPlugin()]
    },
    plugins: [new Dotenv()],
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts?$/
            }
        ]
    },
    externals: [nodeExternals({ modulesDir: path.resolve(__dirname, '../../node_modules') })]
};
