// https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript#:~:text=var%20ms%20%3D%20298999%3B%20var%20min,min%2B'%3A'%2Bsec)%3B
// Convert @param millis to minutes and seconds
export function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
