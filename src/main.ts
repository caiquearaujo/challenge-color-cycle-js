import './styles/app.scss';
import ColorComponent from './colorcomponent';

export class App {
	constructor(id: string) {
		const root = document.getElementById('root');

		if (!root) throw new Error('Cannot find application wrapper');
		new ColorComponent(root);
	}
}

export const start = () =>
	document.addEventListener('DOMContentLoaded', () => {
		new App('root');
	});
