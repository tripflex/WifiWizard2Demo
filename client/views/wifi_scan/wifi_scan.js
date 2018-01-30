netStore = new ReactiveDict();

/**
 * Synchronous Sleep/Timeout `await this.timeout()`
 */
function timeout( delay ) {

	if( ! delay ){
		delay = 2000; // 2s timeout by default
	}

	return new Promise(function(resolve, reject) {
		setTimeout(resolve, delay);
	});
}

Template.WifiScan.events({

	"click #search": function(e, t){

		if( ! Meteor.isCordova ){
			SUIBlock.block( 'You must run this on a mobile device, this does not work for web browsers!' );

			timeout( 5000 ).then( function(){
				SUIBlock.unblock();
			});

			return;
		}

		SUIBlock.block( 'Searching for WiFi Networks...' );

		WifiWizard2.scan().then( function( results ){

			netStore.set( 'hasSearched', true );
			console.log( 'Found networks', results );
			netStore.set( 'found', results );
			SUIBlock.unblock();

		}).catch( function( error ){

			console.log( 'Error getting results!', error );
			SUIBlock.block( "Error getting results: " + error.message );

			WifiWizard.timeout( 5000 ).then( function(){
				SUIBlock.unblock();
			});

		});

	}

});


Template.WifiScan.onRendered(function(){

	netStore.set( 'found', [] );
	netStore.set( 'hasSearched', false );

});

Template.WifiScan.helpers({
	foundNetworks: function() {
		return netStore.get('found');
	},
	hasSearched: function(){
		return netStore.get('hasSearched');
	}
});

Template.WifiScanResults.helpers({
	foundNetworks: function() {
		return netStore.get('found');
	}
});