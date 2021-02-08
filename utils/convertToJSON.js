// Convert the fetched data to JSON and store it in new array using the map method
export const convertToJSON = (result) => {
	const dataset = result.map((data) => data.json());
	return Promise.all(dataset);
};
