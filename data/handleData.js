import { token } from '../modules/spotify.js';

// Endpoint to retrieve list of playlists of a user from
const playlistEndpoint = [`https://api.spotify.com/v1/users/me/playlists`];

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
export const handleData = fetchData(playlistEndpoint, options)
	.then(convertToJSON)
	.then((data) => {
		console.log('Data: ', data);
		const list = data[0].items;
		const metaData = filterData(list);
		console.log(metaData);
		return metaData;
	});

// Filter passed array in argument and get the value of the keys: name, tracks api endpoint and playlist image url
function filterData(array) {
	const metaData = array.map((x) => {
		const keys = {
			playlistName: x.name,
			tracksEndpoint: x.tracks.href,
			imageUrl: x.images[0].url,
		};
		return keys;
	});
	return metaData;
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
