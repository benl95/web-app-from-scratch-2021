import { token } from '../modules/spotify.js';

// Playlists id's
const playlist_id = ['1zwejd656eHkvkPw8yQw0u', '7C3csS72UIlhs9iY5hpntS'];

// Endpoints to fetch playlists from
const endpoints = [
	`https://api.spotify.com/v1/playlists/${playlist_id[0]}/tracks`,
	`https://api.spotify.com/v1/playlists/${playlist_id[1]}/tracks`,
];

// Use token to to access the Spotify API
const options = {
	method: 'get',
	headers: {
		Authorization: 'Bearer ' + token,
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	json: true,
};

// Fetch data from Spotify API
fetchData(endpoints, options)
	.then(convertToJSON)
	.then((data) => {
		console.log('Data: ', data);
		const endpointOne = data[0].items;
		const endpointTwo = data[1].items;
		const playlistOne = filterData(endpointOne, 'track', 'name');
		const playlistTwo = filterData(endpointTwo, 'track', 'name');
		console.log(playlistOne);
		console.log(playlistTwo);
	});

// Filter data stored in array based on the column and key that are passed
function filterData(array, column, key) {
	return array.map((data) => data[column][key]);
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
