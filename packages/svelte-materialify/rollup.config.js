import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;
const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

const { preprocess } = require('./svelte.config');

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/index.mjs', sourcemap: true, format: 'es' },
    { file: 'dist/index.js', sourcemap: true, format: 'umd', name },
  ],
  plugins: [
    svelte({ hydratable: true, preprocess }),
    resolve(),
    commonjs(),
    production && terser(),
    production && bundleSize(),
  ],
  watch: {
    clearScreen: false,
  },
};
