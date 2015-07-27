App.module("Panel", function(module, App, Backbone, Marionette, $, _) {

	var PanelInfo = Plank.LocalModel.extend({
		defaults: {
			title: 'Unset Title'
		}
	});

	var PanelLayout = Marionette.LayoutView.extend({
		template: _.template('<header><%= title %></header><div class="panel-content"></div>'),
		className: 'panel',
		id: function() {
			return 'panel-' + this.model.id;
		},
		regions: {
			header: 'header',
			content: '.panel-content'
		}
	});

	module.newPanel = function(id, title, content) {
		var model = new PanelInfo({id: id, title:title, content: content});
		var layout = new PanelLayout({model: model});
		return layout;
	};


});
