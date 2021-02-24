import { Router } from './router/routeHandler.js';
import { token } from './api/spotify.js';

const loginContainer = document.getElementById('login');

(() => {
	Router();

	if (token) {
		loginContainer.setAttribute('class', 'login-toggle');
	}
})();
