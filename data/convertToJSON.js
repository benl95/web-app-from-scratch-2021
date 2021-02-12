// Convert the fetched data to JSON and store it in new array using the map method
// Function copied from my old frontend data repo, Vincent van Leeuwen helped me with this function
export const convertToJSON = (result) => {
	const dataset = result.map((data) => data.json());
	return Promise.all(dataset);
};
