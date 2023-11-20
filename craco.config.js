const cracoServiceWorkerConfig = require("./cracoServiceWorkerConfig");
// const path = require('path');
// const fs = require('fs');

const { whenDev } = require('@craco/craco');

module.exports = {
    plugins: [{ plugin: cracoServiceWorkerConfig }],

    // devServer: whenDev(() => ({
    //     https: true,
    // })),
};

