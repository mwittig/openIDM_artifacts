//simon.moffatt@forgerock.com 20/05/16
//Manages the workflow task rejection process
//
//Verb: GET
//Args: payload - encrypted payload

//Returns:
//{"message" : "Task completed" || "Task non completed"]}

//Pull in args given via URL - now this creates an issue as the original Groovy generated object [] was serialised to String for transport
//Response object
def res = [:]

//Check that args via URL are actually present
if (request.additionalParameters.payload == null) {

	res['message'] = "Missing Arg : payload"

} else {

	def submittedPayload = request.additionalParameters.payload

	//Rehydrate the crypto object from the submitted string
	def reconstructedCryptoObject = (new groovy.json.JsonSlurper()).parseText(submittedPayload)

	//Check if object is decryptable
	if (openidm.isEncrypted(reconstructedCryptoObject) == true) {

		//Decrypt
		def decryptedObject = openidm.decrypt(reconstructedCryptoObject)
		def submittedUser = decryptedObject.user
		def submittedRejectCode = decryptedObject.code

		//Find the necessary workflow task that this request is going complete
		//Find tasks with assignee of the end user
		def queryParameters = [_queryId:'filtered-query', assignee:submittedUser]
		def queryResult = openidm.query("workflow/taskinstance/", queryParameters)

		if (queryResult.result.size != 0) {

			//Pull out the specific task id
			def taskId = queryResult.result[0]._id //Note this assumes only 1 open task is found, needs a loop if demoing and have lots of open tasks
			//Read that specific task
			def task = openidm.read("workflow/taskinstance/" + taskId)
			//Find the reject verification code embedded within this task
			def taskRejectCode = task.variables.rejectCode

			//Check if the code in the payload matches the code in the task instance
			if (taskRejectCode == submittedRejectCode) {

				//Complete the workflow - using external REST as openid.action against workflow/taskinstane doesn't support _action=complete
				completeWorkflowResponse = openidm.action("external/rest", "call", [
					"url": "http://openidm.example.com:8081/openidm/workflow/taskinstance/"+taskId+"?_action=complete",
					"method": "POST",
					"headers": [
						"Content-type": "application/json",
						"X-OpenIDM-Username": "openidm-admin",
						"X-OpenIDM-Password": "Passw0rd",
						"Accept-Language": "en-US,en"
					],
					"body": '{"userDecision": "reject"}'
				]);
				res['message'] = completeWorkflowResponse

			} else {

				res['message'] = "Task not completed"
			}



		} else {

			res['message'] = "Task not found"

		}


	}


}
return res

