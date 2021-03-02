import { renderHome } from '../render/homeView.js';
import { renderDetail } from '../render/detailView.js';

// Handle render functions on routes
export const Router = () => {
	routie({
		'/home': renderHome(),
		'/detail': renderDetail(),
	});
};
