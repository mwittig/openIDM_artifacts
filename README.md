<b>OpenIDM Project Artifacts</b>
<br/>
<br/>
A collection of useful bits and pieces from various use cases, PoC's and implementations.  Saved here for safe keeping and for anyone to use as an example.  Note these artifacts are in no way supported by ForgeRock and are to be used
as-is, with absolutely no warranty.
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
