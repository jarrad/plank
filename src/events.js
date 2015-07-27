var Backbone = require('backbone');

var Events = {};

var core = function() {
  return (typeof Plank.App !== 'undefined' && Plank.App !== null) ?  Plank.App.vent : Backbone.Events;
};

var trigger = function(name) {
  core().trigger(name, arguments);
};

var on = function(name, callback, context) {
  core().on(name, callback, context);
};

Events.trigger = trigger;
Events.on = on;

module.exports = Events;