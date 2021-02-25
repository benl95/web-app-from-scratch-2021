// Filter data stored in array based on the key that is passed
export function filterData(array, column, key) {
	return array.map((data) => data[column][key]);
}
