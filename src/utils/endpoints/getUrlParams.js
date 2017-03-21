export const getParams = (name, url = window.location.href) => {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
	return results ? results[1] : false;
}