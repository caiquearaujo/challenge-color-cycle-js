import ColorManipulation from '../src/colormanipulation';

describe('Color Manipulation', () => {
	const increments = [
		{
			color: { R: 30, G: 30, B: 30 },
			increment: { R: 30, G: 30, B: 30 },
			output: { R: 60, G: 60, B: 60 },
		},
		{
			color: { R: 30, G: 30, B: 30 },
			increment: { R: 100, G: 100, B: 100 },
			output: { R: 130, G: 130, B: 130 },
		},
		{
			color: { R: 30, G: 30, B: 30 },
			increment: { R: 200, G: 200, B: 200 },
			output: { R: 230, G: 230, B: 230 },
		},
		{
			color: { R: 30, G: 30, B: 30 },
			increment: { R: 400, G: 400, B: 400 },
			output: { R: 175, G: 175, B: 175 },
		},
		{
			color: { R: 30, G: 30, B: 30 },
			increment: { R: 800, G: 800, B: 800 },
			output: { R: 65, G: 65, B: 65 },
		},
	];

	it.each(increments)(
		'should increment $color to $output',
		({ color, increment, output }) => {
			expect(
				ColorManipulation.increment(color, increment)
			).toStrictEqual(output);
		}
	);

	const decimals = [
		{
			color: { R: 0, G: 0, B: 0 },
			output: '000000',
		},
		{
			color: { R: 255, G: 255, B: 255 },
			output: 'FFFFFF',
		},
		{
			color: { R: 153, G: 153, B: 153 },
			output: '999999',
		},
		{
			color: { R: 170, G: 170, B: 170 },
			output: 'AAAAAA',
		},
		{
			color: { R: 216, G: 75, B: 32 },
			output: 'D84B20',
		},
		{
			color: { R: 114, G: 20, B: 34 },
			output: '721422',
		},
		{
			color: { R: 127, G: 118, B: 121 },
			output: '7F7679',
		},
		{
			color: { R: 199, G: 180, B: 70 },
			output: 'C7B446',
		},
		{
			color: { R: 169, G: 131, B: 7 },
			output: 'A98307',
		},
		{
			color: { R: 243, G: 218, B: 11 },
			output: 'F3DA0B',
		},
		{
			color: { R: 44, G: 85, B: 69 },
			output: '2C5545',
		},
		{
			color: { R: 59, G: 131, B: 189 },
			output: '3B83BD',
		},
		{
			color: { R: 99, G: 58, B: 52 },
			output: '633A34',
		},
		{
			color: { R: 28, G: 84, B: 45 },
			output: '1C542D',
		},
	];

	it.each(decimals)(
		'should $color to be hex #$output',
		({ color, output }) => {
			expect(ColorManipulation.toString(color)).toBe(
				output.toLowerCase()
			);
		}
	);

	const hexs = [
		{
			hex: '000000',
			output: { R: 0, G: 0, B: 0 },
		},
		{
			hex: 'FFFFFF',
			output: { R: 255, G: 255, B: 255 },
		},
		{
			hex: '000',
			output: { R: 0, G: 0, B: 0 },
		},
		{
			hex: '999',
			output: { R: 153, G: 153, B: 153 },
		},
		{
			hex: 'AAA',
			output: { R: 170, G: 170, B: 170 },
		},
		{
			hex: 'FFF',
			output: { R: 255, G: 255, B: 255 },
		},
		{
			hex: 'D84B20',
			output: { R: 216, G: 75, B: 32 },
		},
		{
			hex: '721422',
			output: { R: 114, G: 20, B: 34 },
		},
		{
			hex: '7F7679',
			output: { R: 127, G: 118, B: 121 },
		},
		{
			hex: 'C7B446',
			output: { R: 199, G: 180, B: 70 },
		},
		{
			hex: 'A98307',
			output: { R: 169, G: 131, B: 7 },
		},
		{
			hex: 'F3DA0B',
			output: { R: 243, G: 218, B: 11 },
		},
		{
			hex: '2C5545',
			output: { R: 44, G: 85, B: 69 },
		},
		{
			hex: '3B83BD',
			output: { R: 59, G: 131, B: 189 },
		},
		{
			hex: '633A34',
			output: { R: 99, G: 58, B: 52 },
		},
		{
			hex: '1C542D',
			output: { R: 28, G: 84, B: 45 },
		},
	];

	it.each(hexs)('should #$hex to be color #$output', ({ hex, output }) => {
		expect(ColorManipulation.toDecimal(hex)).toStrictEqual(output);
	});
});
