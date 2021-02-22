const DOMElements = {
	listContainer: 'list-container',
};

export const renderHome = (playlistData) => {
	const playlistItems = createItemTemplate(playlistData);
	const listContainer = document.getElementById(DOMElements.listContainer);
	listContainer.innerHTML = playlistItems;
};

function createItemTemplate(data) {
	const playlistItems = data.reduce((item, key) => {
		let template = `
		<div id="item-container">
			<img src="${key.img}" alt="Playlist image">
			<h2>${key.playlistName}</h2>
		</div>
		`;

		item += template;
		return item;
	}, []);
	return playlistItems;
}
