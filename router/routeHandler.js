import { handleData } from '../data/handleData.js';
import { renderHome } from '../render/homeView.js';

export const Router = () => {
	routie({
		'': function () {
			handleData.then((playlistData) => {
				renderHome(playlistData);
			});
		},
	});
};
