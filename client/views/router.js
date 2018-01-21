Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.freeRoutes = [
	"home",
	"wifi_scan",
	"wifi_connection"
];

Router.defaultFreeRoute = "home";

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {
	
	this.route("/", {name: "home", title: "Home", controller: "HomeController"});
	this.route("/wifi_scan", {name: "wifi_scan", title: "Wifi Scan", controller: "WifiScanController"});
	this.route("/wifi_connection", {name: "wifi_connection", title: "WiFi Connection", controller: "WifiConnectionController"});
});
