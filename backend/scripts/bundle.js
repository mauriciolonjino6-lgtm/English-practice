const esbuild = require('esbuild');
const fs = require('fs');

esbuild.buildSync({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  external: ['pg-native'],
  footer: {
    js: 'module.exports = app; module.exports.default = app; module.exports.app = app;'
  },
  outfile: 'server.js'
});

fs.copyFileSync('server.js', 'index.js');
fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('server.js', 'dist/server.js');
fs.mkdirSync('../api', { recursive: true });
fs.copyFileSync('server.js', '../api/index.js');
fs.copyFileSync('server.js', '../api/server.js');
console.log('Successfully bundled server.js, index.js, dist/server.js, and api/index.js');
