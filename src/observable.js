var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};
SAMURAIPRINCIPLE.observable = function (base) {
  'use strict';
  var listeners = [];
  base.on = function (type, listener, priority) {
    listeners.push({
      type: type,
      listener: listener,
      priority: priority
    });
  };
  base.trigger = function (type) {
    var args = Array.prototype.slice.call(arguments, 1);
    listeners
      .filter(function (listenerDetails) {
        return listenerDetails.type === type;
      })
      .sort(function (firstListenerDetails, secondListenerDetails) {
        return secondListenerDetails.priority - firstListenerDetails.priority;
      })
      .some(function (listenerDetails) {
        return listenerDetails.listener.apply(undefined, args) === false;
      });
  };
  return base;
};
