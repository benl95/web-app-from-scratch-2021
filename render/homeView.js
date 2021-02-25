import { fetchPlaylist } from '../data/handleData.js';

const DOMElements = {
	listContainer: 'list-container',
};

export const renderHome = () => {
	fetchPlaylist.then((playlistData) => {
		render(playlistData);
	});
};

function hideCurrentView() {
	const loginContainer = document.getElementById('login');
	loginContainer.setAttribute('class', 'toggle');
}

function render(data) {
	const listContainer = document.getElementById(DOMElements.listContainer);
	const playlistItems = createItemTemplate(data);
	listContainer.innerHTML = playlistItems;
	hideCurrentView();
}

function createItemTemplate(data) {
	const playlistItems = data.reduce((item, key) => {
		const template = `
		<div id="item-container" class="item" data-index="${key.id}">
				<img src="${key.img}" alt="Playlist image">
				<h2>${key.playlistName}</h2>
		</div>
		`;

		item += template;
		return item;
	}, []);
	return playlistItems;
}
