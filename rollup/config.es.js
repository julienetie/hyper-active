import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	input: './src/index.js',
	plugins: [
		babel({
			babelrc: false,
			exclude: 'node_modules/**'
		}),
		nodeResolve({
			jsnext: true,
			main: true
		})
	],
    output: {
        format: 'es',
        file: './dist/yogafire.js',
        sourcemap: true
    }
};