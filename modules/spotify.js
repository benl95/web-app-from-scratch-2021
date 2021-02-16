import { clientID, redirectURI } from '../config.js';

const connectToSpotify = document.getElementById('login-button');

// https://gist.github.com/arirawr/f08a1e17db3a1f65ada2c17592757049
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

// If there is no token, redirect to Spotify authorization
connectToSpotify.addEventListener('click', () => {
	if (!access_token) {
		window.location = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
			'%20'
		)}&response_type=token`;
	}
});

export const token = access_token;
