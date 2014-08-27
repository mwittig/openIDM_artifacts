//smof aug 27 2014
//copy the bin/defaults/script/router-authz.js file to your projects script/ directory.
//add the following function to the end of that file

function isSameType(){
	
    var sameType = false;

    //user performing operation
    var userId = context.security.authorizationId.id;
    
    //find out the type of the user performing operation
    var requestingUserType = openidm.read("managed/user/" + userId).type;
    console.log("requestingUserType: " + requestingUserType);
    
    //HTTP request type (read, update, create, delete, patch)
    var requestMethod = request.method;
    
    //provide scenarios for different HTTP methods
    switch (requestMethod) {
    
    case "delete":
    case "read" :
    	
    	//the user obj that the requesting operation is against...if it exists
    	var requestedUser = openidm.read(request.resourceName);
    	
    	//set the type of the user being read/deleted
    	if (requestedUser) { //if user exists
    	
    		requestedUserType = requestedUser.type;
    		
    	}
    	else {//if user doesn't exist
    		
    		sameType = true; //to allow query to go ahead and give the user the response that the user doesn't exist
    		break; //jump out of switch as user doesn't exist anyway
    	}
    	
	    console.log("requestedUserType: " + requestedUserType);
	    //perform compare between user being read/deleted and user performing request
	    var sameType = (requestedUserType === requestingUserType); 
	    console.log("sameType: "  + sameType);
    	break;
    
    case "update":
    case "patch":
    case "create":
    	
    	//type of the user being submitted in the JSON payload
    	payloadUserType = request.content.type;
		console.log("payloadUserType: " + payloadUserType);
		//perform compare between user in the payload and the user performing request
		var sameType = (payloadUserType === requestingUserType); 
	    console.log("sameType: "  + sameType);
    	break;
    	
    }

	return sameType;
   
}
