var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var LocalModel = require('./localModel');
var LocalCollection = LocalModel.LocalCollection;

var Table = {};

var RowInfo = LocalModel.extend({
  defaults: {
    property: 'property',
    header: 'Header',
    type: 'integer'
  }
});

var TableCellRenderer = function(options) {
  this.type = options.type;
  this.render = options.render;
};

var defaultRenderer = new TableCellRenderer({
  type: 'default', 
  render: function(model, property) {
    return model[property];
  }
});

Table.addRenderer = function(renderer) {
  if (!(renderer instanceof TableCellRenderer)) {
    return;
  }
  renderers[renderer.type] = renderer;
};

Table.rendererForType = function(type) {
  var renderer = renderers[type];
  if (typeof renderer === 'undefined' || renderer === null) {
    return defaultRenderer;
  }
  return renderer;
};

var renderers = {

  'boolean': new TableCellRenderer({
    type: 'boolean',
    render: function(model, property) {
      return '<label><input type="checkbox" value="' + model[property] + '"' + (model[property] ? ' checked' : '') + '></label>';
    }
  }),
  'label': new TableCellRenderer({
    type: 'label',
    render: function(model, property) {
      var value = model[property];
      if (!(value instanceof Array)) {
        value = [model[property]];
      }
      var labels = [];

      _.each(value, function(val, index, list) {
        labels.push('<span class="label label-default" data-label="' + val + '">' + val + '</span>');
      });

      return labels.join(' ');
    }
  }),
  'badge': new TableCellRenderer({
    type: 'badge',
    render: function(model, property) {
      return '<span class="badge">' + model[property] + '</span>';
    }
  }),
  'datetime': new TableCellRenderer({
    type: 'datetime',
    render: function(model, property) {
      var date = new Date(model[property]);
      return '<span class="datetime">' + date + '</span>';
    }
  })


};

var RowView = Marionette.ItemView.extend({
  tagName: "tr",
  template: _.template('<td>you need a row template</td>'),
  templateHelpers: {
    renderType: function(property, type) {
      var val = this[property];
      if (typeof val === 'undefined') {
        return '';
      }
      var renderer = Table.rendererForType(type);
      return renderer.render(this, property);
    }
  }
});

var header = '<th class="property-<%= property %>" data-property="<%= property %>" data-type="<%= type %>"><%= header %></th>';

var generateTemplates = function(definitions, model) {
  var headerTemplate = _.reduce(definitions, function(memo, value, index, list) {
    return memo + _.template(header)(value);
  }, '');
  model.set('headerTemplate', headerTemplate);

  var cellTemplate = _.reduce(definitions, function(memo, value, index, list) {
    return memo + '<td class="property-' + value.property + '" data-type="' + value.type + '" data-property="' + value.property + '"><%= renderType("' + value.property + '", "' + value.type + '") %></td>';
  }, '');
  model.set('cellTemplate', cellTemplate);
};

var TableView = Marionette.CompositeView.extend({
  tagName: 'table',
  className: 'table',
  childView: RowView,
  childViewContainer: 'tbody',
  template: _.template('<thead><tr></tr></thead><tbody></tbody><tfoot></tfoot>'),
  initialize: function(options) {
    this.model = this.model || new LocalModel();
    generateTemplates(options.definitions, this.model);
    this.childViewOptions = {
      template: _.template(this.model.get('cellTemplate'))
    };
  },
  onShow: function() {
    var $tr = this.$el.find('thead > tr');
    $tr.html(this.model.get('headerTemplate'));
  }
});


Table.create = function(definitions, collection) {
  return new TableView({definitions: definitions, collection: collection});
};

module.exports = Table.create;