import ColorAnimation from '../src/coloranimation';
import ColorManipulation, { TColor } from '../src/colormanipulation';

export default class ColorComponent {
	private _els: {
		input: HTMLInputElement;
		increments: {
			red: HTMLInputElement;
			green: HTMLInputElement;
			blue: HTMLInputElement;
		};
		timer: HTMLInputElement;
		start: HTMLButtonElement;
		stop: HTMLButtonElement;
		body: HTMLElement;
	};
	private _animation: ColorAnimation;

	constructor(parent: Element) {
		const html = `
		<div id="color-wrapper">
			<div class="row">
				<div class="column full">
					<label>Color</label>
					<input id="color" class="color" type="text" value="000000" />
				</div>
			</div>
			<div class="row">
				<div class="column">
					<label>+Red</label>
					<input id="increment-red" class="increment-value" type="number" min="0" max="255" value="1" />
				</div>
				<div class="column">
					<label>+Green</label>
					<input id="increment-green" class="increment-value" type="number" min="0" max="255" value="1" />
				</div>
				<div class="column">
					<label>+Blue</label>
					<input id="increment-blue" class="increment-value" type="number" min="0" max="255" value="1" />
				</div>
			</div>
			<div class="row">
				<div class="column full">
					<label>Timer in MS</label>
					<input id="timer" class="timer-value" type="number" value="250" />
				</div>
			</div>
			<div class="row">
				<button id="start">Start</button>
				<button id="stop" disabled="true">Stop</button>
			</div>
		</div>
		`;

		parent.innerHTML = html;

		this._els = {
			input: document.getElementById('color') as HTMLInputElement,
			increments: {
				red: document.getElementById(
					'increment-red'
				) as HTMLInputElement,
				green: document.getElementById(
					'increment-green'
				) as HTMLInputElement,
				blue: document.getElementById(
					'increment-blue'
				) as HTMLInputElement,
			},
			timer: document.getElementById('timer') as HTMLInputElement,
			start: document.getElementById('start') as HTMLButtonElement,
			stop: document.getElementById('stop') as HTMLButtonElement,
			body: document.querySelector('body') as HTMLElement,
		};

		this._els.input.addEventListener(
			'keypress',
			this.onKeyPress.bind(this)
		);
		this._els.start.addEventListener('click', this.onStart.bind(this));
		this._els.stop.addEventListener('click', this.onStop.bind(this));

		this._animation = new ColorAnimation(this.render.bind(this));
	}

	public onKeyPress(e: any): void {
		if (this._animation.playing()) {
			e.preventDefault();
			return;
		}

		const key = e.key;

		if (!/[a-f0-9]/i.test(key) || this._els.input.value.length >= 6) {
			e.preventDefault();
			return;
		}

		this.render(
			ColorManipulation.toDecimal(this._els.input.value.padEnd(6, '0')),
			true
		);
	}

	public onStart(): void {
		const hex = this._els.input.value.padEnd(6, '0');
		this._els.input.value = hex;

		this.disableInput(true);

		this._animation.start(
			ColorManipulation.toDecimal(hex),
			{
				R: parseInt(this._els.increments.red.value ?? 0),
				G: parseInt(this._els.increments.green.value ?? 0),
				B: parseInt(this._els.increments.blue.value ?? 0),
			},
			parseInt(this._els.timer.value ?? 0)
		);
	}

	public onStop(): void {
		this.disableInput(false);

		this._els.input.value = ColorManipulation.toString(
			this._animation.color() as TColor
		);

		this._animation.stop();
	}

	public disableInput(state: boolean) {
		this._els.input.disabled = state;
		this._els.increments.red.disabled = state;
		this._els.increments.green.disabled = state;
		this._els.increments.blue.disabled = state;
		this._els.timer.disabled = state;
		this._els.start.disabled = state;
		this._els.stop.disabled = !state;
	}

	public render(color: TColor, ignoreInput: boolean = false): void {
		const hex = ColorManipulation.toString(color);

		if (!ignoreInput) {
			this._els.input.value = ColorManipulation.toString(color);
		}

		this._els.body.style.backgroundColor = `#${hex}`;
	}
}
