//patch the source object to replace verified to false
openidm.patch("managed/user/" + source._id, null, [{"replace": "/verified", "value": false}]);