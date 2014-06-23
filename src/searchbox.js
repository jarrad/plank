
App.module("Searchbox", function(module, App, Backbone, Marionette, $, _) {

	var SearchboxSettings = module.SearchboxSettings = Plank.LocalModel.extend({
		defaults: {
			placeholder: 'Search...',
			query: ''
		}
	});

	var SearchboxView = module.SearchboxView = Marionette.ItemView.extend({
		template: '#SearchboxView-template',
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

});