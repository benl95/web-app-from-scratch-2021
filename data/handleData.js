import { token } from '../api/spotify.js';
import { playlistEndpoint } from '../config.js';

// Use token to access the Spotify API
const options = {
	method: 'get',
	headers: {
		Authorization: 'Bearer ' + token,
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	json: true,
};

// Fetch playlist metadata from Spotify API
export const fetchPlaylist = fetchData(playlistEndpoint, options)
	.then(convertToJSON)
	.then((data) => {
		console.log('Data: ', data);
		const list = data[0].items;
		const playlistData = createItemList(list);
		console.log('Filtered data: ', playlistData);
		return playlistData;
	});

// Filter passed array in argument and get the value of the keys: name, tracks api endpoint and playlist image url
function createItemList(array) {
	const playlistData = array.map((x) => {
		const playlistItem = {
			playlistName: x.name,
			id: x.id,
			img: x.images[0].url,
		};
		return playlistItem;
	});
	return playlistData;
}

// Fetch data from endpoint and pass options as argument for Spotify Authorization
function fetchData(url, options) {
	const response = url.map((url) => fetch(url, options));
	return Promise.all(response);
}

// Convert raw data to JSON
function convertToJSON(result) {
	const dataset = result.map((data) => data.json());
	return Promise.all(dataset);
}
