App.module("Panel", function(module, App, Backbone, Marionette, $, _) {

	var PanelInfo = App.LocalModel.extend({
		defaults: {
			title: 'Unset Title'
		}
	});

	var PanelLayout = Marionette.Layout.extend({
		template: '#PanelLayout-template',
		className: 'panel',
		id: function() {
			return 'panel-' + this.model.id;
		},
		regions: {
			content: '.panel-content'
		}
	});

	module.newPanel = function(id, title) {
		var model = new PanelInfo({id: id, title:title});
		var layout = new PanelLayout({model: model});
		return layout;
	};


});
