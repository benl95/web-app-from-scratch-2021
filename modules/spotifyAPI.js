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
const scopes = ['user-library-read', 'user-read-email', 'user-read-private'];

// If there is no token, redirect to Spotify authorization
connectToSpotify.addEventListener('click', () => {
	if (!_token) {
		window.location = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
			'%20'
		)}&response_type=token`;
	}
});
