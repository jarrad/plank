var App = new Backbone.Marionette.Application();
App.addRegions({
  "navRegion":      "#nav",
  "contentRegion":  "#content",
});

var LocalModel = App.LocalModel = Backbone.Model.extend({
	sync: function(method, model, optoins) {
		return;
	}
});

App.data = {};

App.data.company = {
	title: 'Plank',
	icon: 'globe',
	appName: 'Plank'
};

App.data.user = {
	id: 'a0b1c2d3-e4f5-g6h7-i8j9-k10l11m12n13',
	name: 'Bob Plank',
	avatar: 'bplank'
};

App.data.navLeft = {};

App.data.navLeft.items = [
	{ id: 'dashboard',   title: 'Dashboard',   href: '#!/dashboard',   icon: 'home' },
	{ id: 'features',    title: 'Features',    href: '#!/features',       icon: 'suitcase', badges: 2 }
];

App.vent.on('menu:activated:dashboard', function() {
	var panel = App.Panel.newPanel('plank-release-notes', 'Release Notes');
	contentLayout.content.show(panel);
});

App.vent.on('menu:activated:features', function() {
	var panel = App.Panel.newPanel('features', 'Plank Features');
	contentLayout.content.show(panel);
});


var contentLayout = null;

App.go = function() {
	$('.old').hide();
	App.Navigation.show();
	contentLayout = App.Content.show();
	App.Navigation.activate(App.data.navLeft.items[0].id);
};

App.back = function() {
	$('.old').show();
}
