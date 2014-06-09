//Correlation query between managed user and acme.policy
var myArray = [ source.email ];
var map = {"query": { "Equals": {"field" : "email", "values" : myArray}}};
map;
