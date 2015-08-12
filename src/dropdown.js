var _ = require('underscore');
var Marionette = require('backbone.marionette');
var LocalModel = require('./localModel');

var Dropdown = {};

var DropdownModel = LocalModel.extend({
  defaults: {
    style: 'default',
    title: 'Dropdown'
  }
});

var DropdownView = Marionette.LayoutView.extend({
  template: _.template('<button class="btn btn-<%= style %> dropdown-toggle" type="button" id="dropdown-<%= id %>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><%= title %><span class="caret"></span></button><ul class="dropdown-menu" aria-labelledby="dropdown-<%= id %>"></ul>'),
  className: 'dropdown',
  id: function() {
    return 'dropdown-' + this.model.id;
  }
});

Dropdown.create = function(id, title, content, options) {
  var model = new DropdownModel({id: id, title:title});
  var view = new DropdownView({model: model});
  return view;
};

module.exports = Dropdown;