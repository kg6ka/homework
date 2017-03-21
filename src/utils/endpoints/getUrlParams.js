export const getParams = (name, url = window.location.href) => {
	let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
	return results[1] || 0;
};
