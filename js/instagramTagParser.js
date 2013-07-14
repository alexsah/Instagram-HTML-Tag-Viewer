var maxID;

function GetQueryStringParams(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');

	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

function getInstagramObjects() {

	var instagramUrl;
	var tag = GetQueryStringParams('tag');

	if (tag == null)
		tag = "1dcoles";
	var count = 30;
	
	//Tutorial access token
	var access_token = '22033045.ea9028a.eec94286a2e049429fe51c3fbc95db20';
	var access_parameters = {
		access_token : access_token
	};

	if (maxID == "")
		instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
	else
		instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count + "&max_tag_id=" + maxID;		

	grabImages(access_parameters);

	function grabImages(parameters) {
		$.getJSON(instagramUrl, access_parameters, onDataLoaded);
	}

	function onDataLoaded(instagram_data) {
		if (instagram_data.meta.code == 200) {

			var photos = instagram_data.data;
			var nextURL = instagram_data.pagination.next_url;

			if (photos.length > 0) {

				for (var key in photos ) {
					var photo = photos[key];
					$('#target').append('<a href="' + photo.link + '" target="_blank" ><img src="' + photo.images.thumbnail.url + '"></a>');
				}

				var maxIDOrig = GetQueryStringParamsFromString('max_tag_id', nextURL);
				// .../instagram.html?tag=qwerty
				window.maxID = maxIDOrig;

			} else {
				//if the photos variable doesn’t hold data
				$('#target').append("Hmm.  I couldn’t find anything!");
			}
		} else {
			//if we didn’t get a 200 (success) request code from instagram
			//then we display instagram’s error message instagram
			var error = instagram_data.meta.error_message;
			$('#target').append('Something happened, Instagram said: ' + error);
		}

	}
	
	

	function GetQueryStringParamsFromString(sParam, url) {
		var sPageURL = url.substring(57);
		var sURLVariables = sPageURL.split('&');

		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				return sParameterName[1];
			}
		}
	}

}
