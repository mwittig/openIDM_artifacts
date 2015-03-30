//Simon Moffatt - 11/03/15 - Password Checkout Service endpoint
//Called via taskscanner to reset 
//Global input, objectID

logger.info("Password Checkout Service Background Scanner Starting..");

//Import passwordCheckoutService functions
load(identityServer.getProjectLocation() + "/script/pcs/passwordCheckoutServiceUtils.js"); //Password Generator etc

//Perform reset password
function resetPassword(accountPath){
	
	logger.info("Password Checkout Service Background Scanner: resetting password " + accountPath);
	
	//Get new password from passwordCheckoutServiceUtils.js
	newPassword = createPW();
	
	//Create a patch to reset password
	var patch = [{ "operation" : "replace" , "field" : "password", "value" : newPassword }];
	openidm.patch(accountPath, null, patch);
		
}

//Updates the record in the Password Checkout Service repo to resetComplete = true; this is to prevent older checkouts getting unecessary pw resets
function resetCompleteToTrue(accountObj){
	
	newAccountObj = accountObj;
	newAccountObj.checkoutActive = "false";
	logger.info("Password Checkout Service Background Scanner: resetting entry " + newAccountObj);
	openidm.update("system/pcsRequests/request/" + newAccountObj._id, null, newAccountObj);
	
}


//Search for accounts that need a reset that exist in the Password Checkout Service persistent store
timeNow = new Date().toISOString(); //ISO861 standard time format

//See if submitted account exists in the log and resetTime is ahead of Time.now
queryParams = {
	    '_queryFilter' : 'resetTime lt \"' + timeNow + '\" and checkoutActive eq true'
	    
	};

//Query the Password Checkout Service repo
var queryResponse = openidm.query("system/pcsRequests/request", queryParams) //This contains all accounts that need reset at timeNow...

logger.info("Password Checkout Service Background Scanner: operating on the following accounts: " + queryResponse.result);

//Iterate over the queryResponse.result array and ping off to the resetPassword function
for (i=0; i < queryResponse.result.length; i++) {
			
		resetPassword(queryResponse.result[i]["accountPath"]); //Performs PW Reset on target
		
}

//Iterate over the queryResponse.result array and ping off to the resetCompleteToTrue function
for (i=0; i < queryResponse.result.length; i++) {
				
	resetCompleteToTrue(queryResponse.result[i]) //Updates PCS repo to say reset has completed
		
}


