export type TColor = {
	R: number;
	G: number;
	B: number;
};

export default class ColorManipulation {
	public static colorLimit(n: number) {
		const prop = n / 255;
		return Math.round((prop - Math.floor(prop)) * 255);
	}

	public static increment(color: TColor, increment: TColor): TColor {
		return {
			R: ColorManipulation.colorLimit(
				color.R + ColorManipulation.colorLimit(increment.R)
			),
			G: ColorManipulation.colorLimit(
				color.G + ColorManipulation.colorLimit(increment.G)
			),
			B: ColorManipulation.colorLimit(
				color.B + ColorManipulation.colorLimit(increment.B)
			),
		};
	}

	public static toDecimal(hex: string): TColor {
		if (!/^[a-f0-9]{1,6}$/i.test(hex))
			throw new Error(`${hex} is a invalid hex color`);

		if (hex.length === 3) {
			return {
				R: parseInt(hex[0] + hex[0], 16),
				G: parseInt(hex[1] + hex[1], 16),
				B: parseInt(hex[2] + hex[2], 16),
			};
		}

		return {
			R: parseInt((hex[0] ?? '0') + (hex[1] ?? '0'), 16),
			G: parseInt((hex[2] ?? '0') + (hex[3] ?? '0'), 16),
			B: parseInt((hex[4] ?? '0') + (hex[5] ?? '0'), 16),
		};
	}

	public static toString(color: TColor): string {
		return (
			color.R.toString(16).padStart(2, '0') +
			color.G.toString(16).padStart(2, '0') +
			color.B.toString(16).padStart(2, '0')
		);
	}
}
