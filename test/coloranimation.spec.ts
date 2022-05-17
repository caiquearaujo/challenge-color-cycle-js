import ColorAnimation from '../src/coloranimation';

describe('Color Animation', () => {
	it('should increment color after amount of time', () => {
		jest.useFakeTimers();

		let color = { R: 0, G: 0, B: 0 };
		const callback = jest.fn().mockImplementation(c => (color = c));
		const animation = new ColorAnimation(callback);

		animation.start(color, 10, 250);

		expect(callback).toHaveBeenCalledTimes(0);
		jest.advanceTimersByTime(2500);
		expect(callback).toHaveBeenCalledTimes(10);
		expect(color).toStrictEqual({ R: 100, G: 100, B: 100 });
	});

	it('should stop animation', () => {
		jest.useFakeTimers();

		const callback = jest.fn();
		const animation = new ColorAnimation(callback);

		animation.start({ R: 0, G: 0, B: 0 }, 10, 250);

		expect(callback).toHaveBeenCalledTimes(0);
		jest.advanceTimersByTime(2500);
		expect(callback).toHaveBeenCalledTimes(10);

		animation.stop();

		jest.advanceTimersByTime(2500);
		expect(callback).toHaveBeenCalledTimes(10);

		expect(animation.playing()).toBe(false);
		expect(animation.color()).toStrictEqual({ R: 100, G: 100, B: 100 });
	});
});
