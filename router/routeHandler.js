import { renderHome } from '../render/homeView.js';
import { renderDetail } from '../render/detailView.js';

export const Router = () => {
	routie({
		'/home': renderHome(),
		'/detail': renderDetail(),
	});
};
