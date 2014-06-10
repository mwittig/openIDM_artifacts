//Only do this stuff if user was previously verified; otherwise do nada
if (source.verified == 'true') {
	
	//patch the source object to replace verified to false
	openidm.patch("managed/user/" + source._id, null, [{"replace": "/verified", "value": "false"}]);
	
}

//required by OpenIDM
"ASYNC";
