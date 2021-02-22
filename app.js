import { Router } from './router/routeHandler.js';
import { token } from './api/spotify.js';

const loginTemplate = document.getElementById('login');

(() => {
	Router();

	if (token) {
		loginTemplate.classList.toggle('login-toggle');
	}
})();
