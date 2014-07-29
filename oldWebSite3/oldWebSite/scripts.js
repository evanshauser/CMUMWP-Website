var responses;
var images = new Array();
var captions = new Array();

function ajaxRequest()  {                  
	url = 'images.txt';
	document.ajaxComplete=false;                                
	var request;                                                        
	if (window.XMLHttpRequest)                                          
		request = new XMLHttpRequest();                             
	else if (window.ActiveXObject)                                      
		request = new ActiveXObject("Microsoft.XMLHTTP");           
	else {                                                              
		alert('Sorry, your browser does not support AJAX');         
		return;
	}
	request.open('GET', url, true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			initializePics(request.responseText);
		}
	};
	request.send(null);
}

function initializePics(response) {
	responses = response.split('\n');
	while (responses[responses.length - 1] == '')
		responses.splice(responses.length - 1, 1);
	for (var i = 0; i < responses.length; i++) {
		images[i] = responses[i].split('|')[0];
		captions[i] = responses[i].split('|')[1];
	}

	var str = "";
	for (var i = 0; i < images.length; i++)
		str += "<a href=\"#\" onfocus=\"this.blur()\" onclick=\"activateImage(" + i + "); return false;\"><img style=\"border: none;\" height=\"75\" src=\"" + images[i] + "\" ></img></a>";
	document.getElementById('gallerynav').innerHTML = str;
	
	var n = Math.floor(Math.random() * images.length);
	activateImage(n);
}

function activateImage(i) {
	document.getElementById('active').src = images[i];
	document.getElementById('next').setAttribute("onclick", "activateImage(" + ((i + 1) % images.length) + "); return false;");
	document.getElementById('caption').innerHTML = captions[i];
}

function ajaxSubCat(category, value, dispLocation) {
	ajaxRequest('retrieve.php', 'category='+ category + '&value=' + value, dispLocation, true);
}

function ajaxRetrieveInfo(id) {
	ajaxRequest('info.php', 'id=' + id, 'info', false);
}

