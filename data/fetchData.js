// Fetch data from endpoint and create new array using the map method to store the data in
// Function copied from my old frontend data repo, Vincent van Leeuwen helped me with this function
export const fetchData = (url, options) => {
	const response = url.map((url) => fetch(url, options));
	return Promise.all(response);
};
