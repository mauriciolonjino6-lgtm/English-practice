let app;
let bootError = null;

try {
  const appModule = require('./dist/server.js');
  app = appModule.default || appModule;
} catch (err) {
  bootError = {
    message: err && err.message,
    stack: err && err.stack,
    code: err && err.code
  };
  console.error('[CRITICAL BACKEND BOOT ERROR]', err);
}

function handler(req, res) {
  if (bootError) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      error: 'Backend Boot Failed',
      details: bootError
    }, null, 2));
  }

  try {
    return app(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      error: 'Backend Execution Error',
      message: err && err.message,
      stack: err && err.stack
    }, null, 2));
  }
}

if (app) {
  Object.setPrototypeOf(handler, app);
  Object.assign(handler, app);
}

module.exports = handler;
module.exports.default = handler;
module.exports.app = handler;
