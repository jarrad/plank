var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var LocalModel = require('./localModel');
var LocalCollection = LocalModel.LocalCollection;

var MenuItem = LocalModel.extend({
  default: {
    href: '#!/noop',
    title: 'Title Here'
  }
});

var MenuItemCollection = LocalCollection.extend({
  model: MenuItem
});

var MenuItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: function() {
    return this.model.get('active') ? 'active' : '';
  },
  template: _.template('<a href="<%= href %>"><%= title %></a>'),
  events: {
    'click a' : 'onClick'
  },
  onClick: function(e) {
    e.preventDefault();
    console.log('clicked "' + this.model.get('title') + '"');
  }
});

var ButtonMenu = Marionette.CompositeView.extend({
  className: 'btn-group',
  template: _.template('<button type="button" class="btn btn-<%= type %> dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <%= title %> <span class="caret"></span></button><ul class="dropdown-menu"></ul>'),
  childView: MenuItemView,
  childViewContainer: 'ul',
});

var createButtonMenu = function(title, type, menuItems) {
  var items = new MenuItemCollection(menuItems);
  var model = new LocalModel({title:title,type:type});
  return new ButtonMenu({model:model, collection:items});
};

module.exports = createButtonMenu;