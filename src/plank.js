/*jshint browserify: true */
// Plank
var Plank = global.Plank = {};

var jQuery     = global.jQuery = Plank.$      = require('jquery');
var _          = Plank._          = require('underscore');
var Backbone   = Plank.Backbone   = require('backbone');
var Marionette = Plank.Marionette = require('backbone.marionette');
var Bootstrap  = Plank.Bootstrap  = require('bootstrap');

Plank.Navigation       = require('./nav');
Plank.Content          = require('./content');
Plank.createPanel      = require('./panel').newPanel;
Plank.Events           = require('./events');
Plank.createTable      = require('./table');
Plank.createButtonMenu = require('./buttonMenu');

Plank.template   = _.template;

var _brand = {};
var _navItems = [];
var _navbarActions = [];

Plank.brand = function(options) {
	_brand = options;
	return Plank;
};

Plank.nav = function(navItems) {
	_navItems = navItems;
	return Plank;
};

Plank.navbar = function(actions) {
	_navbarActions = actions;
	return Plank;
};

Plank.start = function(App) {
	// create the plank App
	Plank.App = App;
	// add our layout regions
	Plank.App.addRegions({
	  "navRegion":      "#nav",
		"contentRegion":  "#content",
	});

	Plank.Events.on('menu:toggleCollapse', Plank.Navigation.toggleCollapse);

	Plank.Navigation.show(_brand, _navItems);
	Plank.content = Plank.Content.show(_navbarActions).content;
	if (typeof _navItems !== 'undefined' && _navItems.length > 0) {
		Plank.Navigation.activate(_navItems[0].id);
	}
};

module.exports = Plank;