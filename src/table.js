var _ = require('underscore');
var Marionette = require('backbone.marionette');
var LocalModel = require('./localModel');

var Table = {};

var PanelInfo = LocalModel.extend({
  defaults: {
    title: 'Unset Title'
  }
});

var RowInfo = LocalModel.extend({

  defaults: {
    property: 'property',
    header: 'Header',
    type: 'integer'
  }

});

var RowView = Marionette.ItemView.extend({
  tagName: "tr",
  template: "#row-template"
});

var TableLayout = Marionette.LayoutView.extend({



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

Panel.newPanel = function(id, title, content) {
  var model = new PanelInfo({id: id, title:title, content: content});
  var layout = new PanelLayout({model: model});
  return layout;
};

module.exports = Table;