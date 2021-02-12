// Fetch data from endpoint and create new array using the map method to store the data in
export const fetchData = (url, options) => {
	const response = url.map((url) => fetch(url, options));
	return Promise.all(response);
};
