//Email verification endpoint

//bounce back if not query
//if (request.method !== "query") {
//    throw { 
//        "openidmCode" : 403, 
//        "message" : "Access denied"
//    } 
//}


//response object
response = {}

//read in parameters
submittedVerificationCode = request.params['verificationCode'];

//find user
userQuery = openidm.query("managed/user", {"_queryId": "for-userName", "uid": request.params['uid'] } );
user = userQuery.result[0];

if (user) {

	
	//only do the check if not verified
	if (user.verified === "false") {
	
		//check that submitted code matches that of user
		if (user.verificationCode === submittedVerificationCode) {
	
			//update verified attribute to be true
			openidm.patch("managed/user/" + user._id, null, [{"replace": "/verified", "value": "true"}]); 
			response.verified = "true";
			response.comment = "User now active";
		} 
	
		//if submitted code doesn't match what is on managedUser obj
		else {
	
			response.verified = "false";
			response.comment = "User not active";

		}

	}	

	//if already verified don't bother testing
	else if (user.verified === "true") {
	
		response.comment = "Already verified";
		
	}


}

else {


	response.comment = "Invalid Details";

}


//send result back
response;
