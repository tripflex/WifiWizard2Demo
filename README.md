# WifiWizard2 Demo
This is a demo meteor project for using and testing the [WifiWizard2 Cordova Plugin](https://github.com/tripflex/WifiWizard2)

The majority of the code for handling all actions can be found in the files below:

### Home
[https://github.com/tripflex/WifiWizard2Demo/blob/master/client/views/home/home.js](https://github.com/tripflex/WifiWizard2Demo/blob/master/client/views/home/home.js)

### Connect to WiFi
[https://github.com/tripflex/WifiWizard2Demo/blob/master/client/views/wifi_connection/wifi_connection.js](https://github.com/tripflex/WifiWizard2Demo/blob/master/client/views/wifi_connection/wifi_connection.js)

### Scan WiFi
[https://github.com/tripflex/WifiWizard2Demo/blob/master/client/views/wifi_scan/wifi_scan.js](https://github.com/tripflex/WifiWizard2Demo/blob/master/client/views/wifi_scan/wifi_scan.js)

### Using Latest Release
To use the latest version of WifiWizard2 from npm, you will first need to remove the published version from the project
```shell
meteor remove cordova:wifiwizard2
```

To install and use this plugin in a Meteor project (which is exactly what this demo is), you have to specify the exact version from NPM repository: https://www.npmjs.com/package/wifiwizard2

And then add, like so:

```shell
meteor add cordova:wifiwizard2@3.0.0
```


### Using Latest Git in Demo
To use the latest version of WifiWizard2 from git, you will first need to remove the published version from the project
```shell
meteor remove cordova:wifiwizard2
```

And then add the latest version, appending the git commit to the end, like so:

```shell
meteor add cordova:wifizard2@https://github.com/tripflex/WifiWizard2.git#8b19ad44d85658b0015d95b7b9279b43c5afccee
```

As of 1/30/2018 if you want to test this out with the latest 3.0.0 branch, run the exact commands above and it should use the 3.0.0 branch from GitHub.  Make sure the commit on the end is the latest version, [check here for latest commit hashes](https://github.com/tripflex/WifiWizard2/commits/3.0.0)


See [Meteor Mobile documentation](https://guide.meteor.com/mobile.html#installing-plugins) for more details

### Using Local Copy of Plugin
If you just want to clone the WifiWizard2 git repository and run that using this demo project, you will need to create a directory that will have separate directories nested inside it for the source of this project, and for a copy of the plugin.

Create two directories, one that is the root, and one to store the local plugin files:
```shell
/Projects/WifiWizard2Demo
/Projects/WifiWizard2Demo/plugins
```

These directories should all be empty, and then you want to go into the `/Projects/WifiWizard2Demo` directory and clone this repo:

```shell
git clone https://github.com/tripflex/WifiWizard2Demo.git src
```

This should clone this demo project, and create the `src` directory inside `/Projects/WifiWizard2Demo/`

You then want to switch to the `plugins` directory you created, and clone the WifiWizard2 plugin:

```shell
git clone https://github.com/tripflex/WifiWizard2.git
```

You should now have directories setup like this:

```shell
/Projects/WifiWizard2Demo
/Projects/WifiWizard2Demo/plugins
/Projects/WifiWizard2Demo/plugins/WifiWizard2
/Projects/WifiWizard2Demo/src
```

Inside the `/Projects/WifiWizard2Demo/plugins/WifiWizard2` should be all the files for that plugin, and inside `/Projects/WifiWizard2Demo/src` should be all the files from this demo meteor project.

You then need to remove the WifiWizard2 plugin from the meteor project, so change into the `src` directory and run these commands:

```shell
meteor remove cordova:wifiwizard2
```

And then add the local copy of the plugin to the project:

```shell
meteor add cordova:wifizard2@file://../plugins/WifiWizard2
```

You should then be able to run this demo project on your mobile device, using that local copy of the plugin in the `plugins` directory.

There is a [known issue with Meteor and local cordova plugins](https://github.com/meteor/meteor/issues/9561), you may have to run this command if you get this same error:

```shell
rm -rf /Projects/WifiWizard2Demo/src/.meteor/local/cordova-build/
```

### Running Demo Project
As WifiWizard is meant to be ran on Mobile Devices, you should run this project using a device connected to your computer (not an emulated Android/iOS)

For Android, you would just run this command:

```shell
meteor run android-device
```

### Meteor Kitchen
This project was created using the AWESOME [Meteor Kitchen](https://meteorkitchen.com/) created by Petar Korponaić, make sure and check it out if you haven't already, and donate to Peter if you find it useful!