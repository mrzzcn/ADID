// ES output
var common = require('./rollup.js');

module.exports = {
  input: 'src/index.ts',
  output: {
    file: `${common.outputDir}index.esm.js`,
    format: 'es',
    // When export and export default are not used at the same time, set legacy to true.
    // legacy: true,
    banner: common.banner,
  },
  plugins: [
    ...common.plugins,
    common.getCompiler()
  ]
};
