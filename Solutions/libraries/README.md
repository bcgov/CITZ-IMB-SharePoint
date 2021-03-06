# CITZ.IMB.SP.Libraries
Common 3rd party and custom Javascript Libraries to be used in SharePoint 2016

Includes:
* [jquery-3.3.1.min.js](https://jquery.com/)
* [jquery-ui.min.js](https://jqueryui.com/)
* [moment.min.js](https://momentjs.com/)
* [datatables.min.js](https://datatables.net/)
* [numeral.min.js](http://numeraljs.com/)
* [chart.min.js](https://www.chartjs.org/)
* [fontawesome.min.js](https://fontawesome.com)
* citz.imb.sp.library.js

## citz.imb.sp.library.js
### GROUPS
#### getWebGroups(*withMembers*)
> Returns a promise of a JSON object containing SharePoint Groups having permissions on the current web
#### createGroup(*groupName, description, ownerID*)
> Creats a new group and returns the ID
#### deleteGroup(*groupId*)
> Deletes a group from the collection
#### getAssociatedGroups(*webSite*)
> Returns a promise of the associated owner, member, and visitor groups

### PERMISSIONS
#### grantGroupPermissionToWeb(*groupId, permissionLevel*)
> Grants permissions to the current web
#### breakListInheritance(*listId, copy, clear*)
> Sets a list to have unique permissions
#### grantGroupPermissionToList(*listId, groupId, permissionLevel*)
> Grants permissions to a list

### USERS
#### addUserToGroup(*groupId, logonName*)
> Adds a user to a group
#### removeUserFromGroup(*groupId, userId*)
> Removes a user from a group
#### getUserById(*withGroups, userId*)
> Returns a promise of user information JSON object
#### getCurrentUser()
> Returns a promise about the current user

### SITES

### LISTS
#### getList(*listName*)
> Returns a promise of a list
#### createList(*listInfo*)
> Creates a list

### ITEMS
#### getItems(*listName*)
> Returns a promise of all items of a list
#### getItem(*listName, itemId*)
> Returns a promise of a specified item
#### lookupItemId(*listName, itemFilter*)
> Returns the promise of an array of IDs that match the itemFilter
#### addItemToList(*listName, item*)
> Adds an item to a list
#### removeItemFromList(*listName, itemId*)
> Deletes an item from a list
#### updateItem(*listName, item*)
> Update a list item

### FIELDS
#### addField(*listName, field*)
> Adds a field to a list