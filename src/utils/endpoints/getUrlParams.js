export const getParams = (name, url = window.location.href) => {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
	return results[1] || 0;
}