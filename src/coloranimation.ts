import ColorManipulation, { TColor } from './colormanipulation';

export default class ColorAnimation {
	private _interval: NodeJS.Timer | null = null;
	private _color: TColor | null = null;
	private _onUpdate: (color: TColor) => void;

	constructor(onUpdate: (color: TColor) => void) {
		this._onUpdate = onUpdate;
	}

	public start(color: TColor, increment: number, timer: number = 250) {
		this._color = color;

		this._interval = setInterval(() => {
			this._color = ColorManipulation.increment(this._color as TColor, {
				R: increment,
				G: increment,
				B: increment,
			});

			this._onUpdate(this._color);
		}, timer);
	}

	public stop() {
		if (!this._interval) return;

		clearInterval(this._interval);
		this._interval = null;
	}

	public color(): TColor | null {
		return this._color;
	}

	public playing(): boolean {
		return this._interval !== null;
	}
}
