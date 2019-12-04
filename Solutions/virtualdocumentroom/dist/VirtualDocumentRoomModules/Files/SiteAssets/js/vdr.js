var ownerGroupID,memberGroupID,visitorGroupID,groupPrefix,currentUser,questionList,config={},groupDescription="created by automation";function initateVariables(){console.log("-- initiating variables");var r=$.Deferred(),e=getItems("Config"),t=getAssociatedGroups(),o=getCurrentUser(),n=lookupItemId("Users","User eq '"+_spPageContextInfo.userLoginName+"'");return $.when().done(function(e){}),$.when(e,t,o,n).done(function(e,t,o,n){for(i=0;i<e.length;i++)config[e[i].Key]={},config[e[i].Key].TextValue=e[i].TextValue,config[e[i].Key].MultiTextValue=e[i].MultiTextValue,config[e[i].Key].NumberValue=e[i].NumberValue,config[e[i].Key].YesNoValue=e[i].YesNoValue,config[e[i].Key].GroupValue=e[i].GroupValue,config[e[i].Key].Modified=e[i].Modified;ownerGroupID=t.AssociatedOwnerGroup.Id,memberGroupID=t.AssociatedMemberGroup.Id,visitorGroupID=t.AssociatedVisitorGroup.Id,groupPrefix=config.GroupPrefix.TextValue,currentUser=o.Title,0<n.length?$.when(getItem("Users",n[0].Id)).done(function(e){questionList=e.d.QuestionList,r.resolve()}):r.resolve()}).fail(function(e){window.console&&console.log(e)}),r.promise()}function getTOS(){console.log("-- getting TOS");var e=$.Deferred(),t="TOSAgreement"+config.TOS.Modified;return getCookie(t)?e.resolve("Previously accepted Terms of Service"):$("#vdr_dialog").html(config.TOS.MultiTextValue).dialog({modal:!0,buttons:{Accept:function(){setCookie(t,"true",config.CookieDays.NumberValue,_spPageContextInfo.webAbsoluteUrl),$(this).dialog("close"),$("#vdr_dialog").html(""),e.resolve("Accepted Terms of Service")},Decline:function(){$("#vdr_dialog").html(""),e.reject("Rejected Terms of Service")}}}),e.promise()}function getCookie(e){console.log("-- getting cookie");for(var t=e+"=",i=document.cookie.split(";"),o=0;o<i.length;o++){for(var n=i[o];" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(t))return n.substring(t.length,n.length)}return""}function setCookie(e,t,i,o){console.log("-- setting cookie");var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3);var r="expires="+n.toUTCString();void 0===o&&(o=""),document.cookie=e+"="+t+"; "+r+"; path=/"}function writeActivity(e,t,i){$.when(addItemToList("ActivityLog",{Title:e,Notes:t.toString(),Success:i,User:currentUser})).done(function(){console.log("wrote activity:","",e,t,i,currentUser)})}function createContent(){console.log("-- creating content");ExecuteOrDelayUntilScriptLoaded(function(){var e=new SP.ClientContext.get_current,t=e.get_web(),i=new SP.BasePermissions;i.set(SP.PermissionKind.manageWeb);t.doesUserHavePermissions(i);e.executeQueryAsync(function(){populateManagementTab()},function(e,t){window.console&&console.log("unable to retrieve user permissions")})},"sp.js"),$("#vdr_container").append('<div id="tabs"><ul><li><a href="#tab-1">Home</a></li><li><a href="#tab-2">Questions</a></li></ul><div id="tab-1" class="tabcontent home_tab active"></div><div id="tab-2" class="tabcontent question_tab"></div>'),$(function(){$("#tabs").tabs({heightStyle:"auto"})}),populateHomeTab(),populateQuestionTab()}function populateHomeTab(){console.log("-- populating home");$("#tab-1").append("<h2>Home</h2><p>introduction to the site, instructions, links to procurement documents and resources.</p><div id='vdr_home_instructions'><h3>instructions</h3><div><ul>TO DO:<li>apply starting permissions for lists and libraries</li><ul></div></div>"),$("#vdr_home_instructions").accordion({collapsible:!0,active:!1,heightStyle:"content"})}function populateQuestionTab(){console.log("-- populating question");$("#tab-2").append("<h2>Questions</h2><div id='vdr_questions'><div id='vdr_public_questions_data'><table id='vdr_public_questions' class='stripe hover row-border'><thead><tr><th>Question</th><th>Answer</th></tr></thead></table></div><div id='vdr_private_questions_data'><table id='vdr_private_questions' class='stripe hover row-border'><thead><tr><th>Question</th></tr></thead></table></div></div><div id='vdr_question_instructions'><h3>instructions</h3><div><ul><li>Proponent is notified when a question is answered - is this manual?</li><li>Users to have the ability to post questions on the VICO site to the VICO staff</li><li>questions to  be viewable to the posting proponent group only until the question is published</li><li>any question posted by a proponent to be read only after submission</li><li>to be able to categorize  questions</li><li>Users to receive instant confirmation to a submitted question</li><li>all transactions on the VICO site to be logged. Log information must include transaction type, transaction information, proponent and user , date and time of the transaction</li><li>An auto response acknowledgment  sent when a user asks a question; acknowledgment should be sent to the asking proponent group only</li><li>All users to receive a notification when a response is posted</li><li>the notification to contain a link to the VICO website</li><li>The response to a question to go together with the question</li><li>The system to log information when a proponent asking a question reads the response. Information should include proponent ID, question,  date and time the response was read</li><ul></div></div></div>"),$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('questions')/items",type:"GET",headers:{accept:"application/json;odata=verbose"}}).done(function(e){var t=e.d.results;$("#vdr_public_questions").DataTable({data:t,dom:"ftp",columns:[{data:"Question",orderable:!1},{data:"Answer",orderable:!1}],rowGroup:{dataSrc:"Category"}}),$("#vdr_public_questions").css("width","")}),void 0!==questionList&&$.when(getItems(questionList)).done(function(e){$("#vdr_private_questions").DataTable({data:e,dom:"Bftp",buttons:[{text:"ask a question",action:function(){askAQuestion()}}],columns:[{data:"Question",orderable:!1}]}),$("#vdr_private_questions").css("width","")}),$("#vdr_question_instructions").accordion({collapsible:!0,active:!1,heightStyle:"content"})}function populateManagementTab(){console.log("-- populating Management");$("#tabs").tabs().find(".ui-tabs-nav").append('<li><a href="#tab-3">Site Management</a></li>'),$("#tabs").tabs().append("<div id=\"tab-3\" class=\"tabcontent management_tab\"><h2>Site Management</h2><div id='vdr_management'></div><div id='vdr_management_instructions'><h3>instructions</h3><div><ul><li>Tab to be visible only to VICO Site Administrators</li><ul><li>VICO Administrator - administrates and grants access to the VICO site (a site owner)</li><li>VICO Manager - uploads documents and answers questions (a member)</li><li>Proponent - a business interested in the procurement (no direct access)</li><li>User - a specified BCeID user account identified by the proponent (a restricted member)</li></ul><li>Contains links and instructions on how to add proponents and users</li><li>Add proponent to site</li><ul><li>generate a random string as a non-identifiable object name for all things related to proponent</li><li>create a group</li><li>create a contribution library</li><li>create a question list?</li></ul><li>be able to add users to proponents</li><li>have the ability to remove a users access</li><li>all actions are to be logged (type, info, proponent, user, date, time, etc.)</li><li>shortlist proponents (ie deactivate a proponent and remove users access)</li></div></div></div>"),$("#tabs").tabs().tabs("refresh"),$("#vdr_management_instructions").accordion({collapsible:!0,active:!1,heightStyle:"content"}),displayWebGroups(),displayProponents()}function displayWebGroups(){console.log("-- displaying groups"),$.when(getWebGroups(!0)).then(function(e){var t="<div id='vdr_group_data'>";for(i=0;i<e.length;i++){for(t+="<h3>",t+=e[i].Title,t+="</h3>",t+="<div id='vdr_user_rows'>",t+="<div class='vdr_user_row_header'>",t+="<div class='vdr_user_title'>",t+="</div>",t+="<a onclick='addUser("+e[i].Id+")' class='ui-button ui-widget ui-corner-all vdr_button'>",t+="add a user",t+="</a>",t+="</div>",j=0;j<e[i].Users.results.length;j++)t+="<div class='vdr_user_row'>",t+="<div class='vdr_user_title'>",t+=e[i].Users.results[j].Title,t+="</div>",t+="<a onclick='removeUser("+e[i].Id+", "+e[i].Users.results[j].Id+")' class='ui-button ui-widget ui-corner-all vdr_button'>",t+="remove user",t+="</a>",t+="</div>";t+="</div>"}t+="</div>",$("#vdr_group_data").remove(),$("#vdr_management").append(t),$("#vdr_group_data").accordion({collapsible:!0,active:!1,heightStyle:"content"})}).fail(function(e){window.console&&console.log("error",e)})}function displayProponents(){console.log("-- displaying proponents"),$.ajax({url:"https://"+window.location.hostname+_spPageContextInfo.webServerRelativeUrl+"/_api/web/lists/GetByTitle('Proponents')/Items",type:"GET",beforeSend:function(e){e.setRequestHeader("Accept","application/json;odata=verbose")}}).done(function(e){var t=e.d.results,o="<div id='vdr_proponent'>";for(o+="<div class='vdr_proponent_header'>",o+="<div class='vdr_proponent_name'>",o+="Proponent",o+="</div>",o+="<div class='vdr_proponent_uid'>",o+="Unique ID",o+="</div>",o+="<a onclick='addProponent()' id='vdr_add_proponent' class='vdr_button ui-button ui-widget ui-corner-all'>Add a Proponent</a>",o+="</div>",o+="<div class='vdr_proponent_data'>",i=0;i<t.length;i++){var n=t[i].Active?"":" vdr_inactive ";o+="<div class='vdr_proponent_row'>",o+="<div class='vdr_proponent_name"+n+"'>",o+=t[i].Title,o+="</div>",o+="<div class='vdr_proponent_uid"+n+"'>",o+=t[i].UUID,o+="</div>",o+=n?"<a onclick='activateProponent("+t[i].ID+',"'+t[i].UUID+"\")' class='vdr_button ui-button ui-widget ui-corner-all'>Activate</a>":"<a onclick='deactivateProponent("+t[i].ID+", "+t[i].GroupId+',"'+t[i].UUID+"\")' class='vdr_button ui-button ui-widget ui-corner-all'>Deactivate</a>",o+="</div>"}o+="</div>",$("#vdr_proponent").remove(),$("#vdr_management").append(o)}).fail(function(e){window.console&&console.log(e)})}function refreshPrivateQuestions(){console.log("-- refreshing private questions"),void 0!==questionList&&$.when(getItems(questionList)).done(function(e){$("#vdr_private_questions").DataTable().clear().rows.add(e).draw()})}function activateProponent(e,i){console.log("-- activating proponent"),$.when(createGroup(groupPrefix+i,groupDescription,ownerGroupID)).then(function(t){writeActivity("Create Proponent Group",groupPrefix+i,!0),$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('Proponents')/Items("+e+")",type:"POST",data:JSON.stringify({Active:!0,GroupId:t}),headers:{"X-RequestDigest":$("#__REQUESTDIGEST").val(),Accept:"application/json;odata=nometadata","Content-Type":"application/json;odata=nometadata","IF-MATCH":"*","X-HTTP-Method":"MERGE"}}).done(function(e){writeActivity("Updated Proponent",i,!0),displayProponents()}).fail(function(e){writeActivity("Updated Proponent","error "+e.status+": "+e.statusText,!1)}),$.when(grantGroupPermissionToWeb(t,"Read")).then(function(){displayWebGroups(),writeActivity("Grant Group Permission to Site",groupPrefix+i,!0)}).fail(function(){writeActivity("Grant Group Permission to Site",groupPrefix+i,!1)}),$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('"+i+"')",type:"GET",headers:{Accept:"application/json;odata=nometadata","Content-Type":"application/json;odata=nometadata"}}).done(function(e){$.when(grantGroupPermissionToList(e.Id,t,"Contribute")).then(function(e){writeActivity("Apply Permissions to Proponent Library",i,!0)}).fail(function(e){writeActivity("Apply Permissions to Proponent Library","error "+e.status+": "+e.statusText,!1)})}).fail(function(e){writeActivity("Grant Permission to Proponent Library","error "+e.status+": "+e.statusText,!1)})}).fail(function(e){writeActivity("Create Proponent Group","error "+e.status+": "+e.statusText,!1)})}function deactivateProponent(e,t,i){console.log("-- deactivating proponent"),$.when(deleteGroup(t)).then(function(){writeActivity("Delete Proponent group",i,!0),$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('Proponents')/Items("+e+")",type:"POST",data:JSON.stringify({Active:!1,GroupId:0}),headers:{"X-RequestDigest":$("#__REQUESTDIGEST").val(),Accept:"application/json;odata=nometadata","Content-Type":"application/json;odata=nometadata","IF-MATCH":"*","X-HTTP-Method":"MERGE"}}).done(function(){writeActivity("Deactivate Proponent",i,!0),displayWebGroups(),displayProponents()}).fail(function(e){writeActivity("Deactivate Proponent","error "+e.status+": "+e.statusText,!1)})}).fail(function(e){writeActivity("Delete Proponent group","error "+e.status+": "+e.statusText,!1)})}function createContributionLibrary(t){console.log("-- creating library"),$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists",type:"POST",headers:{"X-RequestDigest":$("#__REQUESTDIGEST").val(),accept:"application/json;odata=verbose","content-type":"application/json;odata=verbose"},data:JSON.stringify({__metadata:{type:"SP.List"},AllowContentTypes:!0,BaseTemplate:101,ContentTypesEnabled:!0,Description:"Proponent Contribution Library.  created by automation",Title:t})}).done(function(e){writeActivity("Create Proponent Library",t,!0),$.when(breakListInheritance(e.d.Id,!1)).then(function(){writeActivity("Break inheritance on Proponent Library",t,!0),$.when(grantGroupPermissionToList(e.d.Id,ownerGroupID,"Full Control"),grantGroupPermissionToList(e.d.Id,memberGroupID,"Contribute"),grantGroupPermissionToList(e.d.Id,visitorGroupID,"Read"),grantGroupPermissionToList(e.d.Id,groupId,"Contribute")).then(function(e){writeActivity("Apply permissions to Proponent Library",t,!0)}).fail(function(e){writeActivity("Apply permissions to Proponent Library","error "+t,!1)})}).fail(function(e){writeActivity("Break inheritance on Proponent Library","error "+e.status+": "+e.statusText,!1)})}).fail(function(e){writeActivity("Create Proponent Library","error "+e.status+": "+e.statusText,!1)})}function createQuestionList(t){console.log("-- creating list");var i=t+"_Questions";$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists",type:"POST",headers:{"X-RequestDigest":$("#__REQUESTDIGEST").val(),accept:"application/json;odata=verbose","content-type":"application/json;odata=verbose"},data:JSON.stringify({__metadata:{type:"SP.List"},AllowContentTypes:!0,BaseTemplate:100,ContentTypesEnabled:!0,Description:"Proponent Question List.  created by automation",Title:i})}).done(function(e){writeActivity("Create Proponent Question List",t+"_Questions",!0),$.when(breakListInheritance(e.d.Id,!1)).then(function(){writeActivity("Break inheritance on Proponent Question List",t+"_Questions",!0),$.when(grantGroupPermissionToList(e.d.Id,ownerGroupID,"Full Control"),grantGroupPermissionToList(e.d.Id,memberGroupID,"Contribute"),grantGroupPermissionToList(e.d.Id,visitorGroupID,"Read"),grantGroupPermissionToList(e.d.Id,groupId,"Contribute")).then(function(e){writeActivity("Apply permissions to Proponent Question List",t+"_Questions",!0)}).fail(function(e){writeActivity("Apply permissions to Proponent Question List","error "+t+"_Questions",!1)})}).fail(function(e){writeActivity("Break inheritance on Proponent Question List","error "+e.status+": "+e.statusText,!1)}),$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('"+i+"')/fields",type:"POST",headers:{"X-RequestDigest":$("#__REQUESTDIGEST").val(),accept:"application/json;odata=verbose","content-type":"application/json;odata=verbose"},data:JSON.stringify({__metadata:{type:"SP.Field"},FieldTypeKind:3,StaticName:"Question",Title:"Question"})}).done(function(e){$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('"+i+"')/fields/getbytitle('Title')",type:"POST",headers:{"X-RequestDigest":$("#__REQUESTDIGEST").val(),accept:"application/json;odata=verbose","content-type":"application/json;odata=verbose","X-HTTP-Method":"MERGE","If-Match":"*"},data:JSON.stringify({__metadata:{type:"SP.Field"},Required:"false",Hidden:"true"})}).done(function(e){}).fail(function(e){console.log(e)})}).fail(function(e){console.log(e)})}).fail(function(e){writeActivity("Create Proponent Question List","error "+e.status+": "+e.statusText,!1)})}function addProponent(){console.log("-- requesting proponent");var i="V"+Math.floor(16777215*Math.random()).toString(16).toUpperCase(),o=groupPrefix+i;$("#vdr_dialog").html("<label for='input_proponent'>Enter Proponent Name</label><input type='text' name='input_proponent' id='input_proponent' class='text ui-widget-content ui-corner-all'>").dialog({dialogClass:"no-close",title:"Add a Proponent",buttons:[{text:"Create",click:function(){var t=$("#input_proponent").val();""===t?alert("Proponent Name is required."):($.when(createGroup(o,groupDescription,ownerGroupID)).then(function(e){writeActivity("Create Proponent Group",o,!0),addItemToList("Proponents",{Title:t,UUID:i,GroupId:e}),$.when(grantGroupPermissionToWeb(e,"Read")).then(function(){displayWebGroups(),writeActivity("Grant Group Permission to Site",o,!0)}).fail(function(){writeActivity("Grant Group Permission to Site",o,!1)}),createContributionLibrary(i),createQuestionList(i)}).fail(function(e){writeActivity("Create Proponent Group","error",!1)}),$(this).dialog("close"),$("#vdr_dialog").html(""))}},{text:"Cancel",click:function(){$(this).dialog("close"),$("#vdr_dialog").html("")}}]})}function initializePeoplePicker(e){console.log("-- initiatializing people picker");var t={PrincipalAccountType:"User",SearchPrincipleSource:15,ResolvePrincipalSource:15,AllowMulitpleValues:!0,MaximumEntitySuggestions:5,Width:"280px"};this.SPClientPeoplePicker_InitStandaloneControlWrapper(e,null,t)}function getUUID(e){console.log("-- getting UUID");var t=$.Deferred();return $.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('proponents')/items?$filter=GroupId eq "+e,type:"GET",headers:{accept:"application/json;odata=verbose"}}).done(function(e){0<e.d.results.length?t.resolve(e.d.results[0].UUID):t.reject()}).fail(function(e){console.log(e),t.reject()}),t.promise()}function addUserToList(t,i){console.log("-- adding user"),$.when(getUUID(t)).done(function(e){console.log("addUserToList",t,i,e),$.when(addItemToList("Users",{User:i,QuestionList:e+"_Questions"})).done(function(){writeActivity("added user to List",i,!0)})})}function removeUserFromList(e){console.log("-- removing user"),console.log("removeUserFromList",arguments),$.when(removeItemFromList("Users")).done(function(){writeActivity("Remove user from list",e,!0)}).fail(function(e){writeActivity("Remove user from list",e,fail)})}function addUser(o){console.log("-- adding user");$("#vdr_dialog").html("<div id='vdr_user_dialog'><label>Enter Name</label><div id='input_user'></div></div>"),initializePeoplePicker("input_user"),$("#vdr_dialog").dialog({dialogClass:"no-close",title:"Add a User",height:250,width:350,buttons:{Create:function(){SP.SOD.executeFunc("clientpeoplepicker.js","SPClientPeoplePicker",function(){var e=$("#input_user").children().children().attr("id"),t=this.SPClientPeoplePicker.SPClientPeoplePickerDict[e].GetAllUserInfo();for(i=0;i<t.length;i++)addUserToGroup(o,t[i].Key),writeActivity("add a user","group: "+o+" | user: "+t[i].DisplayText,!0),addUserToList(o,t[i].EntityData.AccountName.toLowerCase());displayWebGroups()}),$(this).dialog("close"),$("#vdr_dialog").html("")},Cancel:function(){$(this).dialog("close"),$("#vdr_dialog").html("")}}})}function removeUser(e,t){console.log("-- removing user"),$.when(removeUserFromGroup(e,t)).then(function(){writeActivity("Remove user","group: "+e+" | user: "+t,!0),removeUserFromList(t),displayWebGroups()})}function askAQuestion(){console.log("-- asking question");$("#vdr_dialog").html("<div id='vdr_user_dialog'><label>Enter Question</label><input id='input_question' type='text' name='input_question' class='text ui-widget-content ui-corner-all' /></div>"),$("#vdr_dialog").dialog({dialogClass:"no-close",title:"Ask a Question",height:250,width:350,buttons:{Create:function(){var e=$("#input_question").val();$.when(addItemToList(questionList,{Title:e,Question:e})).done(function(){refreshPrivateQuestions(),writeActivity("asked a question","",!0)}),$(this).dialog("close"),$("#vdr_dialog").html("")},Cancel:function(){$(this).dialog("close"),$("#vdr_dialog").html("")}}})}$().ready(function(){console.log("-- getting ready"),$.when(initateVariables()).then(function(){var e=document.getElementsByTagName("head")[0],t=document.createElement("link");t.type="text/css",t.rel="stylesheet",t.href=_spPageContextInfo.webAbsoluteUrl+"/SiteAssets/css/vdr.css",e.appendChild(t);var i=document.createElement("script");i.type="text/javascript",i.src="_layouts/15/clienttemplates.js",e.appendChild(i);var o=document.createElement("script");o.type="text/javascript",o.src="_layouts/15/clientforms.js",e.appendChild(o);var n=document.createElement("script");n.type="text/javascript",n.src="_layouts/15/clientpeoplepicker.js",e.appendChild(n);var r=document.createElement("script");r.type="text/javascript",r.src="_layouts/15/autofill.js",e.appendChild(r),$("body").append("<div id='vdr_dialog'></div>"),$("#layoutsTable").append("<div id='vdr_container'></div>"),$.when(getTOS()).done(function(e){writeActivity(e,window.location.href,!0),createContent()}).fail(function(e){writeActivity(e,window.location.href,!0),window.close(),window.location="/_layouts/signout.aspx"})})});