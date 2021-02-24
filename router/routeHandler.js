import { renderHome } from '../render/homeView.js';

export const Router = () => {
	routie({
		'/': renderHome(),
	});
};
