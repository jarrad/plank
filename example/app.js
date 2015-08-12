var App = new Backbone.Marionette.Application();

App.vent.on('menu:activated:dashboard', function() {

  var layout = new Backbone.Marionette.LayoutView({
    className: 'dashboard layout',
    template: Plank.template('<div id="widgets"><div class="col-xs-4" id="widget-monkeys"></div><div class="col-xs-4" id="widget-visits"></div><div class="col-xs-4" id="widget-toast"></div></div><div id="panels"></div>'),
    regions: {
      panels: '#panels',
      widgets: '#widgets',
      monkeys: '#widget-monkeys',
      visits: '#widget-visits',
      toast: '#widget-toast'
    }
  });
  Plank.content.show(layout);

	var panel = Plank.createPanel('plank-release-notes', 'Release Notes');
  layout.panels.show(panel);
  var menu = Plank.createButtonMenu('Hello World', 'primary', [
    {href: '#!/greettings', title: 'Greetings!'},
    {href: '#!/delete', title: 'Delete'}
  ]);
  panel.content.show(menu);

  var widgets = Plank.Widget.createWidgetRow([{
    icon: 'qq',
    data: {
      headline: {
        label: 'NEW MONKEYS',
        value: '375'
      },
      details: [
        {
          label: 'Bananas',
          value: '417'
        },
        {
          label: 'Banana/Monkey',
          value: '1.112'
        }
      ]
    },
    variation: 'default'
  },
  {
    icon: 'globe',
    data: {
      headline: {
        label: 'TOTAL VISITS',
        value: '375,193,392'
      },
      details: [
        {
          label: 'Registrations',
          value: '417,188'
        },
        {
          label: 'Bounce Rate',
          value: '19.45%'
        }
      ]
    },
    variation: 'orange'
  },
  {
    icon: 'cutlery',
    data: {
      headline: {
        label: 'TOTAL TOAST ORDERS',
        value: '8,910'
      },
      details: [
        {
          label: 'Rye',
          value: '21.78%'
        },
        {
          label: 'Buttered',
          value: '91.54%'
        }
      ]
    },
    variation: 'blue'
  }]);
  layout.widgets.show(widgets);

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
        {header: 'Badges',    property: 'count',        type: 'badge'},
        {header: 'Since',     property: 'created_date', type: 'datetime'}
      ],
      new Backbone.Collection([
        {id: 1, msg: 'Hi',  label: 'greeting', count: 2, created_date: 1438384178000},
        {id: 2, msg: 'Bye', label: ['greeting', 'salutation']},
        {id: 3, msg: 'Oi',  label: 'greeting'}
      ])
    )
  );
});