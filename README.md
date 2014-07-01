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
