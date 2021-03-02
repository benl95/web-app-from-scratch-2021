import {
	fetchData,
	convertToJSON,
	options,
	fetchPlaylist,
} from '../data/handleData.js';
import { millisToMinutesAndSeconds } from '../utils/utilFunctions.js';

export const renderDetail = () => {
	fetchPlaylist.then(() => {
		render();
	});
};

// Render tracks of playlist to view
function render() {
	const items = document.getElementsByClassName('item');
	const itemsToArray = Array.from(items);
	getIdAndFetchAndRenderTracks(itemsToArray);
}

// Iterate over @param array and add event listener to each item in @param array
// Onclick convert htmlCollection to array, get data-index from element and generate specific tracks endpoint for playlist
// Fetch tracks of playlist using @const tracksEndpoint as @param url
function getIdAndFetchAndRenderTracks(array) {
	array.forEach((item) => {
		item.addEventListener('click', () => {
			const dataIndex = Array.from(item.getAttribute('data-index'));
			const id = dataIndex.join('');
			const tracksEndpoint = [
				`https://api.spotify.com/v1/playlists/${id}/tracks`,
			];

			fetchData(tracksEndpoint, options)
				.then(convertToJSON)
				.then((data) => {
					const filteredTracks = filterTracks(data);
					renderItems(filteredTracks);
					hideCurrentView();
				});
		});
	});
}

// Iteraye over @param array and for each item in array store the value of keys @key artist, @key song and @duration
//	Return arrays with values of tracks from playlist
function createItemList(array) {
	const playlistTracks = array.map((d) => {
		const playlistItem = {
			artist: d.track.artists[0].name,
			song: d.track.name,
			duration: millisToMinutesAndSeconds(d.track.duration_ms),
		};
		return playlistItem;
	});
	return playlistTracks;
}

// @param data store array items in tracks, createItemList, and return the filteredData
function filterTracks(data) {
	const tracks = data[0].items;
	const filteredTracks = createItemList(tracks);
	return filteredTracks;
}

// Iterate over @param data, create html template for data, concetanate the template to each item in @param data
// Returns array of template items to render to screen
function createTracksTemplate(data) {
	const trackItems = data.reduce((item, key, i) => {
		const template = `
				<div class="row">
					<div class="tracklist-row">
						<div class="number">
							<span>${[i + 1]}</span>
						</div>
						<div class="track-info">
							<h2>${key.song}</h2>
							<span>${key.artist}</span>
						</div>
						<div class="duration">
							<span>${key.duration}</span>
						</div>
					</div>
				</div>
		`;
		item += template;
		return item;
	}, []);
	return trackItems;
}

// Select tracksContainer, create tracks template @param data, set innerHTML value of tracksContainer to value of trackItems
function renderItems(data) {
	const tracksContainer = document.getElementById('tracks-container');
	const trackItems = createTracksTemplate(data);
	tracksContainer.innerHTML = trackItems;
}

// Hide previous screen to make place for current screen
function hideCurrentView() {
	const listContainer = document.getElementById('list-container');
	listContainer.setAttribute('class', 'toggle');
}
