//smof aug 27
//add the following entries into the script/access.js file to allow access to the custom endpoint and to perform operations against
//managed/users to those in the necessary roles
  
       {
        	
	    "pattern"    : "endpoint/scopedQuery",
            "roles"      : "managed/role/openidm-admin-staff, managed/role/openidm-admin-contractor",
            "methods"    : "read",
            "actions"    : "*"
        },
        {
         
	      "pattern"    : "managed/user/*",
              "roles"      : "managed/role/openidm-admin-staff, managed/role/openidm-admin-contractor",
              "methods"    : "read,create,update,delete,patch",
              "actions"    : "*",
              "customAuthz" : "isSameType()"
              
        }
