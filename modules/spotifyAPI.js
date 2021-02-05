import { clientID } from '../authorization.js';

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
let access_token = hash.access_token;
const redirectURI = window.location.origin;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = ['user-read-email', 'user-read-private'];

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
	fetch('https://api.spotify.com/v1/me', options)
		.then((response) => {
			console.log('Response: ', response);
			return response.json();
		})
		.then((data) => {
			console.log('Data: ', data);
			let displayName = document.getElementById('display-name');
			displayName.innerHTML = data.display_name;
		});
}
