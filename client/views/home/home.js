lastResult = new ReactiveVar('');

Template.Home.events({
	"click #enable": async function(){

		try {

			await SUIBlock.asyncBlur( 'Enabling device WiFi...', 2000 );
			await WifiWizard2.enableWifi();
			await SUIBlock.asyncBlur( 'ENABLED device WiFi...', 2000, true );
			lastResult.set( 'WiFi Enabled' );
		} catch( error ){
			handleError( error, 'Enable Device Wifi Error!' );
		}

	},
	"click #disable": async function(){

		try {

			await SUIBlock.asyncBlur( 'Disabling device WiFi...', 2000 );
			await WifiWizard2.disableWifi();
			await SUIBlock.asyncBlur( 'DISABLED device WiFi...', 2000, true );
			lastResult.set( 'WiFi Disabled' );
		} catch( error ){
			handleError( error, 'Disable Device Wifi Error!' );
		}

	},
	"click #disconnect": async function(){

		try {

			await SUIBlock.asyncBlur( 'Disconnecting device WiFi...', 2000 );
			await WifiWizard2.disconnect();
			await SUIBlock.asyncBlur( 'DISCONNECTED device WiFi...', 2000, true );
			lastResult.set( 'WiFi Disconnected' );
		} catch( error ){
			handleError( error, 'Disconnect Device Wifi Error!' );
		}

	},
	"click #reassociate": async function(){

		try {

			await SUIBlock.asyncBlur( 'Reassociating current WiFi...', 2000 );
			await WifiWizard2.reassociate();
			await SUIBlock.asyncBlur( 'REASSOCIATED current WiFi...', 2000, true );
			lastResult.set( 'WiFi Reassoicated' );
		} catch( error ){
			handleError( error, 'Reassociate Wifi Error!' );
		}

	},
	"click #reconnect": async function(){

		try {

			await SUIBlock.asyncBlur( 'Reconnecting current WiFi...', 2000 );
			await WifiWizard2.reconnect();
			await SUIBlock.asyncBlur( 'RECONNECTED current WiFi...', 2000, true );
			lastResult.set( 'WiFi Reconnected' );
		} catch( error ){
			handleError( error, 'Reconnect Wifi Error!' );
		}

	},
	"click #currentNetID": async function(){

		try {

			await SUIBlock.asyncBlur( 'Getting current WiFi NET ID...', 2000 );
			let netID = await WifiWizard2.getConnectedNetworkID();
			await SUIBlock.asyncBlur( 'Current network ID is ' + netID, 2000, true );
			lastResult.set( 'Current NET ID: ' + netID );
		} catch( error ){
			handleError( error, 'currentNetID Error!' );
		}

	},
	"click #currentSSID": async function(){

		try {

			await SUIBlock.asyncBlur( 'Getting current WiFi SSID...', 2000 );
			let SSID = await WifiWizard2.getCurrentSSID();
			await SUIBlock.asyncBlur( 'Current network SSID is ' + SSID, 2000, true );
			lastResult.set( 'Current SSID: ' + SSID );
		} catch( error ){
			handleError( error, 'currentSSID Error!' );
		}

	},
	"click #currentBSSID": async function(){

		try {

			await SUIBlock.asyncBlur( 'Getting current WiFi BSSID...', 2000 );
			let BSSID = await WifiWizard2.getCurrentBSSID();
			await SUIBlock.asyncBlur( 'Current network BSSID is ' + BSSID, 2000, true );
			lastResult.set( 'Current BSSID: ' + BSSID );
		} catch( error ){
			handleError( error, 'currentBSSID Error!' );
		}

	},
	"click #wifiIP": async function(){

		try {

			await SUIBlock.asyncBlur( 'Getting current WiFi IP...', 2000 );
			let IP = await WifiWizard2.getWifiIP();
			await SUIBlock.asyncBlur( 'Current WiFi IP ' + IP, 2000, true );
			lastResult.set( 'Current IP: ' + IP );
		} catch( error ){
			handleError( error, 'getWifiIP Error!' );
		}

	},
	"click #wifiIPinfo": async function(){

		try {

			await SUIBlock.asyncBlur( 'Getting current WiFi IP Info...', 2000 );
			let IPinfo = await WifiWizard2.getWifiIPInfo();
			console.log( 'wifiIPinfo', IPinfo );
			await SUIBlock.asyncBlur( 'Current IP ' + IPinfo["ip"] + ' Subnet: ' + IPinfo["subnet"], 2000, true );
			lastResult.set( 'Current IP ' + IPinfo["ip"] + ' Subnet: ' + IPinfo["subnet"] );
		} catch( error ){
			handleError( error, 'getWifiIPinfo Error!' );
		}

	},
	"click #requestPermission": async function(){

		try {

			await SUIBlock.asyncBlur( 'Requesting ACCESS_FINE_LOCATION Permission', 2000 );
			await WifiWizard2.requestPermission();
			await SUIBlock.asyncBlur( "Permission granted, or already granted previously!", 2000, true );
			lastResult.set( "Permission Granted" );
		} catch( error ){
			handleError( error, 'requestPermission Error!' );
		}

	},
	"click #isConnectedToInternet": async function(){

		try {

			await SUIBlock.asyncBlur( 'Checking if current WiFi is connected to internet...', 2000 );
			let hasInternet = await WifiWizard2.isConnectedToInternet();
			await SUIBlock.asyncBlur( "Internet connection check successful, INTERNET = " + hasInternet.toString(), 2000, true );
			lastResult.set( "Internet: " + hasInternet.toString() );
		} catch( error ){
			handleError( error, 'isConnectedToInternet Error!' );
		}

	}
});

function handleError( error, addMsg ){
	if( ! addMsg ) {
		addMsg = 'Unknown Catch';
	}
  let errMsg = error && error.message ? error.message : error;

	console.log( 'Error! ' + addMsg, error );
	lastResult.set( 'Error! ' + addMsg + ': ' + errMsg );
	SUIBlock.asyncBlur( "Error: " + errMsg, 5000, true );
}

Template.Home.helpers({
	lastMessage: function(){
		return lastResult.get();
	},
});
