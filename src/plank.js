// Plank
(function(root) {

	var Plank = root.Plank = root.Plank || {};

	var LocalModel = Plank.LocalModel = Backbone.Model.extend({
		sync: function(method, model, optoins) {
			return;
		}
	});

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

		Plank.App.Navigation.show(_brand, _navItems);
		Plank.layout = App.Content.show(_navbarActions);
		if (typeof _navItems !== 'undefined' && _navItems.length > 0) {
			App.Navigation.activate(_navItems[0].id);
		}
	};
})(window);