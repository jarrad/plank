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

var RowView = Marionette.ItemView.extend({
  tagName: "tr",
  template: _.template('<td>you need a row template</td>'),
  templateHelpers: {
    renderType: function(property, type) {
      var val = this[property];
      if (typeof val === 'undefined') {
        return '';
      } else if ('label' === type) {
        return '<span class="label label-default">' + this[property] + '</span>';
      } else if ('badge' === type) {
        return '<span class="badge">' + this[property] + '</span>';
      }
      return this[property];
    }
  }
});

var header = '<th class="property-<%= property %>"><%= header %></th>';

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