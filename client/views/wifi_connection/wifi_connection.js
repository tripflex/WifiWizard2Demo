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
function getSSID(){
	return $('#SSID').val();
}

function getUserConfig(){

  let caps =  $('#SSID').find(':selected').data('capabilities');
  let password = $('#password').val();

  let isWPA = caps.indexOf( 'WPA' ) > -1;
  let isWEP = caps.indexOf( 'WEP' ) > -1;

  if( ( isWEP || isWPA ) && ! password ){

    SUIBlock.asyncBlur( 'You must enter a password to connect to secure AP!', 7000, true );
    return false;

  } else {

  	return {
  		 SSID: getSSID(),
			 algorithm: isWEP ? 'WEP' : isWPA ? 'WPA' : '',
			 password: password
		};
	}

}

function getConfig(){

	let ssid = getSSID();
	let caps =  $('#SSID').find(':selected').data('capabilities');
	let password = $('#password').val();

	let userConfig = getUserConfig();

	if( ! userConfig ){
		return false;
	}

	let isWPA = userConfig.algorithm === 'WPA';
	let isWEP = userConfig.algorithm === 'WEP';

  // This is just shorthand for the commented out code below
  let wifiConfig = WifiWizard2.formatWifiConfig( ssid, password, isWEP ? 'WEP' : isWPA ? 'WPA' : '' );

  // if( isWPA ){
  // 	var wifiConfig = WifiWizard2.formatWifiConfig( ssid, password, 'WPA' );
  // } else if ( isWEP ){
  // 	var wifiConfig = WifiWizard2.formatWifiConfig( ssid, password, 'WEP' );
  // } else {
  // 	var wifiConfig = WifiWizard2.formatWifiConfig( ssid ); // Otherwise should be insecure network
  // }

  console.log( 'wifiConfig', wifiConfig );

  return wifiConfig;
}

function handleError( error, addMsg ){
	if( ! addMsg ) {
		addMsg = 'Unknown Catch';
	}

	let errMsg = error && error.message ? error.message : error;
	console.log( 'Error! ' + addMsg, error );
	SUIBlock.asyncBlur( "Error: " + errMsg, 5000, true );
}

Template.WifiConnection.events({
	"click #update": async function(){

		if( ! Meteor.isCordova ){
			await SUIBlock.asyncBlur( 'You must run this on a mobile device, this does not work for web browsers!', 2000 );
			await timeout( 5000 ); // Add extra 5 second delay before removing UI block
			SUIBlock.unblock();
			return;
		}

		await SUIBlock.asyncBlur( 'Searching for WiFi Networks...', 2000 );

		try {

			let results = await WifiWizard2.scan();
			console.log( 'Found networks', results );

			netStore.set( 'hasSearched', true );
			netStore.set( 'found', results );

			SUIBlock.asyncBlur( 'Found a total of ' + results.length + ' results...', 2000, true );

		} catch (error){
			handleError(error, 'Update Networks Error');
		}

	},
	"click #connect": async function(){

		try {
			let config = getUserConfig();

			if( ! config ){
				return false;
			}

			await SUIBlock.asyncBlur( 'Connecting to ' + config.SSID + '...', 2000 );
			await WifiWizard2.connect( config.SSID, config.password, config.algorithm );
			await SUIBlock.asyncBlur( 'CONNECTED to ' + config.SSID + '...', 2000, true );

		} catch( error ){
			handleError( error, 'Connect Error' );
		}
	},
	"click #disconnectNetwork": async function(){

		try {
			let SSID = getSSID();

			await SUIBlock.asyncBlur( 'Disconnecting and Removing ' + SSID + '...', 2000 );
			await WifiWizard2.disconnect( SSID );
			await SUIBlock.asyncBlur( 'DISCONNECTED AND REMOVED ' + SSID + '...', 2000, true );

		} catch( error ){
			handleError( error, 'Connect Error' );
		}
	},
	"click #add": async function(){

		try {
			let config = getConfig();

			if( ! config ){
					return false;
			}

			await SUIBlock.asyncBlur( 'Adding ' + config.SSID + '...', 2000 );

			await WifiWizard2.add( config );

			await SUIBlock.asyncBlur( 'Successfully added wifi config for ' + config.SSID, 2000, true );

		} catch( error ){
			handleError( error, 'Add Error' );
		}

	},
	"click #remove": async function(){

		let SSID = getSSID();

		try {

			await SUIBlock.asyncBlur( 'Removing ' + SSID + ' ...', 2000 );
			await WifiWizard2.remove( SSID );
			await SUIBlock.asyncBlur( 'REMOVED ' + SSID + ' ...', 2000, true );

		} catch( error ){
			handleError( error, 'Remove Error!' );
		}

	},
	"click #enable": async function(){

		let SSID = getSSID();

		try {

			await SUIBlock.asyncBlur( 'Enabling ' + SSID + ' ...', 2000 );
			await WifiWizard2.enable( SSID );
			await SUIBlock.asyncBlur( 'ENABLED ' + SSID + ' ...', 2000, true );

		} catch( error ){
			handleError( error, 'Enable Error!' );
		}

	},
	"click #disable": async function(){

		let SSID = getSSID();

		try {

			await SUIBlock.asyncBlur( 'Disabling ' + SSID + ' ...', 2000 );
			await WifiWizard2.disable( SSID );
			await SUIBlock.asyncBlur( 'DISABLED ' + SSID + ' ...', 2000, true );

		} catch( error ){
			handleError( error, 'Disable Error!' );
		}

	},
	"click #enableDeviceWifi": async function(){

		try {

			await SUIBlock.asyncBlur( 'Enabling device WiFi...', 2000 );
			await WifiWizard2.enableWifi();
			await SUIBlock.asyncBlur( 'ENABLED device WiFi...', 2000, true )
		} catch( error ){
			handleError( error, 'Enable Device Wifi Error!' );
		}

	},
	"click #disableDeviceWifi": async function(){

		try {

			await SUIBlock.asyncBlur( 'Disabling device WiFi...', 2000 );
			await WifiWizard2.disableWifi();
			await SUIBlock.asyncBlur( 'DISABLED device WiFi...', 2000, true )
		} catch( error ){
			handleError( error, 'Disable Device Wifi Error!' );
		}

	},
	"click #getNetID": async function(){

		try {
			let SSID = getSSID();

			await SUIBlock.asyncBlur( 'Getting network ID for ' + SSID, 2000 );
			let netID = await WifiWizard2.getSSIDNetworkID(SSID);
			await SUIBlock.asyncBlur( SSID + ' Network ID is: ' + netID, 6000, true )
		} catch( error ){
			handleError( error, 'Get SSID network ID Error!' );
		}

	},
});

Template.WifiConnection.helpers({
	foundAPs: function(){
		return netStore.get('found');
	},
	hasSearched: function(){
		return netStore.get('hasSearched');
	}
});
