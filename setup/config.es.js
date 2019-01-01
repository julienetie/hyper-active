// import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	input: './src/index.js',
	plugins: [
		buble({
            target: { chrome: 60, firefox: 53, safari: 10, edge: 15 }
        }),
		nodeResolve({
			jsnext: true,
			main: true,
			browser: true
		})
	],
    output: {
    	name: 'yogafire',
        format: 'es',
        file: './dist/yogafire.js',
        sourcemap: true
    }
};