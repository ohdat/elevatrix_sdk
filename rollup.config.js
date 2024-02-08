import typescript from '@rollup/plugin-typescript';  
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from './package.json';
// import livereload from 'rollup-plugin-livereload';

const footer = `
if(typeof window !== 'undefined') {
  window.elevatrix_sdk_Version = '${pkg.version}'
}`

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      footer,
    },
    {
      file: pkg.module,
      format: 'esm',
      footer,
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'elevatrix_sdk',
      footer,
    },
  ],
  plugins: [
    resolve(),
    typescript(),
    commonjs(),
    json(),
    // livereload('src'),
  ],
  external: ['ethers', '@web3modal/ethers'],
  context: 'window',
}
