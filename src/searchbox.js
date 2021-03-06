var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = Backbone.$;
var Plank = global.Plank;

var LocalModel = require('./localModel');
var Events = require('./events');

var SearchboxSettings = LocalModel.extend({
	defaults: {
		placeholder: 'Search...',
		query: ''
	}
});

var SearchboxView = Marionette.ItemView.extend({
	template: _.template('<input type="text" class="form-control searchbox pull-left" placeholder="<%= placeholder %>" value="<%= query %>"><small class="searching-indicator text-muted"><i class="fa fa-cog fa-spin"></i> Searching</small>'),
	className: 'searchbox',
	ui: {
		'searchbox' : 'input.searchbox'
	},
	events: {
		'keydown @ui.searchbox' : 'doKeydown'
	},
	initialize: function(options) {
		this.model = options.model || new SearchboxSettings();
		this.namespace = options.namespace || 'default';
		var self = this;
		this.on('search:complete', function() {
			self.searchComplete();
		})
	},
	getQuery: function() {
		return this.ui.searchbox.val();
	},
	doKeydown: function(e) {
		if (e.keyCode != 13) {
			return;
		}
		// it is the ENTER key...
		e.preventDefault();
		e.stopPropagation();
		this.triggerSearch();
	},
	triggerSearch: function() {
		var val = this.getQuery();

		this.ui.searchbox.prop('disabled', true);
		this.$el.addClass('searching');

		this.trigger('searchbox:search:' + this.namespace, this, val);
	},
	searchComplete: function() {
		this.ui.searchbox.prop('disabled', false);
		this.$el.removeClass('searching');
		this.ui.searchbox.val('');
	}
});

module.exports.SearchboxView = SearchboxView;
