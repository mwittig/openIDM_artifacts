//Simon Moffatt - 12/08/15
//Wrapper to managed/child?_action=create os we can capture creator id on the server side

//Objects available globally
//context - Info regarding calling user context
//request - Info regarding calling request

var response = {}; //What gets sent back to calling client
var creator = context.parent.parent.parent.parent.parent.authorizationId.component + "/" + context.parent.parent.parent.parent.parent.authorizationId.id;

//Create child object based on payload from POST request
var newChildObj = request.content;
//Add in the creator as the parents endpoint
newChildObj.creator = creator;


//Create child object
var create = openidm.create("managed/child", null, newChildObj);
response.message = create;
