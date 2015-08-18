//Simon Moffatt 13/08/15
//Runs every time a new child is created

//Global objects available
//object - the child just created

// Get the parent of the child just created
var parent = openidm.read(object.creator);
var family = "";

console.log("Running childPostCreate.js...",{});
console.log("Parent object: " + parent ,{});

// Check to see if the parent already has a family associated with them
if (parent.family.length > 0) { // Family present

	family = parent.family;

	//Patch the child with the existing family object _id
	//Patch the family with the newly created child _id

}

else { // We need to create a new family as one isn't associated with the
	// parent....ie this is the first child the parent has created

	var newFamilyObj = {};
	newFamilyObj.name = parent.sn + "_Family"; // This isn't actually needed...more for visuals
	newFamilyObj.parents = [ "managed/parent/" + parent._id ];
	newFamilyObj.children = [ "managed/child/" + object._id ];
	newFamilyObj.approvers = [ "managed/parent/" + parent._id ];
	

	// Create family object
	openidm.create("managed/family", null, newFamilyObj); // null is to allow server side _id creation

}
