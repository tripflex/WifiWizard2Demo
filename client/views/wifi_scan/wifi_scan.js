
netStore = new ReactiveDict();

Template.WifiScan.events({

  "click #search": function(e, t){
  
    
    
  }
  
});


Template.WifiScan.onRendered(function(){
  
	netStore.set( 'found', [] );
  
});

Template.WifiScan.helpers({
	foundNetworks: function() {
		return netStore.get('found');
	}
});