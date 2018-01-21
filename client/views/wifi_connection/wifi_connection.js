Template.WifiConnection.onCreated(function() {
	
});

Template.WifiConnection.onDestroyed(function() {
	
});

Template.WifiConnection.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.WifiConnection.events({
	
});

Template.WifiConnection.helpers({
	
});
