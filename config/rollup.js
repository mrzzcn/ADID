var typescript = require('rollup-plugin-typescript2');
const replace = require('@rollup/plugin-replace');

var pkg = require('../package.json');

var version = pkg.version;

var banner =
  `/*!
 * ${pkg.name.toUpperCase()} ${version}
 * API ${pkg.homepage}
 */
`;

function getCompiler (opt) {
  opt = opt || {
    tsconfigOverride: { compilerOptions: { module: 'ES2015' } }
  }

  return typescript(opt);
}

exports.name = pkg.name.toUpperCase();
exports.banner = banner;
exports.getCompiler = getCompiler;
exports.outputDir = 'lib/';
exports.plugins = [
  replace({
    'VERSION': version,
  })
]
