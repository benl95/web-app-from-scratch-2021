import {
	fetchData,
	convertToJSON,
	options,
	fetchPlaylist,
} from '../data/handleData.js';
import { filterData } from '../utils/utilFunctions.js';

export const renderDetail = () => {
	fetchPlaylist.then(() => {
		render();
	});
};

function render() {
	const items = document.getElementsByClassName('item');
	const itemsToArray = Array.from(items);
	getDataIndexElement(itemsToArray);
}

function getDataIndexElement(array) {
	array.forEach((item) => {
		item.addEventListener('click', () => {
			const dataIndex = Array.from(item.getAttribute('data-index'));
			console.log(dataIndex);
			const id = dataIndex.join('');
			console.log(id);
			const tracksEndpoint = [
				`https://api.spotify.com/v1/playlists/${id}/tracks`,
			];

			fetchData(tracksEndpoint, options)
				.then(convertToJSON)
				.then((data) => {
					console.log(data);
					const filteredTracks = filterTracks(data);
					renderItems(filteredTracks);
					hideCurrentView();
				});
		});
	});
}

function filterTracks(data) {
	const tracks = data[0].items;
	const filteredTracks = filterData(tracks, 'track', 'name');
	return filteredTracks;
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

function hideCurrentView() {
	const listContainer = document.getElementById('list-container');
	listContainer.setAttribute('class', 'toggle');
}
