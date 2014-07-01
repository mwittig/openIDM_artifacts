//Generates the correct Dashboard apps for OpenAM, based on Title

(function getAssignedDashboard() {

		//Pull in user variable on OpenIDM managed object
		var userCountry = source.country;
		
		//Default Apps
		var assignedDashboard = ["Google"];
		
		//Noddy conditional
		if (userCountry == "france") {
		
			assignedDashboard.push("SalesForce");
			
		}
		
		if (userCountry == "germany") {
		
			assignedDashboard.push("Zendesk");
			
		}

		if (userCountry == "poland") {
		
			assignedDashboard.push("SalesForce");
			assignedDashboard.push("ZenDesk");			
		}
		
		//Send back to sync.json
		return assignedDashboard;
				
})();

