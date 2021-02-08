// Filter data based on column
export const filterData = (array, column) => {
	return array.map((data) => data[column]);
};
