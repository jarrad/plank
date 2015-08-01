var App = new Backbone.Marionette.Application();

App.vent.on('menu:activated:dashboard', function() {
	var panel = Plank.createPanel('plank-release-notes', 'Release Notes');
	Plank.content.show(panel);
});

App.vent.on('menu:activated:features', function() {
	var panel = Plank.createPanel('tables', 'Tables');
	Plank.content.show(panel);

  panel.content.show(
    Plank.createTable(
    [
        {header: '',          property: 'selected',     type: 'boolean'},
        {header: 'Id',        property: 'id',           type: 'id'},
        {header: 'Message',   property: 'msg',          type: 'id'},
        {header: 'Labels',    property: 'label',        type: 'label'},
        {header: 'Processed', property: 'count',        type: 'badge'},
        {header: 'Since',     property: 'created_date', type: 'datetime'}
      ],
      new Backbone.Collection([
        {id: 1, msg: 'Hi', label: 'greeting', count: 2, created_date: 1438384178000},
        {id: 2, msg: 'Bye', label: 'greeting'},
        {id: 3, msg: 'Oi', label: 'greeting'}      
      ])
    )
  );
});