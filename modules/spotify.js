import { clientID, redirectURI } from '../config.js';
import { fetchData } from '../utils/fetchData.js';
import { convertToJSON } from '../utils/convertToJSON.js';
import { filterData } from '../utils/filterData.js';

const playlist_id = ['1zwejd656eHkvkPw8yQw0u', '7C3csS72UIlhs9iY5hpntS'];
const connectToSpotify = document.getElementById('login-button');
const endpoints = [
	`https://api.spotify.com/v1/playlists/${playlist_id[0]}/tracks`,
	`https://api.spotify.com/v1/playlists/${playlist_id[1]}/tracks`,
];

// Get the hash of the url
const hash = window.location.hash
	.substring(1)
	.split('&')
	.reduce((initial, item) => {
		if (item) {
			let parts = item.split('=');
			initial[parts[0]] = decodeURIComponent(parts[1]);
		}
		return initial;
	}, {});
window.location.hash = '';

// Set token
let access_token = hash.access_token;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = [
	'user-read-email',
	'user-read-private',
	'playlist-read-collaborative',
];

// Access token options to access Spotify Web API
const options = {
	method: 'get',
	headers: {
		Authorization: 'Bearer ' + access_token,
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	json: true,
};

// If there is no token, redirect to Spotify authorization
connectToSpotify.addEventListener('click', () => {
	if (!access_token) {
		window.location = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
			'%20'
		)}&response_type=token`;
	}
});

// If there is token, fetch user account details
if (access_token) {
	fetchData(endpoints, options)
		.then(convertToJSON)
		.then((data) => {
			console.log('Data: ', data);
			const firstDataset = data[0].items;
			const secondDataset = data[1].items;
			const playlistOne = filterData(firstDataset, 'track');
			const playlistTwo = filterData(secondDataset, 'track');
			console.log(playlistOne);
			console.log(playlistTwo);
		});
}
