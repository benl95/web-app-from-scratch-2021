import { clientID, redirectURI } from '../authorization.js';

const connectToSpotify = document.getElementById('login-button');

// Get the hash of the url
const hash = window.location.hash
	.substring(1)
	.split('&')
	.reduce(function (initial, item) {
		if (item) {
			var parts = item.split('=');
			initial[parts[0]] = decodeURIComponent(parts[1]);
		}
		return initial;
	}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = [
	'user-read-email',
	'user-read-private',
	'user-library-read',
	'user-read-recently-played',
];

// Set options
const options = {
	method: 'get',
	headers: {
		Authorization:
			'Bearer ' + new Uint8Array(clientID + ':' + _token).toString('base64'),
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	json: true,
};

// If there is no token, redirect to Spotify authorization
connectToSpotify.addEventListener('click', () => {
	if (!_token) {
		window.location = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
			'%20'
		)}&response_type=token`;
	}
	if (_token) {
		console.log('Current token: ', _token);

		fetch('https://api.spotify.com/v1/me/player/recently-played', options)
			.then((response) => {
				console.log('Response: ', response);
				return response.json();
			})
			.then((data) => {
				console.log('Data: ', data);
			});
	}
});
