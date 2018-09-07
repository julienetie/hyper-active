import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
export default {
    input: './src/index.js',
    plugins: [
        buble({
            target: { ie: 10 }
        }),
        nodeResolve({
            jsnext: true,
            main: true
        })
    ],
    output: {
        name: 'yogafire',
        format: 'umd',
        file: './dist/yogafire.umd.js',
        sourcemap: true
    }

};