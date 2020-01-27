const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: { shared: path.resolve(__dirname, '../shared') },
        plugins: config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin))
    };

    return config;
};
