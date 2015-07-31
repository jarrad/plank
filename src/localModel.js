var Backbone = global.Backbone = require('backbone');

var noop = function(method, model, optoins) {
  return;
}


var LocalModel = Backbone.Model.extend({
  sync: noop
});

var LocalCollection = Backbone.Collection.extend({
  model: LocalModel,
  sync: noop
});

module.exports = LocalModel;
module.exports.LocalCollection = LocalCollection;
