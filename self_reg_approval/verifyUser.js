//patch the source object to replace verified to true
openidm.patch("managed/user/" + source._id, null, [{"replace": "/verified", "value": true}]);
