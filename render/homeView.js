import { fetchPlaylist } from '../data/handleData.js';

const DOMElements = {
	listContainer: 'list-container',
};

// Render playlist data to view
export const renderHome = () => {
	fetchPlaylist.then((playlistData) => {
		render(playlistData);
	});
};

// Select listContainer, create item template from @param data, set innerHTML value of listcontainer to value of playlistItems
function render(data) {
	const listContainer = document.getElementById(DOMElements.listContainer);
	const playlistItems = createItemTemplate(data);
	listContainer.innerHTML = playlistItems;
	hideCurrentView();
}

// Iterate over @param data, create html template for data, concetanate the template to each item in @param data
// Returns array of template items to render to screen
function createItemTemplate(data) {
	const playlistItems = data.reduce((item, key) => {
		const template = `
		<div id="item-container" class="item" data-index="${key.id}">
				<img src="${key.img}" alt="Playlist image">
				<span class="play-button">
					<span class="play-icon"></span>
				</span>
				<h2>${key.playlistName}</h2>
				<p>Van ${key.owner}</p>
		</div>
		`;

		item += template;
		return item;
	}, []);
	return playlistItems;
}

// Hide previous screen to make place for current screen
function hideCurrentView() {
	const loginContainer = document.getElementById('login');
	loginContainer.setAttribute('class', 'toggle');
}
