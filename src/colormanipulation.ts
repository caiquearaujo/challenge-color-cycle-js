export type TColor = {
	R: number;
	G: number;
	B: number;
};

export default class ColorManipulation {
	public static increment(color: TColor, increment: TColor): TColor {
		return {
			R:
				color.R +
				Math.round(
					(increment.R / 255 - Math.floor(increment.R / 255)) * 255
				),
			G:
				color.G +
				Math.round(
					(increment.G / 255 - Math.floor(increment.G / 255)) * 255
				),
			B:
				color.B +
				Math.round(
					(increment.B / 255 - Math.floor(increment.B / 255)) * 255
				),
		};
	}

	public static toDecimal(hex: string): TColor {
		if (!/^[a-f0-9]{3}|[a-f0-9]{6}$/i.test(hex))
			throw new Error(`${hex} is a invalid hex color`);

		if (hex.length === 3) {
			return {
				R: parseInt(hex[0] + hex[0], 16),
				G: parseInt(hex[1] + hex[1], 16),
				B: parseInt(hex[2] + hex[2], 16),
			};
		}

		return {
			R: parseInt(hex[0] + hex[1], 16),
			G: parseInt(hex[2] + hex[3], 16),
			B: parseInt(hex[4] + hex[5], 16),
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
