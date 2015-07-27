var App = new Backbone.Marionette.Application();

App.vent.on('menu:activated:dashboard', function() {
	var panel = App.Panel.newPanel('plank-release-notes', 'Release Notes');
	Plank.layout.content.show(panel);
});

App.vent.on('menu:activated:features', function() {
	var panel = App.Panel.newPanel('features', 'Plank Features');
	Plank.layout.content.show(panel);
  var view = new Backbone.Marionette.ItemView({template: _.template('<p>So many features')});
  panel.content.show(view);
});