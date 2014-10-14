//Sends verification email

response object
response = {}

function sendVerificationEmail(email, url) {

	var params =  new Object();
	params._from = "openidm@example.com";
	params._to = email;
	params._subject = "Registration Verification";
	params._type = "text/html";
	params._body = "<html><body>Please click the following verification link to confirm your email:" + url + "</body></html>";

	//sends mail
	openidm.action("external/email", params);

}


//find user
userQuery = openidm.query("managed/user", {"_queryId": "get-by-field-value", "field" : "email", "value": request.params['email'] } );
user = userQuery.result[0];

if (user && user.verified === "false") {

	url = "http://openidm.example.com:8080/openidm/endpoint/verifyEmail?uid="+user.userName+"&verificationCode="+user.verificationCode;	
	email = user.email;
	sendVerificationEmail(email, url);
	response.comment = "Verification email sent";
}

else {


	response.comment = "Invalid details or user already verified";

}


//send result back
response;


