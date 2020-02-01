const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rewireBabelLoader = require('react-app-rewire-babel-loader');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: { shared: path.resolve(__dirname, '../shared') },
        plugins: [
            new TsconfigPathsPlugin(),
            ...config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin))
        ]
    };

    config = rewireBabelLoader.include(config, path.resolve('../shared/src'));

    return config;
};
