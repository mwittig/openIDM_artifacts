//Creates 8 digit verification code used to check if email address is live

function generateVerificationCode(){
 
  var min = 00000001; //smallest 8 digit number
  var max = 99999999; //largest 8 digit number
  var verificationCode = Math.floor(Math.random() * (max - min + 1)) + min;
   
  //document.writeln(verificationCode);
  
  return verificationCode;
  
};

