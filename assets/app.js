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
App.data.user = {
	id: 'a0b1c2d3-e4f5-g6h7-i8j9-k10l11m12n13',
	name: 'Bob Plank',
	avatar: 'bplank'
};


App.vent.on('menu:activated:dashboard', function() {
	var panel = App.Panel.newPanel('plank-release-notes', 'Release Notes');
	Plank.layout.content.show(panel);
});

App.vent.on('menu:activated:features', function() {
	var panel = App.Panel.newPanel('features', 'Plank Features');
	Plank.layout.content.show(panel);
});