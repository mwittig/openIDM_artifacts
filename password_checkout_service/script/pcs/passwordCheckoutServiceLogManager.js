//Simon Moffatt - //Simon Moffatt - 11/03/15 - Password Checkout Service endpoint
//Persistence Layer

//Writes entries to persistence layer using OpenICF
function storeRequest(){
	
	//Time details
	nowTimeStamp = new Date();
		
	requestToStore={};
	
	requestToStore.requestId = nowTimeStamp.getTime().toString() + "_" + submittedSystem.replace("/","_") + "_" + account["_id"]; //Generated GUID 
	requestToStore.requestTime = nowTimeStamp.toISOString().toString(); //ISO8601 standard time format
	requestToStore.accountPath = submittedSystem + "/" + account["_id"]; //Path of the account having the password reset
	requestToStore.account = submittedAccount;
	requestToStore.checkedOutBy = checkedOutBy; //End user the account is 'checked out' to
	
	//Used to restrict which accounts the task scanner resets at a later date...otherwise all old checkouts get an unnecessary reset
	requestToStore.checkoutActive = "true";
	
	//Create resetTime
	currentHours = nowTimeStamp.getHours(); //Hours now
	currentMinutes = nowTimeStamp.getMinutes(); //Minutes now
	
	resetHours = currentHours + newPasswordResetHours; //Hours now + delta if set
	resetMinutes = currentMinutes + newPasswordResetMinutes; //Mins now + delta
	
	nowTimeStamp.setHours(resetHours); //Reset existing obj - good idea?
	nowTimeStamp.setMinutes(resetMinutes); //Reset existing obj - good idea?
	
	//Set in object
	requestToStore.resetTime = nowTimeStamp.toISOString().toString(); //ISO8601 standard time format
	
	//response.requestToStore = requestToStore;
	openidm.create("system/pcsRequests/request", null, requestToStore);

}