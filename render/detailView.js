import { fetchPlaylist } from '../data/handleData.js';
import { filterData } from '../utils/utilFunctions.js';
import { options } from '../data/handleData.js';
import { fetchData } from '../data/handleData.js';
import { convertToJSON } from '../data/handleData.js';

export const renderDetail = () => {
	fetchPlaylist.then((playlistData) => {
		Array.from(document.getElementsByClassName('item')).forEach((item) => {
			item.addEventListener('click', () => {
				const attrValue = Array.from(item.getAttribute('data-index'));
				const id = attrValue.join('');
				const endpoint = [
					`https://api.spotify.com/v1/playlists/${id}/tracks`,
				];
				fetchData(endpoint, options)
					.then(convertToJSON)
					.then((data) => {
						const tracks = data[0].items;
						const filteredTracks = filterData(tracks, 'track', 'name');
						renderItems(filteredTracks);
						hide();
					});
			});
		});
	});
};

function hide() {
	const listContainer = document.getElementById('list-container');
	listContainer.setAttribute('class', 'toggle');
}

function createTracksTemplate(data) {
	const trackItems = data.reduce((item, key) => {
		const template = `
				<li>${key}</li> 
		`;
		item += template;
		return item;
	}, []);
	return trackItems;
}

function renderItems(data) {
	const tracksContainer = document.getElementById('tracks-list');
	const trackItems = createTracksTemplate(data);
	tracksContainer.innerHTML = trackItems;
}
