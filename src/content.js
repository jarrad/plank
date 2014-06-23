
App.module("Content", function(module, App, Backbone, Marionette, $, _) {

	var NavbarHeaderLayout = Marionette.Layout.extend({
		template: '#NavbarHeaderLayout-template',
		className: 'navbar',
		attributes: {
			'role' : 'navigation'
		},
		ui: {
			'toggle' : '#nav-left-toggle'
		},
		events: {
			'click @ui.toggle' : 'toggle'
		},
		toggle: function(e) {
			e.preventDefault();
			App.vent.trigger('menu:toggleCollapse');
		},
		regions: {
			actions: '#nav-top-actions',
			subactions: '#nav-top-subactions'
		}
	});

	var NavbarAction = Backbone.Model.extend({
		defaults: {
			className: ''
		}
	});
	var NavbarActionCollection = Backbone.Collection.extend({
		item: NavbarAction
	});

	var navbarActions = new NavbarActionCollection([
		{ className: 'toggle', template: '#NavbarToggleActionView-template' },
		{ className: 'search', template: '#NavbarSearchActionView-template' }
	]);

	var NavbarActionView = Marionette.ItemView.extend({
		tagName: 'li',
		className: function() {
			return this.model.get('className');
		}
	});

	var NavbarActionCollectionView = Marionette.CollectionView.extend({
		itemView: NavbarActionView,
		itemViewOptions: function(model,index) {
			return { template: model.get('template') }
		},
		template: '#NavbarActionCollectionView-template',
		tagName: 'ul',
		className: 'nav navbar-nav'
	});

	var ContentLayout = Marionette.Layout.extend({
		template: '#ContentLayout-template',
		className: 'main-content',
		regions: {
			nav: '#nav-content',
			content: '#main-content'
		}
	});

	module.show = function() {

		var contentLayout = new ContentLayout();
		var navLayout = new NavbarHeaderLayout();
		var actions = new NavbarActionCollectionView({collection:navbarActions});

		App.contentRegion.show(contentLayout);
		contentLayout.nav.show(navLayout);
		navLayout.actions.show(actions);

		// yuck x_x
		var $searchbox = $('#searchbox');
		var searchbox = new App.Searchbox.SearchboxView({namespace: 'cases', el: $searchbox});
		searchbox.render();

		searchbox.on('searchbox:search:cases', function(source, value) {
			console.log('search: ' + value);
			var pid = setTimeout(function() {
				source.trigger('search:complete');
			}, 1500);
		});

		return contentLayout;
	}

});
