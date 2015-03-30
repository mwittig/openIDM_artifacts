//Simon Moffatt - 11/03/15 - Password Checkout Service endpoint
//Utility functions

//Password Generator
function createPW(passwordLength, numberOfNumbers, numberOfSpecial, numberOfUpperCase) {
      
	//Check if any of the function variables have been set
	passwordLength = (typeof passwordLength !== 'undefined') ? passwordLength : 12;
	numberOfNumbers = (typeof numberOfNumbers !== 'undefined') ? numberOfNumbers : 1;
	numberOfSpecial = (typeof numberOfSpecial !== 'undefined') ? numberOfSpecial : 1;
	numberOfUpperCase = (typeof numberOfUpperCase !== 'undefined') ? numberOfUpperCase : 1;
	
	//Pool of chars to choose from
	numberSeed="0123456789";
	upperCaseSeed="ABCDEFGHJIKLMNOPQRSTUVWXYZ";
	specialSeed="-_=+[]#!£$%^&*()@/?";
	paddingSeed="abcdefghijklmnopqrstuvwxyz";
	
	password= "";
    
	//Loops
	for (i=1; i <= numberOfNumbers; i++) {
    
	      password += numberSeed.charAt(Math.floor(Math.random() * numberSeed.length));
    }
	
	for (i=1; i <= numberOfSpecial; i++) {
	    
	      password += specialSeed.charAt(Math.floor(Math.random() * specialSeed.length));
	}

	for (i=1; i <= numberOfUpperCase; i++) {
	    
	      password += upperCaseSeed.charAt(Math.floor(Math.random() * upperCaseSeed.length));
	}
	
	for (i=password.length; i <= passwordLength; i++) {
	    
	      password += paddingSeed.charAt(Math.floor(Math.random() * paddingSeed.length));
	}
    
	return password;
       
}