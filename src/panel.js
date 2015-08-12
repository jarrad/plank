var _ = require('underscore');
var Marionette = require('backbone.marionette');
var LocalModel = require('./localModel');

var Panel = {};

var PanelInfo = LocalModel.extend({
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
	},
	onShow: function() {
		if (typeof this.options.contentView !== 'undefined' && this.options.contentView != null) {
			this.content.show(this.options.contentView);
		}		
	}
});

Panel.newPanel = function(id, title, contentView) {
	var model = new PanelInfo({id: id, title:title});
	return new PanelLayout({model: model, contentView: contentView});
};

module.exports = Panel;