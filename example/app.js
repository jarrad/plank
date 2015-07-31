var App = new Backbone.Marionette.Application();

App.vent.on('menu:activated:dashboard', function() {
	var panel = Plank.newPanel('plank-release-notes', 'Release Notes');
	Plank.layout.content.show(panel);
});

App.vent.on('menu:activated:features', function() {
	var panel = Plank.newPanel('features', 'Plank Features');
	Plank.layout.content.show(panel);
  var view = new Backbone.Marionette.ItemView({template: Plank.template('<p>So many features')});
  panel.content.show(view);


  var table = Plank.createTable(
    [
      {header: 'Id',   property: 'id',   type: 'id'},
      {header: 'Message', property: 'msg', type: 'id'},
      {header: 'Labels', property: 'label', type: 'label'},
      {header: 'Processed', property: 'count', type: 'badge'}
    ],
    new Backbone.Collection([
      {id: 1, msg: 'Hi', label: 'greeting', count: 2},
      {id: 2, msg: 'Bye', label: 'greeting'},
      {id: 3, msg: 'Oi', label: 'greeting'}      
    ])
  );

  panel.content.show(table);

});