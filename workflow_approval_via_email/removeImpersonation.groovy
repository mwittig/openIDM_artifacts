//simon.moffatt@forgerock.com 20/05/16
//Manually removes the impersonationId 

def submittedPayload = request.additionalParameters.requesterId

//Check that args via URL are actually present
if (submittedPayload == null) {
	
	throw "Missing Arg : payload"
	
} 

queryParams = ["_queryFilter": '/userName eq "'+submittedPayload+'"']
userToPatch = openidm.query("managed/user", queryParams).result[0]

response=['message':userToPatch]

 
if (userToPatch){
	
	patchParams = [[operation:'replace', field: 'idToImpersonate', value : ""]]
	openidm.patch('managed/user/'+userToPatch._id, null, patchParams)
	//Response to caller
	response=[message:"Requester updated, impersonation id removed"]
	
} else {

	//Response to caller
	response=[message:"Requester Id not found"]
}