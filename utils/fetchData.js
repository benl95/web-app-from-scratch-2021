export const fetchData = (url, options) => {
	const response = url.map((url) => fetch(url, options));
	return Promise.all(response);
};
