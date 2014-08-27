//smof aug 27th - logic for restricting query results for managed user searches to those of same type of calling user
//place in your projects script/ directory

console.log("Request received for endpoint/scopedQuery:" + request);
//console.log("request: " + request);
//console.log("request.security " + context.security);
console.log("Requesting userName: " + context.security.authenticationId);

//_id of the user performing the read
var requestingUserId = context.security.authorizationId.id;
//read calling user object from repo
var requestingUserObj = openidm.read("managed/user/" + requestingUserId);
//console.log("User calling endpoint/customRead: " + requestingUserObj);

//get the requestingUserType
var requestingUserType = requestingUserObj.type;
console.log("Requesting user type: " + requestingUserType);

//perform a query to search only for users that match requestingUserType;
var queryParams = {
		"_queryId": "get-by-field-value", "field" :"type", "value" : requestingUserType 
};
var queryResults = openidm.query("managed/user", queryParams);

//send back results - alter this to only send back the _ids not the full obj
response = {"results" : queryResults.result};

