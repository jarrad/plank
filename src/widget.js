// <div class="widget-body clearfix">
  // <div class="row">
  //   <div class="col-xs-3">
  //     <span class="widget-icon">
  //       <i class="glyphicon glyphicon-globe"></i>
  //     </span>
  //   </div>
  //   <div class="col-xs-9">
  //     <h5 class="no-margin">USERS GROWTH</h5>
  //     <p class="h2 no-margin fw-normal">4,332</p>
  //   </div>
  // </div>
//   <div class="row">
//     <div class="col-xs-6">
//       <h5 class="no-margin">Registrations</h5>
//       <p class="value4">+830</p>
//     </div>
//     <div class="col-xs-6">
//       <h5 class="no-margin">Bounce Rate</h5>
//       <p class="value4">4.5%</p>
//     </div>
//   </div>
// </div>

var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var LocalModel = require('./localModel');
var LocalCollection = LocalModel.LocalCollection;

var Widget = {};

var WidgetInfo = LocalModel.extend({
  defaults: {
    variation: 'default',
    icon: 'globe',
    data: {
      headline: {
        label: 'DEFAULT LABEL',
        value: '--'
      },
      details: [
        { label: 'Details Left', value: '--'},
        { label: 'Details Right', value: '--'}
      ]
    }
  }
});

var WidgetView = Marionette.ItemView.extend({
  className: function() {
    return this.options.columnWidth;
  },
  template: _.template('<section class="widget widget-<%= variation %>"><div class="widget-body clearfix"><div class="row"><div class="col-xs-3"><span class="widget-icon"><i class="fa fa-fw fa-<%= icon %>"></i></span></div><div class="col-xs-9"><h5 class="no-margin"><%= data.headline.label %></h5><p class="h2 no-margin fw-normal"><%= data.headline.value %></p></div></div><div class="row"><div class="col-xs-6"><h5 class="no-margin"><%= data.details[0].label %></h5></div><div class="col-xs-6"><h5 class="no-margin"><%= data.details[1].label %></h5></div></div><div class="row"><div class="col-xs-6"><p class="value4"><%= data.details[0].value %></p></div><div class="col-xs-6"><p class="value4"><%= data.details[1].value %></p></div></div></div></div></section>'),
  templateHelpers: {
  }
});

var WidgetRowView = Marionette.CollectionView.extend({
  childView: WidgetView,
  className: 'widget-row row',
  template: _.template(''),
  initialize: function(options) {
    options.rowCount = options.rowCount || 3;
  },
  childViewOptions: function() {
    var columnWidth = 12 / this.options.rowCount;
    return {
      columnWidth: 'col-md-' + columnWidth
    }
  }
});

Widget.create = function(widgetInfo) {
  widgetInfo = new WidgetInfo(widgetInfo);
  return new WidgetView({model: widgetInfo});
};

Widget.createWidgetRow = function(widgetInfoList) {
  return new WidgetRowView({collection: new Backbone.Collection(widgetInfoList)});
};

module.exports = Widget;