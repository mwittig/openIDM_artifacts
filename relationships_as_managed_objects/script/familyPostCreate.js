//Simon Moffatt 13/08/15
//Runs every time a new family is created

//Global objects available
//object - the family just created

console.log("Running familyPostCreate.js...",{});

//Read in the objects we need to patch from the newly created family.  Note, that although these attributes are arrays [], they'll only ever have
//a length of 1 at this stage - ie just when the family has been created, so we just read [0], no need to loop.  Obviously going forward the 
//length is likely to be longer, but we handle the patching of that, away from this postCreate script

var parent = openidm.read(object.parents[0]);
var child = openidm.read(object.children[0])

//Family object
var family = "managed/family/" + object._id;

//Update parent
parent.family = family;
openidm.update("managed/parent/" + parent._id, null, parent);

//Update child
child.family = family;
openidm.update("managed/child/" + child._id, null, child);