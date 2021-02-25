import { fetchPlaylist } from '../data/handleData.js';
import { filterData } from '../utils/utilFunctions.js';
import { options } from '../data/handleData.js';
import { fetchData } from '../data/handleData.js';
import { convertToJSON } from '../data/handleData.js';

export const renderDetail = () => {
	fetchPlaylist.then(() => {
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
						console.log('Tracks: ', data);
						const tracks = data[0].items;
						console.log(tracks);
						const filteredTracks = filterData(tracks, 'track', 'name');
						console.log(filteredTracks);
					});
			});
		});
	});
};
