//Simon Moffatt 13/08/15
//Runs every time a child is deleted, to remove from the associated Family.children attribute

//Global objects available
//object - the family just created

console.log("Running childOnDelete.js...", {});

// Read in the family object associated with this child
if (object.family.length > 0) {

	var family = openidm.read(object.family);
	console.log("Family object from childOnDelete: " + family, {})
	
	// Remove the parent object from the Family.children array if it exists
	if (family) {

		patch = [{ "operation":"remove","field":"children", "value": "managed/child/" + object._id }]
		openidm.patch("managed/family/" + family._id, null, patch)
			
	}

}