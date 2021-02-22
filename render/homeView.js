import { handleData } from '../data/handleData.js';

const DOMElements = {
	listContainer: 'list-container',
};

handleData.then((playlistData) => {
	const playlistItems = createItemTemplate(playlistData);
	const listContainer = document.getElementById(DOMElements.listContainer);
	listContainer.innerHTML = playlistItems;
});

function createItemTemplate(data) {
	const playlistItem = data.reduce((result, item) => {
		let template = `
		<div id="item-container">
			<img src="${item.imageHref}" alt="Playlist image">
			<h2>${item.playlistName}</h2>
		</div>
		`;

		result += template;
		return result;
	});
	return playlistItem;
}
