const appModule = require('./dist/server.js');
const app = appModule.default || appModule.app || appModule;

module.exports = app;
module.exports.default = app;
module.exports.app = app;
