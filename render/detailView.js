import {
	fetchData,
	convertToJSON,
	options,
	fetchPlaylist,
} from '../data/handleData.js';

export const renderDetail = () => {
	fetchPlaylist.then(() => {
		render();
	});
};

function render() {
	const items = document.getElementsByClassName('item');
	const itemsToArray = Array.from(items);
	getIdAndFetchTracks(itemsToArray);
}

function getIdAndFetchTracks(array) {
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
					console.log(data);
					const filteredTracks = filterTracks(data);
					renderItems(filteredTracks);
					hideCurrentView();
				});
		});
	});
}

function createItemList(array) {
	const playlistTracks = array.map((x) => {
		const playlistItem = {
			artist: x.track.artists[0].name,
			song: x.track.name,
			duration: x.track.duration_ms,
		};
		return playlistItem;
	});
	return playlistTracks;
}

function filterTracks(data) {
	const tracks = data[0].items;
	const filteredTracks = createItemList(tracks);
	console.log(filteredTracks);
	return filteredTracks;
}

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
					</div>
				</div>
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
