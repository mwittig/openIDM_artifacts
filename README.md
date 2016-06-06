<b>OpenIDM Project Artifacts</b>
<br/>
<br/>
A collection of useful bits and pieces from various use cases, PoC's and implementations.  Saved here for safe keeping and for anyone to use as an example.  Note these artifacts are in no way supported by ForgeRock and are to be used
as-is, with absolutely no warranty.
<br/>
<br/>
<b>password_checkout_service</b>
<br/>
This is a basic privileged or shared account vaulting and checkout service.  It allows for the "checking out" of shared accounts to delegated
individuals, issuing time based complex passwords to certain accounts, with a background scanner reset process.
<br/>
<br/>
To Setup: copy the appropriate files into the respective ../script and ../conf folders of your OpenIDM deployment.  You will need to configure the
necessary scheduler to your requirements, as well as any password creation settings in the appropriate files.
<br/>
<br/>
The access.js file has been modified to allow only those who are part of the managed/role/passwordCheckoutService to access the endpoint - ie you will
need to create this role and add the appropriate users to that role to gain access to the endpoint...
<br/>
<br/>
The PCS uses 2 files for storage - ../validAccounts.csv and ../requests.csv.  In production just swap these files for SQL tables.  See the files
in the ../script directory for attribute definitions. Place the target accounts that can be managed by the PCS in the validAccounts file.
<br/>
<br/>
To use call GET ../openidm/endpoint/pcs?system=managed/AD&account=dhcp_operators
<br/>
<br/>
Follows on from this use case - http://identityrelationshipmanagement.blogspot.co.uk/2015/03/building-password-checkout-service-in.html
<br/>
<br/>
<b>self_reg_approval</b>
<br/>
Follows on from this use case - http://identityrelationshipmanagement.blogspot.co.uk/2014/06/consumer-identity-registration.html.  Mainly adding some verification to a user that self-registers via the OpenIDM UI.  Note, you need to edit
the bin/defaults onCreate script to add in a default verified=false.
<br/>
<br/>
<b>dashboard_provisioning</b>
<br/>
The OpenAM dashboard service provides a basic means of giving SSO links to users in the form of a central portal.  You can manipulate which links are available via the assignedDashboard attribute with the OpenAM user store.  This artifact performs
a basic mapping between the country in OpenIDM and which apps appear in their dashboard.  Tested for OpenIDM 2.1.0
<br/>
<br/>
<b>delegated_admin</b>
<br/>
A basic delegated admin model for create, read, update, delete, patch and query operations based on an attribute called "type".  Only admins of the same "type" as the user they are attempting to manage will be accepted.  In this case types could be staff, contractors, or consumers.  Only admins for staff can manage staff for example.  Assumes administrators are grouped via roles.  Tested for OpenIDM 3.0
<br/>
<br/>
<b>email_verification</b>
<br/>
Adds basic email verification service, that can be used during the self-service registration piece.  Creates a URL that is sent to the users registeration email address that corresponds to a custom
endpoint that verifies the code and updates the user record if the codes match.  See this entry for further details - https://wikis.forgerock.org/confluence/display/openidm/Custom+Endpoint+Email+Verification+Example
<br/>
<br/>
<b>relationships_as_managed_objects</b>
<br/>
This sample models relationships between different managed objects, as managed objects themselves.  An example is the relationship between a parent and child, being handled via a new managed object
type called family.  This is implemented via basic managed object hook scripts, such as onDelete, postCreate and so on.  Copy the scripts to the appropriate folder. An endpoint is used to create the 
child object, in order to capture the creators _id and store that server side.
<br/>
The endpoint to create a child is handled via ../openidm/endpoint/childManager?_action=create, with the normal JSON payload for creating a child object being sent in the POST.
<br/>
A full write up is available here - http://identityrelationshipmanagement.blogspot.co.uk/2015/08/openidm-relationships-as-first-class.html
<br/>
<br/>
<b>workflow_approval_via_email</b>
<br/>
This sample is an extension to a basic access request workflow, but the approve/reject process uses encrypted links sent to the approver over email.  Copy the appropriate IDM files in place
and also setup OpenIG to add an authentication header in order to get to the custom endpoints.
<br/>
A full write up is available here - http://www.theidentitycookbook.com/2016/06/workflow-approval-via-encrypted-email.html
<br/>
<br/>
<b>rbac_delegated_admin</b>
<br/>
This sample is a basic delegated admin approach to creating and managing provisioning roles in IDM 4.0.  Workflows are created for each main CRUD action for the managed/roles, with access restricted
to the workflows to certain members of the role-admins internal authorization role.
<br/>
To setup, create an internal/repo authorization role called "role-admins" and check the appropriate access.js and process-access.json files for the access requirements.

