import uglify from '@lopatnov/rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

module.exports = [
	{
		input: 'src/main.ts',
		output: {
			file: 'dist/color-cycle.js',
			name: 'colorCycle',
			format: 'umd',
		},
		plugins: [resolve(), typescript()],
	},
	{
		input: 'src/main.ts',
		output: {
			file: 'dist/color-cycle.min.js',
			name: 'colorCycle',
			format: 'umd',
		},
		plugins: [resolve(), typescript(), uglify()],
	},
];
