
App.module("Navigation", function(module, App, Backbone, Marionette, $, _) {

	var NavLayout = Marionette.Layout.extend({
		template: '#NavLayout-template',
		className: 'nav-left sticky hidden-sm hidden-xs',
		regions: {
			brand: '.brand',
			brandIcon: '.brand-icon',
			menu: '.nav-left-content'
		}
	});

	var BrandView = Marionette.ItemView.extend({
		template: '#BrandView-template',
		className: 'brand'
	});

	var BrandIconView = Marionette.ItemView.extend({
		template: '#BrandIconView-template',
		className: 'brand-icon'
	});

	var MenuItemView = Marionette.ItemView.extend({
		tagName: 'li',
		className: function() {
			var active = this.model.get('active');
			return active == true ? 'active' : '';
		},
		template: '#MenuItemView-template',
		initialize: function() {
			this.listenTo(this.model, 'changed', this.render);
		},
		ui: {
			'link' : 'a.nav-left-item'
		},
		events: {
			'click @ui.link' : 'doActivate'
		},
		doActivate: function(e) {
			e.preventDefault();
			module.trigger('menu:activate', this.model.get('id'));
		}
	});

	var MenuView = Marionette.CollectionView.extend({
		itemView: MenuItemView,
		template: '#MenuView-template',
		tagName: 'ul',
		className: 'nav nav-pills nav-stacked'
	});

	var MenuItem = Backbone.Model.extend({
		defaults: {
			active: false,
			badge: '',
		},
	});
	var MenuItemCollection = Backbone.Collection.extend({
		model: MenuItem,
	});

	var brand = null;
	var brandIcon = null;

	var items = null;
	var menu = null;

	module.show = function(brand, navItems) {

		items = new MenuItemCollection(navItems);
		var layout = new NavLayout();

		var model = new Backbone.Model(brand);

		brand = new BrandView({model:model});
		brandIcon = new BrandIconView({model:model});
		module.menu = menu = new MenuView({collection:items});

		App.navRegion.show(layout);
		layout.menu.show(menu);
		layout.brand.show(brand);
		layout.brandIcon.show(brandIcon);
	};

	var deactivateAll = function(items) {
		items.each(function(el, index, list) {
			el.set('active', false);
		});
	};
	module.activate = function(id) {
		deactivateAll(items);
		var matches = items.where({id: id});

		if (matches.length > 0) {
			_.each(matches, function(el,index,list) {
				var item = items.get(el.cid);
				item.set('active', true);
			});
			menu.render();
			App.vent.trigger('menu:activated', id);
			App.vent.trigger('menu:activated:' + id);
		}
	};
	module.on('menu:activate', module.activate);

	var collapseClassName = 'nav-left-collapse';
	module.toggleCollapse = function() {
		$('body').toggleClass(collapseClassName);
	};
	App.vent.on('menu:toggleCollapse', module.toggleCollapse);

	module.collapse = function() {
		$('body').addClass(collapseClassName);
	};

	module.setBrand = function(name, icon) {
		brand.model.set('appName', name);
		if (typeof icon !== 'undefined') {
			brandIcon.model.set('icon', icon);
			brandIcon.render();
		}
		brand.render();
	};

});