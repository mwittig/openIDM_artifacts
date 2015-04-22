//Simon Moffatt - 11/03/15 - Privileged Account Password Checkout Service endpoint

//Load in external JavaScript files
load(identityServer.getProjectLocation() + "/script/pcs/passwordCheckoutServiceLogManager.js"); //Log Manager via OpenICF
load(identityServer.getProjectLocation() + "/script/pcs/passwordCheckoutServiceUtils.js"); //Password Generator etc

logger.info("Password Checkout Service - request received...");

//Globals ######################################################
var response = {}; //Response object
var passwordLength = 16;
var newPasswordResetHours = 0; //0..23 - hours from now that password will be reset
var newPasswordResetMinutes = 2 //0..59 - mins from now that password will be reset
var submittedSystem = request.additionalParameters["system"]; //Read in via URL submission
var submittedAccount = request.additionalParameters["account"]; //Read in via URL submission
var checkedOutBy = context.parent.parent.parent.parent.parent.authenticationId; ////Read in via URL submission. Better way?

logger.info("Password Checkout Service - attempting to checkout: " + submittedSystem + "/" + submittedAccount + " to: " + checkedOutBy);

//Find Account using get-by-field-value based on submitted data

//Working out whether querying against the managed/user for testing or downstream system
if (submittedSystem == "managed/user"){

	var accountQuery = openidm.query(submittedSystem, { "_queryId" : "get-by-field-value", "field":"userName", "value" : submittedAccount });
	
} else { //Downstream systems use queryFilter --> albeit might need to change uid to specific account identifier

	queryParams = {
		    '_queryFilter' : 'uid eq \"' + submittedAccount + '\"'    
		};
	
	var accountQuery = openidm.query(submittedSystem, queryParams)
	
}

//Results
var account = accountQuery.result[0];

//Globals ######################################################

//Resets the submitted account password
function resetPassword(accountPath){
	
	logger.info("Password Checkout Service - resetting password: " + accountPath);
	
	//Get new password from passwordCheckoutServiceUtils.js
	newPassword = createPW();
	
	//Read in existing object
	oldObject = openidm.read(accountPath);
	logger.info("Password Checkout Service - account read: " + oldObject);
	
	//Perform update --> this needs changing to patch when complete in ICF
	oldObject.password = newPassword;
	logger.info("Password Checkout Service - resetting object: " + oldObject);
	openidm.update(accountPath,null,oldObject);
	
	//Create a patch to submit
	//var patch = [{ "operation" : "replace" , "field" : "password", "value" : newPassword }];

	//openidm.patch(submittedSystem + "/" + account["_id"], null, patch);
	//openidm.patch(accountPath, null, patch);
	
	logger.info("Password Checkout Service - reset complete: " + accountPath + " checked out to: " + checkedOutBy + " for: " + newPasswordResetHours + " hours & "
			+ newPasswordResetMinutes + " mins");
}


//Checks that an account isn't already checked out to someone and exists on the validAccounts white list
function accountValidForCheckout(){

	logger.info("Password Checkout Service - checking account validity: " + submittedSystem + "/" + submittedAccount);
	
	accountOnWhiteList=false;
	accountCanBeCheckedOut=false;
	
	accountPath = submittedSystem + "/" + account["_id"];
	timeNow = new Date().toISOString(); //ISO861 standard time format
	
	//See if account exists in the validAccounts white list
	queryParams = {
		    '_queryFilter' : '_id eq \"' + submittedSystem + "/" + submittedAccount + '\"'
		    
		};
	
	queryResponse = openidm.query("system/pcsValidAccounts/validAccount", queryParams)
		
	//Check if the queryResponse produces a result...ie that's good, means record exists in white list
	if (queryResponse.result.length == 1) {
		
		accountOnWhiteList=true;
		logger.info("Password Checkout Service - account found in white list: " + submittedSystem + "/" + submittedAccount);
	}
	else {
		
		logger.info("Password Checkout Service - account not found in white list: " + submittedSystem + "/" + submittedAccount);
		return;
	}
	
	//See if submitted account exists in the requests repo and resetTime is ahead of Time.now
	queryParams = {
		    '_queryFilter' : 'accountPath eq \"' + accountPath + '\" and resetTime gt \"' + timeNow + '\"'
		    
		};
	
	queryResponse = openidm.query("system/pcsRequests/request", queryParams)
		
	//Check if the queryResponse produces 0 results...ie that's good, means no records in the log match
	if (queryResponse.result.length == 0) {
		
		accountCanBeCheckedOut=true;
		logger.info("Password Checkout Service - account not already checked out: " + submittedSystem + "/" + submittedAccount);

	}
	else {
		
		logger.info("Password Checkout Service - account already checked out: " + submittedSystem + "/" + submittedAccount);
		
	}
	
	//Only true if the account is on the the whilst AND is not already checked out
	return (accountOnWhiteList && accountCanBeCheckedOut);
}

//Only do this stuff if the account actually exists
if (account) {

	accountValid = accountValidForCheckout();
		
	//Only do this stuff if the account can be checked out (ie resetTime is not ahead of Time.now)
	if (accountValid){
		
		resetPassword(submittedSystem + "/" + account["_id"]); //Reset Password
		storeRequest(); 	//Record entry to persistence layer from passwordCheckoutServiceLogManager.js
		
		//Update object that gets sent back to calling user
		response.comment = "Password checked out successfully";
		response.system = submittedSystem;
		response.account = submittedAccount;
		response.password = newPassword;
		response.checkedOutBy = checkedOutBy;
		
	}
	
	else {
		
		logger.info("Password Checkout Service - account not available for checkout: " + submittedSystem + "/" + submittedAccount);
		response.comment = "Account not available for checkout"
	}

}

//If system and account query fail...
else {
	
	logger.info("Password Checkout Service - Account or System not found: " + submittedSystem + "/" + submittedAccount);
	response.comment= "Account or System not found"
	
}

//Send result back
response;
