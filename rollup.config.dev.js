import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import livereload from 'rollup-plugin-livereload';

function serve() {
	// Keep a reference to a spawned server process
	let server;

	function toExit() {
		// Kill the server if it exists
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			// Spawn a child server process
			server = require('child_process').spawn(
				'npm',
				['run', 'dev:start'],
				{
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				}
			);

			// Kill the server on process termination or exit
			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		},
	};
}

module.exports = [
	{
		input: 'src/main.ts',
		output: {
			file: 'public/dist/color-cycle.js',
			name: 'colorCycle',
			format: 'umd',
		},
		plugins: [
			resolve({ browser: true }),
			typescript(),
			scss({
				output: 'public/dist/styles.css',
				processor: () => postcss([autoprefixer()]),
				outputStyle: 'compressed',
				watch: 'src/styles',
			}),
			serve(),
			livereload('public'),
		],
	},
];
