export const getParams = (name, url = window.location.href) => {
	let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
	return results ? results[1] : false;
}
