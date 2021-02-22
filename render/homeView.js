import { handleData } from '../data/handleData.js';

const DOMElements = {
	itemContainer: 'item-container',
};

handleData.then((data) => {
	let listItems = createItemTemplate(data);
	console.log(listItems);
	let item = document.getElementById(DOMElements.itemContainer);
	item.innerHTML = listItems;
});

function createItemTemplate(data) {
	const item = data.reduce((result, item) => {
		let template = `
		<img src="${item.imageHref}">
		<h2>${item.playlistName}</h2>
		`;

		result += template;
		return result;
	});
	return item;
}
