//Simon Moffatt 13/08/15
//Runs every time a family is deleted, to clear down the child and parent objects

//Global objects available
//object - the family just created

console.log("Running familyOnDelete.js...",{});

var parents = object.parents;
var children = object.children;

//Iterate over the parents array and delete all objects
for (parent in parents){
	
	//Read in the parent...to actually check if it exists before deleting
	parentObj = openidm.read(parents[parent]);
	
	if (parentObj){
		
		openidm.delete(parents[parent],null);
	}
	
}

//Iterate over the children array and delete all objects
for (child in children){
	
	//Read in the child...to actually check if it exists before deleting
	childObj = openidm.read(children[child]);
	
	if (childObj) {
		openidm.delete(children[child],null);
	}
	
}