export const convertToJSON = (result) => {
	const dataset = result.map((data) => data.json());
	return Promise.all(dataset);
};
