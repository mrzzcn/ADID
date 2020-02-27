// rollup.config.js
// commonjs
const common = require('./rollup.js');
const { uglify } = require('rollup-plugin-uglify');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: prod ? `${common.outputDir}index.min.js` : `${common.outputDir}index.js`,
    name: common.name,
    format: 'umd',
    // When export and export default are not used at the same time, set legacy to true.
    // legacy: true,
    banner: common.banner,
  },
  plugins: [
    ...common.plugins,
    common.getCompiler({
      tsconfigOverride: { compilerOptions: { declaration: true, module: 'ES2015' } },
      useTsconfigDeclarationDir: true
    }),
    (prod && uglify())
  ]
};
