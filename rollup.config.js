import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	moduleName: 'yogafire',
	entry: './src/index.js',
	plugins: [
		babel({
			babelrc: false,
			presets: ["es2015-rollup"]
		}),
		nodeResolve({
			jsnext: true,
			main: true
		}),
		commonjs()
	],
	format: 'umd',
	dest: './dist/yogafire.js'
};