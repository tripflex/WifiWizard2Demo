App.info({
    id: 'com.smyles.wifiwizard2.demo',
    name: 'WifiWizard2 Demo',
    description: 'WifiWizard2 Demo Cordova plugin',
    author: 'Myles McNamara',
    email: 'myles@smyl.es',
    website: 'https://github.com/tripflex/wifiwizard2',
    version: "0.0.2"
});

App.accessRule("blob:*");
App.accessRule("http://localhost:*");  // Required for Meteor 1.6.1+ for running as local dev

// App.setPreference('BackgroundColor', '0xff0097C7');
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');


//
// @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-statusbar/

// StatusBarStyle (status bar style, defaults to lightcontent). On iOS 7, set the status bar style. Available options default, lightcontent, blacktranslucent, blackopaque.
App.setPreference('StatusBarStyle', 'lightcontent' );
// App.setPreference('StatusBarBackgroundColor', '#FFFFFF' );
// App.setPreference('StatusBarOverlaysWebView', true );