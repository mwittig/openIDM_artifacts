//Simon Moffatt 13/08/15
//Runs every time a parent is deleted, to remove from the associated Family.parents attribute

//Global objects available
//object - the family just created

console.log("Running parentOnDelete.js...", {});

// Read in the family object associated with this parent
if (object.family.length > 0) {

	var family = openidm.read(object.family);
	console.log("Family object from parentOnDelete: " + family, {})
	
	// Remove the parent object from the Family.parents array if it exists
	if (family) {

		patch = [{ "operation":"remove","field":"parents", "value": "managed/parent/" + object._id }]
		openidm.patch("managed/family/" + object._id, null, patch)
			
	}

}