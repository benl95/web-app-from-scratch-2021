import { fetchPlaylist } from '../data/handleData.js';
import { filterData } from '../utils/utilFunctions.js';

const DOMElements = {
	playlistItem: document.getElementsByClassName('item'),
};

export const renderDetail = () => {
	fetchPlaylist
		.then((playlistData) => {
			const idList = filterData(playlistData, 'id');
			const trackEndpoints = createEndpoint(idList);
			console.log(trackEndpoints);
			return trackEndpoints;
		})
		.then((trackEndpoints) => {
			const elements = DOMElements.playlistItem;

			for (let i = 0; i < elements.length; i++) {
				elements[i].addEventListener('click', () => {
					console.log('Clicked');
					const id = elements[i].getAttribute('data-index');
					console.log(id);
				});
			}
		});
};

// Loop through array and create endpoint link for each item in array
function createEndpoint(array) {
	const endpoints = array.map((id) => {
		const playlist_id = id;
		let links = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
		return links;
	});
	return endpoints;
}
