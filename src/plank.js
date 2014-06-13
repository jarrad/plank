// Plank
(function(root) {

	var Plank = root.Plank = {};

	var _brand = {};

	var _navItems = [];

	Plank.brand = function(options) {
		_brand = options;
		return Plank;
	};

	Plank.nav = function(navItems) {
		_navItems = navItems;
		return Plank;
	};
	
	Plank.start = function(App) {
		App.Navigation.show(_brand, _navItems);
		Plank.layout = App.Content.show();
		if (typeof _navItems !== 'undefined' && _navItems.length > 0) {
			App.Navigation.activate(_navItems[0].id);
		}
	};
})(window);