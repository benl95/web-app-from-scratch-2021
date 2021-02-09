// Filter data based on column, return the value of a track name and create a new array
export const filterData = (array, column) => {
	return array.map((data) => data[column].name);
};
